from fastapi import FastAPI, WebSocket
import cv2
import mediapipe as mp
import numpy as np

app = FastAPI()

# MediaPipe 얼굴 메쉬 모델 초기화
mp_face_mesh = mp.solutions.face_mesh
face_mesh = mp_face_mesh.FaceMesh(
    max_num_faces=1,
    refine_landmarks=True,
    static_image_mode=True,
    min_detection_confidence=0.5,
    min_tracking_confidence=0.5
)

def eye_aspect_ratio(eye):
    # 눈의 수직 거리 계산 (눈의 위쪽과 아래쪽 랜드마크 사이)
    vertical_1 = np.linalg.norm(eye[1] - eye[8])
    vertical_2 = np.linalg.norm(eye[2] - eye[9])
    vertical_3 = np.linalg.norm(eye[3] - eye[10])
    vertical_4 = np.linalg.norm(eye[4] - eye[11])

    # 눈의 수평 거리 계산 (눈의 양쪽 끝 랜드마크 사이)
    horizontal = np.linalg.norm(eye[-1] - eye[-2])

    # EAR 계산
    ear = (vertical_1 + vertical_2 + vertical_3 + vertical_4) / (3.0 * horizontal)
    return ear

@app.get("/fastapi")
async def get():
    return {"message": "test"}

@app.websocket("/fastapi/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    await websocket.send_text("연결성공")

    while True:
        data = await websocket.receive_bytes()
        image = np.asarray(bytearray(data), dtype="uint8")
        image = cv2.imdecode(image, cv2.IMREAD_COLOR)
        
        # MediaPipe로 얼굴 랜드마크 처리
        results = face_mesh.process(cv2.cvtColor(image, cv2.COLOR_BGR2RGB))
        
        if results.multi_face_landmarks:
            for face_landmarks in results.multi_face_landmarks:
                # 왼쪽 눈 랜드마크 추출
                left_eye_upper_landmarks = [face_landmarks.landmark[i] for i in [173, 157, 158, 159, 160, 161, 246]] # 왼쪽 눈 위
                left_eye_lower_landmarks = [face_landmarks.landmark[i] for i in [155, 154, 153, 145, 144, 163, 7]] # 왼쪽 눈 아래
                left_eye_inner_landmarks = [face_landmarks.landmark[133]] # 왼쪽 눈 안쪽
                left_eye_outer_landmarks = [face_landmarks.landmark[33]] # 왼쪽 눈 바깥쪽
                
                # 오른쪽 눈 랜드마크 추출
                right_eye_upper_landmarks = [face_landmarks.landmark[i] for i in [398, 384, 385, 386, 387, 388, 466]] # 오른쪽 눈 위
                right_eye_lower_landmarks = [face_landmarks.landmark[i] for i in [382, 381, 380, 374, 373, 390, 249]] # 오른쪽 눈 아래
                right_eye_inner_landmarks = [face_landmarks.landmark[362]] # 오른쪽 눈 안쪽
                right_eye_outer_landmarks = [face_landmarks.landmark[263]] # 오른쪽 눈 바깥쪽
                
                left_eye = np.array([(landmark.x, landmark.y) for landmark in left_eye_upper_landmarks + left_eye_lower_landmarks + left_eye_inner_landmarks + left_eye_outer_landmarks])
                right_eye = np.array([(landmark.x, landmark.y) for landmark in right_eye_upper_landmarks + right_eye_lower_landmarks + right_eye_inner_landmarks + right_eye_outer_landmarks])
                
                left_EAR = eye_aspect_ratio(left_eye)
                right_EAR = eye_aspect_ratio(right_eye)
                
                # 눈 감김 판단
                if left_EAR < 0.15 or right_EAR < 0.15:
                    # await websocket.send_text(str(left_EAR) + " " + str(right_EAR) + " " + "눈 감김 감지됨")
                    await websocket.send_text("check")
                # else:
                #     await websocket.send_text(str(left_EAR) + " " + str(right_EAR) + " " + "눈 감김 감지 안 됨")
                # else:
                #     await websocket.send_text("xxx")