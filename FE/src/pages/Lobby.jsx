import profile from "../assets/img/bird_weard_pirate-hat.png"; // 프로필 사진 파일 경로
<<<<<<< HEAD
import cup_gold from "../assets/img/cup_gold.png";
import my_info from "../assets/img/my_info.png";
import { useNavigate } from "react-router-dom";
import NavBarNoBack from "../components/lobby/NavBarNoBack";
=======
import RankingGameChoice from "../components/lobby/RankingGameChoice";
import cup_gold from "../assets/img/cup_gold.png";
import my_info from "../assets/img/my_info.png";
import { useNavigate } from "react-router-dom";
>>>>>>> 86d57d5433ab7173f19152700d9126c0f055b2d9

const Lobby = () => {
  // useFetchAccessToken();
  const navigate = useNavigate(); // 추가된 코드

<<<<<<< HEAD
  const handleRankingClick = () => {
    navigate("/ranking");
  };

  const handleMyInfoClick = () => {
    navigate("/myInfo");
  };

  const handleRankingGameChoiceClick = () => {
    navigate("/rankingGame"); // 랭킹전 화면으로 이동
  };

  const handleNormalMatchChoiceClick = () => {
    navigate("/normalGame"); // 랭킹전 화면으로 이동
  };

  return (
    <>
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
          <div className="flex">
            <button
              onClick={handleRankingGameChoiceClick}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mb-4"
            >
              랭킹전
            </button>
          </div>
          <div className="flex">
            <button
              onClick={handleNormalMatchChoiceClick}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            >
              일반전
            </button>
          </div>
        </div>
      </div>
    </>
=======
  const handleNotificationClick = () => {
    // 알림 기능을 수행하는 함수를 여기에 작성하세요.
  };

  const handleSettingsClick = () => {
    // 설정 기능을 수행하는 함수를 여기에 작성하세요.
  };

  const handleRankingClick = () => {
    // 랭킹 보기 기능을 -수행하는 함수를 여기에 작성하세요.
  };

  const handleMyInfoClick = () => {
    // 내정보 보기 기능을 수행하는 함수를 여기에 작성하세요.
  };

  const handleRankingGameChoiceClick = () => {
    navigate("/ranking"); // 랭킹전 화면으로 이동
  };

  const handleNormalMatchChoiceClick = () => {
    // 일반전 시작 기능을 수행하는 함수를 여기에 작성하세요.
  };

  return (
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
            className="rankingButton mb-4"
            style={{
              width: "130%",
            }}
          >
            <img src={cup_gold} alt="CupGold" />
          </button>
          <button
            onClick={handleMyInfoClick}
            className="myInfoButton "
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
        <div className="flex">
          <button onClick={handleRankingGameChoiceClick} className="rankingMatchButton mb-4">
            랭킹전
          </button>
        </div>
        <div className="flex">
          <button onClick={handleNormalMatchChoiceClick} className="normalMatchButton">
            일반전
          </button>
        </div>
      </div>
    </div>
>>>>>>> 86d57d5433ab7173f19152700d9126c0f055b2d9
  );
};

export default Lobby;
