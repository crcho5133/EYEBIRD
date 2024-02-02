import { useState, useEffect, useRef, useCallback } from "react";
import { useParams, useLocation } from "react-router-dom";
import { OpenVidu } from "openvidu-browser";
import { toast, Slide, Bounce } from "react-toastify";
import axios from "axios";
// 게임 매칭 화면(일반 / 랭크 case로 구분)
import GamePlay from "../components/game/GamePlay";
// import GameResult from "./GameResult";
import LoadingSpinner from "../assets/img/loading/loading.gif";

const APPLICATION_SERVER_URL = "http://localhost:8080/";

const Game = () => {
  // 사용자 닉네임, 방 세션 할당은 백엔드랑 통신할 때 수정하기
  // let { sessionId } = useParams();
  const { sessionId: gameId } = useParams();
  const location = useLocation();
  const token = sessionStorage.getItem("accessToken");

  const [gameState, setGameState] = useState("entrance");
  const [isLoading, setIsLoading] = useState(false);

  // 게임 상태 전환 함수
  const changeGameState = (newState) => {
    setIsLoading(true); // 로딩 시작
    // 여기서 필요한 데이터 로딩 또는 처리
    // ...
    setGameState(newState); // 새 게임 상태 설정
    setIsLoading(false); // 로딩 완료
  };

  // 상태 및 참조 변수
  const [mySessionId, setMySessionId] = useState(gameId);
  const [myUserName, setMyUserName] = useState(sessionStorage.getItem("nickname"));
  const [session, setSession] = useState(undefined);
  const [mainStreamManager, setMainStreamManager] = useState(undefined);
  const [publisher, setPublisher] = useState(undefined);
  const [subscriber, setSubscriber] = useState(undefined);

  const [ready, setReady] = useState(false);
  const [opponentReady, setOpponentReady] = useState(false);

  // 이 변수 switch camera 전용 변수? 확인하기
  const [currentVideoDevice, setCurrentVideoDevice] = useState(null);

  // 상태 최신화 참조
  const sessionRef = useRef(session);
  const mySessionIdRef = useRef(mySessionId);

  // OpenVidu 라이브러리 사용
  const OV = useRef(new OpenVidu());
  OV.current.enableProdMode();

  useEffect(() => {
    if (mySessionId && myUserName) {
      setIsLoading(true);
      joinSession();
      setTimeout(() => {
        setIsLoading(false);
        setGameState("gamePlay");
      }, 1000);
    }
  }, [mySessionId, myUserName]);

  // useEffect 훅
  useEffect(() => {
    sessionRef.current = session;
    mySessionIdRef.current = mySessionId;
  }, [session, mySessionId]);

  useEffect(() => {
    if (session) {
      // Get a token from the OpenVidu deployment
      getToken2().then(async (token) => {
        try {
          await session.connect(token, { clientData: myUserName });

          let publisher = await OV.current.initPublisherAsync(undefined, {
            audioSource: undefined,
            videoSource: undefined,
            publishAudio: false,
            publishVideo: true,
            resolution: "640x480",
            frameRate: 30,
            insertMode: "APPEND",
            mirror: false,
          });

          session.publish(publisher);

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
        } catch (error) {
          console.log("There was an error connecting to the session:", error.code, error.message);
        }
      });
    }
  }, [session, myUserName]);

  // // 마이크 토글
  // const toggleMic = useCallback(() => {
  //   const newMicOn = !micOn;

  //   if (mainStreamManager) {
  //     mainStreamManager.publishAudio(newMicOn);
  //     toast.dismiss();
  //     toast.success(`${newMicOn ? "마이크 ON" : "마이크 OFF"}`, {
  //       position: "top-center",
  //       autoClose: 500,
  //       hideProgressBar: true,
  //       closeOnClick: true,
  //       pauseOnHover: false,
  //       draggable: true,
  //       progress: undefined,
  //       theme: "colored",
  //       transition: Slide,
  //     });
  //   }
  //   setMicOn(newMicOn);
  // }, [micOn, mainStreamManager]);

  // 게임 준비 완료 신호 보내기
  const sendReady = () => {
    session.signal({
      data: myUserName,
      type: "ready",
    });
  };

  // // 새 사용자가 세션에 접속할 때 팀 정보 요청 신호 보내기
  // const requestTeamInfo = () => {
  //   session.signal({
  //     data: "", // 필요한 경우 추가 데이터 전송
  //     type: "team-info-request",
  //   });
  // };

  const joinSession = useCallback(() => {
    const mySession = OV.current.initSession();

    mySession.on("streamCreated", (event) => {
      const subscriber = mySession.subscribe(event.stream, undefined);
      setSubscriber(subscriber);
    });

    mySession.on("streamDestroyed", (event) => {
      deleteSubscriber(event.stream.streamManager);
    });

    mySession.on("exception", (exception) => {
      console.warn(exception);
    });

    mySession.on("signal:ready", (event) => {
      const username = event.data;
      if (username !== myUserName) {
        setOpponentReady(true);
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
    setSubscriber(undefined);
    setMySessionId("");
    setMyUserName("");
    setMainStreamManager(undefined);
    setPublisher(undefined);
  }, [session]);

  const deleteSubscriber = useCallback((streamManager) => {
    setSubscriber(streamManager);
  }, []);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      leaveSession();
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [leaveSession]);

  const getToken2 = async () => {
    const response = await axios.post(
      APPLICATION_SERVER_URL + "api/point/enter",
      { gameId: gameId },
      {
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
      }
    );
    console.log(response);
    return response.data.token; // The token
  };

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

  const readyProps = {
    ready,
    setReady,
    opponentReady,
    setOpponentReady,
    sendReady,
  };

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
      {/* {!isLoading && gameState === "gameLoading" && (
        <GameLoading
          toggleCamera={toggleCamera}
          toggleMic={toggleMic}
          leaveSession={leaveSession}
        />
      )} */}
      {!isLoading && gameState === "gamePlay" && (
        <GamePlay publisher={publisher} subscriber={subscriber} {...readyProps} />
      )}
      {!isLoading && gameState === "gameResult" && <GameResult /* 필요한 props */ />}
    </>
  );
};

export default Game;
