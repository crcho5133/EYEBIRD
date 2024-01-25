const ModalBtn = ({ text, onClick, disabled, type }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-3 py-1 ${disabled ? "bg-gray-300" : "bg-blue-500 hover:bg-blue-600"} text-white font-bold rounded-md`}
    >
      {text}
    </button>
  );
};

export default ModalBtn;
