import React, { useState, useEffect } from "react";
import { useOpenVidu } from "../context/OpenViduContext";
import UserVideoComponent from "./UserVideoComponent";
import { toast, Slide, Bounce } from "react-toastify";
import EntranceComponent from "../components/game/EntranceComponent";

import MicON from "../assets/img/room/MicOn.png";
import MicOFF from "../assets/img/room/MicOff.png";
import CameraON from "../assets/img/room/CameraOn.png";
import CameraOFF from "../assets/img/room/CameraOff.png";
import LoadingSpinner from "../assets/img/loading/loading.gif";

const Room = () => {
  const { session, getToken } = useOpenVidu();
  const [mySessionId, setMySessionId] = useState("");
  const [myUserName, setMyUserName] = useState("");
  const [gameState, setGameState] = useState("entrance");
  const [isLoading, setIsLoading] = useState(false);
  // 팀 정보
  const [teamA, setTeamA] = useState(Array(4).fill(null));
  const [teamB, setTeamB] = useState(Array(4).fill(null));
  const [teamW, setTeamW] = useState(Array(8).fill(null));
  // 클라이언트 정보
  const [myTeam, setMyTeam] = useState("");
  const [myStreamId, setMyStreamId] = useState("");
  // 클라이언트 영상, 마이크 제어
  const [cameraOn, setCameraOn] = useState(true);
  const [micOn, setMicOn] = useState(true);
  // 상태 최신화 참조
  const myTeamRef = useRef(myTeam);
  const myStreamIdRef = useRef(myStreamId);
  const sessionRef = useRef(session);
  const teamARef = useRef(teamA);
  const teamBRef = useRef(teamB);
  const teamWRef = useRef(teamW);

  // 방 입장 핸들러(임시)
  const handleEnter = (sessionId, userName) => {
    setMySessionId(sessionId);
    setMyUserName(userName);
    setIsLoading(true);
    joinSession();
    // setGameState("waitingRoom"); // 대기방으로 상태 변경
    // 1초 후에 로딩 상태를 false로 변경하고 대기방으로 이동
    setTimeout(() => {
      setIsLoading(false);
      setGameState("waitingRoom");
    }, 1000); // 1초 대기
  };

  useEffect(() => {
    myTeamRef.current = myTeam;
    myStreamIdRef.current = myStreamId;
    sessionRef.current = session;
    teamARef.current = teamA;
    teamBRef.current = teamB;
    teamWRef.current = teamW;
  }, [myTeam, myStreamId, session, teamA, teamB, teamW]);

  useEffect(() => {
    if (session) {
      // Get a token from the OpenVidu deployment
      getToken(mySessionId).then(async (token) => {
        try {
          await session.connect(token, { clientData: myUserName }).then(() => {
            requestTeamInfo();
          });

          let publisher = await OV.current.initPublisherAsync(undefined, {
            audioSource: undefined,
            videoSource: undefined,
            publishAudio: true,
            publishVideo: true,
            resolution: "640x480",
            frameRate: 30,
            insertMode: "APPEND",
            mirror: false,
          });

          // session.publish(publisher);
          // 방 입장 시 대기열에 배치하기 위해 동기적 처리
          await session.publish(publisher);

          const devices = await OV.current.getDevices();
          const videoDevices = devices.filter((device) => device.kind === "videoinput");
          const currentVideoDeviceId = publisher.stream
            .getMediaStream()
            .getVideoTracks()[0]
            .getSettings().deviceId;
          const currentVideoDevice = videoDevices.find(
            (device) => device.deviceId === currentVideoDeviceId
          );

          setMainStreamManager(publisher);
          setPublisher(publisher);
          setCurrentVideoDevice(currentVideoDevice);
          // 방 입장 시 대기열에 배치
          handleSelectTeam(publisher.stream.streamId, "W");

          session.on("streamDestroyed", (event) => {
            deleteSubscriber(event.stream.streamManager);
          });

          // 팀 선택 수신
          session.on("signal:team-choice", (event) => {
            const { streamId, team } = JSON.parse(event.data);
            updateTeamChoice(streamId, team);
          });

          // 기존 사용자가 팀 정보 요청 신호 수신 시 응답2
          session.on("signal:team-info-request", (event) => {
            const currentUser = JSON.parse(session.connection.data).clientData;
            const newUser = JSON.parse(event.from.data).clientData;

            if (currentUser !== newUser) {
              toast.info(newUser + "님이 입장하셨습니다.", {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
              });

              if (myTeamRef.current === "A" || myTeamRef.current === "B") {
                const index =
                  myTeamRef.current === "A"
                    ? teamARef.current.indexOf(myStreamIdRef.current)
                    : teamBRef.current.indexOf(myStreamIdRef.current);
                sessionRef.current.signal({
                  data: JSON.stringify({
                    streamId: myStreamIdRef.current,
                    team: myTeamRef.current,
                    index,
                  }),
                  type: "team-info-response",
                  to: [event.from],
                });
              } else if (myTeamRef.current === "W") {
                const index = teamWRef.current.indexOf(myStreamIdRef.current);
                sessionRef.current.signal({
                  data: JSON.stringify({ streamId: myStreamIdRef.current, team: "W", index }),
                  type: "team-info-response",
                  to: [event.from],
                });
              }
            }
          });

          // 새 사용자가 팀 정보 응답 신호 수신
          session.on("signal:team-info-response", (event) => {
            const { streamId, team, index } = JSON.parse(event.data);

            if (team === "A") {
              setTeamA((prev) => {
                const newTeamA = [...prev];
                newTeamA[index] = streamId;
                return newTeamA;
              });
            } else if (team === "B") {
              setTeamB((prev) => {
                const newTeamB = [...prev];
                newTeamB[index] = streamId;
                return newTeamB;
              });
            } else if (team === "W") {
              setTeamW((prev) => {
                const newTeamW = [...prev];
                if (newTeamW[index] === null) {
                  newTeamW[index] = streamId;
                } else {
                  newTeamW[index + 1] = streamId;
                }
                return newTeamW;
              });
            }
          });
        } catch (error) {
          console.log("There was an error connecting to the session:", error.code, error.message);
        }
      });
    }
  }, [session, myUserName]);

  // 팀 선택 및 업데이트 로직
  // 이벤트 핸들러
  // 카메라 토글
  const toggleCamera = useCallback(() => {
    const newCameraOn = !cameraOn;

    if (mainStreamManager) {
      mainStreamManager.publishVideo(newCameraOn);
      toast.dismiss();
      toast.success(`${newCameraOn ? "카메라 ON" : "카메라 OFF"}`, {
        position: "top-center",
        autoClose: 500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Slide,
      });
    }

    setCameraOn(newCameraOn);
  }, [cameraOn, mainStreamManager]);

  // 마이크 토글
  const toggleMic = useCallback(() => {
    const newMicOn = !micOn;

    if (mainStreamManager) {
      mainStreamManager.publishAudio(newMicOn);
      toast.dismiss();
      toast.success(`${newMicOn ? "마이크 ON" : "마이크 OFF"}`, {
        position: "top-center",
        autoClose: 500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Slide,
      });
    }
    setMicOn(newMicOn);
  }, [micOn, mainStreamManager]);

  // 팀 선택 핸들러
  const handleSelectTeam = (streamId, team) => {
    setMyTeam(team);
    setMyStreamId(streamId);
    updateTeamChoice(streamId, team);
    sendTeamChoice(streamId, team);
  };

  // 팀 선택 신호 보내기
  const sendTeamChoice = (streamId, team) => {
    session.signal({
      data: JSON.stringify({ streamId, team }),
      type: "team-choice",
    });
  };

  // 팀 선택 업데이트
  const updateTeamChoice = (streamId, team) => {
    const replaceStreamIdWithNull = (teamArray, oldStreamId, type) => {
      let newArray = [...teamArray];
      const index = newArray.indexOf(oldStreamId);

      // oldStreamId가 있는 경우, 해당 위치에서 제거
      if (index !== -1) {
        newArray.splice(index, 1);
      }

      // 배열의 크기를 유지하기 위해 null 추가
      while (newArray.length < (type === 1 ? 4 : 8)) {
        newArray.push(null);
      }

      return newArray;
    };

    const updateTeamArray = (teamArray, newStreamId) => {
      const newArray = [...teamArray];
      const nullIndex = newArray.indexOf(null);
      if (newArray.includes(newStreamId)) {
        // 이미 배열에 streamId가 있으면 아무것도 하지 않음
        return newArray;
      } else if (nullIndex !== -1) {
        // null 값을 찾아서 새 streamId로 교체
        newArray[nullIndex] = newStreamId;
        return newArray;
      } else {
        // 모든 자리가 차있으면 새 streamId를 추가하지 않음
        return newArray;
      }
    };

    if (team === "A" && !isTeamFull(teamA)) {
      setTeamB((prev) => replaceStreamIdWithNull(prev, streamId, 1)); // 다른 팀에서 현재 streamId를 null로 대체
      setTeamW((prev) => replaceStreamIdWithNull(prev, streamId, 0));
      setTeamA((prev) => updateTeamArray(prev, streamId)); // 현재 팀에 streamId 추가
    } else if (team === "B" && !isTeamFull(teamB)) {
      setTeamA((prev) => replaceStreamIdWithNull(prev, streamId, 1));
      setTeamW((prev) => replaceStreamIdWithNull(prev, streamId, 0));
      setTeamB((prev) => updateTeamArray(prev, streamId));
    } else if (team === "W" && !isTeamFull2(teamW)) {
      setTeamA((prev) => replaceStreamIdWithNull(prev, streamId, 1));
      setTeamB((prev) => replaceStreamIdWithNull(prev, streamId, 1));
      setTeamW((prev) => updateTeamArray(prev, streamId));
    }
  };

  // 새 사용자가 세션에 접속할 때 팀 정보 요청 신호 보내기
  const requestTeamInfo = () => {
    session.signal({
      data: "", // 필요한 경우 추가 데이터 전송
      type: "team-info-request",
    });
  };

  const leaveSession = useCallback(() => {
    // Leave the session
    if (session) {
      session.disconnect();
    }

    // Reset all states and OpenVidu object
    OV.current = new OpenVidu();
    setSession(undefined);
    setSubscribers([]);
    setMySessionId("");
    setMyUserName("");
    setMainStreamManager(undefined);
    setPublisher(undefined);
    setTeamA(Array(4).fill(null));
    setTeamB(Array(4).fill(null));
    setTeamW(Array(8).fill(null));
    setGameState("entrance");
  }, [session]);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      leaveSession();
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [leaveSession]);

  const deleteSubscriber = useCallback((streamManager) => {
    // 제거할 스트림 ID 추출
    const streamIdToRemove = streamManager.stream.streamId;

    setSubscribers((prevSubscribers) => {
      const index = prevSubscribers.indexOf(streamManager);
      if (index > -1) {
        const newSubscribers = [...prevSubscribers];
        newSubscribers.splice(index, 1);
        return newSubscribers;
      } else {
        return prevSubscribers;
      }
    });

    // TeamA 배열에서 해당 사용자를 null로 대체
    setTeamA((prevTeamA) => {
      const index = prevTeamA.indexOf(streamIdToRemove);
      if (index !== -1) {
        const newTeamA = [...prevTeamA];
        // newTeamA[index] = null;
        newTeamA.splice(index, 1);
        while (newTeamA.length < 4) {
          newTeamA.push(null);
        }
        return newTeamA;
      } else {
        return prevTeamA;
      }
    });

    // TeamB 배열에서 해당 사용자를 null로 대체
    setTeamB((prevTeamB) => {
      const index = prevTeamB.indexOf(streamIdToRemove);
      if (index !== -1) {
        const newTeamB = [...prevTeamB];
        // newTeamB[index] = null;
        newTeamB.splice(index, 1);
        while (newTeamB.length < 4) {
          newTeamB.push(null);
        }
        return newTeamB;
      } else {
        return prevTeamB;
      }
    });

    setTeamW((prevTeamW) => {
      const index = prevTeamW.indexOf(streamIdToRemove);
      if (index !== -1) {
        const newTeamW = [...prevTeamW];
        // newTeamW[index] = null;
        newTeamW.splice(index, 1);
        while (newTeamW.length < 8) {
          newTeamW.push(null);
        }
        return newTeamW;
      } else {
        return prevTeamW;
      }
    });
  }, []);

  return (
    <>
      {isLoading && (
        <div className="flex justify-center items-center text-center">
          <div>
            로딩중...<img src={LoadingSpinner}></img>
          </div>
        </div>
      )}
      {!isLoading && gameState === "entrance" && <EntranceComponent onEnter={handleEnter} />}
      {!isLoading && gameState === "waitingRoom" && (
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
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Room;
