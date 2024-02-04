import { createContext, useContext, useEffect, useState } from "react";

const VideoWebSocketContext = createContext(null);

export const useWebSocket = () => useContext(VideoWebSocketContext);

export const VideoWebSocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const ws = new WebSocket("ws://i10e206.p.ssafy.io:8000/api/ws");
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
