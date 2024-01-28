import React, { useState } from "react";
import Rodal from "rodal";
import ProfileImageModal from "@/components/modal/ProfileImageModal";
import usersApiCall from "@/api/axios/usersApiCall";
import ModalBtn from "@/components/modal/ModalBtn";
import "rodal/lib/rodal.css";

const SignupFormModal = ({ visible, onClose }) => {
  const [profileImage, setProfileImage] = useState("");
  const [ProfileImageIndex, setProfileImageIndex] = useState("");
  const [isProfileImageModalVisible, setProfileImageModalVisible] = useState(false);
  const [hasEmailChecked, setEmailHasChecked] = useState(false);
  const [hasNicknameChecked, setNicknameHasChecked] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [nickname, setNickname] = useState("");
  const [isEmailValid, setIsEmailValid] = useState("");
  const [isNicknameValid, setIsNicknameValid] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);

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
    setIsEmailValid(false);
    setEmailHasChecked(false);
  };

  const nicknameHandleChange = (event) => {
    setNickname(event.target.value);
    setIsNicknameValid(false);
    setNicknameHasChecked(false);
  };

  const passwordHandleChange = (event) => {
    setPassword(event.target.value);
    validatePasswords(event.target.value, passwordCheck);
  };

  const passwordCheckHandleChange = (event) => {
    setPasswordCheck(event.target.value);
    validatePasswords(password, event.target.value);
  };

  const validatePasswords = (password, passwordCheck) => {
    if (passwordCheck === "") {
      return setPasswordsMatch(true);
    }
    setPasswordsMatch(password === passwordCheck);
  };

  const checkEmailDuplicate = (event) => {
    event.preventDefault();
    usersApiCall().checkEmailDuplicate(email, setIsEmailValid);
    setEmailHasChecked(true);
  };

  const checkNicknameDuplicate = (event) => {
    event.preventDefault();
    usersApiCall().checkNicknameDuplicate(nickname, setIsNicknameValid);
    setNicknameHasChecked(true);
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
            <ModalBtn text="중복확인" onClick={checkEmailDuplicate} disabled={isEmailValid} />
            {isEmailValid && <div style={{ color: "green" }}>중복확인이 완료 되었습니다.</div>}
            {!isEmailValid && hasEmailChecked && (
              <div style={{ color: "red" }}>중복된 아이디가 있습니다.</div>
            )}
          </div>

          <div className="flex space-x-1">
            <input
              type="text"
              placeholder="닉네임"
              className="flex-1 px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={nicknameHandleChange}
            />
            <ModalBtn text="중복확인" onClick={checkNicknameDuplicate} disabled={isNicknameValid} />
            {isNicknameValid && <div style={{ color: "green" }}>중복확인이 완료 되었습니다.</div>}
            {!isNicknameValid && hasNicknameChecked && (
              <div style={{ color: "red" }}>중복된 아이디가 있습니다.</div>
            )}
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
            onChange={passwordCheckHandleChange}
            className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {!passwordsMatch && <div className="text-red-500">비밀번호가 일치하지 않습니다</div>}

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
