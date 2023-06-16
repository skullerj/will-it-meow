export default async function uploadImage(
  file: File
): Promise<{ label: string; confidence: number }> {
  const formData = new FormData();
  formData.append("image", file);

  const response = await fetch(`${import.meta.env.VITE_API_URL}/predictions`, {
    method: "POST",
    body: formData,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  });
  const result = await response.json();
  if (response.ok) {
    return { label: result.label, confidence: result.confidence };
  }

  throw new Error(result.error);
}
