# 왼쪽 눈 위 : 133 173 157 158 159 160 161 246
# 왼쪽 눈 아래 : 33 7 163 144 145 153 154 155 

# 오른쪽 눈 위 : 362 398 384 385 386 387 388 466 
# 오른쪽 눈 아래 : 382 381 380 374 373 390 249 263

# pip install opencv-python
# pip install mediapipe

import cv2
import mediapipe as mp
import numpy as np
import time

cnt = 0

# 미디어파이프 얼굴 메쉬 모델 초기화
mp_face_mesh = mp.solutions.face_mesh
face_mesh = mp_face_mesh.FaceMesh(
    refine_landmarks=True,
    static_image_mode=True,
    max_num_faces=1,
)

cap = cv2.VideoCapture(0)
cap.set(cv2.CAP_PROP_FRAME_WIDTH, 1080)
cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 720)

def eye_aspect_ratio(eye):
    # 눈의 수직 거리 계산 (눈의 위쪽과 아래쪽 랜드마크 사이)
    vertical_1 = np.linalg.norm(eye[1] - eye[8])
    vertical_2 = np.linalg.norm(eye[2] - eye[9])
    vertical_3 = np.linalg.norm(eye[3] - eye[10])
    vertical_4 = np.linalg.norm(eye[4] - eye[11])

    # 눈의 수평 거리 계산 (눈의 양쪽 끝 랜드마크 사이)
    horizontal = np.linalg.norm(eye[-1] - eye[-2])

    # if time.time() - last_time > 2:
    #     print(vertical_1, vertical_2, vertical_3, vertical_4)
    #     print(horizontal)
    # EAR 계산
    ear = (vertical_1 + vertical_2 + vertical_3 + vertical_4) / (3.0 * horizontal)
    return ear


last_time = time.time()

while cap.isOpened():
    ret, frame = cap.read()
    if not ret:
        continue
    
    frame = cv2.flip(frame, 1)
    rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    results = face_mesh.process(rgb_frame)

    if results.multi_face_landmarks:
        for face_landmarks in results.multi_face_landmarks:
            # 눈의 전체 영역에 대한 랜드마크 인덱스
            left_eye_upper_landmarks = [face_landmarks.landmark[i] for i in [173, 157, 158, 159, 160, 161, 246]] # 왼쪽 눈 위
            left_eye_lower_landmarks = [face_landmarks.landmark[i] for i in [155, 154, 153, 145, 144, 163, 7]] # 왼쪽 눈 아래
            left_eye_inner_landmarks = [face_landmarks.landmark[133]] # 왼쪽 눈 안쪽
            left_eye_outer_landmarks = [face_landmarks.landmark[33]] # 왼쪽 눈 바깥쪽
            
            right_eye_upper_landmarks = [face_landmarks.landmark[i] for i in [398, 384, 385, 386, 387, 388, 466]] # 오른쪽 눈 위
            right_eye_lower_landmarks = [face_landmarks.landmark[i] for i in [382, 381, 380, 374, 373, 390, 249]] # 오른쪽 눈 아래
            right_eye_inner_landmarks = [face_landmarks.landmark[362]] # 오른쪽 눈 안쪽
            right_eye_outer_landmarks = [face_landmarks.landmark[263]] # 오른쪽 눈 바깥쪽
            
            left_eye_point = left_eye_upper_landmarks + left_eye_lower_landmarks + left_eye_inner_landmarks + left_eye_outer_landmarks
            right_eye_point = right_eye_upper_landmarks + right_eye_lower_landmarks + right_eye_inner_landmarks + right_eye_outer_landmarks
            
            left_eye = np.array([(landmark.x, landmark.y) for landmark in left_eye_point])
            right_eye = np.array([(landmark.x, landmark.y) for landmark in right_eye_point])
            
            left_EAR = eye_aspect_ratio(left_eye)
            right_EAR = eye_aspect_ratio(right_eye)
            
            inner_eyes_landmarks = np.array([(landmark.x, landmark.y) for landmark in [face_landmarks.landmark[133], face_landmarks.landmark[362]]])
            len_of_eyes = np.linalg.norm(inner_eyes_landmarks[0] - inner_eyes_landmarks[1])
            # print(left_EAR, right_EAR)
            if left_EAR < 0.15 or right_EAR < 0.15:
                cnt += 1
                print(f"눈 감았노 ㅋ {cnt}")
            
            if time.time() - last_time > 2:
                if len_of_eyes < 0.04:
                    print("조금 더 가까이 와주세요")
                print(len_of_eyes)
                print(left_EAR, right_EAR)
                last_time = time.time()
                
            # 눈 주위 랜드마크에 대해 점 그리기
            for landmark in left_eye_point + right_eye_point:
                x = int(landmark.x * frame.shape[1])
                y = int(landmark.y * frame.shape[0])
                cv2.circle(frame, (x, y), 1, (0, 255, 0), -1)

    cv2.imshow('MediaPipe Face Mesh', frame)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()