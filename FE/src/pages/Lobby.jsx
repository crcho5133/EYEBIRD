import usersApiCall from "@/api/axios/usersApiCall";
import LobbyBtn from "@/components/lobby/LobbyBtn";
import { useAccessTokenState } from "@/context/AccessTokenContext";
import { useNavigate } from "react-router-dom";

const Lobby = () => {
  const accessToken = useAccessTokenState();
  const navigate = useNavigate();

  const logout = (event) => {
    event.preventDefault();
    usersApiCall().logout(accessToken);
    navigate("/");
  };

  return (
    <>
      <LobbyBtn text="로그아웃" onClick={logout} />
    </>
  );
};

export default Lobby;
