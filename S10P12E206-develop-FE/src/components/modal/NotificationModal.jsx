import { useState, useEffect } from "react";
import Rodal from "rodal"; // Rodal import
import "rodal/lib/rodal.css"; // Rodal CSS
import { useWebSocket } from "../../context/WebSocketContext"; // Import useWebSocket

const NotificationModal = ({ visible, onClose }) => {
  const [activeTab, setActiveTab] = useState("invitation");
  const [invitations, setInvitations] = useState(["초대 메시지 1", "초대 메시지 2"]); // 초대 메시지 배열
  const [messages, setMessages] = useState([]); // 쪽지 메시지 배열
  const [recipient, setRecipient] = useState(""); // 메시지를 받을 사람
  const [messageContent, setMessageContent] = useState(""); // 보낼 메시지 내용
  const [showMessageModal, setShowMessageModal] = useState(false); // 메시지 보내기 모달 표시 여부
  const { client } = useWebSocket(); // Get the WebSocket client

  // useEffect(() => {
  //
  //   }
  // }, [client]);

  const handleAccept = (index) => {
    // 수락 버튼 클릭 시 수행하는 함수
    if (client && client.connected) {
      client.publish({
        destination: "/app/invite/accept",
        body: JSON.stringify({ invitationId: invitations[index].id }),
      });
      console.log("Invitation accepted via WebSocket");
    } else {
      console.log("WebSocket connection is not active");
    }
  };

  const handleReject = (index) => {
    // 거절 버튼 클릭 시 수행하는 함수
    if (client && client.connected) {
      client.publish({
        destination: "/app/invite/reject",
        body: JSON.stringify({ invitationId: invitations[index].id }),
      });
      console.log("Invitation rejected via WebSocket");
    } else {
      console.log("WebSocket connection is not active");
    }
  };

  const sendMessage = () => {
    if (client && client.connected && recipient) {
      client.publish({
        destination: "/app/private-message",
        headers: { userId: recipient },
        body: messageContent,
      });
      console.log("Message sent");
      setShowMessageModal(false); // 메시지 전송 후 메시지 보내기 모달 닫기
    } else {
      console.log("WebSocket connection is not active or recipient is not specified");
    }
  };

  return (
    <>
      <Rodal
        className="bg-gray-800 text-white rounded-lg"
        height={400}
        visible={visible}
        onClose={onClose}
        closeOnEsc={true}
        closeMaskOnClick={false}
      >
        <div className="p-5">
          <h1 className="text-2xl mb-5">알림</h1>
          <div className="flex justify-between mb-5">
            <button
              onClick={() => setActiveTab("invitation")}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-full"
            >
              초대함
            </button>
            <button
              onClick={() => setActiveTab("message")}
              className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white font-bold rounded-full"
            >
              쪽지함
            </button>
          </div>
          {activeTab === "invitation" && (
            <div className="border border-blue-500 rounded-lg p-5 mb-5">
              {invitations.map((invitation, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center py-2 border-b border-blue-500"
                >
                  <span className="flex-grow mr-2">{invitation}</span>
                  <button
                    onClick={() => handleAccept(index)}
                    className="px-2 py-1 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-full"
                  >
                    수락
                  </button>
                  <button
                    onClick={() => handleReject(index)}
                    className="px-2 py-1 bg-gray-800 hover:bg-gray-700 text-white font-bold rounded-full"
                  >
                    거절
                  </button>
                </div>
              ))}
            </div>
          )}
          {activeTab === "message" && (
            <>
              <div className="border border-blue-500 rounded-lg p-5 mb-5">
                {messages.map((message, index) => (
                  <div key={index} className="py-2 border-b border-blue-500">
                    <span>{message}</span>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setShowMessageModal(true)}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-full"
              >
                메시지 보내기
              </button>
            </>
          )}
        </div>
      </Rodal>
      <Rodal
        className="bg-gray-800 text-white rounded-lg"
        visible={showMessageModal}
        onClose={() => setShowMessageModal(false)}
        closeOnEsc={true}
        closeMaskOnClick={false}
      >
        <div className="p-5">
          <h1 className="text-2xl mb-5">메시지 보내기</h1>
          <input
            type="text"
            placeholder="받는 사람"
            onChange={(e) => setRecipient(e.target.value)}
            className="w-full p-2 mb-5 border-none rounded-lg bg-gray-800 text-white"
          />
          <input
            type="text"
            placeholder="메시지 내용"
            onChange={(e) => setMessageContent(e.target.value)}
            className="w-full p-2 mb-5 border-none rounded-lg bg-gray-800 text-white"
          />
          <button
            onClick={sendMessage}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-full"
          >
            전송
          </button>
        </div>
      </Rodal>
    </>
  );
};

export default NotificationModal;
