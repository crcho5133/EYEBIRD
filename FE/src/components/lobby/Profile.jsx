import { useAccessTokenState } from "@/context/AccessTokenContext";
import LobbyBtn from "@/components/lobby/LobbyBtn";
import useShowRodal from "@/hooks/useShowRodal";
import ProfileImageModal from "@/components/modal/ProfileImageModal";
import useFormField from "@/hooks/useFormField";

const Profile = () => {
  const myInfo = useAccessTokenState();
  const isProfileImageModalVisible = useShowRodal();
  const profileImage = useFormField("");
  const profileImageIndex = useFormField("");

  return (
    <div className="p-4">
      <img src={myInfo.profile} alt="프로필 이미지" className="w-20 h-20 rounded-full mb-4" />
      <LobbyBtn
        onClick={isProfileImageModalVisible.showRodal}
        className="mt-2 py-1 px-4 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-md"
        text="캐릭터 변경"
      />
      <div> 닉네임 : {myInfo.nickname}</div>
      <div> 전적 </div>
      <div> 아이템 : </div>
      <div> 점수 : {myInfo.itemPt}</div>
      <div>
        {" "}
        승률 : {myInfo.winNum}승, {myInfo.loseNum}패
      </div>
      <div> 클래식 :</div>
      <div> 점수 : {myInfo.classicPt}</div>
      <div>
        {" "}
        승률 : {myInfo.winNum}승, {myInfo.loseNum}패
      </div>

      <ProfileImageModal
        visible={isProfileImageModalVisible.value}
        onClose={isProfileImageModalVisible.hideRodal}
        setProfileImage={profileImage.setValue}
        setProfileImageIndex={profileImageIndex.setValue}
        myInfo={myInfo}
      />
    </div>
  );
};

export default Profile;
