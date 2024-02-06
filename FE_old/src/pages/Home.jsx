import React from "react";
import LobbyBtn from "@/components/lobby/LobbyBtn";
import SignupFormModal from "@/components/modal/SignupFormModal";
import LoginFormModal from "@/components/modal/LoginFormModal";
import DescriptionModal from "@/components/modal/DescriptionModal";
import useShowRodal from "@/hooks/useShowRodal";

const Home = () => {
  const isSignupModalVisible = useShowRodal();
  const isLoginModalVisible = useShowRodal();
  const isDescriptionModalVisible = useShowRodal();

  return (
    <>
      <LobbyBtn text="회원가입" onClick={isSignupModalVisible.showRodal} className="mr-4" />
      <LobbyBtn text="로그인" onClick={isLoginModalVisible.showRodal} className="mr-4" />
      <LobbyBtn text="게임설명" onClick={isDescriptionModalVisible.showRodal} />
      <SignupFormModal
        visible={isSignupModalVisible.value}
        onClose={isSignupModalVisible.hideRodal}
      />
      <LoginFormModal visible={isLoginModalVisible.value} onClose={isLoginModalVisible.hideRodal} />
      <DescriptionModal
        visible={isDescriptionModalVisible.value}
        onClose={isDescriptionModalVisible.hideRodal}
      />
    </>
  );
};

export default Home;