import { BrowserRouter, Routes, Route } from "react-router-dom";
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
        <MainLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/lobby" element={<Lobby />} />
            <Route path="/room" element={<Room />} />
            <Route path="/game" element={<Game />} />
          </Routes>
        </MainLayout>
      </BrowserRouter>
    </>
  );
}

export default App;
