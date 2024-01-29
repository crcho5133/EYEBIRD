import { useState, useEffect, useRef, useCallback } from "react";
import { useParams, useLocation } from "react-router-dom";
import { OpenVidu } from "openvidu-browser";
import { toast, Slide, Bounce } from "react-toastify";
import axios from "axios";
import WaitingRoom from "../components/room/WaitingRoom";
// 게임 매칭 화면(일반 / 랭크 case로 구분)
// import GamePlay from "./GamePlay";
// import GameResult from "./GameResult";
import MicON from "../assets/img/room/MicOn.png";
import MicOFF from "../assets/img/room/MicOff.png";
import CameraON from "../assets/img/room/CameraOn.png";
import CameraOFF from "../assets/img/room/CameraOff.png";
import LoadingSpinner from "../assets/img/loading/loading.gif";

const APPLICATION_SERVER_URL = "http://localhost:5000/";

const Room = () => {
  // 사용자 닉네임, 방 세션 할당은 백엔드랑 통신할 때 수정하기
  // let { sessionId } = useParams();
  const { sessionId: roomId } = useParams();
  const location = useLocation();

  const [gameState, setGameState] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // 상태 전환 함수
  const changeGameState = (newState) => {
    setIsLoading(true); // 로딩 시작
    // 여기서 필요한 데이터 로딩 또는 처리
    // ...
    setGameState(newState); // 새 게임 상태 설정
    setIsLoading(false); // 로딩 완료
  };

  // 상태 및 참조 변수
  const [mySessionId, setMySessionId] = useState(roomId);
  const [myUserName, setMyUserName] = useState(location.state.userName);
  const [session, setSession] = useState(undefined);
  const [mainStreamManager, setMainStreamManager] = useState(undefined);
  const [publisher, setPublisher] = useState(undefined);
  const [subscribers, setSubscribers] = useState([]);
  // 이 변수 switch camera 전용 변수? 확인하기
  const [currentVideoDevice, setCurrentVideoDevice] = useState(null);
  // 팀 A, B
  const [teamA, setTeamA] = useState(Array(4).fill(null));
  const [teamB, setTeamB] = useState(Array(4).fill(null));
  // 대기열
  const [teamW, setTeamW] = useState(Array(8).fill(null));
  // 클라이언트 정보
  const [myTeam, setMyTeam] = useState("");
  const [myStreamId, setMyStreamId] = useState("");
  // 클라이언트 영상, 마이크 제어
  const [cameraOn, setCameraOn] = useState(true);
  const [micOn, setMicOn] = useState(true);
  // 채팅
  const [chatMessages, setChatMessages] = useState([]);
  const [teamChatMessages, setTeamChatMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [chatMode, setChatMode] = useState("all");
  // 상태 최신화 참조
  const myTeamRef = useRef(myTeam);
  const myStreamIdRef = useRef(myStreamId);
  const sessionRef = useRef(session);
  const teamARef = useRef(teamA);
  const teamBRef = useRef(teamB);
  const teamWRef = useRef(teamW);
  // OpenVidu 라이브러리 사용
  const OV = useRef(new OpenVidu());
  // 로그 에러만 출력
  // OV.current.enableProdMode();

  // useEffect 훅
  useEffect(() => {
    myTeamRef.current = myTeam;
    myStreamIdRef.current = myStreamId;
    sessionRef.current = session;
    teamARef.current = teamA;
    teamBRef.current = teamB;
    teamWRef.current = teamW;
  }, [myTeam, myStreamId, session, teamA, teamB, teamW]);

  useEffect(() => {
    if (mySessionId && myUserName) {
      setIsLoading(true);
      joinSession();
      setTimeout(() => {
        setIsLoading(false);
        setGameState("waitingRoom");
      }, 1000);
    }
  }, [mySessionId, myUserName]);

  useEffect(() => {
    if (session) {
      // Get a token from the OpenVidu deployment
      getToken().then(async (token) => {
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
        } catch (error) {
          console.log("There was an error connecting to the session:", error.code, error.message);
        }
      });
    }
  }, [session, mySessionId, myUserName]);

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

  // 채팅 메시지 전송 함수
  const sendChatMessage = () => {
    const message = {
      content: currentMessage,
      sender: myUserName,
      mode: chatMode, // 'all', 'A', 'B'
      timestamp: new Date().toISOString(),
    };

    session.signal({
      data: JSON.stringify(message),
      type: "chat",
    });

    setCurrentMessage("");
  };

  const chatProps = {
    chatMessages,
    teamChatMessages,
    currentMessage,
    chatMode,
    setCurrentMessage,
    sendChatMessage,
    setChatMode,
  };

  // 팀 선택 핸들러
  const handleSelectTeam = (streamId, team) => {
    setMyTeam(team);
    setMyStreamId(streamId);
    updateTeamChoice(streamId, team);
    setTeamChatMessages([]);
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

  const joinSession = useCallback(() => {
    const mySession = OV.current.initSession();

    mySession.on("streamCreated", (event) => {
      const subscriber = mySession.subscribe(event.stream, undefined);
      setSubscribers((subscribers) => [...subscribers, subscriber]);
    });

    mySession.on("streamDestroyed", (event) => {
      deleteSubscriber(event.stream.streamManager);
    });

    mySession.on("exception", (exception) => {
      console.warn(exception);
    });

    // 채팅 이벤트 리스너 설정
    mySession.on("signal:chat", (event) => {
      const receivedMessage = JSON.parse(event.data);
      // 전체 채팅 추가
      if (receivedMessage.mode === "all") {
        setChatMessages((prevMessages) => [...prevMessages, receivedMessage]);
      } else if (receivedMessage.mode === myTeamRef.current) {
        setTeamChatMessages((prevMessages) => [...prevMessages, receivedMessage]);
      }
    });

    // 팀 선택 수신
    mySession.on("signal:team-choice", (event) => {
      const { streamId, team } = JSON.parse(event.data);
      updateTeamChoice(streamId, team);
    });

    // 기존 사용자가 팀 정보 요청 신호 수신 시 응답2
    mySession.on("signal:team-info-request", (event) => {
      const currentUser = JSON.parse(mySession.connection.data).clientData;
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
    mySession.on("signal:team-info-response", (event) => {
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

    setSession(mySession);
  }, []);

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

  const getToken = useCallback(async () => {
    return createSession(mySessionId).then((sessionId) => createToken(sessionId));
  }, [mySessionId]);

  const createSession = async (sessionId) => {
    const response = await axios.post(
      APPLICATION_SERVER_URL + "api/sessions",
      { customSessionId: sessionId },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data; // The sessionId
  };

  const createToken = async (sessionId) => {
    const response = await axios.post(
      APPLICATION_SERVER_URL + "api/sessions/" + sessionId + "/connections",
      {},
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data; // The token
  };

  // 유틸리티 함수
  const isTeamFull = (team) => team.filter((id) => id !== null).length >= 4;
  const isTeamFull2 = (team) => team.filter((id) => id !== null).length >= 8;

  // 라우팅 구성
  return (
    <>
      {isLoading && (
        <div className="flex justify-center items-center text-center">
          <div>
            로딩중...<img src={LoadingSpinner}></img>
          </div>
        </div>
      )}
      {!isLoading && gameState === "waitingRoom" && (
        <WaitingRoom
          publisher={publisher}
          subscribers={subscribers}
          mySessionId={mySessionId}
          myStreamId={myStreamId}
          myTeam={myTeam}
          teamA={teamA}
          teamB={teamB}
          teamW={teamW}
          cameraOn={cameraOn}
          micOn={micOn}
          toggleCamera={toggleCamera}
          toggleMic={toggleMic}
          leaveSession={leaveSession}
          handleSelectTeam={handleSelectTeam}
          isTeamFull={isTeamFull}
          isTeamFull2={isTeamFull2}
          MicON={MicON}
          MicOFF={MicOFF}
          CameraON={CameraON}
          CameraOFF={CameraOFF}
          {...chatProps}
        />
      )}
      {!isLoading && gameState === "gamePlay" && <GamePlay /* 필요한 props */ />}
      {!isLoading && gameState === "gameResult" && <GameResult /* 필요한 props */ />}
    </>
  );
};

export default Room;
