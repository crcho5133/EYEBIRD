import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { OpenViduProvider } from "./context/OpenViduContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Lobby from "./pages/Lobby";
import Game from "./pages/Game";
import Room from "./pages/Room";

function App() {
  return (
    <>
      <BrowserRouter>
        <ToastContainer stacked pauseOnFocusLoss={false} />
        {/* <OpenViduProvider> */}
        <MainLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/lobby" element={<Lobby />} />
            <Route path="/room/:sessionId" element={<Room />} />
            <Route path="/game/:sessionId" element={<Game />} />
          </Routes>
        </MainLayout>
        {/* </OpenViduProvider> */}
      </BrowserRouter>
    </>
  );
}

export default App;
