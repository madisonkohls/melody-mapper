from flask import Flask, request, jsonify
from flask_cors import CORS
from sklearn.linear_model import LogisticRegression
import numpy as np
import pickle
app = Flask(__name__)
CORS(app)
model = pickle.load(open('logistic_model.sav', 'rb'))

@app.route('/')
def hello():
    return "This is the Machine Learning Model"

@app.route('/predict',methods=['POST'])
def predict():
    inputs = np.array([request.get_json()['inputdata']])
    prediction = model.predict(inputs)[0]
    return jsonify(prediction)

if __name__ == "__main__":
    app.run()