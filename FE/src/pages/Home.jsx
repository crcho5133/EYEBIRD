import React, { useState } from 'react';
import LobbyBtn from '@/components/lobby/LobbyBtn';
import LoginFormModal from '@/components/modal/LoginFormModal';

const Home = () => {
  const [modalType, setModalType] = useState(null);

  const showLoginModal = () => setModalType('login');
  const closeModal = () => setModalType(null);

  return (
    <>
      <LobbyBtn text="로그인" onClick={showLoginModal} className="mr-4" />

      {modalType === 'login' && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
          <LoginFormModal closeModal={closeModal} />
        </div>
      )}
    </>
  );
};

export default Home;