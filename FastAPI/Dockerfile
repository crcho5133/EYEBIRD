# Python 이미지를 기반으로 설정
FROM python:3.8

# 작업 디렉토리 설정
WORKDIR /app

# 필요한 패키지 설치 (OpenCV 의존성 포함)
RUN apt-get update && apt-get install -y libgl1-mesa-dev

# 의존성 파일 복사 및 설치
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 애플리케이션 코드 복사
COPY . .

# 컨테이너가 시작될 때 실행될 명령
CMD ["uvicorn", "main:app", "--host", "localhost", "--port", "8000"]
