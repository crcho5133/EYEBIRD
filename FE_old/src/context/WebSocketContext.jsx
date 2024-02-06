import { createContext, useContext, useEffect, useState } from "react";
import { Client } from "@stomp/stompjs";
import { useAccessTokenState } from "@/context/AccessTokenContext";
import SockJS from "sockjs-client";

const WebSocketContext = createContext();

export const WebSocketProvider = ({ children }) => {
  const [client, setClient] = useState(undefined);
  const [match, setMatch] = useState(false);
  const [gameId, setGameId] = useState(undefined);
  const accessToken = useAccessTokenState();
  const email = sessionStorage.getItem("email");

  useEffect(() => {
    if (!accessToken.accessToken) return;
    const newClient = new Client({
      webSocketFactory: () => new SockJS("https://i10e206.p.ssafy.io/api/ws"),
      connectHeaders: {
        Authorization: `Bearer ${accessToken.accessToken}`,
      },
      beforeConnect: () => {
        console.log("Connecting to WebSocket");
      },
      onConnect: () => {
        console.log("Connected to WebSocket");

        // 랭크 게임 매칭 성공 수신
        newClient.subscribe("/user/match/" + email, (message) => {
          const newMessage = message.body;
          console.log("Received message:", newMessage);
          const messageObject = JSON.parse(newMessage);
          console.log(messageObject);
          // 메시지를 받았을 때 처리 (예: 상태 업데이트)
          setMatch(true);
          setGameId(messageObject.openviduSessionId);
        });
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

  return (
    <WebSocketContext.Provider value={{ client, match, gameId, setMatch }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (context === undefined) {
    throw new Error("useWebSocket must be used within a WebSocketProvider");
  }
  return context;
};
