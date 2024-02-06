import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const GameResult = ({
  myLose,
  opponentLose,
  myWin,
  leaveSession,
  sendRematch,
  acceptRematch,
  rematchRequest,
  rematchResponse,
  rematch,
  gameId,
  gameType,
  opponentInfo,
  setGameState,
  setReady,
  setOpponentReady,
  setMyLose,
  setOpponentLose,
  setMyWin,
  setRematchRequest,
  setRematchResponse,
  setRematch,
}) => {
  const [resultState, setResultState] = useState("phase1");
  const navigate = useNavigate();

  useEffect(() => {
    // rematchRequest나 rematchResponse가 변경될 때 phase2로 설정
    if (rematchRequest || rematchResponse) {
      setResultState("phase2");
    }
  }, [rematchRequest, rematchResponse]);

  useEffect(() => {
    let timer;
    // resultState가 phase1이나 phase2일 때만 3초 타이머 설정
    if (resultState === "phase1" || resultState === "phase2") {
      timer = setTimeout(() => {
        if (resultState !== "phase3") {
          setResultState("phase3");
        }
      }, 3000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [resultState]);

  useEffect(() => {
    if (rematch) {
      // rematch 상태가 true면 게임 페이지로 리다이렉트
      // navigate(`/game/${gameId}`, { state: { gameType: gameType, opponentInfo: opponentInfo } });
      // window.location.reload();
      setReady(false);
      setOpponentReady(false);
      setMyLose(false);
      setOpponentLose(false);
      setMyWin(null);
      setRematchRequest(false);
      setRematchResponse(false);
      setRematch(false);
      setResultState("phase1");
      setGameState("gamePlay");
    }
  }, [rematch]);

  return (
    <>
      <div className="h-screen flex justify-center items-center text-center">
        <div className="flex-col">
          <h1>결과 창</h1>
          <div>나</div>
          <div className={`text-2xl ${myWin ? "text-green-600" : "text-red-600"}`}>
            {myWin ? "승리" : "패배"}
          </div>
          <div>ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ</div>
          <div>상대</div>
          <div className={`text-2xl ${myWin ? "text-red-600" : "text-green-600"}`}>
            {myWin ? "패배" : "승리"}
          </div>
          {resultState === "phase1" && myWin && <div>상대방에게 재도전 의사를 묻고 있습니다</div>}
          {resultState === "phase1" && !myWin && (
            <div>
              재도전하시겠습니까?
              <button onClick={() => sendRematch()}>네</button>
            </div>
          )}
          {resultState === "phase2" && myWin && (
            <div>
              상대방이 재도전을 요청하였습니다. 수락하시겠습니까?
              <button onClick={() => acceptRematch()}>네</button>
            </div>
          )}
          {resultState === "phase2" && !myWin && (
            <div>상대방의 재도전 수락여부를 기다리고 있습니다</div>
          )}

          {resultState === "phase3" && (
            <Link
              to="/lobby"
              className="btn btn-large btn-danger bg-red-600"
              onClick={() => leaveSession()}
            >
              로비로 가기
            </Link>
          )}

          {/* <button
            onClick={async () => {
              await leaveSession();
              navigate(-1);
            }}
          >
            로비로 가기
          </button> */}
        </div>
      </div>
    </>
  );
};

export default GameResult;
