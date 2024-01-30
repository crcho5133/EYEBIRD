import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Lobby from "./pages/Lobby";
import NavBar from "./components/lobby/NavBar";
import NavBarNoBack from "./components/lobby/NavBarNoBack";
import RankingGameChoice from "./components/lobby/RankingGameChoice";
import NormalGameChoice from "./components/lobby/NormalGameChoice";
import RoomSearch from "./components/lobby/RoomSearch";
import Ranking from "./components/lobby/Ranking";
import MyInfo from "./components/lobby/MyInfo";

const App = () => {
  // const location = useLocation();

  return (
    <Router>
      {/* {location === "/lobby" ? <NavBarNoBack /> : <NavBar />} */}
      <Routes>
        <Route path="/lobby" element={<Lobby />} />
        <Route path="/rankingGame" element={<RankingGameChoice />} />
        <Route path="/normalGame" element={<NormalGameChoice />} />
        <Route path="/normalGame/roomSearch" element={<RoomSearch />} />
        <Route path="/ranking" element={<Ranking />} />
        <Route path="/myInfo" element={<MyInfo />} />
      </Routes>
    </Router>
  );
};

export default App;
