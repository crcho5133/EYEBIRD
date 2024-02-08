import { useState, useEffect } from "react";
import Rodal from "rodal"; // Rodal import
import "rodal/lib/rodal.css"; // Rodal CSS
import LobbyBtn from "@/components/lobby/LobbyBtn";
import useShowComponent from "@/hooks/useShowComponent";


const SettingModal = ({ visible, onClose }) => {
  const [volume, setVolume] = useState(50); // 앱의 소리 조절 상태
  const [micVolume, setMicVolume] = useState(50); // 마이크 소리 조절 상태
  const [blockInvites, setBlockInvites] = useState(false); // 초대 차단 상태
  const isBtnVisible = useShowComponent();

  const logout = (event) => {
    event.preventDefault();
    useUsersApiCall.logout();
  };

  const handleVolumeChange = (event) => {
    setVolume(event.target.value);
  };

  const handleMicVolumeChange = (event) => {
    setMicVolume(event.target.value);
  };

  const handleBlockInvitesChange = (event) => {
    setBlockInvites(event.target.checked);
  };

  return (
    <Rodal visible={visible} onClose={onClose} closeOnEsc={true} closeMaskOnClick={false}>
      <div className="flex flex-col items-center p-5 bg-gray-800 text-white rounded-lg">
        <h1 className="mb-4 text-2xl font-bold">설정</h1>
        <div className="w-full mb-4">
          <label className="block mb-2">앱 소리 조절: </label>
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={handleVolumeChange}
            className="w-full h-2 bg-blue-500 rounded"
          />
        </div>
        <div className="w-full mb-4">
          <label className="block mb-2">마이크 소리 조절: </label>
          <input
            type="range"
            min="0"
            max="100"
            value={micVolume}
            onChange={handleMicVolumeChange}
            className="w-full h-2 bg-blue-500 rounded"
          />
        </div>
        <div className="flex items-center">
          <label className="mr-2">초대 차단: </label>
          <button
            onClick={handleBlockInvitesChange}
            className={`w-10 h-6 rounded-full ${blockInvites ? "bg-green-500" : "bg-red-500"}`}
          ></button>
        </div>
        <div>
          {!isBtnVisible.value && <LobbyBtn text="로그아웃" onClick={logout} />}
        </div>
      </div>
    </Rodal>
  );
};

export default SettingModal;
