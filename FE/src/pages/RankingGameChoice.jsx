// import profile from "../assets/img/bird_weard_pirate-hat.png"; // 프로필 사진 파일 경로
import NavBar from "@/components/lobby/NavBar";
import wooden_plate from "@/assets/img/wooden_plate.png";
import old_paper from "@/assets/img/old_paper.png";
import { useNavigate } from "react-router-dom";
import { useWebSocket } from "../context/WebSocketContext";
import { useEffect, useState } from "react";
import { toast, Slide, Bounce } from "react-toastify";

const RankingGameChoice = () => {
  const { client, match, gameId, setMatch, opponentInfo } = useWebSocket();
  const [gameType, setGameType] = useState("");

  const navigate = useNavigate();
  const email = sessionStorage.getItem("email");

  useEffect(() => {
    if (match && gameId) {
      // setMatch(false);
      // navigate(`/game/${gameId}`, { state: { gameType, opponentInfo } });
      toast.dismiss(); // Pending 알림이 있다면 닫기
      toast.success("매칭에 성공하였습니다", {
        autoClose: 2000, // 2초 동안 표시
        onClose: () => {
          // 알림이 닫힌 후 실행할 로직
          setMatch(false); // 매칭 상태 초기화
          navigate(`/game/${gameId}`, { state: { gameType, opponentInfo } }); // 페이지 이동
        },
      });
    }
  }, [match, gameId]);

  const startMatch = (isItem) => {
    toast.info("매칭 찾는 중...", { autoClose: false, position: "top-center", theme: "colored" });
    if (client) {
      client.publish({
        destination: "/stomp/matching",
        body: JSON.stringify({
          // Your JSON data here
          ifItem: isItem,
          email: email,
        }),
      });
      console.log("Invitation sent");
    } else {
      console.log("WebSocket connection is not active");
    }
  };

  const handleClassicClick = () => {
    // 클래식 버튼 클릭 시 수행하는 함수를 여기에 작성하세요.
    setGameType("classic");
    startMatch(false);
  };

  const handleItemClick = () => {
    // 아이템 버튼 클릭 시 수행하는 함수를 여기에 작성하세요.
    setGameType("item");
    startMatch(true);
  };

  return (
    <>
      {/* <NavBar /> */}
      <div className="h-screen flex flex-col content-center justify-center">
        {/* 랭킹전 푯말 */}
        <div className="mt-20 absolute top-40 w-full flex justify-center">
          <h1 className="text-center">랭킹전</h1>
        </div>
        {/* 클래식 버튼, 아이템 버튼 */}
        <div className="flex absolute w-full flex-col mt-4 space-y-24 bottom-40">
          {/* Background image */}
          <img
            src={wooden_plate}
            alt="WoodenPlate"
            className="object-cover absolute z-0"
            style={{
              height: "170% ",
              width: "80%",
              left: "50%",
              transform: "translateX(-50%)",
              top: "-10%",
            }}
          />
          <img
            src={old_paper}
            alt="OldPaper"
            className="object-cover absolute z-5 mb-40"
            style={{
              height: "155%",
              width: "80%",
              left: "50%",
              transform: "translateX(-50%)",
              top: "-45%",
            }}
          />
          <button
            onClick={handleClassicClick}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full z-10"
          >
            클래식
          </button>
          <button
            onClick={handleItemClick}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full z-10"
          >
            아이템
          </button>
        </div>
      </div>
    </>
  );
};

export default RankingGameChoice;
