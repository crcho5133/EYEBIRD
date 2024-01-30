import { useEffect, useState } from "react";
import UserVideoComponent from "./UserVideoComponent";

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

  useEffect(() => {
    if (ready && opponentReady) {
      setGameState("play");
    }
  }, [ready, opponentReady]);

  return (
    <>
      <div className="h-screen">
        <button
          onClick={() => {
            setReady(true);
            sendReady();
          }}
        >
          준비 완료
        </button>
        {gameState === "waiting" && (
          <div>
            나<UserVideoComponent streamManager={publisher} />
          </div>
        )}
        {gameState === "play" && (
          <div>
            상대방
            <UserVideoComponent streamManager={subscriber} />
          </div>
        )}
        {/* <UserVideoComponent streamManager={publisher} />
      <UserVideoComponent streamManager={subscriber} /> */}
      </div>
    </>
  );
};

export default GamePlay;
