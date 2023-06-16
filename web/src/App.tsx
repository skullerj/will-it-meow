import { useCallback, useReducer } from "react";
import { UploadButton, ResultModal, Result } from "./components";
import cat1 from "./assets/cat_1.jpg";
import "./index.css";
import { doesItMeow } from "./components/utils";

const testResult = {
  comment: "It meows!",
  isCat: true,
  photoUrl: cat1,
};

type State = {
  result: Result;
  isModalVisible: boolean;
};
type AppAction =
  | { type: "close-modal" }
  | { type: "show-result"; result: Result }
  | { type: "show-test-result" };

const reducer = (state: State, action: AppAction) => {
  switch (action.type) {
    case "close-modal":
      return { ...state, isModalVisible: false };
    case "show-result":
      return { ...state, isModalVisible: true, result: action.result };
    case "show-test-result":
      return { ...state, result: testResult, isModalVisible: true };
    default:
      return state;
  }
};

const initialState: State = {
  result: testResult,
  isModalVisible: false,
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { result, isModalVisible } = state;

  const handleResponse = useCallback(
    (label: string, confidence: number, photoUrl: string) => {
      dispatch({
        type: "show-result",
        result: { ...doesItMeow(label, confidence), photoUrl },
      });
    },
    []
  );

  const onTestClick = useCallback(() => {
    dispatch({ type: "show-test-result" });
  }, []);

  const closeModal = useCallback(() => {
    dispatch({ type: "close-modal" });
  }, []);

  return (
    <main className="container flex flex-col items-center justify-center h-screen m-auto text-center gap-4">
      <h1 className="text-6xl">
        Will it <br /> Meow?
      </h1>
      <button
        className="h-60 w-60 rounded-full relative cursor-pointer overflow-hidden group"
        onClick={onTestClick}
      >
        <img src={cat1} className="h-full w-full object-cover" alt="A cat" />
        <div className="absolute bg-black h-full w-full top-0 left-0 bg-opacity-20 grid place-items-center md:opacity-0 md:hover:opacity-100 transition-all group-focus:opacity-100">
          <p className="text-white">Meow?</p>
        </div>
      </button>
      <UploadButton onResponse={handleResponse} />
      <ResultModal
        visible={isModalVisible}
        result={result}
        onClose={closeModal}
      />
    </main>
  );
}

export default App;
