import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const EntranceComponent = () => {
  const [sessionId, setSessionId] = useState("");
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  // 버튼 활성화 여부를 결정하는 함수
  const isButtonEnabled = sessionId.trim() !== "" && userName.trim() !== "";

  const handleEnter = () => {
    navigate(`/room/${sessionId}`, { state: { userName } });
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <input
        type="text"
        placeholder="세션 ID"
        value={sessionId}
        onChange={(e) => setSessionId(e.target.value)}
        className="mb-2 p-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition duration-200"
      />
      <input
        type="text"
        placeholder="사용자 이름"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        className="mb-4 p-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition duration-200"
      />
      <button
        onClick={handleEnter}
        disabled={!isButtonEnabled}
        className={`px-4 py-2 text-white font-bold rounded-md transition duration-200 ${
          isButtonEnabled ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-400"
        }`}
      >
        입장
      </button>
    </div>
  );
};

export default EntranceComponent;
