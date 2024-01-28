import React, { createContext, useState, useEffect, useRef } from "react";
import { OpenVidu } from "openvidu-browser";
import axios from "axios";

const OpenViduContext = createContext();
const APPLICATION_SERVER_URL = "http://localhost:5000/";

export const OpenViduProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [subscribers, setSubscribers] = useState([]);
  const OV = useRef(new OpenVidu());

  useEffect(() => {
    const initSession = () => {
      const newSession = OV.current.initSession();

      newSession.on("streamCreated", (event) => {
        const subscriber = newSession.subscribe(event.stream, undefined);
        setSubscribers((prevSubscribers) => [...prevSubscribers, subscriber]);
      });

      newSession.on("streamDestroyed", (event) => {
        const streamIdToRemove = event.stream.streamId;
        setSubscribers((prevSubscribers) =>
          prevSubscribers.filter((subscriber) => subscriber.stream.streamId !== streamIdToRemove)
        );
      });

      newSession.on("exception", (exception) => {
        console.warn(exception);
      });

      setSession(newSession);
    };

    initSession();

    return () => {
      if (session) {
        session.disconnect();
      }
    };
  }, []);

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

  const getToken = async (sessionId) => {
    try {
      const newSessionId = await createSession(sessionId);
      const token = await createToken(newSessionId);
      return token;
    } catch (error) {
      console.error("Error creating token:", error);
    }
  };

  return (
    <OpenViduContext.Provider
      value={{ session, subscribers, setSubscribers, createSession, createToken, getToken, OV }}
    >
      {children}
    </OpenViduContext.Provider>
  );
};

export const useOpenVidu = () => React.useContext(OpenViduContext);
