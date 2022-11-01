from flask import Flask, render_template, request , jsonify
from flask_cors import CORS
from chat import get_response

app = Flask(__name__)
CORS(app)
app.static_folder = 'static'

@app.post("/predict")
def predict():
    text = request.get_json().get("message")
    response = get_response(text)
    message = {"answer": response}
    return jsonify(message)

@app.route("/")
def home():
    return render_template('index.html')

@app.route("/favicon.ico")
def favicaon():
    return ""

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0')