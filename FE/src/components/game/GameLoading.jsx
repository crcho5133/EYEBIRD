const GameLoading = ({ publisher, subscriber, gameType, opponentInfoParsed }) => {
  // console.log(publisher);
  // console.log(subscriber);
  // const pubnickname = JSON.parse(publisher.stream.connection.data).clientData;
  // const subnickname = JSON.parse(subscriber.stream.connection.data).clientData;

  const myNickName = sessionStorage.getItem("nickname");
  const opponentNickname = opponentInfoParsed.nickname;
  const myClassicPoint = sessionStorage.getItem("classicPt");
  const opponentClassicPoint = opponentInfoParsed.classicPt;
  const myWinNumClassic = sessionStorage.getItem("winNumClassic");
  const opponentWinNumClassic = opponentInfoParsed.winNumClassic;
  const myLoseNumClassic = sessionStorage.getItem("loseNumClassic");
  const opponentLoseNumClassic = opponentInfoParsed.loseNumClassic;
  const myItemPoint = sessionStorage.getItem("itemPt");
  const opponentItemPoint = opponentInfoParsed.itemPt;
  const myWinNumItem = sessionStorage.getItem("winNumItem");
  const opponentWinNumItem = opponentInfoParsed.winNumItem;
  const myLoseNumItem = sessionStorage.getItem("loseNumItem");
  const opponentLoseNumItem = opponentInfoParsed.loseNumItem;
  // const expectedWinPt = opponentInfoParsed.expectedWinPt;
  // const expectedLosePt = opponentInfoParsed.expectedLosePt;

  return (
    <>
      <div className="flex flex-col min-h-screen justify-between bg-gray-100 p-4">
        <div className="pt-8">
          <div className="text-5xl font-bold mb-5 text-center">
            {gameType === "classic" ? "클래식전" : "아이템전"}
          </div>
        </div>

        <div className="flex flex-col items-center justify-center flex-grow">
          <h1 className="text-4xl font-semibold mb-4 text-center">매칭 정보</h1>
          <div className="bg-white shadow rounded-lg p-5 text-2xl">
            <div className="m-4">
              나: <span className="font-bold text-3xl">{myNickName}</span>
            </div>
            <div className="m-4">
              점수:{" "}
              <span className="font-bold text-green-600 text-3xl">
                {gameType === "classic" ? myClassicPoint : myItemPoint}점
              </span>
            </div>
            <div className="m-4">
              전적:{" "}
              <span className="font-bold text-3xl">
                <span className="text-blue-600">
                  {gameType === "classic" ? myWinNumClassic : myWinNumItem}승
                </span>{" "}
                <span className="text-red-600">
                  {gameType === "classic" ? myLoseNumClassic : myLoseNumItem}패
                </span>
              </span>
            </div>

            <div className="text-5xl text-center font-bold m-8 text-orange-800">VS</div>

            <div className="animate-fade-up animate-twice animate-duration-[1500ms]">
              <div className="m-4">
                상대: <span className="font-bold text-3xl">{opponentNickname}</span>
              </div>
              <div className="m-4">
                점수:{" "}
                <span className="font-bold text-green-600 text-3xl">
                  {gameType === "classic" ? opponentClassicPoint : opponentItemPoint}점
                </span>
              </div>
              <div className="m-4">
                전적:{" "}
                <span className="font-bold text-3xl">
                  <span className="text-blue-600">
                    {gameType === "classic" ? opponentWinNumClassic : opponentWinNumItem}승
                  </span>{" "}
                  <span className="text-red-600">
                    {gameType === "classic" ? opponentLoseNumClassic : opponentLoseNumItem}패
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="pb-8"></div>
      </div>
    </>
  );
};

export default GameLoading;
