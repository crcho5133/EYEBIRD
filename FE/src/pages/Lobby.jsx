import usersApiCall from "@/api/axios/usersApiCall";
import LobbyBtn from "@/components/lobby/LobbyBtn";
import { useAccessTokenState } from "@/context/AccessTokenContext";

const Lobby = () => {
  const accessToken = useAccessTokenState();
  const useUsersApiCall = usersApiCall();
  const logout = (event) => {
    event.preventDefault();

    useUsersApiCall.logout(accessToken);
  };

  return (
    <>
      <LobbyBtn text="로그아웃" onClick={logout} />
    </>
  );
};

export default Lobby;
