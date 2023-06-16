import { useEffect, useRef } from "react";
import { DoesItMeowResponse } from "../utils";
import Confeti from "./Confeti";
import "./styles.css";

export type Result = DoesItMeowResponse & { photoUrl: string };

type ResultProps = {
  result: Result;
  visible: boolean;
  onClose: () => void;
};

function ResultModal({ result, visible, onClose }: ResultProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Listen for the escape key and close the modal
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  useEffect(() => {
    // Focus the modal button when it opens
    if (visible) {
      buttonRef.current?.focus();
    }
  }, [visible]);

  return (
    <>
      <div
        data-te-modal-init
        className="fixed left-0 top-0 h-screen w-screen overflow-hidden outline-none z-10 items-center justify-center bg-black bg-opacity-50 flex animate-modal"
        id="resultModal"
        aria-labelledby="modalTitle"
        aria-modal="true"
        aria-hidden={!visible}
        role="dialog"
        onClick={onClose}
        tabIndex={-1}
      >
        <div className="relative flex w-fit items-center bg-white shadow-lg rounded-md">
          <div className="flex flex-col p-6 items-center gap-4">
            <h4 className="text-4xl leading-normal" id="modalTitle">
              {result.comment}
            </h4>
            <img
              src={result.photoUrl}
              className="h-60 w-60 rounded-full border-2 border-grey-200 object-cover bg-black"
            />
            <button
              type="button"
              className="button"
              ref={buttonRef}
              tabIndex={visible ? 0 : -1}
            >
              {"Try another one"}
            </button>
          </div>
        </div>
      </div>
      <Confeti show={visible && result.isCat} />
    </>
  );
}

export default ResultModal;
