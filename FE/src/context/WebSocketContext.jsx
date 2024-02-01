import { createContext, useContext, useEffect, useState } from "react";
import { Client } from "@stomp/stompjs";
import { useAccessTokenState } from "@/context/AccessTokenContext";
import SockJS from "sockjs-client";

const WebSocketContext = createContext();

export const WebSocketProvider = ({ children }) => {
  const [client, setClient] = useState(undefined);
  const accessToken = useAccessTokenState();

  useEffect(() => {
    if (!accessToken.accessToken) return;
    const newClient = new Client({
      webSocketFactory: () => new SockJS("http://localhost:8080/ws"),
      connectHeaders: {
        Authorization: `Bearer ${accessToken.accessToken}`,
      },
      beforeConnect: () => {
        console.log("Connecting to WebSocket");
      },
      onConnect: () => {
        console.log("Connected to WebSocket");
      },
      onDisconnect: () => {
        console.log("Disconnected from WebSocket");
      },
      onWebSocketClose: (closeEvent) => {
        console.log("WebSocket closed", closeEvent);
      },
      onWebSocketError: (error) => {
        console.log("WebSocket error: ", error);
      },

      heartbeatIncoming: 0,
      heartbeatOutgoing: 0,
    });

    setClient(newClient);
    newClient.activate();
  }, [accessToken.accessToken]);

  // 현재 접속 중인 유저 정보를 요청하는 함수
  // const currentUsers = () => {
  //   if (client && client.connected) {
  //     const response = client.send("/app/friends");
  //     return response.data;
  //   } else {
  //     console.log("WebSocket is not connected.");
  //   }
  // };

  return <WebSocketContext.Provider value={{ client }}>{children}</WebSocketContext.Provider>;
};

export const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (context === undefined) {
    throw new Error("useWebSocket must be used within a WebSocketProvider");
  }
  return context;
};
