import Rodal from "rodal";
import "rodal/lib/rodal.css";

const AudioControlModal = ({
  isVisible,
  hideModal,
  toggleAudio,
  selectedAudioOption,
  setSelectedAudioOption,
  myTeam,
  teamA,
  teamB,
}) => {
  return (
    <Rodal visible={isVisible} onClose={hideModal} height={300} width={300} animation="slideUp">
      <h2>음성 제어</h2>
      <button
        onClick={() => {
          // toggleAudio(teamA, true);
          // toggleAudio(teamB, true);
          setSelectedAudioOption("all");
        }}
        className={`m-4 ${selectedAudioOption === "all" ? "bg-green-500" : "bg-red-500"}`}
      >
        전체
      </button>
      <button
        onClick={() => {
          // toggleAudio(myTeam === "A" ? teamB : teamA, false);
          // toggleAudio(myTeam === "A" ? teamA : teamB, true);
          setSelectedAudioOption("team");
        }}
        className={`m-4 ${selectedAudioOption === "team" ? "bg-green-500" : "bg-red-500"}`}
      >
        팀
      </button>
      <button
        onClick={() => {
          // toggleAudio(teamA, false);
          // toggleAudio(teamB, false);
          setSelectedAudioOption("off");
        }}
        className={`m-4 ${selectedAudioOption === "off" ? "bg-green-500" : "bg-red-500"}`}
      >
        끄기
      </button>
    </Rodal>
  );
};

export default AudioControlModal;
