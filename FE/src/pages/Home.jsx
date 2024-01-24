import React, { useState } from "react";
import LobbyBtn from "@/components/lobby/LobbyBtn";
import SignupFormModal from "@/components/modal/SignupFormModal";

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
      <LobbyBtn onClick={showRodal} text="회원가입" className="mr-4" />
      <SignupFormModal visible={isModalVisible} onClose={hideRodal} />
    </>
  );
};

export default Home;
