pipeline {
    agent any

    stages {
        stage('Build BE') {
            steps {
                echo 'Building Back-End...'
                // 백엔드 소스코드가 있는 경로로 이동
                dir('BE') {
                    // Docker 이미지 빌드 명령어
                    sh 'docker build -t spring-app:test .'
                }
            }
        }

        stage('Build FE') {
            steps {
                echo 'Building Front-End...'
                // 백엔드 소스코드가 있는 경로로 이동
                dir('FE') {
                    // Docker 이미지 빌드 명령어
                    sh 'docker build -t react-app:test .'
                }
            }
        }

        stage('Test') {
            steps {
                // 테스트 관련 작업을 여기에 추가
                echo 'Test는 일단 패스'
            }
        }

        stage('Deploy') {
            steps {
                // 배포 관련 작업을 여기에 추가
                echo 'Deploying...'
                // 백엔드 이미지 실행
                sh 'docker run -p 8080:8080 spring-app:test --name spring-app'
                // 프론트엔드 이미지 실행
                sh 'docker run -p 3000:80 react-app:test --name react-app'
            }
        }
    }
}