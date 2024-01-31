// import profile from "../assets/img/bird_weard_pirate-hat.png"; // 프로필 사진 파일 경로
import wooden_plate from "../../assets/img/wooden_plate.png";
import old_paper from "../../assets/img/old_paper.png";
import CreatingRoomModal from "../modal/CreatingRoomModal";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import NavBar from "./NavBar";
import { RoomUrl } from "../../api/url/RoomUrl";

const NormalGameChoice = () => {
  const [creatingRoomVisible, setCreatingRoomVisible] = useState(false);
  const navigate = useNavigate(); // 추가된 코드

  const handleFastClassicClick = async () => {
    // 서버에게 현재 개설된 방 목록을 요청
    const response = await axios.get(RoomUrl);
    const rooms = response.data;

    // 방 인원이 홀수인 방을 찾음
    let room = rooms.filter((room) => room.players.length % 2 === 1)[0];

    // 홀수 인원의 방이 없다면, 방 인원이 7에 가까운 방을 찾음
    if (!room) {
      room = rooms.sort(
        (a, b) => Math.abs(a.players.length - 7) - Math.abs(b.players.length - 7)
      )[0];
    }

    // 조건에 맞는 방을 찾았다면, 그 방으로 입장
    if (room) {
      navigate("/room/" + room.id);
    }
  };

  const handleFastItemClick = async () => {
    // 서버에게 현재 개설된 방 목록을 요청
    const response = await axios.get(RoomUrl);
    const rooms = response.data;

    // 아이템전이면서 방 인원이 홀수인 방을 찾음
    let room = rooms.filter((room) => room.isItem && room.players.length % 2 === 1)[0];

    // 홀수 인원의 방이 없다면, 아이템전이면서 방 인원이 7에 가까운 방을 찾음
    if (!room) {
      room = rooms
        .filter((room) => room.isItem)
        .sort((a, b) => Math.abs(a.players.length - 7) - Math.abs(b.players.length - 7))[0];
    }

    // 조건에 맞는 방을 찾았다면, 그 방으로 입장
    if (room) {
      navigate("/room/" + room.id);
    }
  };

  const handleCreatingRoomOpen = () => {
    setCreatingRoomVisible(true);
  };

  const handleCreatingRoomClose = () => {
    setCreatingRoomVisible(false);
  };

  const handleRoomSearchClick = () => {
    navigate("/normalGame/roomSearch"); // 랭킹전 화면으로 이동
  };

  return (
    <>
      <NavBar />
      {/* // 아이템 버튼 클릭 시 수행하는 함수를 여기에 작성하세요. */}
      <div className="h-screen flex flex-col items-center mt-40">
        {/* 랭킹전 푯말 */}
        <div className="w-full flex justify-center">
          <h1 className="text-center z-10">일반전</h1>
        </div>
        {/* 클래식 버튼, 아이템 버튼 */}
        <div className="flex flex-col mt-4 space-y-8 gap-7">
          {/* Background image */}
          <img
            src={wooden_plate}
            alt="WoodenPlate"
            className="object-cover absolute z-0"
            style={{
              height: "50% ",
              width: "80%",
              left: "50%",
              transform: "translateX(-50%)",
              top: "32%",
            }}
          />
          <img
            src={old_paper}
            alt="OldPaper"
            className="object-cover absolute z-5 mb-40"
            style={{
              height: "50%",
              width: "80%",
              left: "50%",
              transform: "translateX(-50%)",
              top: "28%",
            }}
          />
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
        <CreatingRoomModal visible={creatingRoomVisible} onClose={handleCreatingRoomClose} />
      </div>
      ;
    </>
  );
};

export default NormalGameChoice;
