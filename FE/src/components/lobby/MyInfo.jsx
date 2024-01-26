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
    <div visible={visible}>
      <div>
        <button onClick={() => setActiveTab("profile")}>프로필</button>
        <button onClick={() => setActiveTab("friends")}>친구들</button>
        <button onClick={() => setActiveTab("changeInfo")}>정보 변경</button>
        <button onClick={() => setActiveTab("deleteUser")}>회원 탈퇴</button>
      </div>
      <div>{renderComponent()}</div>
      <button onClick={onClose}>닫기</button>
    </div>
  );
};

export default MyInfo;
