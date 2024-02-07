import { useEffect, useState } from "react";
import UserVideoComponent from "./UserVideoComponent";
import OpponentVideoComponent from "./OpponentVideoComponent";

const GamePlay = ({
  publisher,
  subscriber,
  ready,
  setReady,
  opponentReady,
  sendReady,
  sendLose,
  myLose,
  opponentLose,
}) => {
  const [gameState, setGameState] = useState("waiting");
  const [time, setTime] = useState(3);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let countdownInterval;

    if (ready && opponentReady) {
      setTimeout(() => {
        setIsLoading(true);

        countdownInterval = setInterval(() => {
          setTime((prevTime) => {
            if (prevTime > 1) {
              return prevTime - 1;
            } else {
              clearInterval(countdownInterval);
              setIsLoading(false);
              setGameState("play");
              return 0;
            }
          });
        }, 1000);
      }, 1000);
    }

    return () => {
      if (countdownInterval) {
        clearInterval(countdownInterval);
      }
    };
  }, [ready, opponentReady]);

  const gameProps = {
    sendLose,
    myLose,
    opponentLose,
  };

  return (
    <>
      <div className="h-screen flex justify-center items-center text-center">
        {isLoading && (
          <div className="flex-col">
            <div className="text-3xl animate-bounce">잠시 후 게임이 시작됩니다!!</div>
            <div className="text-6xl text-red-500 animate-ping">{time}</div>
          </div>
        )}
        {!isLoading && gameState === "waiting" && (
          <div className="flex-col">
            <div>
              나<UserVideoComponent streamManager={publisher} gameState={gameState} />
            </div>
            <div className="text-center">
              <button
                onClick={() => {
                  setReady(true);
                  sendReady();
                }}
                className={`m-3 p-2 border-2 rounded-xl border-green-500 hover:bg-green-500 ${ready ? "bg-green-500" : ""} text-xl`}
              >
                준비
              </button>
            </div>
            <div className="text-center">
              <span
                className={`m-3 p-2 border-2 rounded-xl border-green-500 ${opponentReady ? "bg-green-500" : ""} text-xl`}
              >
                상대방 준비 완료
              </span>
            </div>
          </div>
        )}
        {!isLoading && gameState === "play" && (
          <div>
            <div className="invisible absolute">
              {/* <div className="hidden"> */}
              나
              <UserVideoComponent streamManager={publisher} gameState={gameState} {...gameProps} />
            </div>
            <div>
              상대방
              <OpponentVideoComponent streamManager={subscriber} />
              <div className="text-xl text-red-500">나 {myLose ? "패배" : "대기"}</div>
              <div className="text-xl text-red-500">상대{opponentLose ? "패배" : "대기"}</div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default GamePlay;
