const GameResult = ({ myLose, opponentLose }) => {
  return (
    <>
      <h1>결과 창</h1>
      <div>나</div>
      <div className={`text-2xl ${myLose ? "text-red-600" : "text-green-600"}`}>
        {myLose ? "패배" : "승리"}
      </div>
      <div>ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ</div>
      <div>상대</div>
      <div className={`text-2xl ${opponentLose ? "text-red-600" : "text-green-600"}`}>
        {opponentLose ? "패배" : "승리"}
      </div>
    </>
  );
};

export default GameResult;
