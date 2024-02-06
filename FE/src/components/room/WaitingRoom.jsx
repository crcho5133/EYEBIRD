import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
// import Rodal from "rodal";
// import "rodal/lib/rodal.css";
import UserVideoComponent from "./UserVideoComponent";
import AudioControlModal from "../modal/AudioControlModal";
import ChatModal from "../modal/ChatModal";
import InviteModal from "../modal/InviteModal";
const WaitingRoom = ({
  roomName,
  publisher,
  subscribers,
  mySessionId,
  myStreamId,
  myUserName,
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
  Chat,
  Sound,
  chatMessages,
  teamChatMessages,
  currentMessage,
  chatMode,
  setChatMessages,
  setTeamChatMessages,
  setCurrentMessage,
  sendChatMessage,
  setChatMode,
}) => {
  const [isChatModalVisible, setIsChatModalVisible] = useState(false);
  const [isAudioModalVisible, setIsAudioModalVisible] = useState(false);
  const [selectedAudioOption, setSelectedAudioOption] = useState("off");
  const [inviteVisible, setInviteVisible] = useState(false); // 설정 모달 가시성 state

  const navigate = useNavigate();

  const handleInviteOpen = () => {
    setInviteVisible(true); // 설정 모달 열기
  };

  const handleInviteClose = () => {
    setInviteVisible(false); // 설정 모달 닫기
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
      if (selectedAudioOption === "team" && myTeam !== "W") {
        // 현재 사용자의 팀만 오디오 켜기
        toggleAudio(myTeam === "A" ? teamA : teamB, true);
        // 다른 팀 오디오 끄기
        toggleAudio(myTeam === "A" ? teamB : teamA, false);
      } else if (selectedAudioOption === "all" && myTeam !== "W") {
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
    <div className="waiting-room h-screen">
      <div>
        <div className="flex justify-between">
          <button
            className="btn btn-large btn-danger bg-red-600"
            id="buttonLeaveSession"
            onClick={() => {
              leaveSession();
              navigate(-1);
            }}
          >
            방 나가기
          </button>

          <button
            className="btn btn-large btn-primary bg-green-600"
            id="buttonInviteModal"
            onClick={handleInviteOpen}
          >
            초대하기
          </button>
        </div>
        <div className="text-center">
          <h2>방제: {roomName}</h2>
        </div>
      </div>
      <div className="flex justify-between h-5/6">
        <div id="teamA-container" className="border-4 border-sky-500 m-2 w-2/6">
          <div className="border-2 border-sky-500 m-1 text-center">
            A 팀 : {teamA.filter((id) => id !== null).length} / 4 명
          </div>
          {teamA.map((streamId, idx) => {
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
                color={"border-sky-500"}
              />
            ) : (
              <div key={idx} className="border-t-4 border-sky-500 h-32"></div>
            );
          })}
          <div id="team-selection-buttons" className="text-center h-32 border-t-4 border-sky-500">
            <button
              onClick={() => handleSelectTeam(publisher.stream.streamId, "A")}
              className={`rounded-md w-20 m-1 ${isTeamFull(teamA) ? "bg-gray-400 hover:bg-gray-400" : "bg-sky-300 hover:bg-sky-700"}`}
              disabled={isTeamFull(teamA)}
            >
              A팀 선택
            </button>
          </div>
        </div>
        <div className="flex w-2/6">
          <div id="team-selection-buttons" className="border-4 border-green-500 m-2">
            <div className="border-2 border-green-500 m-1 text-center">
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
        <div id="teamB-container" className="border-4 border-red-500 m-2 w-2/6">
          <div className="border-2 border-red-500 m-1 text-center">
            B 팀 : {teamB.filter((id) => id !== null).length} / 4 명
          </div>
          {teamB.map((streamId, idx) => {
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
                color={"border-red-500"}
              />
            ) : (
              <div key={idx} className="border-t-4 border-red-500 h-32"></div>
            );
          })}
          <div id="team-selection-buttons" className="text-center h-32 border-t-4 border-red-500">
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
      {/* <div className="flex">
        <div id="team-selection-buttons" className="border-4 border-green-500 m-4">
          <div className="border-2 border-green-500 m-1 text-center">
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
      </div> */}
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
        <div className="flex">
          <img
            className="w-[45px] h-[45px] mx-3"
            src={cameraOn ? CameraON : CameraOFF}
            onClick={toggleCamera}
          />
          <img
            className="w-[45px] h-[45px] mx-3"
            src={micOn ? MicON : MicOFF}
            onClick={toggleMic}
          />

          <button
            onClick={() => setIsAudioModalVisible(true)}
            className="mx-1"
            disabled={myTeam === "W"}
          >
            <img
              className={`w-[45px] h-[45px] mx-5 ${myTeam === "W" ? "bg-red-500" : "bg-green-500"}`}
              src={Sound}
            />
          </button>

          <AudioControlModal
            isVisible={isAudioModalVisible}
            hideModal={() => setIsAudioModalVisible(false)}
            toggleAudio={toggleAudio}
            selectedAudioOption={selectedAudioOption}
            setSelectedAudioOption={setSelectedAudioOption}
            myTeam={myTeam}
            teamA={teamA}
            teamB={teamB}
          />

          <button onClick={() => setIsChatModalVisible(true)} className="mx-1">
            <img className="w-[40px] h-[40px] mx-5" src={Chat} />
          </button>

          <ChatModal
            isVisible={isChatModalVisible}
            hideModal={() => setIsChatModalVisible(false)}
            chatMode={chatMode}
            chatMessages={chatMessages}
            teamChatMessages={teamChatMessages}
            currentMessage={currentMessage}
            setCurrentMessage={setCurrentMessage}
            sendChatMessage={sendChatMessage}
            setChatMode={setChatMode}
            setChatMessages={setChatMessages}
            setTeamChatMessages={setTeamChatMessages}
            myTeam={myTeam}
            myUserName={myUserName}
          />
          <div className="mr-1 flex justify-center items-center border-4 border-orange-700 bg-green-400">
            게임 시작
          </div>
        </div>
      </div>
      {/* 설정 모달 */}
      <InviteModal visible={inviteVisible} onClose={handleInviteClose} />
    </div>
  );
};

export default WaitingRoom;
