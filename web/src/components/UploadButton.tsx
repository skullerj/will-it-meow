import { useCallback, useRef, useState } from "react";

import { doesItMeow, DoesItMeowResponse, uploadImage } from "./utils";

type Status = "idle" | "pending" | "resolved" | "rejected";
type UploadButtonProps = {
  onResponse: (response: DoesItMeowResponse, photoUrl: string) => void;
};

function UploadButton({ onResponse }: UploadButtonProps) {
  const inputFieldRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<Status>("idle");

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.currentTarget.files?.[0];
      if (file) {
        setStatus("pending");

        uploadImage(file)
          .then((response) => {
            setStatus("resolved");

            onResponse(
              doesItMeow(response.label, response.confidence),
              URL.createObjectURL(file)
            );
          })
          .catch(() => {
            setStatus("rejected");
          });
      }
    },
    [onResponse]
  );

  const clickInputField = useCallback(() => {
    inputFieldRef.current?.click();
  }, []);

  const isPending = status === "pending";

  return (
    <div>
      <input
        ref={inputFieldRef}
        onChange={handleChange}
        type="file"
        accept="image/png, image/gif, image/jpeg"
        name="image"
        className="hidden"
      />
      <button className="button" onClick={clickInputField} disabled={isPending}>
        {isPending ? "Loading..." : "Try yours !"}
      </button>
    </div>
  );
}

export default UploadButton;
