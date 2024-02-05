// CreatingRoomModal.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom"; // useNavigate import
import Rodal from "rodal"; // Rodal import
import axios from "axios";
import "rodal/lib/rodal.css"; // Rodal CSS
import { RoomUrl } from "@/api/url/RoomUrl";

const CreatingRoomModal = ({ visible, onClose }) => {
  const token = sessionStorage.getItem("accessToken"); // test용

  const [roomName, setRoomName] = useState("");
  const [isItem, setIsItem] = useState(false);
  const [players, setPlayers] = useState("1vs1");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate(); // useNavigate hook

<<<<<<< HEAD
=======
  const resetModal = () => {
    setRoomName("");
    setIsItem(false);
    setPlayers("1vs1");
    setPassword("");
    setErrorMessage("");
  };

  const onCloseModal = () => {
    resetModal();
    onClose();
  };

>>>>>>> origin/develop-FE-js_02_05
  const handleCreate = async () => {
    if (roomName.length === 0) {
      setErrorMessage("방 제목을 입력해주세요.");
    } else if (roomName.length > 20) {
      setErrorMessage("방 제목은 20자를 초과할 수 없습니다.");
<<<<<<< HEAD
    }
    // else {
    //   // 서버에 GET 요청을 보내 방 제목이 중복되는지 확인
    //   const roomResponse = await axios.get(`http://localhost:8080/api/room/${roomName}`);
    //   if (roomName === roomResponse.data) {
    //     setErrorMessage("중복된 방제목 입니다.");
    //   }
    else {
      // 서버에 POST 요청을 보내 방을 생성
      console.log(RoomUrl);
      const response = await axios.post(
        RoomUrl,
        {
          roomName: roomName,
          password: password,
          maxCapacity: players[0] * 2,
          isItem: isItem,
        },
        {
          headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        }
      );
      console.log(response);
      const data = response.data;

      if (data === "fail") {
        setErrorMessage("방 생성에 실패했습니다.");
      } else {
        // 방 생성에 성공하면 모달을 닫고, 필요한 경우 추가 작업을 수행
        onClose();
        // 방으로 이동
        navigate(`/room/${data.sessionId}`, { state: { roomName } });
=======
    } else if (!/^\d*$/.test(password)) {
      setErrorMessage("패스워드에는 숫자만 입력해주세요.");
    } else {
      try {
        const response = await axios.post(
          RoomUrl,
          {
            roomName: roomName,
            password: password,
            maxCapacity: players[0] * 2,
            isItem: isItem,
          },
          {
            headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
          }
        );

        console.log(response);
        const data = response.data;

        if (data === "fail") {
          setErrorMessage("방 생성에 실패했습니다.");
        } else {
          // 방 생성에 성공하면 모달을 닫고, 필요한 경우 추가 작업을 수행
          onClose();
          // 방으로 이동
          navigate(`/room/${data.sessionId}`, { state: { roomName } });
        }
      } catch (error) {
        console.log(error);
        if (error.response) {
          console.log(error.response);
          console.log(error.response.data.errorMessage);
          if (error.response.data.errorMessage === "방 생성: 최대 방 갯수 초과") {
            setErrorMessage("최대 방 갯수가 초과 되었습니다.");
          } else if (error.response.data.errorMessage === "방 생성: 방 이름 중복") {
            setErrorMessage("중복된 방 이름입니다.");
          }
        }
>>>>>>> origin/develop-FE-js_02_05
      }
    }
  };

  return (
<<<<<<< HEAD
    <Rodal visible={visible} onClose={onClose} closeOnEsc={true} closeMaskOnClick={false}>
=======
    <Rodal visible={visible} onClose={onCloseModal} closeOnEsc={true} closeMaskOnClick={false}>
>>>>>>> origin/develop-FE-js_02_05
      <input
        type="text"
        value={roomName}
        onChange={(e) => setRoomName(e.target.value)}
        placeholder="방 제목"
        className="border-2 p-2 rounded w-full"
      />
      <select
        value={isItem}
        onChange={(e) => setIsItem(e.target.value === "true")}
        className="border-2 p-2 rounded mt-2"
      >
        <option value={false}>클래식전</option>
        <option value={true}>아이템전</option>
      </select>
      <select
        value={players}
        onChange={(e) => setPlayers(e.target.value)}
        className="border-2 p-2 rounded mt-2"
      >
        <option value="1vs1">1vs1</option>
        <option value="2vs2">2vs2</option>
        <option value="3vs3">3vs3</option>
        <option value="4vs4">4vs4</option>
      </select>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="방 비밀번호"
        className="border-2 p-2 rounded mt-2 w-full"
      />
      <button
        onClick={handleCreate}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-2 w-full"
      >
        생성
      </button>
      {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
    </Rodal>
  );
};

export default CreatingRoomModal;
