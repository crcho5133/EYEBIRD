import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const GameResult = ({ myLose, opponentLose, leaveSession }) => {
  const navigate = useNavigate();

  // useEffect(() => {
  //   setTimeout(() => {
  //     navigate("/lobby");
  //   }, 3000);
  // });
  return (
    <>
      <div className="h-screen flex justify-center items-center text-center">
        <div className="flex-col">
          <h1>결과 창</h1>
          <div>나</div>
          <div className={`text-2xl ${myLose ? "text-red-600" : "text-green-600"}`}>
            {myLose ? "패배" : "승리"}
          </div>
          <div>ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ</div>
          <div>상대</div>
          <div className={`text-2xl ${opponentLose ? "text-red-600" : "text-green-600"}`}>
            {opponentLose ? "패배" : "승리"}
          </div>
          <button
            onClick={() => {
              leaveSession();
              navigate(-1);
            }}
          >
            로비로 가기
          </button>
        </div>
      </div>
    </>
  );
};

export default GameResult;
