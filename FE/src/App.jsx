import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="flex justify-start space-x-4 mt-4">
        <h1 className="text-3xl font-bold underline">Hello world!</h1>
        <button
          className="bg-gradient-to-br from-purple-600 to-blue-500 text-white px-4 py-2 rounded-xl"
          onClick={() => setCount((count) => count + 1)}
        >
          count is {count}
        </button>
        <button
          type="button"
          class="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          버튼
        </button>
      </div>
    </>
  );
}

export default App;
