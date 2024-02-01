// import profile from "../assets/img/bird_weard_pirate-hat.png"; // 프로필 사진 파일 경로
import NavBar from "@/components/lobby/NavBar";
import wooden_plate from "@/assets/img/wooden_plate.png";
import old_paper from "@/assets/img/old_paper.png";

const RankingGameChoice = () => {
  const handleClassicClick = () => {
    // 클래식 버튼 클릭 시 수행하는 함수를 여기에 작성하세요.
  };

  const handleItemClick = () => {
    // 아이템 버튼 클릭 시 수행하는 함수를 여기에 작성하세요.
  };

  return (
    <>
      <NavBar />
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
