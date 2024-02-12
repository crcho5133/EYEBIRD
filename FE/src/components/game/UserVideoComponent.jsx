import { useEffect, useState } from "react";
import { useWebSocket } from "../../context/VideoWebSocketContext";
import OpenViduVideoComponent from "./OvVideo";

// function ClosedEyeMessage({ socket }) {
//   const [closed, setClosed] = useState(false);

//   useEffect(() => {
//     const handleMessage = (message) => {
//       if (message.data === "xxx") setClosed(false);
//       else setClosed(true);
//     };

//     socket.addEventListener("message", handleMessage);

//     return () => {
//       socket.removeEventListener("message", handleMessage);
//     };
//   }, [socket]);

//   return closed ? (
//     <div className="text-xl text-red-600">눈이 감겼습니다!</div>
//   ) : (
//     <div className="text-xl">?</div>
//   );
// }
export default function UserVideoComponent({
  streamManager,
  gameState,
  sendLose,
  myLose,
  opponentLose,
}) {
  // console.log(streamManager);
  const { socket, message } = useWebSocket();

  useEffect(() => {
    if (streamManager && socket && gameState === "play") {
      // if (streamManager && socket) {
      const video = document.querySelector("video");
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      const sendFrame = () => {
        if (!video) return;

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        // 이미지 전송 시작 시간 기록
        const startTime = Date.now();

        // canvas에서 이미지 데이터를 추출
        canvas.toBlob((blob) => {
          if (!blob) {
            console.error("Canvas to Blob 변환 실패");
            return;
          }
          const reader = new FileReader();
          reader.readAsArrayBuffer(blob);
          reader.onloadend = () => {
            const byteArray = new Uint8Array(reader.result);
            socket.send(byteArray.buffer);
            socket.onmessage = (message) => {
              // 응답 받은 시간 기록
              const endTime = Date.now();

              // Date 객체를 사용하여 시간 변환
              const date = new Date(endTime);
              const hours = date.getHours();
              const minutes = date.getMinutes();
              const seconds = date.getSeconds();

              // 시간을 "시:분:초" 형식으로 포맷
              const formattedTime =
                hours.toString().padStart(2, "0") +
                ":" +
                minutes.toString().padStart(2, "0") +
                ":" +
                seconds.toString().padStart(2, "0");

              console.log(formattedTime);
              // 전체 응답 시간 계산
              console.log(canvas.width);
              console.log(canvas.height);
              console.log("응답 시간: ", endTime - startTime, "ms");
              console.log(streamManager);
              console.log(message.data);

              // 여기에 서버로부터 받은 응답을 처리하는 로직 추가
              if (message.data === "check") {
                sendLose();
              }
            };
          };
        }, "image/jpeg");
        // requestAnimationFrame(sendFrame);
      };

      // 초당 30회 이미지 전송
      const intervalId = setInterval(sendFrame, 1000 / 15);

      // 컴포넌트가 언마운트될 때 인터벌을 정리합니다.
      return () => clearInterval(intervalId);

      // sendFrame();
    }
  }, [streamManager, socket]);

  const getNicknameTag = () => {
    // Gets the nickName of the user
    return JSON.parse(streamManager.stream.connection.data).clientData;
  };

  return (
    <div>
      {streamManager !== undefined ? (
        <div className="">
          <OpenViduVideoComponent streamManager={streamManager} />
          <p>{getNicknameTag()}</p>
          {/* <ClosedEyeMessage socket={socket} /> */}
        </div>
      ) : null}
    </div>
  );
}
