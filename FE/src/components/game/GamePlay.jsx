import { useEffect, useState } from "react";
import UserVideoComponent from "./UserVideoComponent";
import OpponentVideoComponent from "./OpponentVideoComponent";

const GamePlay = ({
  publisher,
  subscriber,
  ready,
  setReady,
  opponentReady,
  setOpponentReady,
  sendReady,
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
            <div className="text-end">
              <button
                onClick={() => {
                  setReady(true);
                  sendReady();
                }}
                className="m-3 border-2 rounded-xl border-green-500 hover:bg-green-500 text-xl"
              >
                준비 완료
              </button>
            </div>
            <div className="text-end">
              <span
                className={`m-3 border-2 rounded-xl border-green-500 ${opponentReady ? "bg-green-500" : ""} text-xl`}
              >
                상대방 준비 완료
              </span>
            </div>
          </div>
        )}
        {!isLoading && gameState === "play" && (
          <div>
            <div>
              상대방
              <OpponentVideoComponent streamManager={subscriber} />
            </div>
            <div>
              나<UserVideoComponent streamManager={publisher} gameState={gameState} />
            </div>
          </div>
        )}
        {/* <UserVideoComponent streamManager={publisher} />
      <UserVideoComponent streamManager={subscriber} /> */}
      </div>
    </>
  );
};

export default GamePlay;
