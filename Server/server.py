from flask import Flask, jsonify, request
from flask_cors import CORS
import pickle 
import pandas as pd 

app = Flask(__name__)
CORS(app)
# Loading model to compare the results
movie_data = pickle.load(open('Models/movies_df.pkl','rb'))
sim = pickle.load(open('Models/similarity.pkl','rb'))
titles = movie_data['title']
title_ids = pd.Series(movie_data.index, index=movie_data['title'])

def get_content_recommendations(title):
    idx = title_ids[title]
    cosine_scores = list(enumerate(sim[idx]))

    #sorting scores in descending order
    cosine_scores = sorted(cosine_scores, key=lambda x: x[1], reverse=True)
    
    #top 10 recommendations
    cosine_scores = cosine_scores[1:10]
    movie_indices = [i[0] for i in cosine_scores]
    return titles.iloc[movie_indices]

@app.route('/', methods=['GET', 'POST'])
def home():
    if(request.method == 'GET'):
        try:
            return jsonify({'status': 200, 'message': 'Server Running, Run a post request with movie name'})
        except Exception as ex:
            return jsonify({'status': 500, 'message': ex})

    elif(request.method == 'POST'):
        try:
            request_body = request.json
            # Get json key-value sent from POST request here
            print(request_body['movieName'])
            recommends = get_content_recommendations(request_body['movieName']).to_json()
            # TODO: Add code here to call ML function with the movieName
            return jsonify({'status': 200, 'op':recommends})
        except Exception as ex:
            return jsonify({'status': 500, 'message': ex})