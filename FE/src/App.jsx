import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Lobby from "./pages/Lobby";
import WebMobileLayout from "@/layouts/WebMobileLayout";

function App() {
  return (
    <>
      <BrowserRouter>
        <WebMobileLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/lobby" element={<Lobby />} />
          </Routes>
        </WebMobileLayout>
      </BrowserRouter>
    </>
  );
}

export default App;
