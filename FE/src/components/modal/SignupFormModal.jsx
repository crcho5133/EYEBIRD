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
import backgroundImage from "@/assets/img/modal/background.png";
import imageSelectBtn from "@/assets/img/modal/button1.png";

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
      alert(error.response?.data?.errorMessage);
    }
  };

  const checkNicknameDuplicate = async (event) => {
    try {
      event.preventDefault();
      await useUsersApiCall.checkNicknameDuplicate(nickname.value, nickname.setIsValid);
      nickname.setHasChecked(true);
    } catch (error) {
      alert(error.response?.data?.errorMessage);
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
        customStyles={{
          width: "90vw",
          height: "80vh",
          padding: 0, // 내부 패딩 제거
          background: `url(${backgroundImage}) no-repeat center center`,
          backgroundSize: "contain", // 배경 이미지가 모달 내부에 맞게 조정
          maxWidth: "500px",
          borderRadius: "0", // 모달의 모서리를 둥글게 하지 않음
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
          display: "flex", // Flex를 추가
          justifyContent: "center", // 중앙 정렬
          alignItems: "center", // 상하 중앙 정렬
        }}
        onClose={() => {
          clearAllInput();
          onClose();
        }}
      >
        <div
          style={{
            width: "70%",
            height: "70%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            background: "transparent",
          }}
          className="flex flex-col"
        >
          <div
            className="p-4 flex flex-col justify-center items-center"
            style={{ marginTop: "20vh" }}
          >
            {profileImage.value ? (
              <div className="border-4 border-gold-500 shadow-lg rounded-full overflow-hidden">
                <img
                  src={profileImage.value}
                  alt="프로필 이미지"
                  className="w-16 h-16 object-cover"
                />
              </div>
            ) : (
              <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
            )}

            <LobbyBtn
              onClick={isProfileImageModalVisible.showRodal}
              style={{
                marginTop: "1vh",
                backgroundImage: `url(${imageSelectBtn})`,
                backgroundSize: "100% 100%",
                backgroundPosition: "center",
                width: "25vw",
                height: "3vh",
              }}
            />
          </div>
          <div className="space-y-1">
            <div className="space-y-1 mx-auto max-w-ls">
              <div className="flex items-center space-x-2">
                <label
                  htmlFor="email"
                  className="text-sm font-bold"
                  style={{ width: "15vw", height: "1vh" }}
                >
                  이메일 :
                </label>
                <input
                  id="email"
                  type="text"
                  value={email.value}
                  style={{ width: "30vw", height: "1vh" }}
                  className="px-3 py-2 border-2 border-orange-300 rounded-md focus:outline-none focus:ring focus:ring-orange-500 bg-transparent text-sm shadow"
                  onChange={(e) => email.onChange(e.target.value)}
                />
                <ModalBtn
                  text="중복확인"
                  onClick={checkEmailDuplicate}
                  disabled={!email.isValid || !email.value}
                  className="text-xs border-2 border-orange-300 rounded-md flex items-center justify-center"
                  style={{ width: "8vw", height: "5vh" }}
                />
              </div>
            </div>
            <p className="text-sm text-green-500">
              {!email.isValid && email.hasChecked && (
                <div style={{ color: "green" }}>중복확인이 완료 되었습니다.</div>
              )}{" "}
            </p>
            <p className="text-sm text-red-500">
              {email.isValid && email.hasChecked && (
                <div style={{ color: "red" }}>중복된 이메일이 있습니다.</div>
              )}
            </p>

            <div className="flex items-center space-x-2">
              <label
                htmlFor="email"
                className="text-sm font-bold flex-shrink-0"
                style={{ width: "15vw", height: "1vh" }}
              >
                닉네임 :
              </label>
              <input
                type="text"
                placeholder="닉네임"
                value={nickname.value}
                style={{ width: "30vw", height: "1vh" }}
                className="w-5/12 px-3 py-2 border-2 border-orange-300 rounded-md focus:outline-none focus:ring focus:ring-orange-500 bg-transparent text-sm shadow"
                onChange={(e) => nickname.onChange(e.target.value)}
              />
              <ModalBtn
                text="중복확인"
                onClick={checkNicknameDuplicate}
                disabled={!nickname.isValid || !nickname.value}
                className="text-xs border-2 border-orange-300 rounded-md flex items-center justify-center"
                style={{ width: "8vw", height: "5vh" }}
              />
            </div>
            {!nickname.isValid && nickname.hasChecked && (
              <div style={{ color: "green" }}>중복확인이 완료 되었습니다.</div>
            )}
            {nickname.isValid && nickname.hasChecked && (
              <div style={{ color: "red" }}>중복된 닉네임이 있습니다.</div>
            )}

            <div
              className="text-xs text-black-600 font-semibold"
              style={{ width: "50vw", height: "5vh" }}
            >
              ※ 닉네임은 영문자, 숫자, 한글로 이루어진 1~8자까지 가능합니다.
            </div>

            <form className="space-y-2">
              <div className="flex items-center space-x-2">
                <label
                  htmlFor="password"
                  className="text-sm font-bold flex-shrink-0"
                  style={{ width: "20vw", height: "1vh" }}
                >
                  비밀번호 :
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="비밀번호"
                  value={password.value}
                  onChange={passwordHandleChange}
                  style={{ width: "40vw", height: "1vh" }}
                  className="w-full px-3 py-2 border-2 border-orange-300 rounded-md focus:outline-none focus:ring focus:ring-orange-500 bg-transparent text-sm shadow"
                />
              </div>

              <div className="text-xs text-orange-600 font-semibold">
                ※ 비밀번호는 6자리 이상으로 영문자, 특수문자, 숫자를 모두 포함하여야 합니다.
              </div>

              <div className="flex items-center space-x-2">
                <label
                  htmlFor="passwordCheck"
                  className="text-sm font-bold flex-shrink-0"
                  style={{ width: "25vw", height: "1vh" }}
                >
                  비밀번호 확인 :
                </label>
                <input
                  id="passwordCheck"
                  type="password"
                  placeholder="비밀번호 확인"
                  value={passwordCheck.value}
                  onChange={passwordCheckHandleChange}
                  style={{ width: "30vw", height: "1vh" }}
                  className="w-full px-3 py-2 border-2 border-orange-300 rounded-md focus:outline-none focus:ring focus:ring-orange-500 bg-transparent text-sm shadow"
                />
              </div>
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
              className="text-xs border-2 border-orange-300 rounded-md flex items-center justify-center"
              style={{ width: "8vw", height: "5vh" }}
            />
          </div>
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
