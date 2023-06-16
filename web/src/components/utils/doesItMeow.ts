const acceptedLabels = ["cat", "tiger", "lion"];

export type DoesItMeowResponse = {
  isCat: boolean;
  comment: string;
};

export default function doesItMeow(
  label: string,
  confidence: number
): DoesItMeowResponse {
  const hasAcceptedLabel = acceptedLabels.reduce((acc, curr) => {
    return acc || label.includes(curr);
  }, false);
  const hasHighConfidence = confidence > 0.4;

  if (hasAcceptedLabel && hasHighConfidence) {
    return { isCat: true, comment: "It meows!" };
  } else if (hasAcceptedLabel) {
    return { isCat: true, comment: "It kinda meows ..." };
  } else {
    return { isCat: false, comment: "Nope :(" };
  }
}
