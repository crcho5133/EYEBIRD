import { createContext, useContext, useState, useMemo } from "react";

export const AccessTokenContext = createContext({
  accessToken: "",
  refreshToken: "",
  email: "",
  nickname: "",
  profileImageIndex: 0,
  classicPt: 0,
  itemPt: 0,
  winNum: 0,
  loseNum: 0,
});

export function AccessTokenProvider({ children }) {
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [profileImageIndex, setProfileImageIndex] = useState("");
  const [classicPt, setClassicPt] = useState("");
  const [itemPt, setItemPt] = useState("");
  const [winNum, setWinNum] = useState("");
  const [loseNum, setLoseNum] = useState("");

  const value = useMemo(
    () => ({
      accessToken,
      setAccessToken,
      refreshToken,
      setRefreshToken,
      email,
      setEmail,
      nickname,
      setNickname,
      profileImageIndex,
      setProfileImageIndex,
      classicPt,
      setClassicPt,
      itemPt,
      setItemPt,
      winNum,
      setWinNum,
      loseNum,
      setLoseNum,
    }),
    [
      accessToken,
      setAccessToken,
      refreshToken,
      setRefreshToken,
      email,
      setEmail,
      nickname,
      setNickname,
      profileImageIndex,
      setProfileImageIndex,
      classicPt,
      setClassicPt,
      itemPt,
      setItemPt,
      winNum,
      setWinNum,
      loseNum,
      setLoseNum,
    ]
  );

  return <AccessTokenContext.Provider value={value}>{children}</AccessTokenContext.Provider>;
}

export function useAccessTokenState() {
  const context = useContext(AccessTokenContext);
  if (!context) {
    throw new Error("Cannot find AccessTokenProvider");
  }
  return context;
}
