import Home from "@/pages/Home";
import Lobby from "@/pages/Lobby";
import WebMobileLayout from "@/layouts/WebMobileLayout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AccessTokenProvider } from "@/context/AccessTokenContext";

function App() {
  return (
    <>
      <BrowserRouter>
        <AccessTokenProvider>
          <WebMobileLayout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/lobby" element={<Lobby />} />
            </Routes>
          </WebMobileLayout>
        </AccessTokenProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
