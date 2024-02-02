import Home from "@/pages/Home";
import Lobby from "@/pages/Lobby";
import Game from "@/pages/Game";
import Room from "@/pages/Room";
import WebMobileLayout from "@/layouts/WebMobileLayout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AccessTokenProvider } from "@/context/AccessTokenContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from "@/privateRoute/privateRoute";

import { WebSocketProvider } from "@/context/WebSocketContext";
function App() {
  return (
    <>
      <BrowserRouter>
        <ToastContainer stacked pauseOnFocusLoss={false} />
        <AccessTokenProvider>
          <WebSocketProvider>
            <WebMobileLayout>
              <Routes>
                <Route element={<PrivateRoute requireAuth={false} />}>
                  <Route path="/" element={<Home />} />
                </Route>

                <Route path="/lobby/*" element={<Lobby />} />

                <Route path="/room/:sessionId" element={<Room />} />
                <Route path="/game/:sessionId" element={<Game />} />

                {/* <Route element={<PrivateRoute requireAuth={true} />}>
                <Route path="/rankingGame" element={<RankingGameChoice />} />
              </Route>

              <Route element={<PrivateRoute requireAuth={true} />}>
                <Route path="/normalGame" element={<NormalGameChoice />} />
              </Route>

              <Route element={<PrivateRoute requireAuth={true} />}>
                <Route path="/normalGame/roomSearch" element={<RoomSearch />} />
              </Route> */}
              </Routes>
            </WebMobileLayout>
          </WebSocketProvider>
        </AccessTokenProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
