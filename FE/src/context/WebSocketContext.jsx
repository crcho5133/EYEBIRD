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
  const nickname = sessionStorage.getItem("nickname");

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

        // 랭크 게임 매칭 성공 수신
        newClient.subscribe("/user/match/" + nickname, (message) => {
          const newMessage = message.body;
          console.log("Received message:", newMessage);
          // 메시지를 받았을 때 처리 (예: 상태 업데이트)
          setMatch(true);
          setGameId(newMessage);
        });
        newClient.subscribe("/user/invitations", (message) => {
          console.log("Received message:", message.body);
          alert("알림: " + message.body);
        });

        newClient.subscribe("/user/alerts", (message) => {
          alert("알림: " + message.body);
        });

        // 메시지를 받을 대상 토픽 구독
        client.subscribe("/user/private-messages", (message) => {
          const newMessage = JSON.parse(message.body);
          console.log("Received message:", newMessage);
          // 메시지를 받았을 때 처리 (예: 상태 업데이트)
          setMessages((prevMessages) => [newMessage, ...prevMessages]); // 최신 메시지가 앞에 오도록
        });

        // 사용자 목록 주제 구독
        newClient.subscribe("/user/users", (message) => {
          setUsers(JSON.parse(message.body)); // 사용자 목록 업데이트
        });

        // 웹소켓 연결 후 사용자 목록 요청
        newClient.publish({ destination: "/app/users" });

        // 메시지를 받을 대상 토픽 구독
        newClient.subscribe("/user/private-" + nickname, (message) => {
          const newMessage = JSON.parse(message.body);
          console.log("Received message:", newMessage);
          // 메시지를 받았을 때 처리 (예: 상태 업데이트)
          setReceivedMessages((prevMessages) => [newMessage, ...prevMessages]); // 최신 메시지가 앞에 오도록
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

  const sendInvitation = () => {
    if (client && isConnected) {
      client.publish({
        destination: "/app/invite",
        body: "테스트 메시지",
      });
      console.log("Invitation sent");
    } else {
      console.log("WebSocket connection is not active");
    }
  };

  const openModal = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const sendMessage = (messageContent) => {
    if (client && isConnected && selectedUser) {
      client.publish({
        destination: "/app/private-message",
        headers: { userId: selectedUser, From: nickname },
        body: messageContent,
      });
      console.log(selectedUser);
      setShowModal(false); // 메시지 전송 후 모달 닫기
      setShowConfirmation(true); // 전송 확인 팝업 표시
    }
  };

  return (
    <WebSocketContext.Provider value={{ client, match, gameId }}>
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
