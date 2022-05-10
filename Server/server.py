from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

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
            # TODO: Add code here to call ML function with the movieName
            return jsonify({'status': 200, 'message': 'MOvie recoomandations for you are as follows: '})
        except Exception as ex:
            return jsonify({'status': 500, 'message': ex})
