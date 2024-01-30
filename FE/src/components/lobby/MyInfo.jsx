import React, { useState } from "react";
import Profile from "@/components/lobby/Profile";
import Friends from "@/components/lobby/Friends";
import ChangeInfo from "@/components/lobby/ChangeInfo";
import DeleteUser from "@/components/lobby/DeleteUser";

const MyInfo = ({ visible, onClose }) => {
  const [activeTab, setActiveTab] = useState("profile");

  const renderComponent = () => {
    switch (activeTab) {
      case "profile":
        return <Profile />;
      case "friends":
        return <Friends />;
      case "changeInfo":
        return <ChangeInfo />;
      case "deleteUser":
        return <DeleteUser />;
      default:
        return <Profile />;
    }
  };

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg" visible={visible}>
      <div className="flex justify-between mb-4">
        <button
          className="border border-gray-300 px-4 py-2 rounded hover:bg-gray-100"
          onClick={() => setActiveTab("profile")}
        >
          프로필
        </button>
        <button
          className="border border-gray-300 px-4 py-2 rounded hover:bg-gray-100"
          onClick={() => setActiveTab("friends")}
        >
          친구들
        </button>
        <button
          className="border border-gray-300 px-4 py-2 rounded hover:bg-gray-100"
          onClick={() => setActiveTab("changeInfo")}
        >
          정보 변경
        </button>
        <button
          className="border border-gray-300 px-4 py-2 rounded hover:bg-gray-100"
          onClick={() => setActiveTab("deleteUser")}
        >
          회원 탈퇴
        </button>
      </div>
      <div className="mb-4">{renderComponent()}</div>
      <button
        className="w-full border border-gray-300 px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
        onClick={onClose}
      >
        닫기
      </button>
    </div>
  );
};

export default MyInfo;
