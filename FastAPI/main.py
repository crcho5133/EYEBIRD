from fastapi import FastAPI, WebSocket
import cv2
import mediapipe as mp
import numpy as np
from concurrent.futures import ThreadPoolExecutor
import asyncio

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

# 이미지 처리를 별도의 스레드에서 실행하는 함수
def process_image(data):
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
                return (str(left_EAR) + "\n" + str(right_EAR) + "\n" + "눈 감김 감지됨")
            else:
                return (str(left_EAR) + "\n" + str(right_EAR) + "\n" + "눈 감김 감지 안 됨")


@app.get("/fastpi")
async def get():
    return {"message": "Hello World"}

@app.websocket("/fastapi/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    await websocket.send_text("연결 성공")
    
    # 스레드 풀 실행자 생성
    executor = ThreadPoolExecutor(max_workers=4)
    
    while True:
        data = await websocket.receive_bytes()
        
        loop = asyncio.get_running_loop()
        # 비동기적으로 이미지 처리 함수를 실행
        result = await loop.run_in_executor(executor, process_image, data)
        
        # 처리 결과를 웹소켓을 통해 클라이언트에 전송
        result_str = str(result)  # 결과를 문자열로 변환
        await websocket.send_text(result_str)
