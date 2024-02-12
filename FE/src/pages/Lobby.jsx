import usersApiCall from "@/api/axios/usersApiCall";
import LobbyBtn from "@/components/lobby/LobbyBtn";
import { useAccessTokenState } from "@/context/AccessTokenContext";
import MyInfo from "@/components/lobby/MyInfo";
import useShowComponent from "@/hooks/useShowComponent";
import profile from "../assets/img/bird_weard_pirate-hat.png"; // 프로필 사진 파일 경로
import cup_gold from "../assets/img/cup_gold.png";
import my_info from "../assets/img/my_info.png";
import { useNavigate, useLocation, Routes, Route, Outlet } from "react-router-dom";
import NavBarNoBack from "../components/lobby/NavBarNoBack";
import NavBar from "../components/lobby/NavBar";
import RankingModal from "../components/modal/RankingModal";
import useShowRodal from "@/hooks/useShowRodal";
import RankingGameChoice from "@/pages/RankingGameChoice";
import NormalGameChoice from "@/pages/NormalGameChoice";
import RoomSearch from "@/components/lobby/RoomSearch";
import btn_main from "@/assets/img/btn_main.png";
import frame from "../assets/img/frame.png";

const Lobby = () => {
  const useUsersApiCall = usersApiCall();
  const isMyInfoVisible = useShowComponent();
  const isRankingVisible = useShowRodal();
  const isBtnVisible = useShowComponent();
  const location = useLocation();
  const isMainLobby = location.pathname === "/lobby";
  const myInfo = useAccessTokenState();

  const logout = (event) => {
    event.preventDefault();
    useUsersApiCall.logout();
  };

  const onClickMyInfo = () => {
    isMyInfoVisible.showComponent();
    isBtnVisible.showComponent();
  };

  const onClickRanking = () => {
    isRankingVisible.showRodal();
    isBtnVisible.showComponent();
  };

  const onCloseMyInfo = () => {
    isMyInfoVisible.hideComponent();
    isBtnVisible.hideComponent();
  };

  const onCloseRanking = () => {
    isRankingVisible.hideRodal();
    isBtnVisible.hideComponent();
  };

  const navigate = useNavigate();

  const handleRankingGameChoiceClick = () => {
    navigate("rankingGame");
  };

  const handleNormalMatchChoiceClick = () => {
    navigate("normalGame");
  };

  const isRankingModalVisible = useShowRodal();
  return (
    <>
      {!isMainLobby && <NavBar />}
      <Routes>
        <Route path="rankingGame" element={<RankingGameChoice />} />

        <Route path="normalGame" element={<NormalGameChoice />} />

        <Route path="normalGame/roomSearch" element={<RoomSearch />} />
      </Routes>
      <Outlet />
      {isMainLobby && (
        <div>
          {!isBtnVisible.value && <LobbyBtn text="로그아웃" onClick={logout} />}
          {isMyInfoVisible.value && <MyInfo onClose={onCloseMyInfo} />}
          <RankingModal visible={isRankingVisible.value} onClose={onCloseRanking} />
          {!isBtnVisible.value && (
            <div>
              <NavBarNoBack />
              <div></div>
              <div className="h-screen flex flex-col items-center space-y-12">
                <div></div>
                {/* 프로필 사진, 랭킹, 내정보 버튼 */}
                <div className="flex items-center gap-12">
                  {/* 프로필 사진 */}
                  <div className="item">
                    {/* <img src={frame}/> */}
                    <img
                      src={myInfo.profile}
                      alt="Profile"
                      className="object-contain h-auto ml-4 "
                      style={{
                        width: "250px",
                      }}
                    />
                  </div>
                  {/* 랭킹, 내정보 버튼 */}
                  <div className="flex flex-col items-end mr-4 gap-1 space-y-3">
                    <button
                      onClick={onClickRanking}
                      className="mb-4"
                      style={{
                        width: "130%",
                      }}
                    >
                      <img src={cup_gold} alt="CupGold" />
                    </button>
                    <button
                      onClick={onClickMyInfo}
                      style={{
                        width: "130%",
                      }}
                    >
                      <img src={my_info} alt="MyInfo" />
                    </button>
                  </div>
                </div>
                {/* 랭킹전, 일반전 버튼 */}
                <div className="flex justify-center items-center">
                  <button onClick={handleRankingGameChoiceClick} style={{ position: "relative" }}>
                    <img src={btn_main} />
                    <div
                      className="font-bold"
                      style={{
                        fontSize: "180%",
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        color: "white",
                        textShadow: "5px 5px 4px rgba(0,0,0,0.5)", // 텍스트 주위에 테두리 효과 추가
                      }}
                    >
                      랭킹전
                    </div>
                  </button>
                </div>
                <div className="flex mt-20">
                  <button onClick={handleNormalMatchChoiceClick} style={{ position: "relative" }}>
                    <img src={btn_main} />
                    <div
                      className="font-bold"
                      style={{
                        fontSize: "180%",
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        color: "white",
                        textShadow: "5px 5px 4px rgba(0,0,0,0.5)", // 텍스트 주위에 테두리 효과 추가
                      }}
                    >
                      일반전
                    </div>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Lobby;
