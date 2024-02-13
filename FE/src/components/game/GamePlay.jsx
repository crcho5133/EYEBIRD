import { useEffect, useState } from "react";
import UserVideoComponent from "./UserVideoComponent";
import OpponentVideoComponent from "./OpponentVideoComponent";
import background_magma2 from "../../assets/img/background_magma2.gif";
import game_waiting from "../../assets/img/game_waiting.png";
import ready_button from "../../assets/img/ready_button.png";

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
  streamManager,
}) => {
  const [gameState, setGameState] = useState("waiting");
  const [time, setTime] = useState(3);
  const [isLoading, setIsLoading] = useState(false);
  const [gameStartTime, setGameStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);

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

  useEffect(() => {
    let interval;

    if (gameState === "play" && gameStartTime === null) {
      setGameStartTime(Date.now());
    }

    if (gameState === "play") {
      interval = setInterval(() => {
        setElapsedTime(Date.now() - gameStartTime);
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [gameState, gameStartTime]);

  const gameProps = {
    sendLose,
    myLose,
    opponentLose,
  };

  // 밀리초 단위의 elapsedTime를 분과 초로 변환
  const minutes = Math.floor(elapsedTime / 60000);
  const seconds = ((elapsedTime % 60000) / 1000).toFixed(0);

  return (
    <>
      <div
        className="h-screen flex justify-center items-center text-center"
        style={{
          backgroundImage: `url(${background_magma2})`,
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
        }}
      >
        {isLoading && (
          <div className="flex-col">
            <div
              className="text-3xl animate-bounce p-2"
              style={{
                backgroundImage: `url(${game_waiting})`,
                backgroundSize: "110% 100%",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                fontSize: "20px",
              }}
            >
              잠시 후 게임이 시작됩니다!!
            </div>
            <div className="text-6xl text-red-500 animate-ping">{time}</div>
          </div>
        )}
        {!isLoading && gameState === "waiting" && (
          <div className="flex-col ">
            <div
              style={{
                backgroundImage: `url(${game_waiting})`,
                backgroundSize: "80% 100%",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                fontSize: "20px",
              }}
            >
              아래의 준비완료 버튼을 눌러주세요
            </div>
            <div className=" ">
              <UserVideoComponent streamManager={publisher} gameState={gameState} />
            </div>
            <div className="text-center ">
              <button
                onClick={() => {
                  setReady(true);
                  sendReady();
                }}
                className={`m-3 p-3 border-4 rounded-xl text-xl ${ready ? "border-red-600" : "border-transparent"}`}
                style={{
                  backgroundImage: `url(${ready_button})`,
                  backgroundSize: "100% 100%",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  fontSize: "20px",
                }}
              >
                준비
              </button>
            </div>
            <div className="text-center">
              <span
                className={`m-3 p-3 border-4 rounded-xl text-xl ${opponentReady ? "border-red-600" : "border-transparent"} `}
                style={{
                  backgroundImage: `url(${ready_button})`,
                  backgroundSize: "100% 100%",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  fontSize: "20px",
                }}
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
              <div className="text-xl text-red-500">
                게임 진행 시간: {minutes}분 {seconds}초
              </div>
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
