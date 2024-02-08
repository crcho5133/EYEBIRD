// import profile from "../assets/img/bird_weard_pirate-hat.png"; // 프로필 사진 파일 경로
import NavBar from "@/components/lobby/NavBar";
import post_it_1 from "../assets/img/post_it_1.png";
import post_it_2 from "../assets/img/post_it_2.png";
import wooden_board from "@/assets/img/wooden_board.png";
import subject_board from "@/assets/img/subject_board.png";
import { useNavigate } from "react-router-dom";
import { useWebSocket } from "../context/WebSocketContext";
import { useEffect, useState } from "react";
import { toast, Slide, Bounce } from "react-toastify";

const RankingGameChoice = () => {
  const { client, match, gameId, setMatch, opponentInfo } = useWebSocket();
  const [gameType, setGameType] = useState("");
  const [point, setPoint] = useState("");

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
          point: point,
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
    setPoint(sessionStorage.getItem("classicPt"));
    startMatch(false);
  };

  const handleItemClick = () => {
    // 아이템 버튼 클릭 시 수행하는 함수를 여기에 작성하세요.
    setGameType("item");
    setPoint(sessionStorage.getItem("itemPt"));
    startMatch(true);
  };

  return (
    <>
      {/* <NavBar /> */}
      <div className="h-screen flex flex-col items-center space-y-12">
        <div></div>

        <div className="flex " style={{ position: "relative", height: "15%", width: "80%" }}>
          <img src={subject_board} />
          <div
            className="object-cover absolute z-5 h-auto"
            style={{
              position: "absolute",
              left: "50%",
              transform: "translate(-50%)",
              top: "40%",
            }}
          >
            랭킹전
          </div>
        </div>
        <div className="flex-col" style={{ position: "relative", height: "60%", width: "80%" }}>
          <img src={wooden_board} />
          <div
            className="object-cover absolute z-0 h-auto"
            style={{
              transform: "translateX(-50%)",
              left: "50%",
              top: "12%",
            }}
          >
            <div className="flex " style={{ position: "relative" }}>
              <button onClick={handleClassicClick} style={{ position: "relative" }}>
                <img src={post_it_1} />
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    color: "white",
                  }}
                >
                  랭킹전
                </div>
              </button>
            </div>
            <div className="flex ">
              <button onClick={handleItemClick} style={{ position: "relative" }}>
                <img src={post_it_2} />
                <div
                  style={{
                    position: "absolute",

                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    color: "white",
                  }}
                >
                  일반전
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* 랭킹전, 일반전 버튼 */}
    </>
  );
};

export default RankingGameChoice;
