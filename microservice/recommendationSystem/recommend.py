import pandas as pd
import numpy as np
from pymongo import MongoClient
from sklearn.metrics.pairwise import cosine_similarity
from dotenv import load_dotenv
import os

load_dotenv()
mongo_uri = os.getenv('MONGO_URI')

def get_company_dataset(company_id):
    """Fetch dataset for a company containing multiple end-users' data"""
    client = MongoClient(mongo_uri)
    db = client['rbahi-users-datasets']
    collection = db['dataset']
    
    # Always query with string representation
    company_id_str = str(company_id)
    
    doc = collection.find_one({"userId": company_id_str})
    if not doc or 'data' not in doc:
        raise Exception(f"Dataset not found for company ID {company_id_str}")
    
    df = pd.DataFrame(doc['data'])
    client.close()
    
    # Verify required columns exist
    required_cols = ['user_id', 'item_name', 'quantity']
    missing = [col for col in required_cols if col not in df.columns]
    if missing:
        raise Exception(f"Missing columns in dataset: {missing}")
    
    # Convert all user IDs to strings for consistency
    df['user_id'] = df['user_id'].astype(str)
    
    return df

def build_user_item_matrix(df):
    """Create user-item interaction matrix from company dataset"""
    # Ensure quantity is numeric
    df['quantity'] = pd.to_numeric(df['quantity'], errors='coerce').fillna(0)
    
    # Create pivot table: users vs items
    return df.pivot_table(
        index='user_id',
        columns='item_name',
        values='quantity',
        aggfunc='sum',
        fill_value=0
    )

def compute_similarity_matrix(item_user_matrix):
    """Calculate item-item cosine similarity"""
    # Handle single-item edge case
    if len(item_user_matrix.columns) < 2:
        return pd.DataFrame(columns=item_user_matrix.columns)
    
    item_sim_matrix = cosine_similarity(item_user_matrix.T)
    return pd.DataFrame(
        item_sim_matrix,
        index=item_user_matrix.columns,
        columns=item_user_matrix.columns
    )

def recommend_items_for_user(company_id, target_user_id, top_n=4):
    """
    Generate recommendations for a specific end-user within a company's dataset
    
    Args:
        company_id: ID of the company that owns the dataset (e.g., 12)
        target_user_id: End-user ID to generate recommendations for (e.g., "u1")
        top_n: Number of recommendations to return
    """
    try:
        print(f"Fetching dataset for company: {company_id}")
        df = get_company_dataset(company_id)
        
        # Debug: show dataset stats
        print(f"DEBUG: Dataset contains {len(df)} transactions")
        print(f"DEBUG: Unique users: {df['user_id'].nunique()}")
        print(f"DEBUG: Unique items: {df['item_name'].nunique()}")
        
        # Build user-item matrix
        user_item_matrix = build_user_item_matrix(df)
        print(f"DEBUG: Matrix shape: {user_item_matrix.shape}")
        
        # Convert target user ID to string for consistency
        target_user_str = str(target_user_id)
        
        # Verify target user exists
        if target_user_str not in user_item_matrix.index:
            available_users = user_item_matrix.index.tolist()[:5]
            raise Exception(
                f"User '{target_user_str}' not found in dataset. "
                f"First 5 users: {available_users}"
            )
        
        # Get user's purchase vector
        user_vector = user_item_matrix.loc[target_user_str]
        interacted_items = user_vector[user_vector > 0].index.tolist()
        print(f"DEBUG: User '{target_user_str}' purchased {len(interacted_items)} items")
        
        # Handle no purchase history
        if not interacted_items:
            print("No purchase history - returning popular items fallback")
            # Fallback: most popular items overall
            popular_items = df.groupby('item_name')['quantity'].sum().sort_values(ascending=False)
            return [
                {"item_name": item, "score": float(score)} 
                for item, score in popular_items[:top_n].items()
            ]
        
        # Compute similarity matrix
        sim_matrix = compute_similarity_matrix(user_item_matrix)
        
        # Handle case where similarity matrix is empty
        if sim_matrix.empty:
            print("Insufficient data for similarity - returning popular items")
            popular_items = df.groupby('item_name')['quantity'].sum().sort_values(ascending=False)
            return [
                {"item_name": item, "score": float(score)} 
                for item, score in popular_items[:top_n].items()
            ]
        
        # Calculate recommendation scores
        scores = {}
        for item in interacted_items:
            if item not in sim_matrix.columns:
                continue
                
            # Get similar items excluding purchased ones
            similar_items = sim_matrix[item].drop(
                labels=interacted_items,
                errors='ignore'  # Ignore if item not present
            )
            
            # Aggregate scores
            for sim_item, score in similar_items.items():
                scores[sim_item] = scores.get(sim_item, 0) + score
        
        # Handle no recommendations case
        if not scores:
            print("No similar items found - returning popular items")
            popular_items = df.groupby('item_name')['quantity'].sum().sort_values(ascending=False)
            return [
                {"item_name": item, "score": float(score)} 
                for item, score in popular_items[:top_n].items()
            ]
        
        # Rank items by score
        ranked_items = sorted(scores.items(), key=lambda x: x[1], reverse=True)[:top_n]
        
        # Format recommendations
        recommendations = [
            {"item_name": item, "score": round(score, 4)} 
            for item, score in ranked_items
        ]
        
        print(f"Generated {len(recommendations)} recommendations")
        return recommendations
    
    except Exception as e:
        print(f"Recommendation error: {str(e)}")
        return []