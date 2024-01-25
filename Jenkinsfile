pipeline {
    agent any

    environment {
        // 환경 변수로 워크스페이스 경로를 설정
        WORKSPACE_PATH = '/jenkins/workspace/e206_gitlab'
    }

    stages {
        stage('Build BE') {
            steps {
                echo 'Building Back-End...'
                // 백엔드 소스코드가 있는 경로로 이동
                dir('/jenkins/workspace/e206_gitlab/BE') {
                    // Docker 이미지 빌드 명령어
                    sh 'docker build -t spring-app:test .'
                }
            }
        }

        stage('Build FE') {
            steps {
                echo 'Building Front-End...'
                // 백엔드 소스코드가 있는 경로로 이동
                dir('/jenkins/workspace/e206_gitlab/FE') {
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
            }
        }
    }
}
