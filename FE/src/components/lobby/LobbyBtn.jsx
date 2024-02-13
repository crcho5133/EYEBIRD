import React from "react";

const LobbyBtn = ({ text, style, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      style={{ ...style, padding: 0, border: "none" }} // padding과 border를 제거
      className={`bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded ${className}`}
    >
      {text}
    </button>
  );
};

export default LobbyBtn;
