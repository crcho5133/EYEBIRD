import usersApiCall from "@/api/axios/usersApiCall";
import LobbyBtn from "@/components/lobby/LobbyBtn";
import { useAccessTokenState } from "@/context/AccessTokenContext";
import MyInfo from "@/components/lobby/MyInfo";
import useShowComponent from "@/hooks/useShowComponent";
import profile from "@/assets/img/bird_weard_pirate-hat.png";
import cup_gold from "@/assets/img/cup_gold.png";
import my_info from "@/assets/img/my_info.png";
import { useNavigate } from "react-router-dom";
import NavBarNoBack from "@/components/lobby/NavBarNoBack";
import RankingModal from "@/components/modal/RankingModal";
import useShowRodal from "@/hooks/useShowRodal";

const Lobby = () => {
  const accessToken = useAccessTokenState();
  const useUsersApiCall = usersApiCall();
  const isMyInfoVisible = useShowComponent();
  const isRankingVisible = useShowRodal();
  const isBtnVisible = useShowComponent();

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

  const onClose = () => {
    isMyInfoVisible.hideComponent();
    isBtnVisible.hideComponent();
  };

  const navigate = useNavigate();

  const handleRankingClick = () => {
    onClickRanking();
  };

  const handleMyInfoClick = () => {
    onClickMyInfo();
  };

  const handleRankingGameChoiceClick = () => {
    navigate("/rankingGame");
  };

  const handleNormalMatchChoiceClick = () => {
    navigate("/normalGame");
  };

  return (
    <>
      {!isBtnVisible.value && <LobbyBtn text="로그아웃" onClick={logout} />}
      {/* {!isBtnVisible.value && <LobbyIconBtn text="내 정보" onClick={onClick} />} */}
      {isMyInfoVisible.value && <MyInfo onClose={onClose} />}
      <RankingModal visible={isRankingVisible.value} onClose={isRankingVisible.hideRodal} />
      {!isBtnVisible.value && (
        <div>
          <NavBarNoBack />
          <div className="h-screen flex flex-col items-center">
            {/* 프로필 사진, 랭킹, 내정보 버튼 */}
            <div className="flex items-center ">
              {/* 프로필 사진 */}
              <div className="item">
                <img
                  src={profile}
                  alt="Profile"
                  className="object-contain h-full ml-4"
                  style={{
                    width: "70%",
                  }}
                />
              </div>
              {/* 랭킹, 내정보 버튼 */}
              <div className="flex flex-col items-end mr-4 gap-1">
                <button
                  onClick={handleRankingClick}
                  className="mb-4"
                  style={{
                    width: "130%",
                  }}
                >
                  <img src={cup_gold} alt="CupGold" />
                </button>
                <button
                  onClick={handleMyInfoClick}
                  style={{
                    width: "130%",
                  }}
                >
                  <img src={my_info} alt="MyInfo" />
                </button>
              </div>
            </div>
            {/* 랭킹전, 일반전 버튼 */}
            <div className="flex justify-center items-center mt-40">
              <button
                onClick={handleRankingGameChoiceClick}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
              >
                랭킹전
              </button>
            </div>
            <div className="flex mt-20">
              <button
                onClick={handleNormalMatchChoiceClick}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
              >
                일반전
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Lobby;
