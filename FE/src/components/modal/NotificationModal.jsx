// NotificationModal.jsx

import { useState } from "react";
import Rodal from "rodal"; // Rodal import
import "rodal/lib/rodal.css"; // Rodal CSS

const NotificationModal = ({ visible, onClose }) => {
  const [activeTab, setActiveTab] = useState("invitation");
  const [invitations, setInvitations] = useState(["초대 메시지 1", "초대 메시지 2"]); // 초대 메시지 배열

  const handleAccept = (index) => {
    // 수락 버튼 클릭 시 수행하는 함수를 여기에 작성하세요.
  };

  const handleReject = (index) => {
    // 거절 버튼 클릭 시 수행하는 함수를 여기에 작성하세요.
  };

  return (
    <Rodal visible={visible} onClose={onClose} closeOnEsc={true} closeMaskOnClick={false}>
      <div>
        <h1>알림</h1>
        <div>
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => setActiveTab("invitation")}
            className={`tabButton ${activeTab === "invitation" ? "active" : ""}`}
          >
            초대함
          </button>
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => setActiveTab("message")}
            className={`tabButton ${activeTab === "message" ? "active" : ""}`}
          >
            쪽지함
          </button>
        </div>
        {activeTab === "invitation" &&
          invitations.map((invitation, index) => (
            <div key={index}>
              <span>{invitation}</span>
              <button onClick={() => handleAccept(index)}>수락</button>
              <button onClick={() => handleReject(index)}>거절</button>
            </div>
          ))}
        {activeTab === "message" && <div>쪽지 내용</div>}
      </div>
    </Rodal>
  );
};

export default NotificationModal;
