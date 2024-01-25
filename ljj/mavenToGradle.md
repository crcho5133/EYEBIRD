maven으로 되어있는 Spring 프로젝트를 gradle로 변경하는 법!

1. gradle 설치
2. 환경변수 설정

    시스템 변수

        - 변수 이름 : GRADLE_HOME
        - 변수 값 : GRADLE 압축해제 한 경로 예) C:\gradle-6.8.3
        
    사용자 변수

        - 변수 이름 : Path
        - 변수 값 : %GRADLE_HOME%\bin

    
3. 설치 확인
    
    ```bash
    gradle -v
    ```
    
4. Gradle init
    
    pom.xml이 위치해있는 원하는 프로젝트로 경로 이동 후, 
    
    ```bash
    gradle init --type pom
    ```
    
    - groovy
    - No
5. pom.xml 삭제
