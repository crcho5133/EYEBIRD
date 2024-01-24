import Rodal from "rodal";
import "rodal/lib/rodal.css";

const ProfileImageModal = ({ visible, onClose, setProfileImage }) => {
  const profileImages = [
    "src/assets/img/케이셉.PNG",
    "src/assets/img/포이즌.PNG",
    "src/assets/img/케이셉.PNG",
    "src/assets/img/포이즌.PNG",
    "src/assets/img/케이셉.PNG",
    "src/assets/img/포이즌.PNG",
    "src/assets/img/케이셉.PNG",
    "src/assets/img/포이즌.PNG",
  ];

  const ImageSelect = (imageUrl) => {
    setProfileImage(imageUrl);
    onClose();
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
              onClick={() => ImageSelect(imageUrl)}
              className="absolute bottom-0 left-0 w-full bg-gray-800 text-white py-1 px-2 opacity-75 hover:opacity-100"
            >
              선택
            </button>
          </div>
        ))}
      </div>
    </Rodal>
  );
};

export default ProfileImageModal;
