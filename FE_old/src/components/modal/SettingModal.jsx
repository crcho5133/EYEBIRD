// SettingModal.jsx

import Rodal from "rodal"; // Rodal import
import "rodal/lib/rodal.css"; // Rodal CSS

const SettingModal = ({ visible, onClose }) => {
  return (
    <Rodal visible={visible} onClose={onClose} closeOnEsc={true} closeMaskOnClick={false}>
      <div>
        <h1>설정</h1>
        <button>ON/OFF</button>
      </div>
    </Rodal>
  );
};

export default SettingModal;
