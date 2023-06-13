export default async function uploadImage(file: File) {
  const formData = new FormData();
  formData.append("image", file);

  const response = await fetch(`${import.meta.env.VITE_API_URL}/predictions`, {
    method: "POST",
    body: formData,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  });

  return response.json();
}
