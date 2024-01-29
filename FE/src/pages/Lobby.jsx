import profile from "../assets/img/bird_weard_pirate-hat.png"; // 프로필 사진 파일 경로
import cup_gold from "../assets/img/cup_gold.png";
import my_info from "../assets/img/my_info.png";
import { useNavigate } from "react-router-dom";
import NavBarNoBack from "../components/lobby/NavBarNoBack";

const Lobby = () => {
  // useFetchAccessToken();
  const navigate = useNavigate(); // 추가된 코드

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
    </>
  );
};

export default Lobby;
