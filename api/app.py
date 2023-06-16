from flask import Flask, abort, request
from flask_cors import CORS
from PIL import Image

from src.predictions import predict

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": ["*"]}})


@app.route("/predictions", methods=["POST"])
def predictions():
    """Endpoint for predictions. Receives a file and returns the predicted label and probability"""
    file = request.files["image"]

    if file.filename == "":
        abort(400, "No image provided")

    image = Image.open(file.stream)

    return predict(image).to_dict()


@app.errorhandler(400)
def bad_request(error):
    """Error handler for 400 errors"""
    return {"error": error.description}, 400
