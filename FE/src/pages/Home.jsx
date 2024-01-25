import React, { useState } from "react";
import LobbyBtn from "@/components/lobby/LobbyBtn";
import DescriptionModal from "@/components/modal/DescriptionModal";

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
      <LobbyBtn text="게임설명" onClick={showRodal} />
      <DescriptionModal visible={isModalVisible} onClose={hideRodal} />
    </>
  );
};

export default Home;
