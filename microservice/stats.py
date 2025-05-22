import pandas as pd
import numpy as np
from utilis import load_data


def generate_statistics(df):
    
    describe = df.describe().to_dict()

    # example coutn top selling products 
    top_products = df['product'].value_counts(5).to_dict() if 'product' in df else {}

    # mouthly trend 
    if 'Date' in df.columns:
        # df['Date'] = pd.to_datetime(df['Date'], errors='coerce')
        # df['month'] = df['Date'].dt.to_period('M')
        sales_by_month = df.groupby('Date')['unit_price'].sum().to_dict()
    else:
        sales_by_month = {}
    
    return {
        "describe" : describe,
        "top_products" : top_products,
        "sales_by_month" : sales_by_month
    }


