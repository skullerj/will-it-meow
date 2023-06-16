import JSConfetti from "js-confetti";
import { useEffect, useRef } from "react";

function Confeti({ show }: { show: boolean }) {
  const canvasRef = useRef(null);
  const confetti = useRef<JSConfetti | null>(null);

  useEffect(() => {
    if (canvasRef.current && !confetti.current) {
      confetti.current = new JSConfetti({ canvas: canvasRef.current });
    }
  }, []);

  useEffect(() => {
    if (show) {
      confetti.current?.addConfetti({
        emojis: ["😸", "✨", "💫", "🐱", "😽"],
        confettiNumber: 150,
        emojiSize: 20,
      });
    }
    return () => {
      confetti.current?.clearCanvas();
    };
  }, [show]);

  return (
    <canvas
      className="fixed h-screen w-screen top-0 left-0 pointer-events-none z-30"
      ref={canvasRef}
    />
  );
}

export default Confeti;
