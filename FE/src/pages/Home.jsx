import React, { useState } from "react";
import LobbyBtn from "../components/lobby/LobbyBtn";
import DescriptionModal from "../components/modal/DescriptionModal";

const Home = () => {
  const [modalType, setModalType] = useState(null);

  const showDescriptionModal = () => setModalType("description");
  const closeModal = () => setModalType(null);

  return (
    <>
      <LobbyBtn text="게임설명" onClick={showDescriptionModal} />

      {modalType === "description" && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
          <DescriptionModal closeModal={closeModal} />
        </div>
      )}
    </>
  );
};

export default Home;
