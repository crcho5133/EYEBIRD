import React from "react";
import OpenViduVideoComponent from "./OvVideo";

export default function UserVideoComponent({ streamManager, streamId, clientStreamId }) {
  const [isActive, setIsActive] = React.useState(true);
  // const isMutedRef = React.useRef(isMuted);

  // React.useEffect(() => {
  //   isMutedRef.current = isMuted;
  // }, [isMuted]);

  // const toggleMute = () => {
  //   const newMuteState = !isMuted;
  //   muteAudio(streamId, isMuted);
  //   setIsMuted(newMuteState);
  // };

  // 오디오 제어 함수
  const toggleAudio = () => {
    const newIsActive = !isActive;
    streamManager.subscribeToAudio(newIsActive);
    setIsActive(newIsActive);
  };

  const getNicknameTag = () => {
    // Gets the nickName of the user
    return JSON.parse(streamManager.stream.connection.data).clientData;
  };

  return (
    <div>
      {streamManager !== undefined ? (
        <div className="relative bg-gray-200 m-2 text-gray-700 font-bold border-4 border-green-500">
          <OpenViduVideoComponent streamManager={streamManager} />
          <div className="text-center">
            <p className="m-0 inline-block">{getNicknameTag()}</p>
          </div>
          {/* <div className="text-right">
            {clientStreamId !== streamId ? (
              <button onClick={toggleAudio}>{isActive ? "들려요" : "안들려요"}</button>
            ) : null}
          </div> */}
        </div>
      ) : null}
    </div>
  );
}
