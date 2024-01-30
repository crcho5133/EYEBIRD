import EntranceComponent from "../components/lobby/EntranceComponent";
import GameEntranceComponent from "../components/lobby/GameEntranceComponent";

const Lobby = () => {
  return (
    <>
      <div>Lobby</div>
      <div>일반 모드 방 생성</div>
      <EntranceComponent />
      <div>랭크 모드 게임 입장</div>
      <GameEntranceComponent />
    </>
  );
};

export default Lobby;
