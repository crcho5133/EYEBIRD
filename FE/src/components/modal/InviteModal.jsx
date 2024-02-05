import { useState, useEffect } from "react";
import Rodal from "rodal"; // Rodal import
import "rodal/lib/rodal.css"; // Rodal CSS
import axios from "axios";
import { useWebSocket } from "../../context/WebSocketContext"; // Import useWebSocket

const InviteModal = ({ visible, onClose }) => {
  const [friends, setFriends] = useState([]);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const { client } = useWebSocket(); // Get the WebSocket client

  useEffect(() => {
    // 친구 목록을 가져오는 API 호출
    axios
      .get("/api/friends")
      .then((response) => {
        if (Array.isArray(response.data)) {
          // friends가 배열인지 확인
          setFriends(response.data);
        } else {
          console.error("Error: friends is not an array");
        }
      })
      .catch((error) => {
        console.error("Error fetching friends", error);
      });
  }, []);

  const handleInvite = () => {
    // WebSocket을 사용하여 초대 상태를 실시간으로 업데이트
    if (client && client.connected) {
      client.publish({
        destination: "/app/invite",
        body: JSON.stringify({ friendId: selectedFriend }),
      });
      console.log("Invitation sent via WebSocket");
      onClose();
    } else {
      console.log("WebSocket connection is not active");
    }
  };

  return (
    <Rodal visible={visible} onClose={onClose} closeOnEsc={true} closeMaskOnClick={false}>
      <div className="flex flex-col items-center p-5 bg-gray-100 rounded-lg">
        <h2 className="mb-4">친구 초대하기</h2>
        <div className="flex-row">
          <select
            className="mb-4 p-2 rounded border border-gray-300"
            onChange={(e) => setSelectedFriend(e.target.value)}
          >
            {Array.isArray(friends)
              ? friends.map(
                  (
                    friend // friends가 배열인지 확인
                  ) => (
                    <option key={friend.id} value={friend.id}>
                      {friend.name}
                    </option>
                  )
                )
              : null}
          </select>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer"
            onClick={handleInvite}
          >
            초대하기
          </button>
        </div>
      </div>
    </Rodal>
  );
};

export default InviteModal;
