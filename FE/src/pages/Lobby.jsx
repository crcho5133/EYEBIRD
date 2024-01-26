import LobbyIconBtn from "@/components/lobby/LobbyIconBtn";
import MyInfo from "@/components/lobby/MyInfo";
import { useState } from "react";

const Lobby = () => {
  const [isMyInfoVisible, setIsMyInfoVisible] = useState(false);

  const showComponent = () => {
    setIsMyInfoVisible(true);
  };

  const hideComponent = () => {
    setIsMyInfoVisible(false);
  };

  return (
    <>
      <LobbyIconBtn text="내 정보" onClick={showComponent} />
      {isMyInfoVisible && <MyInfo onClose={hideComponent} />}
    </>
  );
};

export default Lobby;
