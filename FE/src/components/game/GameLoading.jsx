import background_wooden_plate from "../../assets/img/background_wooden_plate.png";
import TitleBar from "@/assets/img/matchingInfo/TitleBar.png";
import InfoBackground3 from "@/assets/img/matchingInfo/InfoBackground3.png";
import VSImage from "@/assets/img/matchingInfo/VSImage.png";
import CountdownBackground from "@/assets/img/matchingInfo/CountdownBackground.png";
import proFileImage from "@/assets/img/profile/bird1.png";
import { useState, useEffect } from "react";

const GameLoading = ({ publisher, subscriber, gameType, opponentInfoParsed }) => {
  // console.log(publisher);
  // console.log(subscriber);
  // const pubnickname = JSON.parse(publisher.stream.connection.data).clientData;
  // const subnickname = JSON.parse(subscriber.stream.connection.data).clientData;
  const [countdown, setCountdown] = useState(3);

  const myNickName = sessionStorage.getItem("nickname") || "test";
  const myProfileImage = sessionStorage.getItem("profile") || proFileImage;
  const opponentNickname = opponentInfoParsed.nickname;
  const myClassicPoint = sessionStorage.getItem("classicPt") || "test";
  const opponentClassicPoint = opponentInfoParsed.classicPt;
  const myWinNumClassic = sessionStorage.getItem("winNumClassic") || "test";
  const opponentWinNumClassic = opponentInfoParsed.winNumClassic;
  const myLoseNumClassic = sessionStorage.getItem("loseNumClassic") || "test";
  const opponentLoseNumClassic = opponentInfoParsed.loseNumClassic;
  const myItemPoint = sessionStorage.getItem("itemPt") || "test";
  const opponentItemPoint = opponentInfoParsed.itemPt;
  const myWinNumItem = sessionStorage.getItem("winNumItem") || "test";
  const opponentWinNumItem = opponentInfoParsed.winNumItem;
  const myLoseNumItem = sessionStorage.getItem("loseNumItem") || "test";
  const opponentLoseNumItem = opponentInfoParsed.loseNumItem;
  // const expectedWinPt = opponentInfoParsed.expectedWinPt;
  // const expectedLosePt = opponentInfoParsed.expectedLosePt;

  useEffect(() => {
    if (countdown > 0) {
      const timerId = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timerId);
    }
  }, [countdown]);

  return (
    <div className="boxControl" style={{ backgroundColor: "#69492E", height: "100%vh" }}>
      <div className="flex flex-col h-100vh matchingInfo6">
        <div className="text-10vw font-bold text-center mt-5vh matchingInfo0">
          {gameType === "classic" ? "클래식전" : "아이템전"}
          <hr className="mt-1vh border-black" />
        </div>
        <div
          style={{
            background: `url(${InfoBackground3}) no-repeat`,
            backgroundSize: "90vw 90vh",
            backgroundPosition: "center",
            width: "90vw",
            height: "90vh",
          }}
          className="mt-3vh flex flex-col self-center matchingInfo1"
        >
          <div
            style={{
              background: `url(${TitleBar}) no-repeat`,
              backgroundSize: "cover",
            }}
            className="mt-10vh w-50vw h-5vh flex items-center self-center border-2 matchingInfo2"
          >
            <img
              src={myProfileImage}
              style={{ width: "6vw", height: "3vh" }}
              className="ms-5vw matchingInfo3"
            />
            <div className="flex justify-center matchingInfo4 w-30vw">{myNickName}</div>
          </div>
          <div>
            <div className="mt-2vh ml-22vw matchingInfo5">
              {gameType === "classic" ? "점수(Classic) :" : "점수(Item) :"}
              <span className="ml-3vw text-[#7B1616] matchingInfo10">
                {gameType === "classic" ? myClassicPoint : myItemPoint}점
              </span>
            </div>
            <div className="mt-2vh ml-22vw matchingInfo5">
              전적 :
              <span className="ml-3vw text-[#7B1616] matchingInfo10">
                <span>{gameType === "classic" ? myWinNumClassic : myWinNumItem}승</span>
                <span>{gameType === "classic" ? myLoseNumClassic : myLoseNumItem}패</span>
              </span>
            </div>
            <div className="mt-2vh ml-22vw matchingInfo5">
              예상 획득 점수 :<span className="ml-3vw text-[#7B1616] matchingInfo10">±30점</span>
            </div>
          </div>
          <div className="flex items-center ms-12vh matchingInfo7-1 mt-2vh mb-2vh">
            <img src={VSImage} style={{ width: "20vw", height: "7vh" }} className="matchingInfo7" />
            <div className=" flex flex-col justify-center items-center ms-2vw">
              <div
                style={{
                  background: `url(${CountdownBackground}) no-repeat center center`,
                  backgroundSize: "contain",
                  width: "15vw",
                  height: "8vh",
                }}
                className="ms-10vw blink flex justify-center items-center text-10vw matchingInfo8"
              >
                {countdown}
              </div>
              <div className="text-4vw ms-8vw matchingInfo11">초 뒤 게임이 </div>
              <div className="text-4vw ms-8vw matchingInfo11">시작됩니다</div>
            </div>
          </div>
          <div
            style={{
              background: `url(${TitleBar}) no-repeat`,
              backgroundSize: "cover",
            }}
            className="w-50vw h-5vh flex items-center self-center border-2 border-black matchingInfo9"
          >
            <img
              src={myProfileImage}
              style={{ width: "6vw", height: "3vh" }}
              className="ms-5vw matchingInfo3"
            />
            <div className="flex justify-center matchingInfo4 w-30vw">{opponentNickname}</div>
          </div>
          <div className="matchingInfo5">
            <div className="mt-2vh ml-22vw matchingInfo5">
              {gameType === "classic" ? "점수(Classic) :" : "점수(Item) :"}
              <span className="ml-3vw text-[#7B1616] matchingInfo10">
                {gameType === "classic" ? opponentClassicPoint : opponentItemPoint}점
              </span>
            </div>
            <div className="mt-2vh ml-22vw matchingInfo5">
              전적 :
              <span className="ml-3vw text-[#7B1616] matchingInfo10">
                <span>{gameType === "classic" ? opponentWinNumClassic : opponentWinNumItem}승</span>
                <span>
                  {gameType === "classic" ? opponentLoseNumClassic : opponentLoseNumItem}패
                </span>
              </span>
            </div>
            <div className="mt-2vh ml-22vw matchingInfo5">
              예상 획득 점수 :<span className="ml-3vw text-[#7B1616] matchingInfo10">±30점</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameLoading;
