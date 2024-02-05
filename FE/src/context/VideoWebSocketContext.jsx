import { createContext, useContext, useEffect, useState } from "react";
<<<<<<< HEAD
import { useAccessTokenState } from "@/context/AccessTokenContext";
=======
>>>>>>> origin/develop-FE-js_02_05

const VideoWebSocketContext = createContext(null);

export const useWebSocket = () => useContext(VideoWebSocketContext);

export const VideoWebSocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState("");
<<<<<<< HEAD
  const accessToken = useAccessTokenState();

  useEffect(() => {
    if (!accessToken.accessToken) return;
=======

  useEffect(() => {
>>>>>>> origin/develop-FE-js_02_05
    const ws = new WebSocket("ws://localhost:8000/ws");
    console.log(ws);
    ws.onmessage = (event) => {
      // 서버로부터 메시지 수신 시 처리
      console.log("Message from server:", event.data);
      setMessage(event.data); // 상태 업데이트
    };

    setSocket(ws);

    // return () => ws.close();
<<<<<<< HEAD
  }, [accessToken.accessToken]);
=======
  }, []);
>>>>>>> origin/develop-FE-js_02_05

  return (
    <VideoWebSocketContext.Provider value={{ socket, message }}>
      {children}
    </VideoWebSocketContext.Provider>
  );
};
