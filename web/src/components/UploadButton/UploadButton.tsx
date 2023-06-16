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
        setError(null);
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
            console.error(e);
            setError("An error occured, please try again.");
            setStatus("rejected");
          });
      }
    },
    [onResponse]
  );

  return (
    <div className="flex flex-col">
      <label htmlFor="photo-input" className="button self-center">
        {texts[status]}
      </label>
      <p className="text-red-500 mt-2 font-sans font-bold" id="error-message">
        {error ? error : <br />}
      </p>
      <input
        aria-invalid={status === "rejected"}
        aria-errormessage="error-message"
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
