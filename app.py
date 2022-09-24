from flask import Flask, render_template, request , jsonify
from flask_cors import CORS
from chat import get_response
from flask_bootstrap import Bootstrap
from flask_ngrok import run_with_ngrok
import sys

app = Flask(__name__)
CORS(app)
use_model = False

@app.post("/predict")
def predict():
    print("in predict")
    text = request.get_json().get("message")
    if text == "USE_MODEL" and use_model:
        return jsonify("USE_MODEL")
    response = get_response(text)
    message = {"answer": response}
    return jsonify(message)

if __name__ == "__main__":
    if len(sys.argv) > 1 and sys.argv[1] == 'true':
        use_model = True
    app.run(host = '0.0.0.0', port = 5000)

@app.route("/")
def home():
    return render_template('index.html')

app.run()
