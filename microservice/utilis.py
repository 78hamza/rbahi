import pandas as pd 


def load_data(file):
    try:
        if file.filename.endswith('.csv'):
            df = pd.read_csv(file)
        elif file.filename.endswith('.xlsx'):
            df = pd.read_excel(file)
    except Exception as e:
        raise ValueError(f"unsupported file format {str(e)}")
    

        

    return df


def preprocess_data(df):
    df = df.dropna()
    required_columns = [
        'quantity', 
        'unit_price',
        'total'
    ]

    if 'total' not in df.columns:
        df['total'] = df['quantity'] * df['unit_price']

    for col in required_columns:
        if col not in df.columns:
            raise ValueError(f"Missing column: {col}" )
        
    df = df[(df['quantity'] > 0 & df['unit_price'] > 0)]

    return df

