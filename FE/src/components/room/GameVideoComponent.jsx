import OpenViduVideoComponent from "./OvVideo";

export default function GameVideoComponent({ streamManager }) {
  // console.log(streamManager);

  const getNicknameTag = () => {
    // Gets the nickName of the user
    return JSON.parse(streamManager.stream.connection.data).clientData;
  };

  return (
    <div className="flex items-center justify-center h-full w-full">
      {streamManager !== undefined ? (
        <div className="h-full w-full">
          <OpenViduVideoComponent streamManager={streamManager} />
          <p>{getNicknameTag()}</p>
        </div>
      ) : null}
    </div>
  );
}
