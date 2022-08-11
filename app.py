from flask import Flask, render_template, request , jsonify
from flask_cors import CORS
from chat import get_response
from flask_bootstrap import Bootstrap
from flask_ngrok import run_with_ngrok

app = Flask(__name__)
CORS(app)

@app.post("/predict")
def predict():
    print("in predict")
    text = request.get_json().get("message")
    # TODO: check if text is valid maybe
    response = get_response(text)
    message = {"answer": response}
    return jsonify(message)

if __name__ == "__main__":
    app.run(debug=True)

@app.route("/")
def home():
    return render_template('test_site.html')

app.run()