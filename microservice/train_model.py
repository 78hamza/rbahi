from sklearn.linear_model import LinearRegression
import joblib 

def train_model(df):
    X = df[['quantity', 'unit_price']]
    y = df['total']

    model = LinearRegression()
    model.fit(X, y)
    joblib.dump(model, 'model.pkl')