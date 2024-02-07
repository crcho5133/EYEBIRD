import React, { useState } from "react";
import ProfileImageModal from "@/components/modal/ProfileImageModal";
import ModalBtn from "@/components/modal/ModalBtn";
import usersApiCall from "@/api/axios/usersApiCall";
import useFormField from "@/hooks/useFormField";
import Rodal from "rodal";
import useShowRodal from "@/hooks/useShowRodal";
import "rodal/lib/rodal.css";
import LobbyBtn from "@/components/lobby/LobbyBtn";
import { validateEmail, validateNickname, validatePassword } from "@/utils/validateForm";

const SignupFormModal = ({ visible, onClose }) => {
  const isProfileImageModalVisible = useShowRodal();
  const email = useFormField("", validateEmail);
  const nickname = useFormField("", validateNickname);
  const password = useFormField("", validatePassword);
  const passwordCheck = useFormField("");
  const profileImage = useFormField("");
  const ProfileImageIndex = useFormField("");
  const [passwordsMatch, setPasswordsMatch] = useState(false);
  const useUsersApiCall = usersApiCall();

  const signup = (event) => {
    event.preventDefault();
    useUsersApiCall.signup(ProfileImageIndex.value, email.value, password.value, nickname.value);
  };

  const passwordHandleChange = (event) => {
    password.onChange(event.target.value);
    validatePasswords(event.target.value, passwordCheck.value);
  };

  const passwordCheckHandleChange = (event) => {
    passwordCheck.onChange(event.target.value);
    validatePasswords(password.value, event.target.value);
  };

  const validatePasswords = (password, passwordCheck) => {
    if (passwordCheck === "") {
      return setPasswordsMatch(false);
    }
    setPasswordsMatch(password === passwordCheck);
  };

  const checkEmailDuplicate = async (event) => {
    try {
      event.preventDefault();
      await useUsersApiCall.checkEmailDuplicate(email.value, email.setIsValid);
      email.setHasChecked(true);
    } catch (error) {
      alert(error);
    }
  };

  const checkNicknameDuplicate = async (event) => {
    try {
      event.preventDefault();
      await useUsersApiCall.checkNicknameDuplicate(nickname.value, nickname.setIsValid);
      nickname.setHasChecked(true);
    } catch (error) {
      alert(error);
    }
  };

  const clearAllInput = () => {
    email.clear();
    nickname.clear();
    password.clear();
    passwordCheck.clear();
    profileImage.clear();
    ProfileImageIndex.clear();
    setPasswordsMatch(false);
  };

  return (
    <>
      <Rodal
        visible={visible}
        onClose={() => {
          clearAllInput();
          onClose();
        }}
        customStyles={{ width: "90%", height: "auto", maxWidth: "500px" }} // 모달 스타일 조정
      >
        <div className="p-4">
          {profileImage.value ? (
            <img
              src={profileImage.value}
              alt="프로필 이미지"
              className="w-16 h-16 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full mb-4" // 이미지 크기 조정
            />
          ) : (
            <div className="w-16 h-16 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full bg-gray-200 mb-4"></div> // 이미지 플레이스홀더 크기 조정
          )}
          <LobbyBtn
            onClick={isProfileImageModalVisible.showRodal}
            className="mt-2 py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-md text-sm" // 버튼 크기 및 텍스트 크기 조정
            text="선택"
          />
        </div>

        <div className="space-y-2 p-2">
          <div className="space-y-2">
            <div className="flex space-x-1">
              <input
                type="text"
                placeholder="이메일"
                value={email.value}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" // 입력 필드 크기 조정
                onChange={(e) => email.onChange(e.target.value)}
              />
              <ModalBtn
                text="중복확인"
                onClick={checkEmailDuplicate}
                disabled={!email.isValid || !email.value}
                className="text-sm py-2" // 버튼 크기 조정
              />
            </div>
            {!email.isValid && email.hasChecked && (
              <div style={{ color: "green" }}>중복확인이 완료 되었습니다.</div>
            )}
            {email.isValid && email.hasChecked && (
              <div style={{ color: "red" }}>중복된 이메일이 있습니다.</div>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex space-x-1">
              <input
                type="text"
                placeholder="닉네임"
                value={nickname.value}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" // 입력 필드 크기 조정
                onChange={(e) => nickname.onChange(e.target.value)}
              />
              <ModalBtn
                text="중복확인"
                onClick={checkNicknameDuplicate}
                disabled={!nickname.isValid || !nickname.value}
                className="text-sm py-2" // 버튼 크기 조정
              />
            </div>
            {!nickname.isValid && nickname.hasChecked && (
              <div style={{ color: "green" }}>중복확인이 완료 되었습니다.</div>
            )}
            {nickname.isValid && nickname.hasChecked && (
              <div style={{ color: "red" }}>중복된 닉네임이 있습니다.</div>
            )}
          </div>
          <div className="text-xs text-gray-600">
            ※ 닉네임은 영문자, 숫자, 한글로 이루어진 1~8자까지 가능합니다.
          </div>

          <form className="space-y-2">
            <input
              type="password"
              placeholder="비밀번호"
              value={password.value}
              onChange={passwordHandleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" // 입력 필드 크기 조정
            />
            <div className="text-xs text-gray-600">
              ※ 비밀번호는 적어도 하나의 영문자, 특수문자, 숫자를 포함하여 6자리 이상이 되어야
              합니다.
            </div>

            <input
              type="password"
              placeholder="비밀번호 확인"
              value={passwordCheck.value}
              onChange={passwordCheckHandleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" // 입력 필드 크기 조정
            />
            {!passwordsMatch && passwordCheck.value && (
              <div className="text-red-500">비밀번호가 일치하지 않습니다.</div>
            )}
          </form>
          <ModalBtn
            onClick={signup}
            type="submit"
            text="회원가입"
            disabled={
              email.isValid ||
              nickname.isValid ||
              !passwordsMatch ||
              !password.isValid ||
              !ProfileImageIndex.value
            }
            className="text-sm py-2" // 버튼 크기 조정
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