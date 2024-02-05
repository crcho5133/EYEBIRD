import { createContext, useContext, useEffect, useState } from "react";
import { useAccessTokenState } from "@/context/AccessTokenContext";

const VideoWebSocketContext = createContext(null);

export const useWebSocket = () => useContext(VideoWebSocketContext);

export const VideoWebSocketProvider = ({ children }) => {
  const accessToken = useAccessTokenState();
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!accessToken.accessToken) return;

    const ws = new WebSocket("wss://i10e206.p.ssafy.io/fastapi/ws");
    console.log(ws);
    ws.onmessage = (event) => {
      // 서버로부터 메시지 수신 시 처리
      console.log("Message from server:", event.data);
      setMessage(event.data); // 상태 업데이트
    };

    setSocket(ws);

    // return () => ws.close();
  }, []);

  return (
    <VideoWebSocketContext.Provider value={{ socket, message }}>
      {children}
    </VideoWebSocketContext.Provider>
  );
};
