# SSAFY E206 Porting Manual

# 목차

- [SSAFY E206 Porting Manual](#ssafy-e206-porting-manual)
- [목차](#목차)
- [개발 및 배포 환경](#개발-및-배포-환경)
  - [프론트엔드](#프론트엔드)
  - [백엔드](#백엔드)
  - [Web RTC](#web-rtc)
- [배포 및 빌드](#배포-및-빌드)
  - [환경 변수](#환경-변수)
    - [MySQL 설정](#mysql-설정)
    - [MySQL스키마 설정](#mysql스키마-설정)
    - [Redis 설정](#redis-설정)
    - [openvidu 설정](#openvidu-설정)
  - [EC2 ufw 설정 및 포트 개방](#ec2-ufw-설정-및-포트-개방)
    - [openVidu port](#openvidu-port)
    - [그 외 사용 port](#그-외-사용-port)
    - [EC2에 Docker 설치](#ec2에-docker-설치)
    - [EC2에 NGINX 설치 및 설정](#ec2에-nginx-설치-및-설정)
- [웹 사용 시나리오](#웹-사용-시나리오)

# 개발 및 배포 환경

## 프론트엔드

- VS CODE 1.85.1
- Vite 5.0.8
- React 18.2.0
- JavaScript ES6+
- Node.js 20.11.0
- tailwindcss 3.4.1

## 백엔드

- IntelliJ 2023.3.2
- Oracle OpenJDK 17.0.10
- Spring Boot 3.2.1
- MySQL 8.0.35
- redis 7.2.4

## Web RTC

- openvidu 2.29.0

# 배포 및 빌드

## 환경 변수

### MySQL 설정

spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver\
spring.datasource.url=jdbc:mysql://i10e206.p.ssafy.io:3306/eyebird?serverTimezone=Asia/Seoul\
spring.datasource.username=root\
spring.datasource.password=e206\
spring.jpa.properties.hibernate.show_sql=true\
spring.jpa.properties.hibernate.format_sql=true\
spring.jpa.hibernate.ddl-auto=create\
spring.jpa.database-platform=org.hibernate.dialect.MySQLDialect

### MySQL스키마 설정

CREATE DATABASE eyebird;\
USE eyebird;

### Redis 설정

spring.data.redis.host=i10e206.p.ssafy.io\
spring.data.redis.port=6379\
spring.data.redis.password=e206

### openvidu 설정

OPENVIDU_URL: https://i10e206.p.ssafy.io:8443\
OPENVIDU_SECRET: e206

## EC2 ufw 설정 및 포트 개방

### openVidu port

- 22 TCP: to connect using SSH to admin OpenVidu.
- 80 TCP: if you select Let's Encrypt to generate an SSL certificate this port is used by the generation process.
- 443 TCP: OpenVidu server and application are published by default in standard https port.
- 3478 TCP+UDP: used by TURN server to resolve clients IPs.
- 40000 - 57000 TCP+UDP: used by Kurento Media Server to establish media connections.
- 57001 - 65535 TCP+UDP: used by TURN server to establish relayed media connections.

### 그 외 사용 port

- 80 : 리버스 프록시 nginx http
- 443 : 리버스 프록시 nginx https
- 3306 : MySQL
- 6379 : redis
- 8787 : spring boot
- 8080 : Jenkins

### EC2에 Docker 설치

```bash
sudo apt update
sudo apt install docker
docker --version
```
### EC2에 NGINX 설치 및 설정

```bash
sudo apt update
sudo apt install nginx
```

1. ZeroSSL 발급
2. Auth파일 서버에 복사
   - root 경로에 /.well-known/pki-validation 디렉토리 생성 후 Auth File 복사
    ``` bash
    scp -i C:\Users\SSAFY\I10E206T.pem C:\Users\SSAFY\Downloads\08FF00F1AC7C3F50ABB7A680EB3212E5.txt ubuntu@i10e206.p.ssafy.io:/var/www/html/.well-known/pki-vlaidation
    ```
3. 인증 확인 및 ssl 파일 설치
4. 설치한 파일을 압축 후 서버로 복사
    ```
    scp -i C:/Users/ljj19/I10E206T.pem C:/Users/ljj19/Downloads/i10e206.p.ssafy.io.zip ubuntu@i10e206.p.ssafy.io:/etc/nginx/ssl
    ```
5. 압축 해제
    ```
    sudo apt install unzip
    unzip ~~~.zip
    ```
6. nginx.conf 수정
    ```
    # HTTP 서버 설정 - HTTP 요청을 HTTPS로 리디렉션
        server {
                listen          80;
                server_name     i10e206.p.ssafy.io;
                return          301 https://$server_name$request_uri;
        }

        # HTTPS 서버 설정
        server {
                listen          443 ssl;
                server_name     i10e206.p.ssafy.io;

                ssl_certificate         /etc/nginx/ssl/certificate.crt;
                ssl_certificate_key     /etc/nginx/ssl/private.key;


                # Java Application 트래픽 리디렉션
                location /api {
                        proxy_pass      http://localhost:8787;
                        proxy_set_header Upgrade $http_upgrade;
                        proxy_set_header Connection "upgrade";
                }

                # FastAPI Application 트래픽 리디렉션
                location /fastapi {
                        proxy_pass      http://localhost:8000;
                        proxy_set_header Upgrade $http_upgrade;
                        proxy_set_header Connection "upgrade";
                }

                # Node.js Application 트래픽 리디렉션
                location / {
                #       proxy_pass      http://localhost:3000;
                        root    /var/www/html/;
                        index   index.html index.htm;
                        try_files $uri $uri/    /index.html;
                }

                error_page      500 502 503 504         /50x.html;
                location =      /50x.html {
                        root    /usr/share/nginx/html;
                }
        }
    ```
    
# 웹 사용 시나리오