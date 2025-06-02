from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from utilis import load_data, preprocess_data
from train_model import train_model
from predict import make_prediction
from stats import generate_statistics
from recommendationSystem.db import fetch_dataset_by_user
from recommendationSystem.recommend import recommend_items_for_user
import pandas as pd
from dotenv import load_dotenv
import os
import logging

# set up the mongodb connection
load_dotenv()
mongo_uri = os.getenv('MONGO_URI')
client = MongoClient(mongo_uri)
db = client['rbahi-users-datasets']
collection = db['dataset']



app = Flask(__name__)
app.logger.setLevel(logging.DEBUG)
CORS(app)
df_storage = {}

# testing the get method
@app.route('/test', methods=['GET'])
def testing():
    return jsonify({"message" : "testing the end point on that port"}), 200

@app.route('/api/upload', methods=['POST'])
def upload_file():
    
    global df_storage 


    try:
        file = request.files['file']
        app.logger.debug(f"file received: {file.filename}")
        df = load_data(file)
        app.logger.debug("data loaded successfully")
        df = preprocess_data(df)
        train_model(df)

        df_storage["df"] = df

        return jsonify({
            "message":"model trained successfully", 
            
        })
    except Exception as e :
        app.logger.error(f"error: {str(e)}")
        return jsonify({"error":str(e)}), 400



@app.route('/api/predict', methods=['POST']) 
def predict():
    try:
        data = request.get_json()
        if not data :
            return jsonify({"error" : "no data provided"})
        
        quantity = data.get('quantity')
        unit_price = data.get('unit_price')

        if quantity is None or unit_price is None:
            return jsonify({"error" : "Missing quantity and unit price values"}), 400
        
        try:
            quantity = float(quantity)
            unit_price = float(unit_price)
            if quantity <= 0 & unit_price <= 0:
                raise ValueError
        except ValueError:
            return jsonify({"error" : "values must be positive numbers!!"}), 400

        prediction = make_prediction(quantity, unit_price)
        return jsonify({"predicted_total" : round(prediction, 2)})
    except Exception as e: 
        return jsonify({"error": str(e)}), 500

@app.route('/api/stats', methods=['GET'])
def get_statistics():
    try:
        df = df_storage.get("df")
        if df is None:
            return jsonify({"error" : "no data uploaded yet"})
        stats = generate_statistics(df)
        return jsonify(stats)
    except Exception as e:
        return jsonify({"error" : str(e)}), 500

@app.route('/api/dataset/upload/recommend', methods=['POST'])
def recommend():
    try:
        # Extract form data
        company_id = request.form.get('userId')  # This is actually the company ID
        created_at = request.form.get('created_at')
        
        if not company_id or not created_at:
            return jsonify({"error": "Company ID and created_at are required"}), 400
        
        # Get uploaded dataset
        dataset = request.files.get('dataset')
        if not dataset:
            return jsonify({"error": "No dataset uploaded"}), 400
        
        # Read dataset
        try:
            if dataset.filename.endswith('.csv'):
                df = pd.read_csv(dataset)
            elif dataset.filename.endswith(('.xlsx', '.xls')):
                df = pd.read_excel(dataset)
            else:
                return jsonify({"error": "Unsupported file type"}), 400
        except Exception as e:
            return jsonify({"error": f"Failed to read file: {str(e)}"}), 400
        
        # Prepare document for MongoDB
        records = df.to_dict(orient='records')
        clean_data = [{str(k): str(v) for k, v in record.items()} for record in records]  # Convert all values to string
        
        document = {
            "userId": company_id,
            "created_at": created_at,
            "filename": dataset.filename,
            "rowcount": len(df),
            "columns": list(df.columns),
            "data": clean_data
        }
        
        # Store in MongoDB
        client = MongoClient(mongo_uri)
        db = client['rbahi-users-datasets']
        collection = db['dataset']
        
        try:
            result = collection.insert_one(document)
            dataset_id = str(result.inserted_id)
            print(f"Data stored successfully. Dataset ID: {dataset_id}")
        except Exception as e:
            client.close()
            return jsonify({"error": f"Database storage failed: {str(e)}"}), 500
        
        client.close()
        
        # Generate recommendations for all users in the dataset
        all_recommendations = {}
        
        # Get unique end-user IDs from the dataset
        if 'user_id' in df.columns:
            end_user_ids = df['user_id'].unique().tolist()
        else:
            # If no user_id column, use a default
            end_user_ids = ['default_user']
        
        # Generate recommendations for each end-user
        for user_id in end_user_ids:
            try:
                recommendations = recommend_items_for_user(
                    company_id=company_id,
                    target_user_id=user_id
                )
                all_recommendations[user_id] = recommendations
            except Exception as e:
                print(f"Recommendation failed for user {user_id}: {str(e)}")
                all_recommendations[user_id] = []
        
        return jsonify({
            "dataset_id": dataset_id,
            "rowCount": len(df),
            "columns": list(df.columns),
            "recommendations": all_recommendations
        }), 200
        
    except Exception as e:
        return jsonify({"error": f"Server error: {str(e)}"}), 500


if __name__ == "__main__":
    app.run(port = 7071, debug=True)