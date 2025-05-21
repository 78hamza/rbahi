import joblib 
import numpy as np

def make_prediction(quantity, unit_price):
    model = joblib.load('model.pkl')
    input_data = np.array([[quantity, unit_price]])
    return model.predict(input_data)