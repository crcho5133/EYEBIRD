const DescriptionModal = ({ closeModal }) => {
    return (
        <>
            게임설명~~~~~~~~~~~~~~~~

            <button 
                onClick={closeModal} 
                className="mt-4 py-2 px-4 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold rounded-md"
            >
                닫기
            </button>
        </>
    
    );
  };
  
  export default DescriptionModal;
  