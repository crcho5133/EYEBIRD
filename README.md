<<<<<<< HEAD
develop-FE
.
=======
# 눈 깜빡할 새

## 🔍프로젝트 소개

### 📌서비스 요약

- a
- b

### 📌기획 의도

- c
- d

### 📌기술 스택

<img src="https://img.shields.io/badge/javascript-3178C6?styleflat&logo=javascript&logoColor=white">
<img src="https://img.shields.io/badge/vite-646CFF?styleflat&logo=vite&logoColor=white">
<img src="https://img.shields.io/badge/react-61DAFB?styleflat&logo=react&logoColor=white">
<img src="https://img.shields.io/badge/tailwindcss-06B6D4?styleflat&logo=tailwindcss&logoColor=white">

<img src="https://img.shields.io/badge/springboot-6DB33F?styleflat&logo=springboot&logoColor=white">
<img src="https://img.shields.io/badge/springsecurity-6DB33F?styleflat&logo=springsecurity&logoColor=white">

### 📌협업 및 배포 툴

<img src="https://img.shields.io/badge/figma-F24E1E?styleflat&logo=figma&logoColor=white">
<img src="https://img.shields.io/badge/gitlab-FC6D26?styleflat&logo=gitlab&logoColor=white">
<img src="https://img.shields.io/badge/docker-2496ED?styleflat&logo=docker&logoColor=white">
<img src="https://img.shields.io/badge/jenkins-D24939?styleflat&logo=jenkins&logoColor=white">
<img src="https://img.shields.io/badge/Notion-000000?styleflat&logo=Notion&logoColor=white">
<img src="https://img.shields.io/badge/mattermost-0058CC?styleflat&logo=mattermost&logoColor=white">
<img src="https://img.shields.io/badge/jira-0052CC?styleflat&logo=jira&logoColor=white">

### 📌프로젝트 기간

- 2024.01.08 ~ 

## 🙍팀원 소개

- 이재진 : 팀장, 백엔드
- 조창래 : 백엔드
- 장수영 : 백엔드
- 김지수 : 프론트엔드
- 심상익 : 프론트엔드
- 정종길 : 프론트엔드

## 📑Convention

### 📌Git Commit Convention

#### 1. 커밋 유형

- 커밋 제목 첫 글자는 대문자로 작성하기

  | 커밋 유형 | 의미 |
  | --- | --- |
  | Feat | 새로운 기능 추가 |
  | Fix | 버그 수정 |
  | Docs | 문서 수정 |
  | Style | 코드 formatting, 세미콜론 누락, 코드 자체의 변경이 없는 경우 |
  | Refactor | 코드 리팩토링 |
  | Test | 테스트 코드, 리팩토링 테스트 코드 추가 |
  | Chore | 패키지 매니저 수정, 그 외 기타 수정 ex) .gitignore |
  | Design | CSS 등 사용자 UI 디자인 변경 |
  | Comment | 필요한 주석 추가 및 변경 |
  | Rename | 파일 또는 폴더 명을 수정하거나 옮기는 작업만인 경우 |
  | Remove | 파일을 삭제하는 작업만 수행한 경우 |
  | !BREAKING CHANGE | 커다란 API 변경의 경우 |
  | !HOTFIX | 급하게 치명적인 버그를 고쳐야 하는 경우 |

#### 2. 제목과 본문을 빈행으로 분리

- 커밋 유형 이후 제목과 본문은 한글로 작성하여 내용이 잘 전달될 수 있도록 할 것
- 본문에는 변경한 내용과 이유 설명 (어떻게보다는 무엇 & 왜를 설명)

#### 3. 제목 첫 글자는 대문자로, 끝에는 `.` 금지

#### 4. 제목은 영문 기준 50자 이내로 할 것

#### 5. 무엇을 왜 했는지 적기, 어떻게 했는지 적지 않기

### 📌Git Branch Convention

#### 규칙

- `master`에서 각자의 기능 브랜치를 분기
- 브랜치 이름 규칙
  - `작업종류/기능` 으로 브랜치 만들기
  - (지라 스토리 이슈 = 기능 명세서 소 분류 = 브랜치 1개)
  - (지라 작업 이슈 = 커밋 1개)
  - `design/FE-logout` `feat/BE-signup` `fix/FE-not-render-nav`
- 해당 기능의 브랜치에 작업이 완료 되면 해당 브랜치를 원격 저장소에 `push`하고 git Lab 페이지에서 `merge request(source : 본인 기능 브랜치, target : master)`(로컬에서 그냥 `merge` X)
  - `merge request` 오픈 이벤트 발생 시 EC2에서 빌드, 배포 실행 ⇒ MM으로 결과 알림
- `merge request` 위 결과에 따라 승인 여부 결정, 필요한 경우 코드 리뷰 및 토의
- `merge request`가 승인되면 `merge된 master` 브랜치에대하여 다시 EC2에서 빌드, 배포 실행 ⇒ MM으로 결과 알림
  - EC2에서 테스트 코드 실행 / 빌드(번들링 등의 파일 빌드) / 배포 진행 ⇒ 메신저로 결과 알림

#### 주의

- `master` 브랜치로 부터 개발하는 용도 외의 복사본 용을 git clone하여 `master` 브랜치로 부터 계속 pull 받으면서 복사본으로 사용\*\*
- `merge request` 승인 후 에러 생길 시 `git revert` 사용 권장\*\*
- **원격 저장소 `master`에 `merge` 이후 꼭 잊지말고 `master` 에서 `pull` 하기**

### 📌Code Convention

#### 백, 프론트 공통 코드 컨벤션

- 메소드 파라미터는 최대 4개 이하
- 의미 있는 공백 넣기
- 메소드는 최대 30줄 이하
- 들여쓰기 깊이는 최대 3칸
- 함수명, 변수명은 카멜케이스
- 주석은 설명하려는 구문에 맞춰 들여쓰기

  ```
  function someFunction() {
  ...

    // statement에 관한 주석
    statements
  }
  ```

- 지역 변수의 범위를 최소화 하기 위해, 처음 사용되는 지점에 가깝게 선언

#### 프론트엔드 코드 컨벤션

- 객체 타입 선언시 interface, 그외 type 사용

  ```typescript
  interface propsType {
    name: string;
  }

  type name = number | string;
  ```

- React는 화살표를 사용한 함수형 컴포넌트, props 타입 직접 지정

  ```typescript
  import React from 'react';

  type propsType = {
    name: string;
  };

  const test = ({ name }: propsType) => {
    return <div>test</div>;
  };

  export default test;
  ```

#### 백엔드 코드 컨벤션

- 모든 변수는 하나의 한개만 선언

  ```java
  int a, b; // X

  int a;
  int b; // O
  ```

- package 이름 : 소문자와 숫자만 사용 `ex) com.example.deepspace`

- Class 이름 : 첫 번째 문자를 대문자로 시작하며, 명사로 작성

  ```java
  class Test { }

  //단어가 2개 이상 혼합되어 있다면,
  //각 단어의 첫 번째 문자를 대문자로 표현
  class UserInfo { }
  ```

- Interface 이름 : 첫 번째 문자를 대문자interface Runnable { }로 시작하며, 형용사로 작성

  ```java
  interface Runnable { }
  interface ActionListener { }
  ```

- C style 배열선언 금지
  ```java
  String[] args // O
  String args[] // X
  ```
- 구현부가 없거나 한 줄의 구문을 포함해도 중괄호를 사용한다.

  ```java
  if(a > b) {
  a = b;
  }
  ```

- 상수는 모두 대문자로 작성하며, 단어 사이를 밑줄(\_)로 구분
- 클래스의 멤버와 initializer 의 순서는 따로 없지만, 최대한 논리적인 순서를 따름 새 메서드를 끝에 추가하는 것은 시간순이지 논리적인 순서가 아님
- 빈 블록은 줄바꿈하지 않고 {} 로 사용 multi-block(if/else, try/catch/finally) 은 줄바꿈
- 같은 동일한 이름의 메서드, 생성자는 연속적으로 작성
- @Override: 항상 사용

### 📌Jira Convention

#### 이슈 구조

- `최상단 에픽 이슈` : 개발, 테스트, 배포, 설계 - 포인트 x
- `중단 스토리 이슈` : 기능 명세서 소분류 - 포인트 x
- `하단 작업 이슈` : 명세서 소분류의 하위 작업들 - 포인트 부여
  - 이때, 작업 이슈를 따로 만들고 이슈 연결을 해야함
  - 1 포인트 = 1시간으로 포인트 부여하고 하루 최소 8포인트 부여

#### 이슈 구조 만들기

1. `에픽 이슈` 생성
2. `에픽 이슈`에서 `하위 이슈 추가 버튼` 클릭하여 `스토리 이슈` 생성
3. `작업 이슈`를 따로 생성
4. 2에서 만든 `스토리 이슈`에서 `이슈 연결 버튼` 클릭하여 작업 이슈와 연결

#### 1주일의 스프린트 사용 FLOW

1. `백로그`에 이슈 만들기 - 위 참고
2. `스프린트 만들기`(기간은 그 주 월요일 ~ 일요일)
3. `백로그`에서 만든 이슈(스토리 이슈와 작업 이슈)를 모두 `스프린트`로 옮기기
   1. 이때, `스토리 이슈` 바로 밑에 연결되는 `작업 이슈`를 위치하게 하여 정리하기
4. `스프린트 시작 버튼` 클릭
5. `작업 이슈`에 `진행 중`으로 표시 추가적으로 `진행 중` 표시하고 `포인트 부여`하고 일 시작
   1. 이때 오늘 `하루 8포인트(8시간)`을 적당히 나누어 `작업 이슈`에 부여한다, 최소 8포인트이고 이상 포인트 가능
   2. 1개의 작업 이슈에 할당할 수 있는 포인트는 1~4 포인트
   3. 이때 해당 `작업 이슈` 의 상위에 `스토리 이슈`에도 `진행 중 표시`하기
6. `작업 이슈`에 해당하는 일이 완료 되면 `완료 표시`하기
   1. 이때 `스토리 이슈`에 해당하는 `모든 작업 이슈`가 완료되면 `스토리 이슈`도 `완료 표시`하기
7. 스프린트 완료 일요일 날 되면 꼭 누르기

#### 추가 주의사항

- Git Lab 연동 고려
- 진행 중 이슈는 항상 1개이어야 한다
- 빠질 일이 있으면 그 만큼 포인트 차감하여도 됨
- 싸피에서 진행하는 라이브 등의 싸피 일정 추가하여도 됨

## 📚명세서
>>>>>>> origin/develop-FE-js_02_14
