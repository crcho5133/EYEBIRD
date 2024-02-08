import React from "react";
import LobbyBtn from "@/components/lobby/LobbyBtn";
import SignupFormModal from "@/components/modal/SignupFormModal";
import LoginFormModal from "@/components/modal/LoginFormModal";
import DescriptionModal from "@/components/modal/DescriptionModal";
import useShowRodal from "@/hooks/useShowRodal";
import mainbirds from "@/assets/img/mainbirds.png";
import question_mark from "@/assets/img/question_mark.png";

const Home = () => {
  const isSignupModalVisible = useShowRodal();
  const isLoginModalVisible = useShowRodal();
  const isDescriptionModalVisible = useShowRodal();

  return (
    <div className="flex flex-col justify-center space-y-12 h-screen items-center">
      <div className="space-y-2">
        <p className="text-center">단숨에 끝나는 승부</p>
        <p className="text-center">눈 깜빡할 새</p>
      </div>
      <img src={mainbirds} />
      <div className="w-full flex justify-between items-center px-4">
        <div></div>
        <button onClick={isDescriptionModalVisible.showRodal}>
          <img src={question_mark} />
        </button>
      </div>
      <LobbyBtn text="로그인" onClick={isLoginModalVisible.showRodal} />
      <LobbyBtn text="회원가입" onClick={isSignupModalVisible.showRodal} />
      <SignupFormModal
        visible={isSignupModalVisible.value}
        onClose={isSignupModalVisible.hideRodal}
      />
      <LoginFormModal visible={isLoginModalVisible.value} onClose={isLoginModalVisible.hideRodal} />
      <DescriptionModal
        visible={isDescriptionModalVisible.value}
        onClose={isDescriptionModalVisible.hideRodal}
      />
    </div>
  );
};

export default Home;
