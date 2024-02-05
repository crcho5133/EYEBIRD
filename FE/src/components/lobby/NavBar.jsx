import NotificationIcon from "../../assets/img/notificationicon.png";
import SettingIcon from "../../assets/img/settingicon.png";
import NotificationModal from "../modal/NotificationModal.jsx";
import SettingModal from "../modal/SettingModal"; // SettingRodal import
import BackMark from "../../assets/img/back_mark.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const NavBar = () => {
  const [settingsVisible, setSettingsVisible] = useState(false); // 설정 모달 가시성 state
  const [notificationVisible, setNotificationVisible] = useState(false); // 알림 모달 가시성 state
  const navigate = useNavigate();

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

  const handleBackButtonClick = () => {
    navigate(-1);
  };

  return (
    <div className="text-center">
      <div></div>
      {/* 알림, 설정 버튼 */}
      <div className="flex justify-end gap-4 p-4">
        <button onClick={handleBackButtonClick}>
          <img src={BackMark} alt="BackMark" />
        </button>
        <button onClick={handleNotificationOpen}>
          <img src={NotificationIcon} alt="NotificationIcon" />
        </button>
        <button onClick={handleSettingsOpen}>
          <img src={SettingIcon} alt="SettingIcon" />
        </button>
      </div>
      {/* 설정 모달 */}
      <SettingModal visible={settingsVisible} onClose={handleSettingsClose} />
      {/* 알림 모달 */}
      <NotificationModal visible={notificationVisible} onClose={handleNotificationClose} />
    </div>
  );
};

export default NavBar;
