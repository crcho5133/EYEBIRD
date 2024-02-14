const NormalGameLoading = ({ gameType, publisher, subscribers, teamA, teamB }) => {
  return (
    <>
      <div className="flex flex-col min-h-screen justify-between bg-gray-100 p-4">
        <div className="pt-8">
          <div className="text-5xl font-bold mb-5 text-center">
            {gameType === "classic" ? "클래식전" : "아이템전"}
          </div>
        </div>

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

        <div className="pb-8"></div>
      </div>
    </>
  );
};

export default NormalGameLoading;
