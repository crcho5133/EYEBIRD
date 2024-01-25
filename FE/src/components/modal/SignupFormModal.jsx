import React, { useState } from "react";
import Rodal from "rodal";
import ProfileImageModal from "@/components/modal/ProfileImageModal";
import usersApiCall from "@/api/axios/usersApiCall";
import ModalBtn from "@/components/modal/ModalBtn";
import "rodal/lib/rodal.css";

const SignupFormModal = ({ visible, onClose }) => {
  const [profileImage, setProfileImage] = useState("");
  const [ProfileImageIndex, setProfileImageIndex] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [emailValidationMessage, setEmailValidationMessage] = useState("");
  const [nicknameValidationMessage, setNicknameValidationMessage] = useState("");

  const [isProfileImageModalVisible, setProfileImageModalVisible] = useState(false);

  const showRodal = () => {
    setProfileImageModalVisible(true);
  };

  const hideRodal = () => {
    setProfileImageModalVisible(false);
  };

  const signup = (event) => {
    event.preventDefault();
    usersApiCall().signup(ProfileImageIndex, email, password, nickname);
  };

  const emailHandleChange = (event) => {
    setEmail(event.target.value);
  };

  const passwordHandleChange = (event) => {
    setPassword(event.target.value);
  };

  const nicknameHandleChange = (event) => {
    setNickname(event.target.value);
  };

  const checkEmailDuplicate = () => {
    setIsEmailValid(true);
    setEmailValidationMessage("사용 가능한 이메일입니다.");
  };

  const checkNicknameDuplicate = () => {
    setIsNicknameValid(true);
    setNicknameValidationMessage("사용 가능한 닉네임입니다.");
  };

  return (
    <>
      <Rodal visible={visible} onClose={onClose} customStyles={{ width: "80%", height: "45%" }}>
        <div className="p-4">
          {profileImage ? (
            <img src={profileImage} alt="프로필 이미지" className="w-20 h-20 rounded-full mb-4" />
          ) : (
            <div className="w-20 h-20 rounded-full bg-gray-200 mb-4"></div>
          )}
          <button
            onClick={showRodal}
            className="mt-2 py-1 px-4 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-md"
          >
            선택
          </button>
        </div>

        <form className="space-y-2 p-2" onSubmit={signup}>
          <div className="flex space-x-1">
            <input
              type="text"
              placeholder="이메일"
              className="flex-1 px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={emailHandleChange}
            />
            <Button text="중복확인" onClick={checkEmailDuplicate} disabled={isEmailValid} />
          </div>

          <div className="flex space-x-1">
            <input
              type="text"
              placeholder="닉네임"
              className="flex-1 px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={nicknameHandleChange}
            />
            <Button text="중복확인" onClick={checkNicknameDuplicate} disabled={isNicknameValid} />
          </div>

          <input
            type="password"
            placeholder="비밀번호"
            onChange={passwordHandleChange}
            className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="비밀번호 확인"
            className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <ModalBtn
            onClick={signup}
            type="submit"
            text="회원가입"
            disabled={!isEmailValid || !isNicknameValid}
          />
        </form>
      </Rodal>

      <ProfileImageModal
        visible={isProfileImageModalVisible}
        onClose={hideRodal}
        setProfileImage={setProfileImage}
        setProfileImageIndex={setProfileImageIndex}
      />
    </>
  );
};

export default SignupFormModal;
