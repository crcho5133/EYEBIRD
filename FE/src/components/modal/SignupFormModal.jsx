import React, { useState } from "react";
import ProfileImageModal from "@/components/modal/ProfileImageModal";
import ModalBtn from "@/components/modal/ModalBtn";
import usersApiCall from "@/api/axios/usersApiCall";
import useFormField from "@/hooks/useFormField";
import Rodal from "rodal";
import useRodal from "@/hooks/useRodal";
import { useAccessTokenState } from "@/context/AccessTokenContext";
import "rodal/lib/rodal.css";

const SignupFormModal = ({ visible, onClose }) => {
  const isProfileImageModalVisible = useRodal();
  const email = useFormField("");
  const nickname = useFormField("");
  const password = useFormField("");
  const passwordCheck = useFormField("");
  const profileImage = useFormField("");
  const ProfileImageIndex = useFormField("");
  const [passwordsMatch, setPasswordsMatch] = useState(false);
  const accessToken = useAccessTokenState();
  const useUsersApiCall = usersApiCall();

  const signup = (event) => {
    event.preventDefault();
    useUsersApiCall.signup(
      ProfileImageIndex.value,
      email.value,
      password.value,
      nickname.value,
      accessToken
    );
  };

  const passwordHandleChange = (event) => {
    password.setValue(event.target.value);
    validatePasswords(event.target.value, passwordCheck.value);
  };

  const passwordCheckHandleChange = (event) => {
    passwordCheck.setValue(event.target.value);
    validatePasswords(password.value, event.target.value);
  };

  const validatePasswords = (password, passwordCheck) => {
    if (passwordCheck === "") {
      return setPasswordsMatch(false);
    }
    setPasswordsMatch(password === passwordCheck);
  };

  const checkEmailDuplicate = (event) => {
    event.preventDefault();
    useUsersApiCall.checkEmailDuplicate(email.value, email.setIsValid);
    console.log(email.isValid);
    email.setHasChecked(true);
  };

  const checkNicknameDuplicate = (event) => {
    event.preventDefault();
    useUsersApiCall.checkNicknameDuplicate(nickname.value, nickname.setIsValid);
    nickname.setHasChecked(true);
  };

  const clearAllInput = () => {
    email.clear();
    nickname.clear();
    password.clear();
    passwordCheck.clear();
    profileImage.clear();
    ProfileImageIndex.clear();
    setPasswordsMatch(true);
  };

  return (
    <>
      <Rodal
        visible={visible}
        onClose={() => {
          clearAllInput();
          onClose();
        }}
        customStyles={{ width: "80%", height: "45%" }}
      >
        <div className="p-4">
          {profileImage.value ? (
            <img
              src={profileImage.value}
              alt="프로필 이미지"
              className="w-20 h-20 rounded-full mb-4"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-gray-200 mb-4"></div>
          )}
          <button
            onClick={isProfileImageModalVisible.showRodal}
            className="mt-2 py-1 px-4 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-md"
          >
            선택
          </button>
        </div>

        <div className="space-y-2 p-2">
          <div className="flex space-x-1">
            <input
              type="text"
              placeholder="이메일"
              value={email.value}
              className="flex-1 px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => email.onChange(e.target.value)}
            />
            <ModalBtn text="중복확인" onClick={checkEmailDuplicate} disabled={email.isValid} />
            {email.isValid && <div style={{ color: "green" }}>중복확인이 완료 되었습니다.</div>}
            {!email.isValid && email.hasChecked && (
              <div style={{ color: "red" }}>중복된 아이디가 있습니다.</div>
            )}
          </div>

          <div className="flex space-x-1">
            <input
              type="text"
              placeholder="닉네임"
              value={nickname.value}
              className="flex-1 px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => nickname.onChange(e.target.value)}
            />
            <ModalBtn
              text="중복확인"
              onClick={checkNicknameDuplicate}
              disabled={nickname.isValid}
            />
            {nickname.isValid && <div style={{ color: "green" }}>중복확인이 완료 되었습니다.</div>}
            {!nickname.isValid && nickname.hasChecked && (
              <div style={{ color: "red" }}>중복된 닉네임이 있습니다.</div>
            )}
          </div>

          <input
            type="password"
            placeholder="비밀번호"
            value={password.value}
            onChange={passwordHandleChange}
            className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="비밀번호 확인"
            value={passwordCheck.value}
            onChange={passwordCheckHandleChange}
            className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {!passwordsMatch && passwordCheck.value && (
            <div className="text-red-500">비밀번호가 일치하지 않습니다</div>
          )}

          <ModalBtn
            onClick={signup}
            type="submit"
            text="회원가입"
            disabled={!email.isValid || !nickname.isValid || !passwordsMatch}
          />
        </div>
      </Rodal>

      <ProfileImageModal
        visible={isProfileImageModalVisible.value}
        onClose={isProfileImageModalVisible.hideRodal}
        setProfileImage={profileImage.setValue}
        setProfileImageIndex={ProfileImageIndex.setValue}
      />
    </>
  );
};

export default SignupFormModal;
