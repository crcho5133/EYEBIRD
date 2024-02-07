import { createContext, useContext, useEffect, useState } from "react";
import { Client } from "@stomp/stompjs";
import { useAccessTokenState } from "@/context/AccessTokenContext";
import axios from "axios";
import { baseUrl } from "@/api/url/baseUrl";
import SockJS from "sockjs-client";

const WebSocketContext = createContext();

export const WebSocketProvider = ({ children }) => {
  const [client, setClient] = useState(undefined);
  const [match, setMatch] = useState(false);
  const [gameId, setGameId] = useState(undefined);
  const [opponentInfo, setOpponentInfo] = useState(undefined);
  const [messages, setMessages] = useState([]);
  const accessToken = useAccessTokenState();
  // const email = sessionStorage.getItem("email");

  useEffect(() => {
    if (!accessToken.accessToken) return;
    const newClient = new Client({
      webSocketFactory: () => new SockJS("http://localhost:8080/api/ws"),
      connectHeaders: {
        Authorization: `Bearer ${accessToken.accessToken}`,
      },
      beforeConnect: () => {
        console.log("Connecting to WebSocket");
      },
      onConnect: () => {
        console.log("Connected to WebSocket");

        // 랭크 게임 매칭 성공 수신
        newClient.subscribe("/user/match/" + sessionStorage.getItem("email"), (message) => {
          const newMessage = message.body;
          console.log("Received message:", newMessage);
          const messageObject = JSON.parse(newMessage);
          console.log(messageObject);
          // 메시지를 받았을 때 처리 (예: 상태 업데이트)
          setOpponentInfo(newMessage);
          setMatch(true);
          setGameId(messageObject.openviduSessionId);
        });
        newClient.subscribe("/message/invitations", (message) => {
          console.log("Received message:", message.body);
          alert("알림: " + message.body);
        });

        newClient.subscribe("/message/alerts", (message) => {
          alert("알림: " + message.body);
        });

        // 메시지를 받을 대상 토픽 구독
        newClient.subscribe("/user/private-message", (message) => {
          const newMessage = JSON.parse(message.body);
          console.log("Received message:", newMessage);
          // 메시지를 받았을 때 처리 (예: 상태 업데이트)
          setMessages((prevMessages) => [newMessage, ...prevMessages]); // 최신 메시지가 앞에 오도록
        });

        // 사용자 목록 주제 구독
        newClient.subscribe("/message/users", (message) => {
          setUsers(JSON.parse(message.body)); // 사용자 목록 업데이트
        });

        // 웹소켓 연결 후 사용자 목록 요청
        newClient.publish({ destination: "/message/users" });

        // 메시지를 받을 대상 토픽 구독
        newClient.subscribe("/message/private-" + sessionStorage.getItem("email"), (message) => {
          const newMessage = JSON.parse(message.body);
          console.log("Received message:", newMessage);
          // 메시지를 받았을 때 처리 (예: 상태 업데이트)
          setReceivedMessages((prevMessages) => [newMessage, ...prevMessages]); // 최신 메시지가 앞에 오도록
        });
      },

      onDisconnect: () => {
        console.log("Disconnected from WebSocket");
      },
      onWebSocketClose: async (closeEvent) => {
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
    <WebSocketContext.Provider value={{ client, match, gameId, setMatch, opponentInfo, messages }}>
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
