import { useEffect } from "react";

const NormalGameResult = ({ winTeam, teamA, teamB, setGameState, setWinTeam, sendReady }) => {
  useEffect(() => {
    if (winTeam) {
      sendReady();
    }
  }, [winTeam]);
  return (
    <>
      <div>게임결과</div>
      {winTeam === "A" && <div>A팀 승리</div>}
      {winTeam === "B" && <div>B팀 승리</div>}
      {winTeam === "D" && <div>무승부</div>}
      <div
        onClick={() => {
          setGameState("waitingRoom");
          setWinTeam("");
        }}
      >
        대기방으로 이동
      </div>
    </>
  );
};

export default NormalGameResult;
