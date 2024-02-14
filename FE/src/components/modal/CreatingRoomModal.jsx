// CreatingRoomModal.jsx

import { useState, useEffect } from "react";
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

  const resetModal = () => {
    setRoomName("");
    setIsItem(false);
    setPlayers("1vs1");
    setPassword("");
    setErrorMessage("");
  };

  const onCloseModal = () => {
    document.body.style.overflow = "auto";
    resetModal();
    onClose();
  };

  const handleCreate = async () => {
    if (roomName.length === 0) {
      setErrorMessage("방 제목을 입력해주세요.");
    } else if (roomName.length > 20) {
      setErrorMessage("방 제목은 20자를 초과할 수 없습니다.");
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
          navigate(`/room/${data.sessionId}`, {
            state: { roomName, password, gameType: isItem ? "item" : "classic" },
          });
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
      }
    }
  };

  useEffect(() => {
    if (visible) {
      // 모달이 열릴 때 body의 스크롤을 막도록 스타일을 적용합니다.
      document.body.style.overflow = "hidden";
    } else {
      // 모달이 닫힐 때 body의 스크롤을 허용하도록 스타일을 제거합니다.
      document.body.style.overflow = "auto";
    }
  }, [visible]);

  return (
    <Rodal
      visible={visible}
      onClose={onCloseModal}
      closeOnEsc={true}
      closeMaskOnClick={false}
      width={window.innerWidth}
      height={240}
      customStyles={{
        overflow: "auto",
      }}
    >
      <div>
        <div>
          <input
            type="text"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            placeholder="방 제목"
            className="border-2 p-2 rounded w-full"
          />
        </div>
        <div className="flex flex-row">
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
        </div>
        <div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="방 비밀번호"
            className="border-2 p-2 rounded mt-2 w-full"
          />
        </div>
        <div>
          <button
            onClick={handleCreate}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-2 w-full"
          >
            생성
          </button>
        </div>
        <div>{errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}</div>
      </div>
    </Rodal>
  );
};

export default CreatingRoomModal;
