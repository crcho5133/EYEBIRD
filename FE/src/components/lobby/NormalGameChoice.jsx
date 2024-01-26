// import profile from "../assets/img/bird_weard_pirate-hat.png"; // 프로필 사진 파일 경로
import wooden_plate from "../../assets/img/wooden_plate.png";
import old_paper from "../../assets/img/old_paper.png";
import CreatingRoomModal from "../modal/CreatingRoomModal";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const NormalGameChoice = () => {
  const [creatingRoomVisible, setCreatingRoomVisible] = useState(false);
  const navigate = useNavigate(); // 추가된 코드

  const handleFastClassicClick = () => {
    // 클래식 버튼 클릭 시 수행하는 함수를 여기에 작성하세요.
  };

  const handleFastItemClick = () => {
    // 아이템 버튼 클릭 시 수행하는 함수를 여기에 작성하세요.
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
    // 아이템 버튼 클릭 시 수행하는 함수를 여기에 작성하세요.
    <div className="h-screen flex flex-col content-center justify-center">
      {/* 랭킹전 푯말 */}
      <div className="mt-20 absolute top-40 w-full flex justify-center">
        <h1 className="text-center">일반전</h1>
      </div>
      {/* 클래식 버튼, 아이템 버튼 */}
      <div className="flex absolute w-full flex-col mt-4 space-y-24 bottom-40">
        {/* Background image */}
        <img
          src={wooden_plate}
          alt="WoodenPlate"
          className="object-cover absolute z-0"
          style={{
            height: "100% ",
            width: "80%",
            left: "50%",
            transform: "translateX(-50%)",
            top: "12%",
          }}
        />
        <img
          src={old_paper}
          alt="OldPaper"
          className="object-cover absolute z-5 mb-40"
          style={{
            height: "100%",
            width: "80%",
            left: "50%",
            transform: "translateX(-50%)",
            top: "-10%",
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
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full z-10"
        >
          바로입장 아이템
        </button>
        <button
          onClick={handleCreatingRoomOpen}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full z-10"
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
  );
};

export default NormalGameChoice;
