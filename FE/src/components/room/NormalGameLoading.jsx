import TitleBar from "@/assets/img/matchingInfo/TitleBar.png";
import LoginTemplate4 from "@/assets/img/matchingInfo/LoginTemplate4.png";
const NormalGameLoading = ({ gameType, publisher, subscribers, teamA, teamB }) => {
  return (
    <>
      {/* <div className="boxControl" style={{ backgroundColor: "#69492E", height: "100%vh" }}>
        <div className="flex flex-col h-100vh matchingInfo6">
          <div className="text-10vw font-bold text-center mt-5vh matchingInfo0">
            {gameType === "classic" ? "클래식전" : "아이템전"}
            <hr className="mt-1vh border-black" />
          </div>
          <div
            style={{
              background: `url(${InfoBackground3}) no-repeat`,
              backgroundSize: "90vw 90vh",
              backgroundPosition: "center",
              width: "90vw",
              height: "90vh",
            }}
            className="mt-2vh flex flex-col self-center matchingInfo1"
          >
            <div
              style={{
                background: `url(${TitleBar}) no-repeat`,
                backgroundSize: "cover",
              }}
              className="mt-10vh w-50vw h-7vh flex items-center self-center border-2 matchingInfo2"
            >
              <img
                src={sessionStorage.getItem("profile")}
                style={{ width: "8vw", height: "5vh" }}
                className="ms-5vw matchingInfo3"
              />
              <div className="flex justify-center matchingInfo4 ms-2vw w-30vw text-5vw">
                {myNickName}
              </div>
            </div>
            <div className="matchingInfo5-0">
              <div className="text-5vw mt-2vh ml-16vw matchingInfo5">
                {gameType === "classic" ? "1. 점수(Classic) :" : "점수(Item) :"}
                <span className="ml-3vw text-gray-300 matchingInfo10">
                  {gameType === "classic" ? myClassicPoint : myItemPoint} 점
                </span>
              </div>
              <div className="text-5vw mt-1vh ml-16vw matchingInfo5">
                2. 전적 :
                <span className="ml-3vw text-gray-300 matchingInfo10">
                  {gameType === "classic" ? myWinNumClassic : myWinNumItem}승{" "}
                  {gameType === "classic" ? myLoseNumClassic : myLoseNumItem}패
                </span>
              </div>
              <div className="text-5vw mt-1vh ml-16vw matchingInfo5">
                <div>
                  ㆍ게임 결과(승리) :
                  <span className="ml-3vw text-6vw text-[#7ce772] matchingInfo10">
                    +{expectedWinPt} 점
                  </span>
                </div>
                <div>
                  ㆍ게임 결과(패배) :
                  <span className="ml-3vw text-6vw text-[#ebbcbc] matchingInfo10">
                    {expectedLosePt} 점
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center ms-12vh matchingInfo7-1 mt-3vh mb-2vh">
              <img
                src={VSImage}
                style={{ width: "20vw", height: "7vh" }}
                className="matchingInfo7"
              />
              <div
                style={{
                  background: `url(${CountdownBackground}) no-repeat center center`,
                  backgroundSize: "20vw 8vh",
                  width: "20vw",
                  height: "8vh",
                }}
                className="ms-10vw blink flex justify-center items-center text-8vw text-[#f3f3f3] matchingInfo8"
              >
                {countdown} 초
              </div>
            </div>
            <div
              style={{
                background: `url(${TitleBar}) no-repeat`,
                backgroundSize: "cover",
              }}
              className="mt-2vh w-50vw h-7vh flex items-center self-center border-amber-500 border-4 matchingInfo9"
            >
              <img
                src={changeProfileImage().profileImagePath(opponentInfoParsed.profileImage)}
                style={{ width: "8vw", height: "5vh" }}
                className="ms-5vw matchingInfo3"
              />
              <div className="flex justify-center matchingInfo4 ms-2vw w-30vw text-5vw text-amber-500">
                {opponentNickname}
              </div>
            </div>
            <div className="matchingInfo5-1">
              <div className="text-5vw mt-2vh ml-16vw matchingInfo5">
                {gameType === "classic" ? "1. 점수(Classic) :" : "점수(Item) :"}
                <span className="ml-3vw text-amber-500 matchingInfo10">
                  {gameType === "classic" ? opponentClassicPoint : opponentItemPoint} 점
                </span>
              </div>

              <div className="text-5vw mt-1vh ml-16vw matchingInfo5">
                2. 전적 :
                <span className="ml-3vw text-amber-500 matchingInfo10">
                  {gameType === "classic" ? opponentWinNumClassic : opponentWinNumItem}승{" "}
                  {gameType === "classic" ? opponentLoseNumClassic : opponentLoseNumItem}패
                </span>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      {/*위에는 랭킹전 */}

      <div className="boxControl" style={{ backgroundColor: "#69492E", height: "100%vh" }}>
        <div className="flex flex-col h-100vh matchingInfo6">
          <div className="text-10vw font-bold text-center mt-5vh matchingInfo0">
            <div className="text-5xl font-bold mb-5 text-center">
              {gameType === "classic" ? "클래식전" : "아이템전"}
              <hr className="mt-1vh border-black" />
            </div>
          </div>
          <div>
            <div
              style={{
                background: `url(${TitleBar}) no-repeat`,
                backgroundSize: "cover",
              }}
              className="mt-10vh w-50vw h-7vh flex items-center self-center border-2 matchingInfo2"
            >
              A 팀 출전순서
            </div>
            <div>
              <div className="flex">
                <div>1</div>
                <div
                  style={{
                    background: `url(${LoginTemplate4}) no-repeat`,
                    backgroundSize: "10vw 10vh",
                    backgroundPosition: "center",
                    width: "10vw",
                    height: "10vh",
                  }}
                  className="mt-2vh flex flex-col self-center matchingInfo1"
                >
                  2
                </div>
                <div>3</div>
              </div>
            </div>
          </div>

          <div></div>

          <div></div>

          <div></div>

          <div className="flex flex-col items-center justify-center flex-grow">
            <h1 className="text-4xl font-semibold mb-4 text-center">대결 정보</h1>
            <div className="bg-white shadow rounded-lg p-5 text-2xl">
              <div>A팀</div>
              <div className="animate-fade-up animate-twice animate-duration-[1500ms]">
                {teamA.map((streamId, idx) => {
                  const streamManager =
                    streamId === publisher?.stream.streamId
                      ? publisher
                      : subscribers.find((sub) => sub.stream.streamId === streamId);
                  return streamManager ? (
                    <div key={idx} className="border-2 border-sky-500 m-1 text-center text-sm">
                      {JSON.parse(streamManager.stream.connection.data).clientData}
                    </div>
                  ) : null;
                })}
              </div>

              <div className="text-5xl text-center font-bold m-8 text-orange-800">VS</div>

              <div>B팀</div>
              <div className="animate-fade-up animate-twice animate-duration-[1500ms]">
                {teamB.map((streamId, idx) => {
                  const streamManager =
                    streamId === publisher?.stream.streamId
                      ? publisher
                      : subscribers.find((sub) => sub.stream.streamId === streamId);
                  return streamManager ? (
                    <div key={idx} className="border-2 border-red-500 m-1 text-center text-sm">
                      {JSON.parse(streamManager.stream.connection.data).clientData}
                    </div>
                  ) : null;
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="pb-8"></div>
      </div>
    </>
  );
};

export default NormalGameLoading;
