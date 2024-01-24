import { OpenVidu } from "openvidu-browser";

import axios from "axios";
import React, { useCallback, useEffect, useRef, useState } from "react";
import UserVideoComponent from "./components/game/UserVideoComponent";

import MicON from "./assets/img/room/MicOn.png";
import MicOFF from "./assets/img/room/MicOff.png";
import CameraON from "./assets/img/room/CameraOn.png";
import CameraOFF from "./assets/img/room/CameraOff.png";

const APPLICATION_SERVER_URL = "http://localhost:5000/";

export default function App() {
  const [mySessionId, setMySessionId] = useState("SessionA");
  const [myUserName, setMyUserName] = useState(`Participant${Math.floor(Math.random() * 100)}`);
  const [session, setSession] = useState(undefined);
  const [mainStreamManager, setMainStreamManager] = useState(undefined);
  const [publisher, setPublisher] = useState(undefined);
  const [subscribers, setSubscribers] = useState([]);
  const [currentVideoDevice, setCurrentVideoDevice] = useState(null);
  // // 팀 상태 추가
  // const [teamA, setTeamA] = useState([]);
  // const [teamB, setTeamB] = useState([]);

  // 팀 상태 추가2
  const [teamA, setTeamA] = useState(Array(4).fill(null));
  const [teamB, setTeamB] = useState(Array(4).fill(null));

  const [myTeam, setMyTeam] = useState("");
  const [myStreamId, setMyStreamId] = useState("");

  const myTeamRef = useRef(myTeam);
  const myStreamIdRef = useRef(myStreamId);
  const sessionRef = useRef(session);
  const teamARef = useRef(teamA);
  const teamBRef = useRef(teamB);

  // myTeam 상태가 변경될 때마다 Ref 업데이트
  // myStreamId, session 상태도 추가
  useEffect(() => {
    myTeamRef.current = myTeam;
    myStreamIdRef.current = myStreamId;
    sessionRef.current = session;
    teamARef.current = teamA;
    teamBRef.current = teamB;
  }, [myTeam, myStreamId, session, teamA, teamB]);

  const isTeamFull = (team) => team.filter((id) => id !== null).length >= 4;

  // 자신의 영상, 마이크 제어
  const [cameraOn, setCameraOn] = useState(true);
  const [micOn, setMicOn] = useState(true);

  const toggleCamera = useCallback(() => {
    if (mainStreamManager) {
      setCameraOn((prevCameraOn) => {
        mainStreamManager.publishVideo(!prevCameraOn);
        return !prevCameraOn;
      });
    }
  }, [mainStreamManager]);

  const toggleMic = useCallback(() => {
    if (mainStreamManager) {
      setMicOn((prevMicOn) => {
        mainStreamManager.publishAudio(!prevMicOn);
        return !prevMicOn;
      });
    }
  }, [mainStreamManager]);

  // 팀 선택 핸들러
  const handleSelectTeam = (streamId, team) => {
    setMyTeam(team);
    setMyStreamId(streamId);
    updateTeamChoice(streamId, team);
    sendTeamChoice(streamId, team);
    // console.log("ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ");
    // console.log(teamA);
    // console.log(teamB);
    // console.log(myTeam);
    // console.log(mySessionId);
    // console.log("ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ");
  };

  // 팀 선택 신호 보내기
  const sendTeamChoice = (streamId, team) => {
    // console.log("asdnhaslkdhaojsdhokjalsdhkasldhlkashdnjlkasbndjlkc");
    // console.log(streamId);
    // console.log(team);
    // console.log("asdnhaslkdhaojsdhokjalsdhkasldhlkashdnjlkasbndjlkc");
    session.signal({
      data: JSON.stringify({ streamId, team }),
      type: "team-choice",
    });
  };

  // // 팀 선택 업데이트
  // const updateTeamChoice = (streamId, team) => {
  //   if (team === "A") {
  //     setTeamA((prev) => [...prev.filter((id) => id !== streamId), streamId]);
  //     setTeamB((prev) => prev.filter((id) => id !== streamId));
  //   } else if (team === "B") {
  //     setTeamB((prev) => [...prev.filter((id) => id !== streamId), streamId]);
  //     setTeamA((prev) => prev.filter((id) => id !== streamId));
  //   }
  // };

  // 팀 선택 업데이트2
  const updateTeamChoice = (streamId, team) => {
    const replaceStreamIdWithNull = (teamArray, oldStreamId) => {
      let newArray = [...teamArray];
      const index = newArray.indexOf(oldStreamId);

      // oldStreamId가 있는 경우, 해당 위치에서 제거
      if (index !== -1) {
        newArray.splice(index, 1);
      }

      // 배열의 크기를 유지하기 위해 null 추가
      while (newArray.length < 4) {
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
      setTeamB((prev) => replaceStreamIdWithNull(prev, streamId)); // 다른 팀에서 현재 streamId를 null로 대체
      setTeamA((prev) => updateTeamArray(prev, streamId)); // 현재 팀에 streamId 추가
    } else if (team === "B" && !isTeamFull(teamB)) {
      setTeamA((prev) => replaceStreamIdWithNull(prev, streamId)); // 다른 팀에서 현재 streamId를 null로 대체
      setTeamB((prev) => updateTeamArray(prev, streamId)); // 현재 팀에 streamId 추가
    }
  };

  // 새 사용자가 세션에 접속할 때 팀 정보 요청 신호 보내기
  const requestTeamInfo = () => {
    session.signal({
      data: "", // 필요한 경우 추가 데이터 전송
      type: "team-info-request",
    });
  };

  const OV = useRef(new OpenVidu());

  const handleChangeSessionId = useCallback((e) => {
    setMySessionId(e.target.value);
  }, []);

  const handleChangeUserName = useCallback((e) => {
    setMyUserName(e.target.value);
  }, []);

  const handleMainVideoStream = useCallback(
    (stream) => {
      if (mainStreamManager !== stream) {
        setMainStreamManager(stream);
      }
    },
    [mainStreamManager]
  );

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

    // 수신
    mySession.on("signal:team-choice", (event) => {
      const { streamId, team } = JSON.parse(event.data);
      // console.log("ㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗ");
      // console.log(streamId);
      // console.log(team);
      // console.log("ㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗ");
      updateTeamChoice(streamId, team);
    });

    // // 기존 사용자가 팀 정보 요청 신호 수신 시 응답
    // mySession.on("signal:team-info-request", (event) => {
    //   // console.log("ㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏ");
    //   // console.log(myTeamRef.current);
    //   // console.log(event);
    //   // console.log("ㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏ");
    //   if (myTeamRef.current) {
    //     // console.log("성공함");
    //     // myTeam은 현재 사용자의 팀 정보
    //     sessionRef.current.signal({
    //       data: JSON.stringify({ streamId: myStreamIdRef.current, team: myTeamRef.current }),
    //       type: "team-info-response",
    //       to: [event.from], // 신호를 보낸 사용자에게만 응답
    //     });
    //   }
    // });

    // 기존 사용자가 팀 정보 요청 신호 수신 시 응답2
    mySession.on("signal:team-info-request", (event) => {
      if (myTeamRef.current) {
        const index =
          myTeamRef.current === "A"
            ? teamARef.current.indexOf(myStreamIdRef.current)
            : teamBRef.current.indexOf(myStreamIdRef.current);
        sessionRef.current.signal({
          data: JSON.stringify({ streamId: myStreamIdRef.current, team: myTeamRef.current, index }),
          type: "team-info-response",
          to: [event.from],
        });
      }
    });

    // // 새 사용자가 팀 정보 응답 신호 수신
    // mySession.on("signal:team-info-response", (event) => {
    //   // console.log("mmmmmmmmmmmmmm");
    //   // console.log(myTeam);
    //   // console.log(event);
    //   // console.log("mmmmmmmmmmmmmm");
    //   const { streamId, team } = JSON.parse(event.data);
    //   // console.log(streamId);
    //   // console.log(team);
    //   // console.log("mmmmmmmmmmmmmm");
    //   updateTeamChoice(streamId, team);
    // });

    // 새 사용자가 팀 정보 응답 신호 수신2
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
      }
    });

    setSession(mySession);
  }, []);

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
          console.log("ggggggggggggggggggggggggg");
          console.log(publisher);
          console.log("ggggggggggggggggggggggggg");
        } catch (error) {
          console.log("There was an error connecting to the session:", error.code, error.message);
        }
      });
    }
  }, [session, myUserName]);

  const leaveSession = useCallback(() => {
    // Leave the session
    if (session) {
      session.disconnect();
    }

    // Reset all states and OpenVidu object
    OV.current = new OpenVidu();
    setSession(undefined);
    setSubscribers([]);
    setMySessionId("SessionA");
    setMyUserName("Participant" + Math.floor(Math.random() * 100));
    setMainStreamManager(undefined);
    setPublisher(undefined);
  }, [session]);

  const switchCamera = useCallback(async () => {
    try {
      const devices = await OV.current.getDevices();
      const videoDevices = devices.filter((device) => device.kind === "videoinput");

      if (videoDevices && videoDevices.length > 1) {
        const newVideoDevice = videoDevices.filter(
          (device) => device.deviceId !== currentVideoDevice.deviceId
        );

        if (newVideoDevice.length > 0) {
          const newPublisher = OV.current.initPublisher(undefined, {
            videoSource: newVideoDevice[0].deviceId,
            publishAudio: true,
            publishVideo: true,
            mirror: true,
          });

          if (session) {
            await session.unpublish(mainStreamManager);
            await session.publish(newPublisher);
            setCurrentVideoDevice(newVideoDevice[0]);
            setMainStreamManager(newPublisher);
            setPublisher(newPublisher);
          }
        }
      }
    } catch (e) {
      console.error(e);
    }
  }, [currentVideoDevice, session, mainStreamManager]);

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

  /**
   * --------------------------------------------
   * GETTING A TOKEN FROM YOUR APPLICATION SERVER
   * --------------------------------------------
   * The methods below request the creation of a Session and a Token to
   * your application server. This keeps your OpenVidu deployment secure.
   *
   * In this sample code, there is no user control at all. Anybody could
   * access your application server endpoints! In a real production
   * environment, your application server must identify the user to allow
   * access to the endpoints.
   *
   * Visit https://docs.openvidu.io/en/stable/application-server to learn
   * more about the integration of OpenVidu in your application server.
   */
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
  return (
    <div className="container mx-auto">
      {session === undefined ? (
        <div id="join">
          <div
            id="img-div"
            className="text-center absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          ></div>
          <div
            id="join-dialog"
            className="jumbotron absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          >
            <h1 className="text-gray-700 font-bold text-center">Join a video session</h1>
            <form className="form-group" onSubmit={joinSession}>
              <p>
                <label className="text-blue-600">Participant: </label>
                <input
                  className="form-control text-blue-600 font-bold focus:border-blue-600 focus:ring-blue-600"
                  type="text"
                  id="userName"
                  value={myUserName}
                  onChange={handleChangeUserName}
                  required
                />
              </p>
              <p>
                <label className="text-blue-600">Session: </label>
                <input
                  className="form-control text-blue-600 font-bold focus:border-blue-600 focus:ring-blue-600"
                  type="text"
                  id="sessionId"
                  value={mySessionId}
                  onChange={handleChangeSessionId}
                  required
                />
              </p>
              <p className="text-center">
                <input
                  className="btn btn-lg btn-success font-bold bg-green-600 hover:bg-green-500"
                  name="commit"
                  type="submit"
                  value="JOIN"
                />
              </p>
            </form>
          </div>
        </div>
      ) : null}

      {session !== undefined ? (
        <div id="session">
          <div id="session-header" className="mb-5">
            <h1 id="session-title" className="inline-block">
              {mySessionId}
            </h1>
            <input
              className="btn btn-large btn-danger float-right mt-5 bg-red-600"
              type="button"
              id="buttonLeaveSession"
              onClick={leaveSession}
              value="Leave session"
            />
            <input
              className="btn btn-large btn-success float-right mt-5 bg-green-600"
              type="button"
              id="buttonSwitchCamera"
              onClick={switchCamera}
              value="Switch Camera"
            />
          </div>

          {/* <div id="video-container" className="flex flex-col flex-wrap">
            {publisher !== undefined ? (
              <div
                className="stream-container flex-1 p-0"
                onClick={() => handleMainVideoStream(publisher)}
              >
                <UserVideoComponent streamManager={publisher} />
              </div>
            ) : null}
            {subscribers.map((sub, i) => (
              <div
                key={sub.id}
                className="stream-container flex-1 p-0"
                onClick={() => handleMainVideoStream(sub)}
              >
                <span>{sub.id}</span>
                <UserVideoComponent streamManager={sub} />
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  ); */}

          <div id="team-selection-buttons">
            {/* 팀 선택 버튼 */}
            <button onClick={() => handleSelectTeam(publisher.stream.streamId, "A")}>Team A</button>
            <button onClick={() => handleSelectTeam(publisher.stream.streamId, "B")}>Team B</button>
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
      ) : null}
    </div>
  );
}
