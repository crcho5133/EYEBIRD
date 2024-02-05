import Rodal from "rodal";
import "rodal/lib/rodal.css";
import usersApiCall from "@/api/axios/usersApiCall";

import a from "../assets/img/1.png";
import b from "../assets/img/2.png";
import c from "../assets/img/3.png";
import d from "../assets/img/4.png";

const ProfileImageModal = ({ visible, onClose, setProfileImage, setProfileImageIndex, myInfo }) => {
  const useUsersApiCall = usersApiCall();


  const profileImages = [
    a,b,c,d
  ];
  // const profileImages = [
  //   "src/assets/img/aaa.jpg",
  //   "src/assets/img/bbb.jpg",
  //   "src/assets/img/ccc.png",
  //   "src/assets/img/ddd.png",
  // ];

  const ImageSelect = async (imageUrl, index) => {
    if (myInfo) {
      myInfo.setProfileImageIndex(index);
      await useUsersApiCall.changeProfileImage(index);
      onClose();
    } else {
      setProfileImage(imageUrl);
      setProfileImageIndex(index);
      onClose();
    }
  };

  return (
    <Rodal visible={visible} onClose={onClose} customStyles={{ width: "80%", height: "55%" }}>
      <h2 className="text-center text-xl font-bold mb-4">프로필 사진</h2>
      <div className="grid grid-cols-3 gap-4">
        {profileImages.map((imageUrl, index) => (
          <div key={index} className="relative">
            <img
              src={imageUrl}
              alt={`프로필 이미지 ${index + 1}`}
              className="w-full h-32 object-cover cursor-pointer"
            />
            <button
              onClick={() => ImageSelect(imageUrl, index + 1)}
              className="absolute bottom-0 left-0 w-full bg-gray-800 text-white py-1 px-2 opacity-75 hover:opacity-100"
            >
              선택
            </button>
          </div>
        ))}
      </div>
      <button onClick={onClose}> 닫기 </button>
    </Rodal>
  );
};

export default ProfileImageModal;
