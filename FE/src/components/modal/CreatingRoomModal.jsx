// NotificationModal.jsx

import { useState } from "react";
import Rodal from "rodal"; // Rodal import
import "rodal/lib/rodal.css"; // Rodal CSS
import axios from "axios";

const CreatingRoomModal = ({ visible, onClose }) => {
  const [roomName, setRoomName] = useState("");
  const [mode, setMode] = useState("classic");
  const [players, setPlayers] = useState("1vs1");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleCreate = async () => {
    if (roomName.length === 0) {
      setErrorMessage("방 제목을 입력해주세요.");
    } else if (roomName.length > 20) {
      setErrorMessage("방 제목은 20자를 초과할 수 없습니다.");
    } else {
      // 서버에 POST 요청을 보내 방을 생성
      const response = await axios.post(
        "http://localhost:8000/api/rooms/",
        {
          roomName: roomName,
          password: password,
          maxCapacity: players.replace("vs", ""),
          isItem: mode === "item" ? "true" : "false",
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = response;

      if (data === "fail") {
        setErrorMessage("방 생성에 실패했습니다.");
      } else {
        // 방 생성에 성공하면 모달을 닫고, 필요한 경우 추가 작업을 수행
        onClose();
      }
    }
  };

  return (
    <Rodal visible={visible} onClose={onClose} closeOnEsc={true} closeMaskOnClick={false}>
      <input
        type="text"
        value={roomName}
        onChange={(e) => setRoomName(e.target.value)}
        placeholder="방 제목"
        className="border p-2 rounded"
      />
      <select
        value={mode}
        onChange={(e) => setMode(e.target.value)}
        className="border p-2 rounded mt-2"
      >
        <option value="classic">클래식전</option>
        <option value="item">아이템전</option>
      </select>
      <select
        value={players}
        onChange={(e) => setPlayers(e.target.value)}
        className="border p-2 rounded mt-2"
      >
        <option value="1vs1">1vs1</option>
        <option value="2vs2">2vs2</option>
        <option value="3vs3">3vs3</option>
        <option value="4vs4">4vs4</option>
      </select>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="방 비밀번호"
        className="border p-2 rounded mt-2"
      />
      <button onClick={handleCreate} className="bg-blue-500 text-white p-2 w-full rounded mt-2">
        생성
      </button>
      {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
    </Rodal>
  );
};

export default CreatingRoomModal;
