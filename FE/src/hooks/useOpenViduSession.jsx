import { useState, useCallback, useEffect, useRef } from "react";
import { OpenVidu } from "openvidu-browser";
import axios from "axios";

const APPLICATION_SERVER_URL = "http://localhost:5000/";

export default function useSession(initialSessionId, initialUserName) {
  const [mySessionId, setMySessionId] = useState(initialSessionId);
  const [myUserName, setMyUserName] = useState(initialUserName);
  const [session, setSession] = useState(undefined);
  const [mainStreamManager, setMainStreamManager] = useState(undefined);
  const [publisher, setPublisher] = useState(undefined);
  const [subscribers, setSubscribers] = useState([]);
  const [currentVideoDevice, setCurrentVideoDevice] = useState(null);
  const OV = useRef(new OpenVidu());

  // ... 여기에 추가적인 상태 변수를 선언할 수 있습니다 ...

  const joinSession = useCallback((e) => {
    e.preventDefault();
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
    if (session) {
      session.disconnect();
    }

    OV.current = new OpenVidu();
    setSession(undefined);
    setSubscribers([]);
    setMySessionId("SessionA");
    setMyUserName("Participant" + Math.floor(Math.random() * 100));
    setMainStreamManager(undefined);
    setPublisher(undefined);
  }, [session]);

  useEffect(() => {
    if (session) {
      // Get a token from the OpenVidu deployment
      getToken().then(async (token) => {
        try {
          await session.connect(token, { clientData: myUserName }).then(() => {
            requestTeamInfo();
            // handleSelectTeam(publisher.stream.streamId, "W");
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
  }, [session, myUserName]);

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
        newTeamA[index] = null;
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
        newTeamB[index] = null;
        return newTeamB;
      } else {
        return prevTeamB;
      }
    });

    setTeamW((prevTeamW) => {
      const index = prevTeamW.indexOf(streamIdToRemove);
      if (index !== -1) {
        const newTeamW = [...prevTeamW];
        newTeamW[index] = null;
        return newTeamW;
      } else {
        return prevTeamW;
      }
    });
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

  return {
    mySessionId,
    setMySessionId,
    myUserName,
    setMyUserName,
    session,
    joinSession,
    leaveSession,
    mainStreamManager,
    setMainStreamManager,
    publisher,
    setPublisher,
    subscribers,
    setSubscribers,
    // ... 반환할 다른 상태 및 함수들 ...
  };
}
