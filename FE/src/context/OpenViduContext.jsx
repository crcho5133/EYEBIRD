import React, { createContext, useState, useEffect, useRef } from "react";
import { OpenVidu } from "openvidu-browser";
import axios from "axios";

const OpenViduContext = createContext();
const APPLICATION_SERVER_URL = "http://localhost:5000/";

export const OpenViduProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const OV = useRef(new OpenVidu());

  useEffect(() => {
    const initSession = () => {
      const newSession = OV.current.initSession();

      // 세션 이벤트 리스너 설정
      newSession.on("streamCreated", (event) => {
        const subscriber = mySession.subscribe(event.stream, undefined);
        setSubscribers((subscribers) => [...subscribers, subscriber]);
      });

      newSession.on("exception", (exception) => {
        console.warn(exception);
      });
      // 기타 필요한 이벤트 리스너 추가

      setSession(newSession);
    };

    initSession();

    return () => {
      session && session.disconnect();
    };
  }, []);

  const getToken = async (mySessionId) => {
    return createSession(mySessionId).then((sessionId) => createToken(sessionId));
  };

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
    <OpenViduContext.Provider value={{ session, getToken, createSession, createToken }}>
      {children}
    </OpenViduContext.Provider>
  );
};

export const useOpenVidu = () => React.useContext(OpenViduContext);
