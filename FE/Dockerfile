# 빌드 단계
FROM node:20.11.0 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# 실행 단계
FROM node:20.11.0
# `serve` 패키지를 전역으로 설치
RUN npm install -g serve
# 빌드 디렉토리에서 파일 복사
COPY --from=build /app/dist /app
WORKDIR /app
# 3000번 포트에서 실행
EXPOSE 3000
CMD ["serve", "-s", ".", "-l", "3000"]

# # Nginx 단계 
# FROM nginx:alpine
# COPY --from=build /app/dist /usr/share/nginx/html
# EXPOSE 3000
# CMD ["nginx", "-g", "daemon off;"]
