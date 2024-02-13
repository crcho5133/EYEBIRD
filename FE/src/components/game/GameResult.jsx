import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TitleBar from "@/assets/img/gameResult/TitleBar.png";
import MiddleBackground from "@/assets/img/gameResult/MiddleBackground.png";
import ContinueBackground from "@/assets/img/gameResult/ContinueBackground.png";
import RankPointBackground from "@/assets/img/gameResult/RankPointBackground.png";
import NicknameTitle from "@/assets/img/gameResult/NicknameTitle.png";
import RankingTitle from "@/assets/img/gameResult/RankingTitle.png";
import proFileImage from "@/assets/img/profile/bird1.png";

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

  //랭크 점수 출력하는 로직
  const [number, setNumber] = useState(1000); // "1000"에서 시작하여 증가
  const [accessPoint, setAccessPoint] = useState(-36); // "36"에서 시작하여 감소
  const finalNumber = number + accessPoint;
  const finalAccessPoint = 0;

  useEffect(() => {
    setTimeout(() => {
      if (number < finalNumber) {
        const interval = setInterval(() => {
          setNumber((prevNumber) => (prevNumber < finalNumber ? prevNumber + 1 : prevNumber));
          setAccessPoint((prevNumber) =>
            prevNumber > finalAccessPoint ? prevNumber - 1 : prevNumber
          );

          if (number >= finalNumber && accessPoint <= finalAccessPoint) {
            clearInterval(interval);
          }
        }, 10);

        return () => clearInterval(interval);
      } else {
        const interval = setInterval(() => {
          setNumber((prevNumber) => (prevNumber > finalNumber ? prevNumber - 1 : prevNumber));
          setAccessPoint((prevNumber) =>
            prevNumber < finalAccessPoint ? prevNumber + 1 : prevNumber
          );

          if (number <= finalNumber && accessPoint >= finalAccessPoint) {
            clearInterval(interval);
          }
        }, 50);

        return () => clearInterval(interval);
      }
    }, 1000);
  }, []);

  return (
    <div
      className="boxControl flex flex-col items-center animate-fade-left animate-once"
      style={{ backgroundColor: "#69492E", height: "100vh" }}
    >
      {/*Top*/}
      <div
        style={{
          background: `url(${TitleBar}) no-repeat`,
          backgroundPosition: "center center",
          backgroundSize: "50vw 15vh",
          width: "50vw",
          height: "15vh",
        }}
        className={`gameResult1 mt-5vh text-10vw flex justify-center items-center border-amber-900 ${myWin ? "text-white" : "text-white"}`}
      >
        {myWin ? "WIN" : "LOSE"}
      </div>
      {/*Middle*/}
      <div
        style={{
          background: `url(${MiddleBackground}) no-repeat`,
          backgroundPosition: "center center",
          backgroundSize: "80vw 53vh",
          width: "80vw",
          height: "53vh",
        }}
        className="gameResult2 mt-3vh flex flex-col items-center"
      >
        {resultState === "phase1" && myWin && (
          <div
            style={{
              background: `url(${ContinueBackground}) no-repeat`,
              backgroundPosition: "center center",
              backgroundSize: "80vw 25vh",
              width: "80vw",
              height: "25vh",
            }}
            className="gameResult3 flex flex-col justify-center items-center"
          >
            <div className="mt-3vh">상대에게 재도전 의사를 묻고 있습니다.</div>
            <div>잠시만 기다려 주십시오</div>
            {resultState !== "phase3" && (
              <div className="mt-1vh flex justify-center">
                <div className="gameResult18 w-40vw bg-gray-300 h-3vh rounded-full shadow">
                  <div
                    className="bg-amber-800 h-full rounded-full transition-all ease-in-out"
                    style={{
                      width: `${progress}%`,
                    }}
                  ></div>
                </div>
              </div>
            )}
          </div>
        )}
        {resultState === "phase1" && !myWin && (
          <div
            style={{
              background: `url(${ContinueBackground}) no-repeat`,
              backgroundPosition: "center center",
              backgroundSize: "80vw 25vh",
              width: "80vw",
              height: "25vh",
            }}
            className="gameResult3 text-4vw flex flex-col justify-center items-center"
          >
            <div className="mt-2vh gameResult17">재도전 하시겠습니까?</div>
            {resultState !== "phase3" && (
              <div className="mt-1vh flex justify-center">
                <div className="gameResult18 w-40vw bg-gray-300 h-3vh rounded-full shadow">
                  <div
                    className="bg-amber-800 h-full rounded-full transition-all ease-in-out"
                    style={{
                      width: `${progress}%`,
                    }}
                  ></div>
                </div>
              </div>
            )}
            <button
              className="gameResult19 mt-1vh text-4vw w-10vw h-3vh bg-amber-700 text-white font-bold rounded hover:bg-amber-800 focus:outline-none focus:shadow-outline"
              onClick={() => sendRematch()}
            >
              네
            </button>
          </div>
        )}
        {resultState === "phase2" && myWin && (
          <div
            style={{
              background: `url(${ContinueBackground}) no-repeat`,
              backgroundPosition: "center center",
              backgroundSize: "80vw 25vh",
              width: "80vw",
              height: "25vh",
            }}
            className="gameResult3 flex flex-col justify-center items-center"
          >
            <div className="mt-1vh gameResult17">상대방이 재도전을 요청하였습니다</div>
            <div className="gameResult17">수락하시겠습니까?</div>
            {resultState !== "phase3" && (
              <div className="mt-1vh flex justify-center">
                <div className="gameResult18 w-40vw bg-gray-300 h-3vh rounded-full shadow">
                  <div
                    className="bg-amber-800 h-full rounded-full transition-all ease-in-out"
                    style={{
                      width: `${progress}%`,
                    }}
                  ></div>
                </div>
              </div>
            )}
            <div>
              <button
                className="gameResult19 mt-1vh text-4vw w-10vw h-3vh bg-amber-700 text-white font-bold rounded hover:bg-amber-800 focus:outline-none focus:shadow-outline"
                onClick={() => acceptRematch()}
              >
                네
              </button>
            </div>
          </div>
        )}
        {resultState === "phase2" && !myWin && (
          <div
            style={{
              background: `url(${ContinueBackground}) no-repeat`,
              backgroundPosition: "center center",
              backgroundSize: "80vw 25vh",
              width: "80vw",
              height: "25vh",
            }}
            className="gameResult3 flex flex-col justify-center items-center"
          >
            <div className="gameResult17">상대방의 재도전 수락여부를</div>
            <div className="gameResult17">기다리고 있습니다</div>
            {resultState !== "phase3" && (
              <div className="mt-1vh flex justify-center">
                <div className="gameResult18 w-40vw bg-gray-300 h-3vh rounded-full shadow">
                  <div
                    className="bg-amber-800 h-full rounded-full transition-all ease-in-out"
                    style={{
                      width: `${progress}%`,
                    }}
                  ></div>
                </div>
              </div>
            )}
          </div>
        )}
        {resultState === "phase3" && (
          <div
            style={{
              background: `url(${ContinueBackground}) no-repeat`,
              backgroundPosition: "center center",
              backgroundSize: "80vw 25vh",
              width: "80vw",
              height: "25vh",
            }}
            className="gameResult3 flex flex-col justify-center items-center "
          >
            <Link
              to="/lobby"
              className="gameResult4 mt-1vh text-4vw w-35vw h-7vh flex justify-center items-center bg-amber-700 text-white rounded hover:bg-amber-800 focus:outline-none focus:shadow-outline"
              onClick={() => leaveSession()}
            >
              로비로 가기
            </Link>
          </div>
        )}
        <div
          style={{
            background: `url(${RankPointBackground}) no-repeat`,
            backgroundPosition: "center center",
            backgroundSize: "75vw 30vh",
            width: "70vw",
            height: "25vh",
          }}
          className="gameResult5 flex flex-col"
        >
          <div className="ms-3vw self-center gameResult6">Rank</div>
          <div className="flex gameResult7">
            <div className="flex flex-col items-start space-y-2vh">
              <div className="flex justify-center items-center">
                <div
                  className="ms-1vw flex justify-center items-center gameResult8"
                  style={{
                    background: `url(${RankingTitle}) no-repeat`,
                    backgroundPosition: "0.5vw center",
                    backgroundSize: "8vw 5vh",
                    width: "8vw",
                    height: "5vh",
                  }}
                >
                  1
                </div>
                <div className="ms-2vw gameResult11">nickname1</div>
              </div>
              <div className="flex justify-center items-center">
                <div
                  className="ms-3vw flex justify-center items-center gameResult9"
                  style={{
                    background: `url(${RankingTitle}) no-repeat`,
                    backgroundPosition: "0.5vw center",
                    backgroundSize: "8vw 5vh",
                    width: "8vw",
                    height: "5vh",
                  }}
                >
                  2
                </div>
                <div className="ms-2vw gameResult11">nickname2</div>
              </div>
              <div className="flex justify-center items-center">
                <div
                  className="ms-5vw flex justify-center items-center gameResult10"
                  style={{
                    background: `url(${RankingTitle}) no-repeat`,
                    backgroundPosition: "0.5vw center",
                    backgroundSize: "8vw 5vh",
                    width: "8vw",
                    height: "5vh",
                  }}
                >
                  3
                </div>
                <div className="ms-2vw gameResult11">nickname3</div>
              </div>
            </div>

            <div className="gameResult14 ms-3vw flex flex-col justify-center items-center">
              <div className="gameResult12 ms-4vw text-8vw flex flex-wrap justify-center items-center text-red-600">
                {number}
              </div>

              <div className="ms-10vw gameResult13"> {accessPoint}</div>
            </div>
          </div>
        </div>
      </div>

      {/*Bottom*/}
      <div className="flex flex-col justify-center items-center ">
        <img
          className="gameResult15"
          src={proFileImage}
          style={{ width: "20vw", height: "13vh" }}
        />
        <div
          style={{
            background: `url(${NicknameTitle}) no-repeat`,
            backgroundPosition: "center center",
            backgroundSize: "50vw 7vh",
            width: "50vw",
            height: "7vh",
          }}
          className="flex justify-center items-center gameResult16"
        >
          닉네임
        </div>
      </div>

      {/* 
      <div className="h-screen flex justify-center items-center text-center text-lg">
        <div className="flex-col">
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
    </div> */}
    </div>
  );
};

export default GameResult;
