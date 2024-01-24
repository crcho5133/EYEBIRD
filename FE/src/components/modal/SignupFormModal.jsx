import React, { useState } from "react";
import Rodal from "rodal";
import ProfileImgModal from "./ProfileImgModal";
import "rodal/lib/rodal.css";

const SignupFormModal = ({ visible, onClose }) => {
  const [profileImage, setProfileImage] = useState("");
  const [isProfileImgModalVisible, setProfileImgModalVisible] = useState(false);

  const showRodal = () => {
    setProfileImgModalVisible(true);
  };

  const hideRodal = () => {
    setProfileImgModalVisible(false);
  };

  const handleDuplicateCheck = () => {
    console.log("중복 확인 처리");
  };

  return (
    <>
      <Rodal visible={visible} onClose={onClose} customStyles={{ width: "80%", height: "80%" }}>
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

        <form className="space-y-4 p-4">
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="아이디"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={handleDuplicateCheck}
              className="py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-md"
            >
              중복확인
            </button>
          </div>

          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="닉네임"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={handleDuplicateCheck}
              className="py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-md"
            >
              중복확인
            </button>
          </div>

          <input
            type="password"
            placeholder="비밀번호"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="비밀번호 확인"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-md"
          >
            회원가입
          </button>
        </form>
      </Rodal>
      <ProfileImgModal
        visible={isProfileImgModalVisible}
        onClose={hideRodal}
        setProfileImage={setProfileImage}
      />
    </>
  );
};

export default SignupFormModal;
