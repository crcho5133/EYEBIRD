import usersApiCall from "@/api/axios/usersApiCall";
import LobbyBtn from "@/components/lobby/LobbyBtn";
import { useAccessTokenState } from "@/context/AccessTokenContext";
import MyInfo from "@/components/lobby/MyInfo";
import LobbyIconBtn from "@/components/lobby/LobbyIconBtn";
import useShowComponent from "@/hooks/useShowComponent";

const Lobby = () => {
  const accessToken = useAccessTokenState();
  const useUsersApiCall = usersApiCall();
  const isMyInfoVisible = useShowComponent();
  const isBtnVisible = useShowComponent();

  const logout = (event) => {
    event.preventDefault();
    useUsersApiCall.logout(accessToken);
  };

  const onClick = () => {
    isMyInfoVisible.showComponent();
    isBtnVisible.showComponent();
  };

  const onClose = () => {
    isMyInfoVisible.hideComponent();
    isBtnVisible.hideComponent();
  };

  return (
    <>
      {!isBtnVisible.value && <LobbyBtn text="로그아웃" onClick={logout} />}
      {!isBtnVisible.value && <LobbyIconBtn text="내 정보" onClick={onClick} />}
      {isMyInfoVisible.value && <MyInfo onClose={onClose} />}
    </>
  );
};

export default Lobby;
