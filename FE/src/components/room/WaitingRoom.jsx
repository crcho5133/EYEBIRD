import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
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
  ready,
  sendReady,
  participantsReady,
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
          <Link
            to="/lobby"
            className="btn btn-large btn-danger bg-red-600"
            onClick={() => leaveSession()}
          >
            방 나가기
          </Link>
          {/* <button
            className="btn btn-large btn-danger bg-red-600"
            id="buttonLeaveSession"
            onClick={() => {
              leaveSession();
              navigate(-1);
            }}
          >
            방 나가기
          </button> */}

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
        <div
          id="teamA-container"
          className="grid grid-rows-[auto_1fr_auto] border-4 border-sky-500 m-2 h-full w-2/5"
        >
          <div className="text-center text-xs bg-sky-200 p-2">
            A 팀 : {teamA.filter((id) => id !== null).length} / 4 명
          </div>
          <div className="grid grid-rows-4 gap-1 overflow-hidden">
            {teamA.map((streamId, idx) => (
              <div key={idx} className="w-full h-full border-sky-500">
                {streamId ? (
                  <UserVideoComponent
                    streamManager={
                      streamId === publisher?.stream.streamId
                        ? publisher
                        : subscribers.find((sub) => sub.stream.streamId === streamId)
                    }
                    streamId={streamId}
                    clientStreamId={myStreamId}
                    color="border-sky-500"
                    participantsReady={participantsReady}
                  />
                ) : (
                  <div className="flex justify-center items-center bg-gray-200">비디오 슬롯</div>
                )}
              </div>
            ))}
          </div>
          <div className="text-center bg-sky-200 p-2">
            <button
              onClick={() => handleSelectTeam(publisher.stream.streamId, "A")}
              className={`rounded-md w-full ${isTeamFull(teamA) ? "bg-gray-400" : "bg-sky-300 hover:bg-sky-700"}`}
              disabled={isTeamFull(teamA)}
            >
              A팀 선택
            </button>
          </div>
        </div>
        <div
          id="waiting-area-container"
          className="flex flex-col border-4 border-green-500 mt-2 h-full w-3/12"
        >
          <div className="text-center text-xs bg-green-200 p-2">
            <div>대기열</div> <div>{teamW.filter((id) => id !== null).length} / 8 명</div>
          </div>
          <div className="flex-grow grid gap-1 overflow-hidden p-2 items-center">
            {teamW.map((streamId, idx) => {
              const streamManager =
                streamId === publisher?.stream.streamId
                  ? publisher
                  : subscribers.find((sub) => sub.stream.streamId === streamId);
              return streamManager ? (
                <div key={idx} className="border-2 border-green-500 m-1 text-center text-sm">
                  {JSON.parse(streamManager.stream.connection.data).clientData}
                </div>
              ) : (
                <div key={idx} className="border-2 border-gray-500 m-1 text-center text-sm">
                  빈자리
                </div>
              );
            })}
          </div>
          <div className="text-center bg-green-200 p-2">
            <button
              onClick={() => handleSelectTeam(publisher.stream.streamId, "W")}
              className="rounded-md w-full bg-green-300 hover:bg-green-700"
            >
              대기열 선택
            </button>
          </div>
        </div>
        <div
          id="teamB-container"
          className="grid grid-rows-[auto_1fr_auto] border-4 border-red-500 m-2 h-full w-2/5"
        >
          <div className="text-center text-xs bg-red-200 p-2">
            B 팀 : {teamB.filter((id) => id !== null).length} / 4 명
          </div>
          <div className="grid grid-rows-4 gap-1 overflow-hidden">
            {teamB.map((streamId, idx) => (
              <div key={idx} className="aspect-w-16 aspect-h-9 border border-red-500">
                {streamId ? (
                  <UserVideoComponent
                    streamManager={
                      streamId === publisher?.stream.streamId
                        ? publisher
                        : subscribers.find((sub) => sub.stream.streamId === streamId)
                    }
                    streamId={streamId}
                    clientStreamId={myStreamId}
                    color="border-red-500"
                    participantsReady={participantsReady}
                  />
                ) : (
                  <div className="flex justify-center items-center bg-gray-200">비디오 슬롯</div>
                )}
              </div>
            ))}
          </div>
          <div className="text-center bg-red-200 p-2">
            <button
              onClick={() => handleSelectTeam(publisher.stream.streamId, "B")}
              className={`rounded-md w-full ${isTeamFull(teamA) ? "bg-gray-400" : "bg-red-300 hover:bg-red-700"}`}
              disabled={isTeamFull(teamB)}
            >
              B팀 선택
            </button>
          </div>
        </div>
      </div>
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
          <div
            className={`mr-1 flex justify-center items-center border-4 border-orange-700 ${ready ? "bg-green-400" : ""} `}
            onClick={() => {
              sendReady();
            }}
          >
            준비 완료
          </div>
          {/* <button
            onClick={() => {
              console.log(participantsReady);
            }}
          >
            check
          </button> */}
        </div>
      </div>
      {/* 설정 모달 */}
      <InviteModal visible={inviteVisible} onClose={handleInviteClose} />
    </div>
  );
};

export default WaitingRoom;
