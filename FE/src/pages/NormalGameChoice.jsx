// import profile from "../assets/img/bird_weard_pirate-hat.png"; // 프로필 사진 파일 경로
import CreatingRoomModal from "@/components/modal/CreatingRoomModal";
import { useNavigate } from "react-router-dom";
import wooden_plate from "@/assets/img/wooden_plate.png";
import { useState } from "react";
import { QuickClassicUrl, QuickItemUrl } from "../api/url/RoomSearchUrl";
import old_paper from "@/assets/img/old_paper.png";
import NavBar from "@/components/lobby/NavBar";
import axios from "axios";

const NormalGameChoice = () => {
  const [creatingRoomVisible, setCreatingRoomVisible] = useState(false);
  const token = sessionStorage.getItem("accessToken");
  const navigate = useNavigate();

  const handleFastClassicClick = async () => {
    // 서버에게 현재 개설된 방 목록을 요청
    const response = await axios.get(QuickClassicUrl, {
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
    });
    console.log(response);
    const room = response.data;

    navigate(`/room/${room.roomId}`, { state: { roomName: room.roomName } });
  };

  const handleFastItemClick = async () => {
    // 서버에게 현재 개설된 방 목록을 요청
    const response = await axios.get(QuickItemUrl, {
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
    });
    console.log(response);
    const room = response.data;

    navigate(`/room/${room.roomId}`, { state: { roomName: room.roomName } });
  };

  const handleCreatingRoomOpen = () => {
    setCreatingRoomVisible(true);
  };

  const handleCreatingRoomClose = () => {
    setCreatingRoomVisible(false);
  };

  const handleRoomSearchClick = () => {
    navigate("roomSearch"); // 랭킹전 화면으로 이동
  };

  return (
    <>
      <div className="h-screen flex flex-col content-center justify-center space-y-12">
        <div className=" flex justify-center">
          <h1 className="text-center z-10">일반전</h1>
        </div>
        <div className="flex flex-col mt-4 space-y-8 gap-7">
          <img
            src={wooden_plate}
            alt="WoodenPlate"
            className="object-cover absolute z-0 h-auto"
            style={{
              width: "30%",
              left: "50%",
              transform: "translateX(-50%)",
              top: "32%",
            }}
          />
          <img
            src={old_paper}
            alt="OldPaper"
            className="object-cover absolute z-5 mb-40 h-auto"
            style={{
              width: "30%",
              left: "50%",
              transform: "translateX(-50%)",
              top: "28%",
            }}
          />
          <div className="flex flex-col items-center space-y-4">
            <button
              onClick={handleFastClassicClick}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full z-10"
            >
              바로입장 클래식
            </button>
            <button
              onClick={handleFastItemClick}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full  z-10"
            >
              바로입장 아이템
            </button>
            <button
              onClick={handleCreatingRoomOpen}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full  z-10"
            >
              방만들기
            </button>
            <button
              onClick={handleRoomSearchClick}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full z-10"
            >
              방찾기
            </button>
          </div>
        </div>
        <CreatingRoomModal visible={creatingRoomVisible} onClose={handleCreatingRoomClose} />
      </div>
    </>
  );
};
export default NormalGameChoice;
