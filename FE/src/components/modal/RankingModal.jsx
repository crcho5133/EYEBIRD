import Rodal from "rodal";

const RankingModal = ({ visible, onClose }) => {
  //   const clearAllInput = () => {
  //     email.clear();
  //     password.clear();
  //   };

  return (
    <>
      <Rodal
        visible={visible}
        onClose={() => {
          //   clearAllInput();
          onClose();
        }}
        customStyles={{ width: "80%", height: "25%" }}
      ></Rodal>
    </>
  );
};

export default RankingModal;
