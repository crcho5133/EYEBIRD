import React from "react";
import OpenViduVideoComponent from "./OvVideo";

export default function UserVideoComponent({ streamManager }) {
  const getNicknameTag = () => {
    // Gets the nickName of the user
    return JSON.parse(streamManager.stream.connection.data).clientData;
  };

  return (
    <div>
      {streamManager !== undefined ? (
        <div className="">
          <OpenViduVideoComponent streamManager={streamManager} />
          <p>{getNicknameTag()}</p>
        </div>
      ) : null}
    </div>
  );
}
