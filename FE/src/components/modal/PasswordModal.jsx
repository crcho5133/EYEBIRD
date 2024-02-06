// PasswordModal.jsx

import { useState } from "react";
import Rodal from "rodal"; // Rodal import
import axios from "axios";
import "rodal/lib/rodal.css"; // Rodal CSS

const PasswordModal = ({ visible, onClose, room, onConfirm }) => {
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const resetModal = () => {
    setPassword("");
    setErrorMessage("");
  };

  const onCloseModal = () => {
    resetModal();
    onClose();
  };

  const handleConfirm = async () => {
    if (password.length === 0) {
      setErrorMessage("비밀번호를 입력해주세요.");
    } else {
      try {
        const response = await axios.post(
          `/api/rooms/${room.roomId}/check-password`,
          { password },
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        const data = response.data;

        if (data.isPasswordCorrect) {
          // 비밀번호가 올바르면 방에 입장
          onConfirm();
        } else {
          // 비밀번호가 틀리면 오류 메시지를 표시
          setErrorMessage("비밀번호가 틀렸습니다.");
        }
      } catch (error) {
        console.log(error);
        if (error.response) {
          console.log(error.response);
          console.log(error.response.data.errorMessage);
          if (error.response.data.errorMessage === "비밀번호 확인: 방이 존재하지 않음") {
            setErrorMessage("방이 존재하지 않습니다.");
          }
        }
      }
    }
  };

  return (
    <Rodal visible={visible} onClose={onCloseModal} closeOnEsc={true} closeMaskOnClick={false}>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="비밀번호"
        className="border-2 p-2 rounded w-full"
      />
      <button
        onClick={handleConfirm}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-2 w-full"
      >
        확인
      </button>
      {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
    </Rodal>
  );
};

export default PasswordModal;
