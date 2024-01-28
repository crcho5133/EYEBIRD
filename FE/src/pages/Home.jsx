import React, { useState } from "react";
import LobbyBtn from "@/components/lobby/LobbyBtn";
import SignupFormModal from "@/components/modal/SignupFormModal";
import LoginFormModal from "@/components/modal/LoginFormModal";
import DescriptionModal from "@/components/modal/DescriptionModal";

const Home = () => {
  const [isSignupModalVisible, setsignupModalVisible] = useState(false);
  const [isLoginModalVisible, setLoginModalVisible] = useState(false);
  const [isDescriptionModalVisible, setDescriptionModalVisible] = useState(false);

  const showSignupRodal = () => {
    setsignupModalVisible(true);
  };
  const showLoginRodal = () => {
    setLoginModalVisible(true);
  };
  const showDescriptionRodal = () => {
    setDescriptionModalVisible(true);
  };

  const hideSignUpRodal = () => {
    setsignupModalVisible(false);
  };
  const hideLoginRodal = () => {
    setLoginModalVisible(false);
  };
  const hideDescriptionRodal = () => {
    setDescriptionModalVisible(false);
  };

  return (
    <>
      <LobbyBtn text="회원가입" onClick={showSignupRodal} className="mr-4" />
      <LobbyBtn text="로그인" onClick={showLoginRodal} className="mr-4" />
      <LobbyBtn text="게임설명" onClick={showDescriptionRodal} />
      <SignupFormModal visible={isSignupModalVisible} onClose={hideSignUpRodal} />
      <LoginFormModal visible={isLoginModalVisible} onClose={hideLoginRodal} />
      <DescriptionModal visible={isDescriptionModalVisible} onClose={hideDescriptionRodal} />
    </>
  );
};

export default Home;
