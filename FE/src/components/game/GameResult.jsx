import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
  const [progress, setProgress] = useState(100); // 진행 바 상태

  useEffect(() => {
    // rematchRequest나 rematchResponse가 변경될 때 phase2로 설정
    if (rematchRequest || rematchResponse) {
      setResultState("phase2");
    }
  }, [rematchRequest, rematchResponse]);

  // useEffect(() => {
  //   let timer;
  //   // resultState가 phase1이나 phase2일 때만 3초 타이머 설정
  //   if (resultState === "phase1" || resultState === "phase2") {
  //     timer = setTimeout(() => {
  //       if (resultState !== "phase3") {
  //         setResultState("phase3");
  //       }
  //     }, 3000);
  //   }

  //   return () => {
  //     clearTimeout(timer);
  //   };
  // }, [resultState]);

  useEffect(() => {
    if (resultState === "phase1" || resultState === "phase2") {
      setProgress(100); // phase1 또는 phase2로 진입할 때 진행 바를 다시 채웁니다.
      const interval = setInterval(() => {
        setProgress((prevProgress) => (prevProgress > 0 ? prevProgress - 100 / (4000 / 10) : 0));
      }, 10); // 매 10밀리초마다 진행 바 감소

      // 3초 후에 자동으로 phase3로 설정
      const timeout = setTimeout(() => {
        setResultState("phase3");
        clearInterval(interval); // 타이머 정지
        setProgress(0); // 진행 바를 0으로 설정
      }, 4000);

      return () => {
        clearTimeout(timeout);
        clearInterval(interval);
      };
    }
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
      <div className="h-screen flex justify-center items-center text-center text-lg">
        <div className="flex-col">
          <div>결과 창</div>
          <div>나</div>
          <div className={`text-2xl ${myWin ? "text-green-600" : "text-red-600"}`}>
            {myWin ? "승리" : "패배"}
          </div>
          <div>ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ</div>
          <div>상대</div>
          <div className={`text-2xl ${myWin ? "text-red-600" : "text-green-600"}`}>
            {myWin ? "패배" : "승리"}
          </div>
          {resultState !== "phase3" && (
            <div className="flex justify-center m-4">
              <div className="w-44 bg-gray-200 h-4">
                <div
                  className="bg-blue-500 h-full"
                  style={{
                    width: `${progress}%`,
                  }}
                ></div>
              </div>
            </div>
          )}
          {resultState === "phase1" && myWin && <div>상대방에게 재도전 의사를 묻고 있습니다</div>}
          {resultState === "phase1" && !myWin && (
            <div>
              재도전하시겠습니까?
              <div>
                <button
                  className="mt-2 bg-green-400 hover:bg-green-600 text-white py-2 px-4 rounded"
                  onClick={() => sendRematch()}
                >
                  네
                </button>
              </div>
            </div>
          )}
          {resultState === "phase2" && myWin && (
            <div>
              상대방이 재도전을 요청하였습니다<div>수락하시겠습니까?</div>
              <div>
                <button
                  className="mt-2 bg-green-400 hover:bg-green-600 text-white py-2 px-4 rounded"
                  onClick={() => acceptRematch()}
                >
                  네
                </button>
              </div>
            </div>
          )}
          {resultState === "phase2" && !myWin && (
            <div>상대방의 재도전 수락여부를 기다리고 있습니다</div>
          )}

          {resultState === "phase3" && (
            <div className="m-4">
              <Link
                to="/lobby"
                className="bg-red-400 hover:bg-red-600 text-white py-2 px-4 rounded"
                onClick={() => leaveSession()}
              >
                로비로 가기
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default GameResult;
