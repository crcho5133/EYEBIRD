import { useState } from "react";

const RoomSearch = () => {
  const rooms = [
    { id: 1, public: "공개", title: "방제목1", members: 4, leader: "방장1" },
    { id: 2, public: "비공개", title: "방제목2", members: 2, leader: "방장2" },
    // ...여기에 추가적인 방 정보를 넣을 수 있습니다.
  ];

  const [showMenu, setShowMenu] = useState(false);

  const handleButtonClick = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="App">
      <header className="flex justify-between p-4 bg-blue-500 text-white">
        <h1>방목록</h1>
        <div className="relative">
          <button onClick={handleButtonClick} className="bg-green-500 p-2 rounded">
            아이템
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
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                >
                  아이템전
                </button>
                <button
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                >
                  클래식전
                </button>
              </div>
            </div>
          )}
        </div>
      </header>
      <main className="p-4">
        <h2 className="text-2xl mb-4">게임 방 리스트</h2>
        {rooms.map((room) => (
          <div key={room.id} className="border p-2 mb-2">
            <p>공개 여부: {room.public}</p>
            <p>방제목: {room.title}</p>
            <p>인원: {room.members}</p>
            <p>방장 닉네임: {room.leader}</p>
          </div>
        ))}
      </main>
      <footer className="p-4">
        <div className="flex justify-center space-x-2">
          {/* 페이지 번호 버튼을 출력합니다. 여기서는 1~7까지 출력합니다. */}
          {Array.from({ length: 7 }, (_, i) => i + 1).map((page) => (
            <button key={page} className="bg-blue-500 text-white p-2 rounded">
              {page}
            </button>
          ))}
        </div>
      </footer>
    </div>
  );
};

export default RoomSearch;
