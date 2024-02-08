import React from "react";
import OpenViduVideoComponent from "./OvVideo";

export default function UserVideoComponent({
  streamManager,
  streamId,
  clientStreamId,
  color,
  participantsReady,
}) {
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

  const readyState = participantsReady[getNicknameTag()];

  return (
    <div className={`h-full w-full ${color}`}>
      {streamManager !== undefined ? (
        <div className="h-full w-full bg-gray-200 text-gray-700 font-bold">
          <OpenViduVideoComponent streamManager={streamManager} readyState={readyState} />
          <div className="text-center">
            <p className="inline-block">{getNicknameTag()}</p>
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
