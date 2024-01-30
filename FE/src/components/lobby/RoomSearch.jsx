import axios from "axios";
import { useState, useEffect } from "react";
import NavBar from "./NavBar";

const RoomSearch = () => {
  const [refresh, setRefresh] = useState(false);
  const [roomsClassic, setRoomsClassic] = useState([]);
  const [roomsItem, setRoomsItem] = useState([]);

  const [showMenu, setShowMenu] = useState(false);
  const [tabName, setTapName] = useState("클래식");
  const [currentPage, setCurrentPage] = useState(1);
  const roomsPerPage = 5;

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
      await axios.get("http://localhost:8080/api/room/classic").then((response) => {
        console.log(response);
        setRoomsClassic(response.data);
      });
      await axios.get("http://localhost:8080/api/room/item").then((response) => {
        console.log(response);
        setRoomsItem(response.data);
      });
    }
    setRefresh(false);
  }, [refresh]);

  return (
    <>
      <NavBar />
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
          {/* <h2 className="text-2xl mb-4">게임 방 리스트</h2>
          <div className="flex justify-between">
            <p className="flex-1 text-center">공개 여부</p>
            <p className="flex-1 text-center">방제목</p>
            <p className="flex-1 text-center">인원</p>
            <p className="flex-1 text-center">방장</p>
          </div> */}

          {currentRooms.map((room) => (
            <div key={room.roomName} className="border p-2 mb-2">
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
          ))}
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
    </>
  );
};

export default RoomSearch;
