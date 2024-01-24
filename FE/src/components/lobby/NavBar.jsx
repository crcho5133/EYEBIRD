import NotificationIcon from "../../assets/img/notificationicon.png";
import SettingIcon from "../../assets/img/SettingIcon.png";
import NotificationModal from "../modal/NotificationModal.jsx";
import SettingModal from "../modal/SettingModal"; // SettingRodal import
import React, { useState } from "react";

const NavBar = () => {
  const [settingsVisible, setSettingsVisible] = useState(false); // 설정 모달 가시성 state
  const [NotificationVisible, setNotificationVisible] = useState(false); // 알림 모달 가시성 state

  const handleNotificationOpen = () => {
    setNotificationVisible(true); // 알림 모달 열기
  };

  const handleNotificationClose = () => {
    setNotificationVisible(false); // 알림 모달 닫기
  };

  const handleSettingsOpen = () => {
    setSettingsVisible(true); // 설정 모달 열기
  };

  const handleSettingsClose = () => {
    setSettingsVisible(false); // 설정 모달 닫기
  };

  return (
    <div className="text-center">
      {/* 알림, 설정 버튼 */}
      <div className="flex justify-end gap-4 p-4">
        <button onClick={handleNotificationOpen} className="notificationButton">
          <img src={NotificationIcon} alt="NotificationIcon" />
        </button>
        <button onClick={handleSettingsOpen} className="settingsButton">
          <img src={SettingIcon} alt="SettingIcon" />
        </button>
      </div>
      {/* 설정 모달 */}
      <SettingModal
        visible={settingsVisible}
        onClose={handleSettingsClose}
        closeOnEsc={true}
        closeOnOverlayClick={false}
      />
      {/* 알림 모달 */}
      <NotificationModal visible={NotificationVisible} onClose={handleNotificationClose} />
    </div>
  );
};

export default NavBar;
