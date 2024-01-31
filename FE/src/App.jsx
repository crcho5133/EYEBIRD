import Home from "@/pages/Home";
import Lobby from "@/pages/Lobby";
import WebMobileLayout from "@/layouts/WebMobileLayout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AccessTokenProvider } from "@/context/AccessTokenContext";
import PrivateRoute from "@/privateRoute/privateRoute";

function App() {
  return (
    <>
      <BrowserRouter>
        <AccessTokenProvider>
          <WebMobileLayout>
            <Routes>
              <Route element={<PrivateRoute requireAuth={false} />}>
                <Route path="/" element={<Home />} />
              </Route>
              <Route element={<PrivateRoute requireAuth={true} />}>
                <Route path="/lobby" element={<Lobby />} />
              </Route>
            </Routes>
          </WebMobileLayout>
        </AccessTokenProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
