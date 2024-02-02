import { createContext, useContext, useState, useMemo, useEffect } from "react";

export const AccessTokenContext = createContext({
  accessToken: "",
  refreshToken: "",
  email: "",
  nickname: "",
  profile: "",
  profileImageIndex: 0,
  classicPt: 0,
  itemPt: 0,
  winNum: 0,
  loseNum: 0,
});

export function AccessTokenProvider({ children }) {
  const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken") || "");
  const [refreshToken, setRefreshToken] = useState(localStorage.getItem("refreshToken") || "");
  const [email, setEmail] = useState(localStorage.getItem("email") || "");
  const [nickname, setNickname] = useState(localStorage.getItem("nickname") || "");
  const [profileImageIndex, setProfileImageIndex] = useState(
    localStorage.getItem("profileImageIndex") || ""
  );
  const [classicPt, setClassicPt] = useState(localStorage.getItem("classicPt") || "");
  const [itemPt, setItemPt] = useState(localStorage.getItem("itemPt") || "");
  const [winNum, setWinNum] = useState(localStorage.getItem("winNum") || "");
  const [loseNum, setLoseNum] = useState(localStorage.getItem("loseNum") || "");

  const profileImagePath = (index) => {
    return `/src/assets/img/${index}.png`;
  };

  const profile = useMemo(() => {
    return profileImagePath(profileImageIndex);
  }, [profileImageIndex]);

  useEffect(() => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("email", email);
    localStorage.setItem("nickname", nickname);
    localStorage.setItem("profileImageIndex", profileImageIndex);
    localStorage.setItem("classicPt", classicPt);
    localStorage.setItem("itemPt", itemPt);
    localStorage.setItem("winNum", winNum);
    localStorage.setItem("loseNum", loseNum);
  }, [accessToken, refreshToken, email, nickname, profileImageIndex, classicPt, winNum, loseNum]);

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
      profile,
    }),
    [
      accessToken,
      refreshToken,
      email,
      nickname,
      profileImageIndex,
      classicPt,
      itemPt,
      winNum,
      loseNum,
      profile,
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
