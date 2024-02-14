import { useEffect, useState, useRef } from "react";
import { useAccessTokenState } from "@/context/AccessTokenContext";
import OpenViduVideoComponent from "./OvVideo";
import { useWebSocket } from "../../context/VideoWebSocketContext";
import nickname_plate from "../../assets/img/nickname_plate.png";
import frame from "../../assets/img/frame.png";
import "@mediapipe/face_mesh";
import * as tf from "@tensorflow/tfjs-core";
// Register WebGL backend.
import "@tensorflow/tfjs-backend-webgl";
import * as faceLandmarksDetection from "@tensorflow-models/face-landmarks-detection";

function euclideanDistance(pointA, pointB) {
  const distance = Math.sqrt(
    Math.pow(pointA[0] - pointB[0], 2) + Math.pow(pointA[1] - pointB[1], 2)
  );
  return distance;
}

// 눈의 종횡비(EAR) 계산 함수
function calculateEAR(eyePoints) {
  // 눈의 수직 거리 계산 (눈의 위쪽과 아래쪽 랜드마크 사이)
  const vertical_1 = euclideanDistance(eyePoints[1], eyePoints[8]);
  const vertical_2 = euclideanDistance(eyePoints[2], eyePoints[9]);
  const vertical_3 = euclideanDistance(eyePoints[3], eyePoints[10]);
  const vertical_4 = euclideanDistance(eyePoints[4], eyePoints[11]);

  // 눈의 수평 거리 계산 (눈의 양쪽 끝 랜드마크 사이)
  const horizontal = euclideanDistance(eyePoints[15], eyePoints[14]);

  // EAR 계산
  const ear = (vertical_1 + vertical_2 + vertical_3 + vertical_4) / (3.0 * horizontal);
  return ear;
}

export default function UserVideoComponent({
  streamManager,
  gameState,
  sendLose,
  myLose,
  opponentLose,
}) {
  // console.log(streamManager);
  const videoRef = useRef(null);
  // const { socket, message } = useWebSocket();
  const myInfo = useAccessTokenState();

  useEffect(() => {
    if (streamManager && gameState === "play") {
      tf.setBackend("webgl").then(async () => {
        const model = await faceLandmarksDetection.createDetector(
          faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh,
          {
            runtime: "mediapipe",
            solutionPath: "https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh",
            maxFaces: 1,
            refineLandmarks: true,
            minDetectionConfidence: 0.5,
            minTrackingConfidence: 0.5,
          }
        );

        const detect = async () => {
          if (videoRef.current && videoRef.current.readyState === 4) {
            // 비디오의 현재 프레임에서 얼굴 랜드마크 감지
            const faces = await model.estimateFaces(videoRef.current, { flipHorizontal: false });
            if (faces.length > 0) {
              // 감지된 얼굴 랜드마크 정보 출력
              // console.log(faces[0]);
              const faceLandmarks = faces[0];
              // 왼쪽 눈
              const leftEyeUpperLandmarks = [173, 157, 158, 159, 160, 161, 246].map(
                (i) => faceLandmarks.keypoints[i]
              );
              const leftEyeLowerLandmarks = [155, 154, 153, 145, 144, 163, 7].map(
                (i) => faceLandmarks.keypoints[i]
              );
              const leftEyeInnerLandmarks = [faceLandmarks.keypoints[133]];
              const leftEyeOuterLandmarks = [faceLandmarks.keypoints[33]];

              // 오른쪽 눈
              const rightEyeUpperLandmarks = [398, 384, 385, 386, 387, 388, 466].map(
                (i) => faceLandmarks.keypoints[i]
              );
              const rightEyeLowerLandmarks = [382, 381, 380, 374, 373, 390, 249].map(
                (i) => faceLandmarks.keypoints[i]
              );
              const rightEyeInnerLandmarks = [faceLandmarks.keypoints[362]];
              const rightEyeOuterLandmarks = [faceLandmarks.keypoints[263]];

              const leftEyeLandmarks = [
                ...leftEyeUpperLandmarks,
                ...leftEyeLowerLandmarks,
                ...leftEyeInnerLandmarks,
                ...leftEyeOuterLandmarks,
              ];
              const leftEye = leftEyeLandmarks.map((landmark) => [landmark.x, landmark.y]);
              const rightEyeLandmarks = [
                ...rightEyeUpperLandmarks,
                ...rightEyeLowerLandmarks,
                ...rightEyeInnerLandmarks,
                ...rightEyeOuterLandmarks,
              ];
              const rightEye = rightEyeLandmarks.map((landmark) => [landmark.x, landmark.y]);

              const leftEAR = calculateEAR(leftEye);
              const rightEAR = calculateEAR(rightEye);

              if (leftEAR < 0.15 || rightEAR < 0.15) {
                console.log("눈 감음");
                console.log(`Left Eye EAR: ${leftEAR}, Right Eye EAR: ${rightEAR}`);
                sendLose();
              }
              // console.log(`Left Eye EAR: ${leftEAR}, Right Eye EAR: ${rightEAR}`);
            }
            // requestAnimationFrame(detect); // 다음 프레임을 위해 detect 함수를 계속 호출
          }
        };
        // detect();
        const intervalId = setInterval(detect, 1000 / 30);
        return () => clearInterval(intervalId);
      });
    }
  }, [streamManager]);

  // useEffect(() => {
  //   if (streamManager && socket && gameState === "play") {
  //     // if (streamManager && socket) {
  //     const video = document.querySelector("video");
  //     const canvas = document.createElement("canvas");
  //     const context = canvas.getContext("2d");

  //     const sendFrame = () => {
  //       if (!video) return;

  //       canvas.width = video.videoWidth;
  //       canvas.height = video.videoHeight;
  //       context.drawImage(video, 0, 0, canvas.width, canvas.height);

  //       // 이미지 전송 시작 시간 기록
  //       const startTime = Date.now();

  //       // canvas에서 이미지 데이터를 추출
  //       canvas.toBlob((blob) => {
  //         if (!blob) {
  //           console.error("Canvas to Blob 변환 실패");
  //           return;
  //         }
  //         const reader = new FileReader();
  //         reader.readAsArrayBuffer(blob);
  //         reader.onloadend = () => {
  //           const byteArray = new Uint8Array(reader.result);
  //           socket.send(byteArray.buffer);
  //           socket.onmessage = (message) => {
  //             // 응답 받은 시간 기록
  //             const endTime = Date.now();

  //             // Date 객체를 사용하여 시간 변환
  //             const date = new Date(endTime);
  //             const hours = date.getHours();
  //             const minutes = date.getMinutes();
  //             const seconds = date.getSeconds();

  //             // 시간을 "시:분:초" 형식으로 포맷
  //             const formattedTime =
  //               hours.toString().padStart(2, "0") +
  //               ":" +
  //               minutes.toString().padStart(2, "0") +
  //               ":" +
  //               seconds.toString().padStart(2, "0");

  //             console.log(formattedTime);
  //             // 전체 응답 시간 계산
  //             console.log(canvas.width);
  //             console.log(canvas.height);
  //             console.log("응답 시간: ", endTime - startTime, "ms");
  //             console.log(streamManager);
  //             console.log(message.data);

  //             // 여기에 서버로부터 받은 응답을 처리하는 로직 추가
  //             if (message.data === "check") {
  //               sendLose();
  //             }
  //           };
  //         };
  //       }, "image/jpeg");
  //       // requestAnimationFrame(sendFrame);
  //     };

  //     // 초당 30회 이미지 전송
  //     const intervalId = setInterval(sendFrame, 1000 / 15);

  //     // 컴포넌트가 언마운트될 때 인터벌을 정리합니다.
  //     return () => clearInterval(intervalId);

  //     // sendFrame();
  //   }
  // }, [streamManager, socket]);

  const getNicknameTag = () => {
    // Gets the nickName of the user
    return JSON.parse(streamManager.stream.connection.data).clientData;
  };

  return (
    <div className="flex ">
      {streamManager !== undefined ? (
        <div className="m-5 flex flex-col items-center justify-center ">
          <OpenViduVideoComponent streamManager={streamManager} ref={videoRef} />
          <div className="flex flex-row m-2">
            <div>
              <img
                src={myInfo.profile}
                style={{
                  width: "50px",
                  backgroundImage: `url(${frame})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "100%",
                  backgroundPosition: "center",
                }}
              />
            </div>
            <div
              className="p-3"
              style={{
                backgroundImage: `url(${nickname_plate})`,
                backgroundSize: "100% 100%",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                fontSize: "20px",
              }}
            >
              {getNicknameTag()}
            </div>
          </div>
          {/* <ClosedEyeMessage socket={socket} /> */}
        </div>
      ) : null}
    </div>
  );
}
