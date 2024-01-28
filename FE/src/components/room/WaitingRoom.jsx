import { useState, useEffect } from "react";
import Rodal from "rodal";
import "rodal/lib/rodal.css";
// import AudioControlModal from "../modal/AudioControlModal";
import UserVideoComponent from "./UserVideoComponent";

const WaitingRoom = ({
  publisher,
  subscribers,
  mySessionId,
  myStreamId,
  myTeam,
  teamA,
  teamB,
  teamW,
  cameraOn,
  micOn,
  toggleCamera,
  toggleMic,
  leaveSession,
  handleSelectTeam,
  isTeamFull,
  isTeamFull2,
  MicON,
  MicOFF,
  CameraON,
  CameraOFF,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedAudioOption, setSelectedAudioOption] = useState("all");
  const showRodal = () => {
    setIsVisible(true);
  };
  const hideRodal = () => {
    setIsVisible(false);
  };

  const toggleAudio = (Team, turn) => {
    Team.map((streamId) => {
      const streamManager = subscribers.find((sub) => sub.stream.streamId === streamId);
      if (streamManager) {
        streamManager.subscribeToAudio(turn);
      }
    });
  };

  useEffect(() => {
    // 현재 사용자가 선택한 음성 옵션에 따라 다른 팀의 오디오를 업데이트
    const updateAudioBasedOnTeamChange = () => {
      if (selectedAudioOption === "team") {
        // 현재 사용자의 팀만 오디오 켜기
        toggleAudio(myTeam === "A" ? teamA : teamB, true);
        // 다른 팀 오디오 끄기
        toggleAudio(myTeam === "A" ? teamB : teamA, false);
      } else if (selectedAudioOption === "all") {
        // 모든 팀의 오디오 켜기
        toggleAudio(teamA, true);
        toggleAudio(teamB, true);
      } else if (selectedAudioOption === "off") {
        // 모든 팀의 오디오 끄기
        toggleAudio(teamA, false);
        toggleAudio(teamB, false);
      }
    };

    updateAudioBasedOnTeamChange();
  }, [teamA, teamB, myTeam, selectedAudioOption]);

  return (
    <div className="waiting-room">
      <h2>대기방: {mySessionId}</h2>

      <div id="session">
        <div id="session-header" className="mb-5">
          <input
            className="btn btn-large btn-danger float-right mt-5 bg-red-600"
            type="button"
            id="buttonLeaveSession"
            onClick={leaveSession}
            value="방 나가기"
          />
        </div>
        <div className="flex">
          <div id="team-selection-buttons" className="border-4 border-green-500 m-4">
            <div className="border-2 border-green-500 m-1 text-center">
              {/* 대기열 */}
              <button onClick={() => handleSelectTeam(publisher.stream.streamId, "W")}>
                대기열 {teamW.filter((id) => id !== null).length} / 8 명
              </button>
            </div>
            {teamW.map((streamId) => {
              const streamManager =
                streamId === publisher?.stream.streamId
                  ? publisher
                  : subscribers.find((sub) => sub.stream.streamId === streamId);
              return streamManager ? (
                <div key={streamId} className="border-2 border-green-500 m-1 text-center">
                  {JSON.parse(streamManager.stream.connection.data).clientData}
                </div>
              ) : null;
            })}
          </div>
        </div>
        <div className="flex">
          <div id="teamA-container" className="border-4 border-sky-500 m-4">
            <div className="border-2 border-sky-500 m-1 text-center">
              A 팀 : {teamA.filter((id) => id !== null).length} / 4 명
            </div>
            {teamA.map((streamId) => {
              const streamManager =
                streamId === publisher?.stream.streamId
                  ? publisher
                  : subscribers.find((sub) => sub.stream.streamId === streamId);
              return streamManager ? (
                <UserVideoComponent
                  key={streamId}
                  streamManager={streamManager}
                  streamId={streamId}
                  clientStreamId={myStreamId}
                />
              ) : null;
            })}
            <div id="team-selection-buttons" className="text-center border-t-4 border-sky-500">
              <button
                onClick={() => handleSelectTeam(publisher.stream.streamId, "A")}
                className={`rounded-md w-20 m-1 ${isTeamFull(teamA) ? "bg-gray-400 hover:bg-gray-400" : "bg-sky-300 hover:bg-sky-700"}`}
                disabled={isTeamFull(teamA)}
              >
                A팀 선택
              </button>
            </div>
          </div>

          <div id="teamB-container" className="border-4 border-red-500 m-4">
            <div className="border-2 border-red-500 m-1 text-center">
              B 팀 : {teamB.filter((id) => id !== null).length} / 4 명
            </div>
            {teamB.map((streamId) => {
              const streamManager =
                streamId === publisher?.stream.streamId
                  ? publisher
                  : subscribers.find((sub) => sub.stream.streamId === streamId);
              return streamManager ? (
                <UserVideoComponent
                  key={streamId}
                  streamManager={streamManager}
                  streamId={streamId}
                  clientStreamId={myStreamId}
                />
              ) : null;
            })}
            <div id="team-selection-buttons" className="text-center border-t-4 border-red-500">
              <button
                onClick={() => handleSelectTeam(publisher.stream.streamId, "B")}
                className={`rounded-md w-20 m-1 ${isTeamFull(teamB) ? "bg-gray-400 hover:bg-gray-400" : "bg-red-300 hover:bg-red-700"}`}
                disabled={isTeamFull(teamB)}
              >
                B팀 선택
              </button>
            </div>
          </div>
        </div>
        {/* <input
            className="btn btn-large btn-danger float-right mt-5 bg-blue-600"
            type="button"
            value="테스트"
            onClick={() => {
              console.log(myTeam);
              console.log(teamA);
              console.log(teamB);
              console.log(teamW);
              console.log(myStreamId);
              console.log(myUserName);
              console.log(mySessionId);
              console.log(subscribers);
            }}
          /> */}
        <div>
          {/* ... 나머지 컴포넌트 JSX ... */}
          <button onClick={toggleCamera}>{cameraOn ? "카메라 끄기" : "카메라 켜기"}</button>
          <button onClick={toggleMic}>{micOn ? "마이크 끄기" : "마이크 켜기"}</button>
          <div className="flex">
            <img
              className="w-[45px] h-[45px] mx-5"
              src={cameraOn ? CameraON : CameraOFF}
              onClick={toggleCamera}
            />
            <img
              className="w-[45px] h-[45px] mx-5"
              src={micOn ? MicON : MicOFF}
              onClick={toggleMic}
            />
            <button onClick={showRodal}>음성 옵션</button>
            <Rodal
              visible={isVisible}
              onClose={hideRodal}
              customStyles={{ width: "80%", height: "25%" }}
            >
              <h2>음성 제어</h2>
              <button
                onClick={() => {
                  toggleAudio(teamA, true);
                  toggleAudio(teamB, true);
                  setSelectedAudioOption("all");
                }}
              >
                전체
              </button>
              <button
                onClick={() => {
                  toggleAudio(myTeam === "A" ? teamB : teamA, false);
                  toggleAudio(myTeam === "A" ? teamA : teamB, true);
                  setSelectedAudioOption("team");
                }}
              >
                팀
              </button>
              <button
                onClick={() => {
                  toggleAudio(teamA, false);
                  toggleAudio(teamB, false);
                  setSelectedAudioOption("off");
                }}
              >
                끄기
              </button>
            </Rodal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaitingRoom;
