import pandas as pd
import numpy as np
from utilis import load_data


def generate_statistics(df):
    
    describe = df.describe().to_dict()

    # example coutn top selling products 
    top_products = df['product'].value_counts(5).to_dict() if 'product' in df else {}

    # mouthly trend 
    if 'date' in df.columns:
        df['date'] = pd.to_datetime(df['date'], errors='coerce')
        df['month'] = df['date'].dt.to_period('M')
        sales_by_month = df.groupby('month')['unit_price'].sum().to_dict()
    else:
        sales_by_month = {}
    
    return {
        "describe" : describe,
        "top_products" : top_products,
        "sales_by_month" : sales_by_month
    }