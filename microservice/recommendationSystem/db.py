from pymongo import MongoClient
from dotenv import load_dotenv
import os



def fetch_dataset_by_user(user_id):
    load_dotenv()
    db_url = os.getenv('MONGO_URI')
    try:
        client = MongoClient(db_url)
        db = client['rbahi-users-datasets']
        collection = db['user_datasets']
        doc = collection.find_one({"userId" : user_id})

        if doc and "dataset" in doc:
            return doc['dataset']
        return None
    except Exception as e:
        print("mongoDB error", e)
        return None