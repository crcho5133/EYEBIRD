import { useState, useEffect, useRef } from "react";
import Rodal from "rodal";
import "rodal/lib/rodal.css";
// import AudioControlModal from "../modal/AudioControlModal";
import UserVideoComponent from "./UserVideoComponent";

const WaitingRoom = ({
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
  const showChatModal = () => setIsChatModalVisible(true);
  const hideChatModal = () => setIsChatModalVisible(false);

  const chatListRef = useRef(null);

  useEffect(() => {
    if (chatListRef.current) {
      // 채팅 목록의 스크롤을 맨 아래로 이동
      chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
    }
  }, [chatMode, isChatModalVisible]);

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
    <div className="waiting-room h-screen">
      <div>
        <button
          className="btn btn-large btn-danger bg-red-600"
          id="buttonLeaveSession"
          onClick={leaveSession}
        >
          방 나가기
        </button>
        <div className="text-center">
          <h2>대기방: {mySessionId}</h2>
        </div>
      </div>
      <div className="flex justify-between h-5/6">
        <div id="teamA-container" className="border-4 border-sky-500 m-2 w-2/6">
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
                color={"border-sky-500"}
              />
            ) : (
              <div className="border-t-4 border-sky-500 h-32"></div>
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
                color={"border-red-500"}
              />
            ) : (
              <div className="border-t-4 border-red-500 h-32"></div>
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
          <button onClick={showRodal} className="mx-1">
            <img className="w-[45px] h-[45px] mx-5" src={Sound} />
          </button>
          <Rodal
            visible={isVisible}
            onClose={hideRodal}
            customStyles={{ width: "80%", height: "25%" }}
            animation="slideUp"
          >
            <h2>음성 제어</h2>
            <button
              onClick={() => {
                toggleAudio(teamA, true);
                toggleAudio(teamB, true);
                setSelectedAudioOption("all");
              }}
              className="m-4"
            >
              전체
            </button>
            <button
              onClick={() => {
                toggleAudio(myTeam === "A" ? teamB : teamA, false);
                toggleAudio(myTeam === "A" ? teamA : teamB, true);
                setSelectedAudioOption("team");
              }}
              className="m-4"
            >
              팀
            </button>
            <button
              onClick={() => {
                toggleAudio(teamA, false);
                toggleAudio(teamB, false);
                setSelectedAudioOption("off");
              }}
              className="m-4"
            >
              끄기
            </button>
          </Rodal>

          {/* 채팅 모달 버튼 */}
          <button onClick={showChatModal} className="mx-1">
            <img className="w-[40px] h-[40px] mx-5" src={Chat} />
          </button>

          {/* 채팅 모달 */}
          <Rodal
            visible={isChatModalVisible}
            onClose={hideChatModal}
            height={400}
            animation="slideUp"
          >
            <div>
              <div className="flex my-2">
                <button
                  onClick={() => setChatMode("all")}
                  className={`border-2 rounded border-solid border-sky-500 mr-4 h-8 w-12 ${chatMode === "all" ? "bg-sky-500" : ""}`}
                >
                  전체
                </button>
                <button
                  onClick={() => setChatMode(myTeam)}
                  className={`border-2 rounded border-solid border-sky-500 mr-4 h-8 w-12 ${chatMode === myTeam ? "bg-sky-500" : ""}`}
                >
                  팀
                </button>
              </div>
              <h2 className="border-2 rounded border-solid border-sky-500 px-1">
                {chatMode === "all" ? (
                  <div className="flex justify-between">
                    <div>전체 채팅</div>
                    <button
                      className="border-2 rounded-lg bg-red-300 border-red-300"
                      onClick={() => {
                        setChatMessages([]);
                      }}
                    >
                      내역 지우기
                    </button>
                  </div>
                ) : (
                  <div className="flex justify-between">
                    <div>팀 채팅({myTeam !== "W" ? myTeam + "팀" : "대기열"})</div>
                    <button
                      className="border-2 rounded-lg bg-red-300 border-red-300"
                      onClick={() => {
                        setTeamChatMessages([]);
                      }}
                    >
                      내역 지우기
                    </button>
                  </div>
                )}
              </h2>
              <div
                className="h-64 overflow-y-auto border-2 rounded border-solid border-sky-500 my-1"
                ref={chatListRef}
              >
                {chatMode === "all" &&
                  chatMessages.map((msg, index) => {
                    // 이전 메시지의 발신자와 현재 메시지의 발신자를 비교
                    const showSender = index === 0 || chatMessages[index - 1].sender !== msg.sender;
                    return (
                      <div key={index} className="m-1 p-1">
                        {msg.sender === myUserName ? (
                          <div className="text-right">
                            <span className="p-2 rounded-2xl bg-green-200 inline-block max-w-56 w-fit h-fit text-left">
                              {msg.content}
                            </span>
                          </div>
                        ) : (
                          <div>
                            {showSender && (
                              <div className="text-sm m-1 font-semibold">{msg.sender}</div>
                            )}
                            <span className="p-2 rounded-2xl bg-cyan-200 inline-block max-w-56 w-fit h-fit text-left">
                              {msg.content}
                            </span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                {chatMode === myTeam &&
                  teamChatMessages.map((msg, index) => {
                    // 이전 메시지의 발신자와 현재 메시지의 발신자를 비교
                    const showSender =
                      index === 0 || teamChatMessages[index - 1].sender !== msg.sender;
                    return (
                      <div key={index} className="m-1 p-1">
                        {msg.sender === myUserName ? (
                          <div className="text-right">
                            <span className="p-2 rounded-2xl bg-green-200 inline-block max-w-56 w-fit h-fit text-left">
                              {msg.content}
                            </span>
                          </div>
                        ) : (
                          <div>
                            {showSender && (
                              <div className="text-sm m-1 font-semibold">{msg.sender}</div>
                            )}
                            <span className="p-2 rounded-2xl bg-cyan-200 inline-block max-w-56 w-fit h-fit text-left">
                              {msg.content}
                            </span>
                          </div>
                        )}
                      </div>
                    );
                  })}
              </div>
              <div className="grid grid-flow-col justify-stretch h-8">
                <input
                  type="text"
                  value={currentMessage}
                  className="border-2 rounded border-solid border-sky-500 mr-2 p-1"
                  onChange={(e) => setCurrentMessage(e.target.value)}
                />
                <button
                  onClick={() => {
                    if (currentMessage.length > 0) {
                      sendChatMessage();
                    }
                  }}
                  disabled={currentMessage.length === 0}
                  className="border-2 rounded border-solid border-sky-500 bg-sky-300 hover:bg-sky-500"
                >
                  보내기
                </button>
              </div>
            </div>
          </Rodal>
          <div className="mr-1 flex justify-center items-center border-4 border-orange-700 bg-green-400">
            게임 시작
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaitingRoom;
