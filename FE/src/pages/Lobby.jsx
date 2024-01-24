import profile from "../assets/img/bird_weard_pirate-hat.png"; // 프로필 사진 파일 경로
import RankingGameChoice from "../components/lobby/RankingGameChoice";

const Lobby = () => {
  useFetchAccessToken();

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

  const handleRankingMatchChoiceClick = () => {
    // 랭킹전 시작 기능을 수행하는 함수를 여기에 작성하세요.
  };

  const handleNormalMatchChoiceClick = () => {
    // 일반전 시작 기능을 수행하는 함수를 여기에 작성하세요.
  };

  return (
    <div className="h-screen flex flex-col items-center">
      {/* 알림, 설정 버튼 */}
      <div className="flex justify-end gap-4 p-4">
        <button onClick={handleNotificationClick} className="notificationButton">
          알림
        </button>
        <button onClick={handleSettingsClick} className="settingsButton">
          설정
        </button>
      </div>
      {/* 프로필 사진, 랭킹, 내정보 버튼 */}
      <div className="flex items-center gap-4">
        {/* 프로필 사진 */}
        <img src={profile} alt="Profile" className="object-contain h-full ml-4" />
        {/* 랭킹, 내정보 버튼 */}
        <div className="flex flex-col items-end mr-4">
          <button onClick={handleRankingClick} className="rankingButton mb-4">
            랭킹
          </button>
          <button onClick={handleMyInfoClick} className="myInfoButton">
            내정보
          </button>
        </div>
      </div>
      {/* 랭킹전, 일반전 버튼 */}
      <div className="flex-grow flex flex-col justify-center items-center">
        <button onClick={handleRankingMatchChoiceClick} className="rankingMatchButton mb-4">
          랭킹전
        </button>
        <button onClick={handleNormalMatchChoiceClick} className="normalMatchButton">
          일반전
        </button>
      </div>
    </div>
  );
};

export default Lobby;
