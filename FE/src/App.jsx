import Home from "@/pages/Home";
import Lobby from "@/pages/Lobby";
import WebMobileLayout from "@/layouts/WebMobileLayout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AccessTokenProvider } from "@/context/AccessTokenContext";
import PrivateRoute from "@/privateRoute/privateRoute";
import RankingGameChoice from "@/pages/RankingGameChoice";
import NormalGameChoice from "@/pages/NormalGameChoice";
import RoomSearch from "@/components/lobby/RoomSearch";
import { WebSocketProvider } from "@/context/WebSocketContext";
function App() {
  return (
    <>
      <BrowserRouter>
        <AccessTokenProvider>
          <WebSocketProvider>
            <WebMobileLayout>
              <Routes>
                <Route element={<PrivateRoute requireAuth={false} />}>
                  <Route path="/" element={<Home />} />
                </Route>
                <Route element={<PrivateRoute requireAuth={true} />}>
                  <Route path="/lobby" element={<Lobby />} />
                </Route>

                <Route element={<PrivateRoute requireAuth={true} />}>
                  <Route path="/rankingGame" element={<RankingGameChoice />} />
                </Route>

                <Route element={<PrivateRoute requireAuth={true} />}>
                  <Route path="/normalGame" element={<NormalGameChoice />} />
                </Route>

                <Route element={<PrivateRoute requireAuth={true} />}>
                  <Route path="/normalGame/roomSearch" element={<RoomSearch />} />
                </Route>
              </Routes>
            </WebMobileLayout>
          </WebSocketProvider>
        </AccessTokenProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
