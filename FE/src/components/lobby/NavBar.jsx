import NotificationIcon from "../../assets/img/notificationicon.png";
import SettingIcon from "../../assets/img/SettingIcon.png";

const NavBar = () => {
  const handleNotificationClick = () => {
    // 알림 기능을 수행하는 함수를 여기에 작성하세요.
  };

  const handleSettingsClick = () => {
    // 설정 기능을 수행하는 함수를 여기에 작성하세요.
  };

  return (
    <div className="h-screen static ">
      {/* 알림, 설정 버튼 */}
      <div className="flex justify- gap-4 p-4">
        <button onClick={handleNotificationClick} className="notificationButton">
          <img src={NotificationIcon} alt="NotificationIcon" />
        </button>
        <button onClick={handleSettingsClick} className="settingsButton">
          <img src={SettingIcon} alt="SettingIcon" />
        </button>
      </div>
    </div>
  );
};

export default NavBar;
