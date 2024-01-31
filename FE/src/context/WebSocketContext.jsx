import { createContext, useContext, useEffect, useState } from "react";
import { Client } from "@stomp/stompjs";
import { useAccessTokenState } from "./accessTokenContext";
import SockJS from "sockjs-client";

const WebSocketContext = createContext({
  client: new Client(),
});

export const WebSocketProvider = ({ children }) => {
  const [client, setClient] = useState(undefined);
  const accessToken = useAccessTokenState();
  const [nickname, setNickname] = useState("");

  useEffect(() => {
    if (!accessToken) return;
    console.log(accessToken.accessToken);
    const newClient = new Client({
      // brokerURL: "http://localhost:8080/ws",

      webSocketFactory: () => new SockJS("http://localhost:8080/ws"),
      connectHeaders: {
        nickname: nickname,
        Authorization: `Bearer ${accessToken.accessToken}`,
      },
      beforeConnect: () => {
        console.log("Connecting to WebSocket");
      },
      onConnect: () => {
        console.log("test1");
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
  }, [accessToken]);

  return <WebSocketContext.Provider value={{ client }}>{children}</WebSocketContext.Provider>;
};

export const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (context === null) {
    throw new Error("useWebSocket must be used within a WebSocketProvider");
  }
  return context;
};
