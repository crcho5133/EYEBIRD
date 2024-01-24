import usersApiCall from "@/api/axios/usersApiCall";
import LobbyBtn from "@/components/lobby/LobbyBtn";

const Lobby = () => {
  const logout = (event) => {
    event.preventDefault();
    usersApiCall().logout();
  };

  return (
    <>
      <LobbyBtn text="로그아웃" onClick={logout} />
    </>
  );
};

export default Lobby;
