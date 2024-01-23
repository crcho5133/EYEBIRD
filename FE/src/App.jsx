import { useState } from "react";
import Lobby from "./pages/Lobby";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="flex justify-start space-x-4 mt-4">
        <Lobby></Lobby>
      </div>
    </>
  );
}

export default App;
