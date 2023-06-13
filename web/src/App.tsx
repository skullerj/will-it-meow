import { useCallback, useState } from "react";
import {
  UploadButton,
  ResultModal,
  DoesItMeowResponse,
  Result,
} from "./components";
import cat1 from "./assets/cat_1.jpg";
import "./index.css";

const testResult = {
  comment: "It meows!",
  isCat: true,
  photoUrl: cat1,
};

function App() {
  const [result, setResult] = useState<Result>(testResult);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleResponse = useCallback(
    (response: DoesItMeowResponse, photoUrl: string) => {
      setResult({ ...response, photoUrl });
      setIsModalVisible(true);
    },
    []
  );

  const onTestClick = useCallback(() => {
    setResult(testResult);
    setIsModalVisible(true);
  }, []);

  return (
    <main className="container flex flex-col items-center justify-center h-screen m-auto text-center gap-4">
      <h1 className="text-6xl">
        Will it <br /> Meow?
      </h1>
      <div
        className="h-60 w-60 rounded-full relative cursor-pointer overflow-hidden"
        onClick={onTestClick}
      >
        <img src={cat1} className="h-full w-full object-cover" />
        <div className="absolute bg-black h-full w-full top-0 left-0 bg-opacity-20 grid place-items-center md:opacity-0 md:hover:opacity-100 transition-all">
          <p className="text-white">Meow?</p>
        </div>
      </div>
      <UploadButton onResponse={handleResponse} />
      <ResultModal
        visible={isModalVisible}
        result={result}
        onClose={() => setIsModalVisible(false)}
      />
    </main>
  );
}

export default App;
