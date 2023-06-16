from dataclasses import dataclass
from typing import Dict
from PIL.Image import Image
from transformers import (
    AutoImageProcessor,
    ResNetForImageClassification,
    ConvNextImageProcessor,
)
import torch

model: ResNetForImageClassification = ResNetForImageClassification.from_pretrained(
    "microsoft/resnet-50"
)  # type: ignore
processor: ConvNextImageProcessor = AutoImageProcessor.from_pretrained(
    "microsoft/resnet-50"
)

label_dict: Dict[int, str] = model.config.id2label  # type: ignore


@dataclass(init=True)
class PredictionResponse:
    """Response from the prediction endpoint"""

    label: str
    confidence: float

    def to_dict(self) -> dict:
        """Converts the response to a dictionary"""
        return {"label": self.label, "confidence": self.confidence}


def predict(image: Image) -> PredictionResponse:
    """Predicts the class of an image"""
    inputs = processor(image, return_tensors="pt")

    with torch.no_grad():
        logits = model(**inputs).logits

    # model predicts one of the 1000 ImageNet classes
    values, indices = logits.max(-1)
    label = label_dict[indices.item()]

    return PredictionResponse(label, values.item())
