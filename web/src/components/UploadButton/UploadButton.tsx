import { useCallback, useRef, useState } from "react";

import { uploadImage } from "../utils";

type Status = "idle" | "pending" | "resolved" | "rejected";
type UploadButtonProps = {
  onResponse: (label: string, confidence: number, photoUrl: string) => void;
};

const texts = {
  idle: "Try yours !",
  pending: "Loading...",
  resolved: "Try yours !",
  rejected: "Try again",
};

function UploadButton({ onResponse }: UploadButtonProps) {
  const inputFieldRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.currentTarget.files?.[0];
      if (file) {
        setStatus("pending");

        uploadImage(file)
          .then((response) => {
            onResponse(
              response.label,
              response.confidence,
              URL.createObjectURL(file)
            );
            setStatus("resolved");
          })
          .catch((e) => {
            setError(e.message);
            setStatus("rejected");
          });
      }
    },
    [onResponse]
  );

  return (
    <div>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <label htmlFor="photo-input" className="button">
        {texts[status]}
      </label>
      <input
        id="photo-input"
        ref={inputFieldRef}
        onChange={handleChange}
        type="file"
        accept="image/png, image/gif, image/jpeg"
        name="image"
        className="opacity-0 absolute"
      />
    </div>
  );
}

export default UploadButton;
