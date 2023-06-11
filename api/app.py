from flask import Flask, abort, request
from PIL import Image

from src.predictions import predict

app = Flask(__name__)


@app.route("/predictions", methods=["POST"])
def predictions():
    """Endpoint for predictions. Receives a file and returns the predicted label and probability"""
    file = request.files["image"]
    if file.filename is None:
        abort(400, "No image provided")

    image = Image.open(file.stream)

    return predict(image).to_dict()
