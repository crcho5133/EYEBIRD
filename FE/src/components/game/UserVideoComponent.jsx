import React from "react";
import OpenViduVideoComponent from "./OvVideo";

export default function UserVideoComponent({ streamManager, streamId, clientStreamId }) {
  const [isMuted, setIsMuted] = React.useState(false);

  // const toggleMute = () => {
  //   const newMuteState = !isMuted;
  //   muteAudio(streamId, isMuted);
  //   setIsMuted(newMuteState);
  // };

  // 오디오 제어 함수
  const toggleAudio = () => {
    streamManager.subscribeToAudio(!streamManager.stream.audioActive);
    setIsMuted(!isMuted);
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
          <div className="text-right">
            {clientStreamId !== streamId ? (
              <button onClick={toggleAudio}>{isMuted ? "음소거 해제" : "음소거"}</button>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}
