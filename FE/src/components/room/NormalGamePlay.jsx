import { useEffect, useState, useRef } from "react";
import GameVideoComponent from "./GameVideoComponent";
import GameUserVideoComponent from "./GameUserVideoComponent";

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
  const maxPhase = teamA.filter((id) => id !== null).length;

  const checkRef = useRef(check);
  const effectRef = useRef(effect);

  useEffect(() => {
    checkRef.current = check;
    effectRef.current = effect;
  }, [check, effect]);

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
      <div className="flex flex-col justify-center items-center text-center">
        <div>게임play</div>
        <div
          onClick={() => {
            console.log(teamA[0]);
            console.log(teamA[gamePhase]);
            console.log(publisher.stream);
            console.log(maxPhase);
          }}
        >
          test
        </div>
        <div
          onClick={() => {
            setGamePhase(gamePhase + 1);
          }}
        >
          페이즈 변경
        </div>
        <div
          onClick={() => {
            setGamePhase(0);
          }}
        >
          페이즈 초기화
        </div>
        <div>스코어</div>
        <div>
          A팀 : {scoreA} vs {scoreB} : B팀
        </div>
        {isLoading && (
          <div className="flex-col">
            <div className="text-3xl animate-bounce">잠시 후 게임이 시작됩니다!!</div>
            <div className="text-6xl text-red-500 animate-ping">{time}</div>
          </div>
        )}
        {(teamA[gamePhase] === publisher.stream.streamId ||
          teamB[gamePhase] === publisher.stream.streamId) && (
          <div>
            게임 진행 화면
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
                        }, 3000);
                      }
                    }}
                  >
                    {effect === "A" && <div className="text-xl">패배</div>}
                    {effect === "B" && <div className="text-xl">승리</div>}
                    {itemVisible ? <div className="absolute text-3xl">아이템 사용중</div> : ""}
                    <GameVideoComponent
                      streamManager={
                        teamA[gamePhase] === publisher?.stream.streamId
                          ? publisher
                          : subscribers.find((sub) => sub.stream.streamId === teamA[gamePhase])
                      }
                    />
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
                        }, 3000);
                      }
                    }}
                  >
                    {effect === "A" && <div className="text-xl">승리</div>}
                    {effect === "B" && <div className="text-xl">패배</div>}
                    {itemVisible ? <div className="absolute text-3xl">아이템 사용중</div> : ""}
                    <GameVideoComponent
                      streamManager={
                        teamB[gamePhase] === publisher?.stream.streamId
                          ? publisher
                          : subscribers.find((sub) => sub.stream.streamId === teamB[gamePhase])
                      }
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        )}
        {teamA[gamePhase] !== publisher.stream.streamId &&
          teamB[gamePhase] !== publisher.stream.streamId && (
            <div className="flex flex-col items-center h-3/5 w-3/5">
              관전자 화면
              <div className="h-4/5 w-4/5 border-4 border-sky-300 bg-sky-200">
                <div>A팀</div>
                {effect === "A" && <div className="text-xl">승리</div>}
                {effect === "B" && <div className="text-xl">패배</div>}
                <GameVideoComponent
                  streamManager={
                    teamA[gamePhase] === publisher?.stream.streamId
                      ? publisher
                      : subscribers.find((sub) => sub.stream.streamId === teamA[gamePhase])
                  }
                />
              </div>
              <div className="h-4/5 w-4/5 text-5xl text-center font-bold m-8 text-orange-800">
                VS
              </div>
              <div className="h-4/5 w-4/5 border-4 border-red-300 bg-red-200">
                <div>B팀</div>
                {effect === "A" && <div className="text-xl">패배</div>}
                {effect === "B" && <div className="text-xl">승리</div>}
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
