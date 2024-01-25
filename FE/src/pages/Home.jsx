import React, { useState } from "react";
import LobbyBtn from "@/components/lobby/LobbyBtn";
import LoginFormModal from "@/components/modal/LoginFormModal";

const Home = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  const showRodal = () => {
    setModalVisible(true);
  };

  const hideRodal = () => {
    setModalVisible(false);
  };

  return (
    <>
      <LobbyBtn text="로그인" onClick={showRodal} className="mr-4" />
      <LoginFormModal visible={isModalVisible} onClose={hideRodal} />
    </>
  );
};

export default Home;
