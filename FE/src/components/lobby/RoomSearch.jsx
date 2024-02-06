import { RoomClassicUrl, RoomItemUrl } from "../../api/url/RoomSearchUrl"; // URL import
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import NavBar from "./NavBar";
import Rodal from "rodal";
import axios from "axios";
import PasswordModal from "../modal/PasswordModal";

const RoomSearch = () => {
  const [refresh, setRefresh] = useState(false);
  const [roomsClassic, setRoomsClassic] = useState([]);
  const [roomsItem, setRoomsItem] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const [tabName, setTapName] = useState("클래식");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRoom, setSelectedRoom] = useState(null); // 선택된 방
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 표시 여부
  const navigate = useNavigate(); // useNavigate hook
  const roomsPerPage = 5;
  // 비밀번호 입력 모달 관련 상태
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [enteredPassword, setEnteredPassword] = useState("");

  const token = sessionStorage.getItem("accessToken");

  const location = useLocation();

  const handleButtonClick = () => {
    setShowMenu(!showMenu);
  };

  const handleItemClick = (name) => {
    setTapName(name);
    setShowMenu(false);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // 방을 더블 클릭했을 때의 처리
  const handleRoomDoubleClick = (room) => {
    setSelectedRoom(room);
    if (room.hasPassword) {
      // 방이 비밀번호로 보호되어 있으면 비밀번호 입력 모달을 표시
      setIsPasswordModalOpen(true);
    } else {
      // 방이 비밀번호로 보호되어 있지 않으면 바로 입장
      navigate(`/room/${room.roomId}`);
    }
  };

  // [[예]] 버튼을 클릭했을 때의 처리
  const handleConfirm = async () => {
    if (selectedRoom.hasPassword) {
      // 방이 비밀번호로 보호되어 있으면 비밀번호를 확인
      const isPasswordCorrect = await checkPassword(selectedRoom.roomId, enteredPassword);
      if (isPasswordCorrect) {
        // 비밀번호가 올바르면 방에 입장
        navigate(`/room/${selectedRoom.roomId}`);
      } else {
        // 비밀번호가 틀리면 오류 메시지를 표시
        alert("비밀번호가 틀렸습니다.");
      }
    } else {
      // 방이 비밀번호로 보호되어 있지 않으면 바로 입장
      navigate(`/room/${selectedRoom.roomId}`);
    }
  };

  // 비밀번호를 확인하는 함수
  const checkPassword = async (roomId, password) => {
    // 서버에 비밀번호를 확인하는 요청을 보냅니다.
    // 이 부분은 실제 서버 API에 맞게 수정해야 합니다.
    const response = await axios.post(`/api/rooms/${roomId}/check-password`, { password });
    return response.data.isPasswordCorrect;
  };

  const indexOfLastRoom = currentPage * roomsPerPage;
  const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
  const currentRooms =
    tabName === "아이템"
      ? roomsItem.slice(indexOfFirstRoom, indexOfLastRoom)
      : roomsClassic.slice(indexOfFirstRoom, indexOfLastRoom);

  useEffect(() => {
    refreshroom();
    // 서버에 GET 요청을 보내 방 목록을 가져옴
    async function refreshroom() {
      await axios
        .get(RoomClassicUrl, {
          headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        })
        .then((response) => {
          console.log(response);
          setRoomsClassic(response.data);
        });
      await axios
        .get(RoomItemUrl, {
          headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        })
        .then((response) => {
          console.log(response);
          setRoomsItem(response.data);
        });
    }
    setRefresh(false);
  }, [refresh, location]);

  return (
    <>
      {/* <NavBar /> */}
      <div className="App">
        <header className="flex justify-between p-4 bg-blue-500 text-white">
          <h1>방목록</h1>
          <div className="relative">
            <button onClick={handleButtonClick} className="bg-green-500 p-2 rounded">
              {tabName}
            </button>
            {showMenu && (
              <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                <div
                  className="py-1"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  <button
                    onClick={() => handleItemClick("클래식")}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                  >
                    클래식전
                  </button>
                  <button
                    onClick={() => handleItemClick("아이템")}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                  >
                    아이템전
                  </button>
                </div>
              </div>
            )}
          </div>
        </header>
        <main className="p-4">
          {currentRooms.map((room) => (
            <Link to={`/room/${room.roomId}`}>
              <div
                key={room.roomName}
                className="border p-2 mb-2"
                onDoubleClick={() => handleRoomDoubleClick(room)}
              >
                <div className="flex justify-between">
                  <p>{room.password ? "🔒" : ""}</p>
                  <p>{room.roomName}</p>
                  <p>
                    {room.maxCapacity} vs {room.maxCapacity}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p>{room.leader}</p>
                  <p>{`${room.currentCapacity} / ${room.maxCapacity}`}</p>
                </div>
              </div>
            </Link>
          ))}
          {/* 방 입장 확인 모달 */}
          <Rodal visible={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <p>방에 입장 하시겠습니까?</p>
            <button onClick={handleConfirm}>[[예]]</button>
          </Rodal>
          {/* 비밀번호 입력 모달 */}
          <Rodal visible={isPasswordModalOpen} onClose={() => setIsPasswordModalOpen(false)}>
            <p>비밀번호를 입력하세요:</p>
            <input
              type="password"
              value={enteredPassword}
              onChange={(e) => setEnteredPassword(e.target.value)}
            />
            <button onClick={handleConfirm}>입장</button>
          </Rodal>
        </main>

        <footer className="p-4">
          <div className="flex justify-center space-x-2">
            {/* 페이지 번호 버튼을 출력합니다. 여기서는 1~7까지 출력합니다. */}
            {Array.from(
              {
                length: Math.ceil(
                  (tabName === "아이템" ? roomsItem.length : roomsClassic.length) / roomsPerPage
                ),
              },
              (_, i) => i + 1
            ).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className="bg-blue-500 text-white p-2 rounded"
              >
                {page}
              </button>
            ))}
          </div>
        </footer>
      </div>
      <PasswordModal
        visible={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
        room={selectedRoom}
        onConfirm={handleConfirm}
      />
    </>
  );
};

export default RoomSearch;
