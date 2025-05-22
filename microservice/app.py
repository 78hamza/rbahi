from flask import Flask, request, jsonify
from flask_cors import CORS
from utilis import load_data, preprocess_data
from train_model import train_model
from predict import make_prediction
from stats import generate_statistics
import logging



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


if __name__ == "__main__":
    app.run(port = 7071, debug=True)