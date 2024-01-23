const NavBar = () => {
  const handleNotificationClick = () => {
    // 알림 기능을 수행하는 함수를 여기에 작성하세요.
  };

  const handleSettingsClick = () => {
    // 설정 기능을 수행하는 함수를 여기에 작성하세요.
  };

  return (
    <div className="h-screen flex items-start">
      {/* 알림, 설정 버튼 */}
      <div className="w-full flex flex-row justify-end gap-4 p-4">
        <button onClick={handleNotificationClick} className="notificationButton">
          알림
        </button>
        <button onClick={handleSettingsClick} className="settingsButton">
          설정
        </button>
      </div>
    </div>
  );
};

export default NavBar;
