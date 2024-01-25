import OV from "../components/game/OV";

const Game = () => {
  const [gameState, setGameState] = useState("waiting"); // 'waiting', 'playing', 'finished'

  // 게임 상태에 따라 다른 컴포넌트 렌더링
  const renderGameComponent = () => {
    switch (gameState) {
      case "waiting":
        return <WaitingRoom session={session} />;
      case "playing":
        return <GamePlay session={session} />;
      case "finished":
        return <GameOver />;
      default:
        return <div>Loading...</div>;
    }
  };

  return <div className="container mx-auto">{renderGameComponent()}</div>;
};

export default Game;
