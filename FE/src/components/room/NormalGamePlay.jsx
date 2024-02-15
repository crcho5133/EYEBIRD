import { useEffect, useState, useRef } from "react";
import GameVideoComponent from "./GameVideoComponent";
import GameUserVideoComponent from "./GameUserVideoComponent";
import background_magma2 from "../../assets/img/background_magma2.gif";
import game_waiting from "../../assets/img/game_waiting.png";

const NormalGamePlay = ({
  session,
  gameType,
  publisher,
  subscribers,
  teamA,
  teamB,
  setGameState,
  sendLose,
  setWinTeam,
  itemVisible,
  useItem,
}) => {
  const [gamePhase, setGamePhase] = useState(0);
  const [scoreA, setScoreA] = useState(0);
  const [scoreB, setScoreB] = useState(0);
  const [time, setTime] = useState(3);
  const [isLoading, setIsLoading] = useState(false);
  const [inGameState, setInGameState] = useState("waiting");
  const [check, setCheck] = useState(false);
  const [effect, setEffect] = useState("");
  const [itemCount, setItemCount] = useState(3);
  const [canUse, setCanUse] = useState(true);
  const [highlight, setHighlight] = useState(false);
  const [availableAnimations, setAvailableAnimations] = useState([]);
  const [animationClass, setAnimationClass] = useState("");

  const initialAnimations = [
    "animate-spin animate-infinite animate-duration-[600ms]",
    "animate-ping animate-infinite animate-duration-[600ms]",
    "animate-fade animate-infinite animate-duration-[600ms]",
    "animate-wiggle-more animate-infinite animate-duration-[50ms]",
    "animate-jump-out animate-infinite animate-duration-[600ms]",
    "animate-bounce animate-infinite animate-duration-100",
  ];

  useEffect(() => {
    // 사용 가능한 애니메이션 목록이 비었을 경우, 초기 목록으로 재설정
    if (availableAnimations.length === 0) {
      setAvailableAnimations([...initialAnimations]);
    }

    if (itemVisible && availableAnimations.length > 0) {
      // 사용 가능한 애니메이션 중에서 랜덤으로 하나 선택
      const randomIndex = Math.floor(Math.random() * availableAnimations.length);
      const selectedAnimation = availableAnimations[randomIndex];
      setAnimationClass(selectedAnimation);

      // 선택된 애니메이션을 사용 가능한 목록에서 제거
      const updatedAvailableAnimations = availableAnimations.filter(
        (_, index) => index !== randomIndex
      );
      setAvailableAnimations(updatedAvailableAnimations);
    } else {
      // 아이템이 보이지 않을 경우 애니메이션 클래스 초기화
      setAnimationClass("");
    }
  }, [itemVisible]);

  const maxPhase = teamA.filter((id) => id !== null).length;

  const checkRef = useRef(check);
  const effectRef = useRef(effect);

  useEffect(() => {
    checkRef.current = check;
    effectRef.current = effect;
  }, [check, effect]);

  useEffect(() => {
    if (scoreA > 0 || scoreB > 0) {
      setHighlight(true);
      setTimeout(() => {
        setHighlight(false);
      }, 700);
    }
  }, [scoreA, scoreB]);

  useEffect(() => {
    if (gamePhase === maxPhase) {
      if (scoreA > scoreB) setWinTeam("A");
      else if (scoreA < scoreB) setWinTeam("B");
      else if (scoreA === scoreB) setWinTeam("D");
      setGameState("gameResult");
    }
  });

  useEffect(() => {
    let countdownInterval;
    if (gamePhase !== maxPhase) {
      setTimeout(() => {
        setIsLoading(true);

        countdownInterval = setInterval(() => {
          setTime((prevTime) => {
            if (prevTime > 1) {
              return prevTime - 1;
            } else {
              clearInterval(countdownInterval);
              setIsLoading(false);
              setInGameState("playing");
              setTime(3);
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
  }, [gamePhase]);

  session.on("signal:lose", (event) => {
    if (!checkRef.current) {
      setCheck(true);
      const loseteam = event.data;
      console.log(loseteam);
      if (inGameState === "playing" && !effectRef.current) {
        if (loseteam === "A") {
          setEffect("B");
          setScoreB(scoreB + 1);
          setTimeout(() => {
            setEffect("");
            setInGameState("waiting");
            setGamePhase(gamePhase + 1);
            setCheck(false);
          }, 3000);
        } else if (loseteam === "B") {
          setEffect("A");
          setScoreA(scoreA + 1);
          setTimeout(() => {
            setEffect("");
            setInGameState("waiting");
            setGamePhase(gamePhase + 1);
            setCheck(false);
          }, 3000);
        }
      }
    }
  });

  // const [inGameState, SetInGameState] = useState
  return (
    <>
      <div
        className="h-screen flex-col justify-center items-center text-center"
        style={{
          backgroundImage: `url(${background_magma2})`,
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="text-white text-2xl pt-4">스코어</div>
        <div className={`text-white text-3xl ${highlight ? "animate-rotate-x" : ""}`}>
          A팀 : {scoreA} vs {scoreB} : B팀
        </div>
        {isLoading && (
          <div className="flex justify-center">
            <div className="flex-col absolute">
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
          </div>
        )}
        {(teamA[gamePhase] === publisher.stream.streamId ||
          teamB[gamePhase] === publisher.stream.streamId) && (
          <div className="h-4/5 flex flex-col justify-center">
            {/* <div>
            <UserVideoComponent
              streamManager={
                teamA[gamePhase] === publisher?.stream.streamId
                  ? publisher
                  : subscribers.find((sub) => sub.stream.streamId === streamId)
              }
              color="border-sky-500"
            />
          </div> */}
            {inGameState === "waiting" && (
              <div>
                {gameType === "classic" ? "" : <div>아이템 사용 가능 횟수 : {itemCount}</div>}
                <div>
                  <GameUserVideoComponent streamManager={publisher} gameState={inGameState} />
                </div>
              </div>
            )}
            {inGameState === "playing" && (
              <div>
                {gameType === "classic" ? "" : <div>아이템 사용 가능 횟수 : {itemCount}</div>}
                <div className="invisible absolute">
                  <GameUserVideoComponent
                    streamManager={publisher}
                    gameState={inGameState}
                    sendLose={sendLose}
                  />
                </div>
                {teamB[gamePhase] === publisher.stream.streamId && (
                  <div
                    onClick={() => {
                      if (itemCount > 0 && canUse) {
                        setItemCount(itemCount - 1);
                        setCanUse(false);
                        useItem();
                        setTimeout(() => {
                          setCanUse(true);
                        }, 5000);
                      }
                    }}
                  >
                    {effect === "A" && <div className="text-xl">패배</div>}
                    {effect === "B" && <div className="text-xl">승리</div>}
                    <div className="animate-fade animate-once">
                      <div className={`${animationClass}`}>
                        <GameVideoComponent
                          streamManager={
                            teamA[gamePhase] === publisher?.stream.streamId
                              ? publisher
                              : subscribers.find((sub) => sub.stream.streamId === teamA[gamePhase])
                          }
                        />
                      </div>
                    </div>
                  </div>
                )}
                {teamA[gamePhase] === publisher.stream.streamId && (
                  <div
                    onClick={() => {
                      if (itemCount > 0 && canUse) {
                        setItemCount(itemCount - 1);
                        setCanUse(false);
                        useItem();
                        setTimeout(() => {
                          setCanUse(true);
                        }, 5000);
                      }
                    }}
                  >
                    {effect === "A" && <div className="text-xl">승리</div>}
                    {effect === "B" && <div className="text-xl">패배</div>}
                    <div className="animate-fade animate-once">
                      <div className={`${animationClass}`}>
                        <GameVideoComponent
                          streamManager={
                            teamB[gamePhase] === publisher?.stream.streamId
                              ? publisher
                              : subscribers.find((sub) => sub.stream.streamId === teamB[gamePhase])
                          }
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
        {teamA[gamePhase] !== publisher.stream.streamId &&
          teamB[gamePhase] !== publisher.stream.streamId && (
            <div className="flex flex-col items-center h-full w-full pt-6">
              {/* <div className="h-2/6 w-4/5 border-4 rounded-2xl border-gray-300 bg-gray-200"> */}
              <div
                className={`h-2/6 w-4/5 border-4 rounded-2xl ${effect === "A" ? "border-green-300 bg-green-200" : effect === "B" ? "border-red-300 bg-red-200" : "border-gray-300 bg-gray-200"}`}
              >
                <div className="absolute text-2xl">A팀</div>
                {/* {effect === "A" && <div className="text-xl">승리</div>}
                {effect === "B" && <div className="text-xl">패배</div>} */}
                <GameVideoComponent
                  streamManager={
                    teamA[gamePhase] === publisher?.stream.streamId
                      ? publisher
                      : subscribers.find((sub) => sub.stream.streamId === teamA[gamePhase])
                  }
                />
              </div>
              <div className="w-full text-5xl text-center font-bold m-8 text-orange-800">VS</div>
              {/* <div className="h-2/6 w-4/5 border-4 rounded-2xl border-gray-300 bg-gray-200"> */}
              <div
                className={`h-2/6 w-4/5 border-4 rounded-2xl ${effect === "A" ? "border-red-300 bg-red-200" : effect === "B" ? "border-green-300 bg-green-200" : "border-gray-300 bg-gray-200"}`}
              >
                <div className="absolute text-2xl">B팀</div>
                {/* {effect === "A" && <div className="text-xl">패배</div>}
                {effect === "B" && <div className="text-xl">승리</div>} */}
                <GameVideoComponent
                  streamManager={
                    teamB[gamePhase] === publisher?.stream.streamId
                      ? publisher
                      : subscribers.find((sub) => sub.stream.streamId === teamB[gamePhase])
                  }
                />
              </div>
            </div>
          )}
      </div>
    </>
  );
};

export default NormalGamePlay;
