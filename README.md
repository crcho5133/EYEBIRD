# 🔍프로젝트 소개

### 📌서비스 요약
- 눈(EYE)싸움 게임을 핸드폰에서 즐길 수 있는 서비스
- 기존의 눈싸움 게임뿐만 아니라 팀 단위의 눈싸움 게임과 방해요소가 추가된 눈싸움 게임도 즐길 수 있음
###  📌기획 의도
- 시선공포증에서 유발되는 스트레스를 가벼운 방식으로 해소할 수 있는 앱을 만들고 싶었음
- 빠르고 케주얼하게 즐길 수 있는 앱을 만들고 싶었음
### 🖥️기술스택
#### 🖱FrontEnd
- vite
- react
- tailwindcss
- mediapipe

#### 🖱Backend
- springboot
- spring-boot-jpa
- spring security
- redis
- mysql

#### 🖱Web RTC
- openvidu

#### 🖱CI/CD
- aws ec2
- docker
- nginx
- jenkins

### 📌 프로젝트 기간
- 2024.01.08 ~ 2024.02.16

#  🙍팀원 소개
- 이재진: 팀장, 인프라, AI
- 김지수: 프론트엔드, 디자인, STOMP
- 심상익: 프론트엔드, Openvidu, 게임 로직
- 정종길: 프론트엔드, JWT, 게임 로직   
- 장수영: 백엔드, Openvidu, Redis  
- 조창래: 백엔드, Openvidu, STOMP

# 👨‍👩‍👧Convention

### 👨‍👩‍👧Git Commit Convention

| 커밋 유형 | 의미 |  |
| ---- | ---- | ---- |
| Feat | 새로운 기능 추가 |  |
| Fix | 버그 수정 |  |
| Docs | 문서 수정 |  |
| Style | 코드 formatting, 세미콜론 누락, 코드 자체의 변경이 없는 경우 |  |
| Refactor | 코드 리팩토링 |  |
| Test | 테스트 코드, 리팩토링 테스트 코드 추가 |  |
| Chore | 패키지 매니저 수정, 그 외 기타 수정 ex) .gitignore |  |
| Design | CSS 등 사용자 UI 디자인 변경 |  |
| Comment | 필요한 주석 추가 및 변경 |  |
| Rename | 파일 또는 폴더 명을 수정하거나 옮기는 작업만인 경우 |  |
| Remove | 파일을 삭제하는 작업만 수행한 경우 |  |
| !BREAKING CHANGE | 커다란 API 변경의 경우 |  |
| !HOTFIX | 급하게 치명적인 버그를 고쳐야 하는 경우 |  |

### 👨‍👩‍👧Git Branch Convention

- `develop`에서 각자의 기능 브랜치를 분기
- `작업종류-기능` 으로 브랜치 만들기: develop-BE-Message, develop-FE-GameLogic
- 해당 기능의 브랜치에 작업이 완료 되면 해당 브랜치를 원격 저장소에 `push`하고 git Lab 페이지에서 `merge request(source : 본인 기능 브랜치, target : master)`(로컬에서 그냥 `merge` X)
    - `merge request` 오픈 이벤트 발생 시 EC2에서 빌드, 배포 실행 ⇒ MM으로 결과 알림
- `merge request` 위 결과에 따라 승인 여부 결정, 필요한 경우 코드 리뷰 및 토의
- `merge request`가 승인되면 `merge된 master` 브랜치에대하여 다시 EC2에서 빌드, 배포 실행 
### 👨‍👩‍👧Jira Convention
협업 및 일정, 업무 관리를 위해 Jira를 이용하였습니다. 매주 월요일 오전 회의에서 한 주동안 진행되어야 할 주 단위 계획을 짜고, 진행할 이슈들을 스프린트를 만들어 등록했습니다. 스프린트는 일주일 단위로 진행하였습니다.

- Epic : 각 기능의 제목으로 설정했습니다: BE - Message
- story : 담당자와 각 기능의 세부사항을 표기했습니다: \[조창래\] Message - 친구수락

# ✨명세서

### ✨요구사항 명세서
|   |   |   |   |
|---|---|---|---|
|요구사항명|우선순위|기능명|처리내용|
|회원관리 서비스|매우 높음|가입|이메일, 비밀번호, 닉네임, 프로필 선택|
||매우 높음|로그인|1. 이메일과 비밀번호로 로그인  <br>2. 소셜 로그인(optional)|
||매우 높음|로그아웃||
||높음|회원정보 수정|1. 닉네임 변경  <br>2. 비밀번호 변경  <br>3. 프로필 변경|
||높음|회원탈퇴|1. 유저가 삭제되었음을 기록.|
||매우 높음|친구추가||
|로비|매우 높음|랭크 확인|1. 한 페이지당 10명씩, 10페이지에 걸쳐서 랭크 나열(총 100명 이내)  <br>2. 각 유저의 등수, 닉네임, 점수가 보여짐  <br>3. 1,2,3등의 캐릭터에 왕관 씌우기|
||매우 높음|개인 프로필 확인|1. 프로필 이미지  <br>2. 닉네임  <br>3. 점수  <br>4. 친구 목록  <br>5. 승률|
||높음|초대장 확인|초대받은 게임 방에 참여|
||보통|메세지 보내기|유저끼리 메세지를 보냄|
|게임|매우 높음|대결 선택|1. 랭크는 승패에 따라 유저 점수의 변동이 있음.  <br>2. 클래식 모드와 아이템 모드의 점수가 다름.|
||매우 높음|클래식 게임|1. 매칭 정보 출력(3초) → 닉네임, 전적, 점수, 등락 예상 점수 등  <br>2. 눈 인식하여 게임 준비  <br>3. 카운트 3초 출력  <br>4. 상대방 영상으로 화면 전환  <br>5. 참가자 전원 음소거|
||매우 높음|아이템전|1. 아이템 사용 버튼 활성화  <br>2.화면 클릭시 랜덤 아이템 사용|
||높음|팀전|1. 출전자 화면은 랭크 모드와 동일  <br>2. 팀원 화면(관전 모드)은 대결 중인 참가자 2명 분할해서 화면 출력  <br>3. 출전 순를 정할 수 있음.|
||높음|게임 오버|1. 게임 종료 시 승패 여부 나타는 화면 + 재도전 여부 출력(3초 카운트)  <br>2. 재도전 승락 시 대기 화면부터 다시 게임 진행  <br>3. 재도전 거부 시 게임 종료 시 매칭 화면으로 돌아가기|
||높음|플레이어의 정보(닉네임, 전적, 점수, 등락 예상 점수) 가져오기||
||매우 높음|게임 결과 저장||
|게임 방|매우 높음|방 관리|1. 방을 20개까지 유지  <br>2. 방 존재 여부 및 참가 인원 조회  <br>3. 방 인원수 설정  <br>4. 6명 이하의 화상 및 채팅이 가능한 방 생성  <br>5. 게임 준비 상태에서만 게임 시작  <br>6. 방장이 방을 나가도 다음 사람이 자동으로 방장 위임|
||매우 높음|일반 입장|1. 방을 클릭해서 입장.  <br>2. 방이 꽉 찼을 경우 입장 불가.  <br>3. 방 제목, url 주소, QR 코드 활용하여 접속|
||높음|빠른 입장|1. 빈 방을 제외한 유저의 수가 가장 많은 방을 찾아 자동 입장  <br>2. 빈 방을 제외한 가장 작은 방 id의 방을 찾아 자동 입장.|
||높음|게임 방 설정|1. 방장은 게임을 설정 할 수 있음. - 비밀번호는 숫자 4자리  <br>2. 비밀방 설정, 아이템전, 팀전 설정 가능|
||높음|게임 방 초대|1. 방장은 url 주소, QR 코드를 생성해서 초대 가능  <br>2. 온라인인 친구를 선택해서 초대장 보내기 가능|
|채팅 / 음성|높음|채팅 기능|1. 모든 사람들이 볼 수 있는 일반 채팅 모드  <br>2. 팀끼리만 볼 수 있는 팀 채팅 모드|
||보통|채팅 로그|일반 채팅과 팀 채팅, 음성을 저장하고 로그로 볼 수 있음|
### ✨기능 명세서
|  |  |  |  |  |  |  |
| ---- | ---- | ---- | ---- | ---- | ---- | ---- |
| 대분류 | 소분류 | 주기능 | 상세기능(BE) | 상세기능(FE) | 우선순위 | 페이지 |
| 회원관리 | 회원가입 | 이메일 입력(아이디) | 이메일의 형식이 갖추어졌는지 확인: @가 하나 등장, .이 하나 등장, @으로 시작하면 안됨, @ 다음에 .이 등장해야 함, @와 .이 연속해선 안 됨 | 이메일의 형식이 갖추어졌는지 확인: @가 하나 등장, .이 하나 등장, @으로 시작하면 안됨, @ 다음에 .이 등장해야 함, @와 .이 연속해선 안 됨 | 매우 높음 | 회원가입 페이지 |
|  |  | 이메일 유일성 검증 | 주어진 이메일을 지닌 유저가 있는지 확인. |  | 높음 |  |
|  |  | 비밀번호, 비밀번호 확인 입력 | X | 비밀번호와 비밀번호 확인이 같은지 확인 | 매우 높음 | 회원가입 페이지 |
|  |  | 닉네임 입력 | 닉네임 중복확인 및 닉네임 최대 6자 이내 작성 | 닉네임 중복확인 및 닉네임 최대 6자 이내 작성 | 매우 높음 | 회원가입 페이지 |
|  |  | 닉네임 유일성 검증 | 주어진 닉네임을 가진 유저가 있는지 확인 |  | 높음 |  |
|  |  | 프로필 사진 선택 | X | 고정된 n개의 프로필 사진 중 하나 선택 | 매우 높음 | 회원가입 페이지 |
|  |  | 회원 가입 | 이메일, 비밀번호, 닉네임, 프로필 사진의 번호로 구성된 RequestUserDto를 POST | 1. 게임 초기 페이지 회원가입 버튼 클릭(회원가입 모달 활성화)  <br>2. 필요한 정보 닉네임 중복 확인, 이름, 비밀번호 재확인(react 내장 유효성 검사) 확인  <br>3. '회원가입이 완료되었습니다.' 팝업 | 매우 높음 |  |
|  | 로그인 | 이메일, 비밀번호를 입력해서 로그인 | 해당 이메일을 지닌 유저가 있는지 확인, 해당 비밀번호의 해시된 결과가 DB에 저장된 비밀번호와 같은지 확인  <br>일치 시, 특정 ResponseUserDto 생성 후 프론트로 전달 | 1. 로비 로그아웃 버튼 클릭 시  <br>2. '로그아웃 하였습니다.' 팝업 후  <br>3. 게임 초기 페이지 이동  <br>4. 로그인 이후 작업은 백엔드 서버에서 수령한 토큰을 http 요청시 헤더에 포함시켜 수행 | 매우 높음 | 로그인 페이지 |
|  | 로그아웃 | 로그아웃 | access token과 refresh token 삭제 | 1. 스토어에 저장된 로그인 관련 JWT 토큰 삭제 | 매우 높음 | 로비 페이지 |
|  | 회원수정 | 닉네임 변경 | User의 닉네임 정보 수정 | 1. 로비 내정보 버튼 클릭 시  <br>2. 내 정보 모달  <br>3. 회원 정보 변경 탭 클릭  <br>4. 닉네임 중복 없을 시 닉네임 변경 | 높음 | 회원 정보 변경 모달 |
|  |  | 닉네임 유일성 검증 | 변경할 닉네임을 지닌 유저가 있는지 확인 | 중복확인 요청 | 높음 | 회원 정보 변경 모달 |
|  |  | 프로필 이미지 변경 | X | 고정된 n개의 프로필 사진 중 하나 선택하여 기존 이미지에 대체 | 높음 | 회원 정보 변경 모달 |
|  |  | 비밀번호 변경 | 요청으로 들어온 비밀번호와 DB에 저장된 비밀번호가 같은지 확인  <br>비밀번호와 비밀번호 확인이 같은 지 확인, 만약 같다면 비밀번호 변경 | 변경할 비밀번호, 비밀번호 확인, 기존 비밀번호 입력 | 높음 | 회원 정보 변경 모달 |
|  | 회원탈퇴 | 회원 삭제 | 해당 유저의 isDeleted = true로 변경. | 1. 모달 클릭 시, 회원 비밀번호 확인 이후 -> 삭제 모달 -> 삭제 버튼 클릭 시, 회원 탈퇴 확인 이후 회원탈퇴  <br>2. isDelete = True의 경우 회원정보 유효하지 않다고 판단하기 | 높음 | 회원 탈퇴 모달 |
|  | 유저 프로필 | 유저 프로필 조회 | X | 1. 친구 관리, 인게임 대기방에서 프로필 클릭으로 가능  <br>2. 로그인 시 벡엔드 서버로부터 받은 store에 저장해 놓았던 정보 사용 | 높음 | 내정보 모달 |
|  |  | 유저 전적/포인트 확인 | (유저의 승 및 패 결과를 조회해서 전적을 계산) 로그인 시 1회 조회, 나머지는 게임에서 관리 | 1. 내 정보 모달에서 유저 전적/포인트 확인  <br>2. 게임 종료 시 마다 벡엔드 서버에서 최신화된 전적/포인트 데이터를 받아서 store의 정보 갱신하기 | 높음 | 내정보 모달 |
| 친구 | 친구 관리 | 친구 목록 확인 | 유저의 친구 목록을 확인 (User_Friend 테이블 두개의 열 탐색) | 내 정보 모달 -> 친구 관리 탭 -> 친구 관리 에서 등록된 친구 확인 | 높음 | 친구 관리 모달 |
|  |  | 친구 검색 | 해당 유저의 닉네임을 통해 유저 검색 (User 테이블 탐색) | 내 정보 모달 -> 친구 관리 탭 -> 친구 찾기 -> 유저의 닉네임을 검색하여 조회 | 보통 |  |
|  |  | 친구 추가 | 추가하고자 하는 유저에게 친구 추가 메세지 발송 | 내 정보 모달 -> 친구 관리 탭 -> 친구 찾기 -> 유저의 닉네임을 검색하여 조회하며, 친구 추가 기능 | 보통 |  |
|  |  | 친구 수락 | 수락하면 서로의 친구목록에 등록 (수락 시, User_Friend에 필드 추가) | 내 정보 모달 -> 친구 관리 탭 -> 친구 요청 탭에서 요청온 유저 친구 추가 확인, 거부 | 높음 |  |
|  |  | 친구 따라가기 | 친구가 있는 방으로 접속 (redis에서 온오프라인 관리 및 구현) | 내 정보 모달 -> 친구 관리 탭 -> 친구 관리 에서 등록된 친구 확인, 접속 및 게임방 입장 가능 시, 따라가기 활성화 | 낮음 | 친구 관리 모달 |
| 게임 관리 | 랭크 게임 | 상대방 점수 확인 | 유저의 점수, 승 및 패 결과를 조회해서 전적을 계산 | 매칭 후, 게임 시작 전 (최소 3초) 서로의 점수를 한페이지에서 확인 | 높음 | 랭크(개인전)-매칭정보 |
|  |  | 내 점수 확인 | 유저의 점수, 승 및 패 결과를 조회해서 전적을 계산 | 높음 | 랭크(개인전)-매칭정보 |  |
|  |  | 랭크 게임이 끝나면 게임 결과를 테이블에 저장 | 승자, 패자, 게임 날짜를 record 테이블에 저장 | store에 본인 전적 및 점수 갱신 | 매우 높음 | 랭크(개인전)-게임 종료 화면 |
|  |  | 랭크 게임이 끝나면 얻은 포인트를 테이블에 저장 | 유저의 점수를 변형. 승자는 점수가 증가하고, 패자는 점수가 감소한다 | store에 본인 전적 및 점수 갱신 | 매우 높음 | 랭크(개인전)-게임 종료 화면 |
|  | 일반 게임 | 게임이 끝나면 해당 방으로 되돌아가기 | X | 게임 종료 후, 새 페이지에서 승, 패 팀 확인 후, 게임 방으로 리턴 | 높음 | 일반 - 게임 종료 화면 |
|  | 게임 AI 관리 | 눈 감음 여부 판단 | (FastAPI)MediaPipe의 Face Mesh 모델을 사용하여 눈 주위의 랜드마크 감지 |  | 매우 높음 | 게임 화면 |
|  |  |  | (FastAPI)감지한 랜드마크의 2차원 좌표를 numpy로 반환 |  | 매우 높음 | 게임 화면 |
|  |  |  | (FastAPI)반환한 랜드마크 좌표를 커스텀한 EAR 알고리즘을 적용해 특정 값보다 EAR 리턴값 반환 |  | 매우 높음 | 게임 화면 |
|  |  |  | (FastAPI)반환한 값이 특정 값보다 작으면 눈을 감은 것으로 판단 |  | 매우 높음 | 게임 화면 |
|  | 게임 준비(공통) | 매칭정보 출력(랭킹전, 개인전) | 방에 있는 유저들의 점수 및 랭킹을 조회 | 1. 화면 상단에 "랭킹전(개인전) -XX 모드" 문구 출력  <br>2. 각 플레이어 별 상하로 나누어 아래 정보 3초간 출력  <br>(1) 캐릭터 사진, username, 전적, 현재 랭크 점수(모드별), 승패에 따른 예상 변동 점수  <br>(2) 화면을 상하를 나누는 구분자 및 카운트 다운 3초 출력 | 매우 높음 |  |
|  |  | 매칭정보 출력(일반전, 팀전) | 방에 있는 유저들의 점수 및 랭킹을 조회 | 1. 화면 상단에 "일반(팀전) -XX 모드" 문구 출력  <br>2. 각 팀별로 상하로 나눈어 아래 정보 3초간 출력  <br>(1) 팀 별 상단에 "X팀 출전 순서" 문구 출력  <br>(2) 플레이어 별 출전 번호, 캐릭터 사진, username, 랭크 점수(클래식/아이템)  <br>(3) 화면을 상하를 나누는 구분자 및 카운트 다운 3초 출력  <br>(4) 각 플레이어 정보는 출전 순서대로 출력(팀 별 출전 선수는 랜덤)  <br>3. 출전자의 경우 38행(게임 준비(출전자)) 화면으로 이동  <br>4. 관전자의 경우 41행(게임 준비(팀전-관전자)) 화면으로 이동 | 매우 높음 |  |
|  | 게임 준비(출전자) | 눈 인식 | X | 1. 눈 인식 영역 상단에 "눈을 인식 시켜 준비를 완료하세요" 문구 출력  <br>2. 눈 인식 영역에 양쪽 플레이어의 눈을 인식시켜 준비 완료 | 매우 높음 | 눈 인식 대기화면 |
|  |  | 준비 상태 출력(미준비) | X | 1. 미 준비 시 눈을 감고 있는 이미지 표시  <br>2. 준비 상태 표시 영역에 "양측 참가자(또는 팀)의 준비가 완료되면 게임이 시작 됩니다" 문구 출력  <br>3. 팀 전의 경우 팀 전체의 준비상태 + 각 팀원의 준비상태 모두 출력 | 매우 높음 | 눈 인식 대기화면 |
|  |  | 준비 상태 출력 (준비완료) | X | 1. 준비 완료 시 각 플레이어(또는 팀)당 한 쪽 눈을 뜨며 준비 완료 표시  <br>2. 양측 플레이어(또는 팀) 모두 준비 완료 시 준비 상태 표시 영역에 "X초 후 게임이 시작 됩니다." 문구 출력 (카운트 다운) | 매우 높음 |  |
|  | 게임 준비(팀전-관전자) | 게임 대기 화면(관전자) | X | 1. 화면 상단에 각 팀 별 유저정보(캐릭터,username) 빠 출력  <br>-> 팀 별 출전 순서 별로 정렬  <br>-> 현재 대결 중인 선수는 테두리로 표시  <br>2. 화면 상/하단 분리하여 각 대결 중인 선수 화면 출력  <br>3. 화면 좌측 하단에 마이크 음소거, 음성 채팅, 채팅 버튼 출력  <br>4. 화면 내 각 선수별 준비상태 표시  <br>5. 양측 준비완료 시 게임 시작 카운트다운(3초) 후 게임시작(46행으로 이동) | 매우 높음 |  |
|  | 게임 시작(공통) | 게임 화면 | X | 1. 화면 상단 "화면을 똑바로 응시해 주세요" + 게임 진행 시간 출력  <br>2. 화면 하단 캐릭터 사진, username 출력 | 매우 높음 |  |
|  | 게임 시작(아이템 전) | 아이템 사용(사용자 화면) | X | 1. 화면 하단 "화면을 터치하면 아이템이 사용됩니다" 문구 출력  <br>2. 플레이어 당 랜덤 아이템 3개 씩 보유  <br>3. 화면 내 아이템 보유 수량 출력  <br>4. 화면 내 클릭 이벤트 발생 시 아이템 사용  <br>(1) 아이템 사용 시 하단의 "XXX 아이템을 사용하였습니다" 문구 변경 -> 2초 출력 후 다시 원래 문구로 표시  <br>(2) 아이템 사용 시 잔여 아이템 수량 차감 | 매우 높음 |  |
|  |  | 아이템 사용(피해자 화면) | X | 1. 아이템에 따른 아이템 모션 출력  <br>2. 화면 하단 "XXX님이 XXX을 사용하였습니다" 문구 2초 출력 | 매우 높음 |  |
|  | 게임 시작(팀전) | 게임 화면(출전자) | X | 1. 35행(게임 시작(공통))과 동일 | 매우 높음 |  |
|  |  | 게임 화면(관전자) | X | 1. 화면 상단에 각 팀 별 유저정보(캐릭터,username) 바 출력  <br>-> 팀 별 출전 순서 별로 정렬  <br>-> 현재 대결 중인 선수는 테두리로 표시  <br>2. 화면 상/하단 분리하여 각 대결 중인 선수 화면 출력  <br>3. 화면 중간에 게임 진행시간 출력  <br>4. 화면 좌측 하단에 마이크 음소거, 음성 채팅, 채팅 버튼 출력  <br>5. 라운드 종료 시 user에 맞게 Lose, Win 출력  <br>6. 다음 라운드 진행 유무에 따른 다음 동작  <br>(1) 다음 라운드 진행 시 : "X초 후 다음 라운드가 시작 됩니다" 출력 후 출전자(38행), 관전자(41행) 화면으로 이동  <br>(2) 최종 라운드 종료 시 : 49행(게임 승/패자) 화면으로 이동 | 매우 높음 |  |
|  | 게임 종료 | 게임 승자 화면(랭킹전) | X | 1. 최초 화면  <br>(1) "상대방의 재도전 여부를 기다리는 중입니다." 문구 출력(3초 카운트)  <br>(2) 승리를 알리는 문구 출력 (ex) Win 등  <br>(3) 랭크 점수 올라가는 모션 출력  <br>(4) 캐릭터 승리 모션, username 출력  <br>  <br>2. 패배자가 재도전 요청 시  <br>(1) 상대방 재도전 요청에 대한 승인/거절 버튼 출력  <br>  <br>3. 승자가 재도전 승인 시  <br>(1) 매칭정보 출력부터 다시 게임시작  <br>  <br>4. 승자가 재도전 거부 시 or 패배자가 재도전 거부  <br>(1) 계속하기 및 나가기 버튼 출력  <br>(2) 계속하기 버튼 클릭 시 랭크 게임 재매칭  <br>(3) 나가기 버튼 클릭 시 로비 화면으로 이동 | 매우 높음 |  |
|  |  | 게임 패자 화면(랭킹전) | X | 1. 최초 화면  <br>(1) 재도전 의사를 물어보는 문구 출력 (3초 카운트)  <br>(2) 패배를 알리는 문구 출력 (ex) Lose 등  <br>(3) 랭크 점수 내려가는 모션 출력  <br>(4) 캐릭터 패배 모션, username 출력  <br>  <br>2. 패배자가 재도전 요청 시  <br>(1) "상대방이 재도전 요청을 승인할 경우 게임이 진행됩니다" 문구 출력  <br>  <br>3. 승자가 재도전 승인 시  <br>(1) 매칭정보 출력부터 다시 게임시작  <br>  <br>4. 승자가 재도전 거부 시  <br>(1) 계속하기 및 나가기 버튼 출력  <br>(2) 계속하기 버튼 클릭 시 랭크 게임 재매칭  <br>(3) 나가기 버튼 클릭 시 로비 화면으로 이동 | 매우 높음 |  |
|  |  | 게임 승/패자 화면(일반전) | X | 1. 방으로 나가기 버튼 출력(3초 카운트)  <br>2. 승/패를 알리는 문구 출력 (ex) Win/Lose 등  <br>3. 승/패에 따른 랭크 점수 갱신 모션 출력  <br>4. 캐릭터 승/패 모션, username 출력  <br>5. 방으로 나가기 클릭 시 게임 대기 방으로 이동 | 매우 높음 |  |
| 게임 방 관리 | 방 만들기 | 방 정보 설정 | 설정한 방 정보를 room 테이블에 저장 | 방 생성 버튼 클릭 시, 모달 창이 켜짐.  <br>모달 창에는 방 제목, 게임 모드(클래식 / 아이템), 대결 인원, 비밀번호 입력 칸(선택), 생성하기 버튼 포함  <br>방 제목 글자 수는 20자로 제한.  <br>동시에 개설 가능한 방 최대 갯수 5개씩 7페이지(35개) | 높음 | 방 생성 모달 창 화면 |
|  |  | 방 만들기 실패 | 서버에서 최대 방 수 체크 후 프론트에 방 생성 실패 메세지 return | 중복된 방 제목이 있을 시, 중복 알림 모달 창 팝업 | 높음 | 방 생성 모달 창 화면(방 제목 중복 생성 시 팝업) |
|  |  | 방 이름 중복 확인 | 생성된 방 이름 체크하여 중복된 이름이 있을 시 프론트에 방 생성 실패-이름 중복 메세지 return |  | 보통 | 방 생성 모달 창 화면(방 제목 중복 생성 시 팝업) |
|  | 방 들어가기 | 입장(공통) | 방 입장 시 입장하는 유저의 정보를 프론트 서버로 return | 백엔드 서버에서 받은 유저 정보를 store에 저장 |  |  |
|  |  | 일반 입장 | 들어갈 방의 아이디를 서버로 전송하고 방 입장 여부 확인 | 방 목록 화면에는 모드 선택(클래식 / 아이템) 버튼 제공  <br>생성된 방의 표기 정보는 비밀번호 유무, 방 제목, 대결 인원, 방장 닉네임 및 아이콘, 방 접속 인원을 표기  <br>페이지 별 5개의 방 정보 표시, 페이지네이션으로 제공 | 높음 | 방 찾기 화면 |
|  |  | 빠른 참가 | 자리가 빈 방중에 랜덤으로 room_id 전송, 블랙리스트 확인 후 블랙리스트면 다른 방 찾기 | 모드 선택(클래식 / 아이템) 후 빠른대전 버튼 클릭 시, 현재 인원이 최대 인원에 제일 가까운 방 우선으로 입장 | 높음 | 일반전 방만들기 페이지 |
|  |  | 방 들어가기 실패 | 서버에서 인원수, 방 여부 체크 후 프론트에 방 입장 불가 메세지 return | 입장 가능한 자리가 없을 시, 입장 불가 모달 창 팝업  <br>'빈 자리가 없습니다!' 문구와 확인 버튼 제공 | 높음 | 방 찾기 화면(입장 불가 팝업) |
|  |  | 방 들어가기 실패 - 블랙리스트 | 블랙리스트 테이블 조회 후 입장 체크 후 프론트에 방 입장 불가 메세지 return | 추방되어 해당 방에 블랙리스트로 등록된 유저가 해당 방에 재진입 시도 시,  <br>'강퇴당한 방은 입장할 수 없습니다.' 문구를 포함한 모달 창 팝업 | 높음 | 방 찾기 화면(입장 불가 팝업) |
|  |  | 방 나가기 | 유저 테이블의 room_id = null 처리 | 좌측 상단의 방 나가기 아이콘 클릭을 통해 방 목록 화면으로 이동 | 높음 | 대기 방 화면 |
|  |  | 방 추방 | 유저 테이블의 room_id = null 처리 후 프론트에 추당 당했다는 메세지 return | 사용자 칸에 유저가 속해있을 시, 칸의 우측 상단에 강퇴 버튼 제공  <br>방장이 해당 버튼 클릭 시, 강퇴 확인 모달 창 팝업  <br>모달 창에는 유저의 아이콘, 닉네임과 '이 유저를 강퇴하시겠습니까?' 문구, 네 / 아니오 버튼 제공  <br>네 버튼 클릭 시 해당 유저 추방 | 보통 | 강퇴 확인 모달 창 화면 |
|  | 방 내부(같이하기 모드) | 유저 초대 | 온라인 상태인 유저만 초대 가능  <br>초대를 받을 시, 블랙리스트에 상관없이 입장 가능  <br>초대 받는 유저가 로비에 있을 시에만 초대 가능 | 초대 버튼 클릭 시, 모달 창이 켜짐.  <br>모달 창에는 친구 목록, 링크 / QR 로 구분하여 탭 제공  <br>친구 목록 탭에서 온라인인 친구 목록이 표시되고 유저 별 아이콘, 닉네임, 초대 버튼을 제공  <br>초대 버튼 클릭 시 초대 버튼이 비활성화되며 '초대' 문구가 '초대중' 으로 변경 | 높음 | 초대 모달 창 화면(친구 목록) |
|  |  | 방 초대 링크, QR 생성 | X | 링크 / QR 탭에서 링크 복사하기, QR 코드 생성하기 버튼을 제공  <br>링크 복사하기 버튼을 클릭하면 '링크가 클립보드에 복사되었습니다.' 라는 문구가 포함된 모달 창 팝업  <br>QR 코드 생성하기 버튼을 클릭하면 하단에 생성된 QR 코드 렌더링 | 높음 | 초대 모달 창 화면(링크/QR) |
|  |  | 좌측 / 우측 팀 선택 | X | 방 진입 시, 대기열에 사용자 배치  <br>좌측 / 우측 팀 화상 화면 아래에 팀 선택 버튼 제공  <br>팀 선택 버튼 클릭 시, 해당 팀으로 사용자 이동 | 높음 | 대기 방 화면 |
|  |  | 팀 선택 완료 | X | 속해있는 팀의 사용자 칸에 유저의 화상 화면, 캐릭터 아이콘 및 닉네임 표시 | 높음 | 대기 방 화면 |
|  |  | 음성 | X | 본인 마이크 제어 가능한 버튼 제공(스위치 형식)  <br>팀 / 전체 음성 선택 및 제어 가능한 버튼 제공(버튼 클릭 시 모달 창 팝업) | 높음 | 대기 방 화면 |
|  |  | 채팅 | X | 채팅 버튼 제공(읽지 않은 채팅 내역 존재 시 개수 알림)  <br>버튼 클릭 시 팀 / 전체 채팅 내역 확인 및 전송 가능한 모달 창 팝업 | 높음 | 대기 방 화면 |
|  |  | 영상 | X | 팀 선택 후 본인의 영상 화면 클릭 시 화면 꺼짐(캐릭터로 대체) | 보통 | 대기 방 화면 |
|  |  | 타인 프로필 조회 | X | 타인 화면 클릭 시 타인 프로필 모달 창 팝업  <br>팝업 내 친구 추가 버튼 제공(버튼 클릭 시 '요청완료' 로 문구 바뀜)  <br>store에 저장된 유저의 정보를 불러와 보여줌 | 높음 | 대기 방 화면 |
|  | 강퇴 하기(블랙리스트 설정) | 블랙리스트 추가 | 블랙리스트 테이블에 유저 정보와 추방된 방 번호 추가 | 방장의 권한으로 인해 추방되었을 경우, '방장에 의해 추방되었습니다.' 문구가 포함된 모달 창 팝업과 동시에 방 목록 화면으로 이동 | 보통 | 방 찾기 화면(강퇴 알림 팝업) |
| 메세지(DB) | 메세지 | 메세지 리스트 확인 | 메세지 테이블에 서 해당 유저 검색 후 리스트 response return | 로비 -> 알림 모달 활성화 -> 메세지 리스트 확인 | 낮음 | 편지함 편지보관함 모달 |
|  |  | 메세지 확인 | 메세지 테이블에서 user_from = id 후 메세지 테이블에서 is_read = true -> msg_text return | 로비 -> 알림 모달 활성화 -> 메세지 리스트 클릭 시 -> 보관함 모달에서 수신 확인 | 낮음 | 편지함 메세지 확인 모달 |
|  |  | 메세지 보내기 | 1. 메세지 테이블 user_to = 본인 / user_from = 받는 유저  <br>2. 메세지 내용 테이블에 추가 | 로비 -> 알림 모달 활성화 -> 메세지 리스트 클릭 시 -> 보관함 모달 -> 발신 탭 -> 메세지 보내기 | 낮음 | 편지함 전송 모달 |
|  |  | 친구 초대 수락 | 친구 추가 요청 수락 후 메세지 삭제 | 로비 -> 알림 모달 활성화 -> 친구 초대 요청 수락 (메세지 삭제) | 보통 | 내정보 - 친구요청 모달 |
|  |  | 친구 초대 거절 | 친구 추가 요청 거절 후 메세지 삭제 | 로비 -> 알림 모달 활성화 -> 친구 초대 요청 거절 -> '초대 요청을 거절하였습니다' 팝업 후 (메세지 삭제) | 보통 | 내정보 - 친구요청 모달 |
|  |  | 방 초대 수락 | 방 초대 수락 후 방 검증 -> 방으로 이동, user 테이블에 room_id 업데이트 | 로비 -> 알림 모달 활성화 -> 친구 초대 요청 수락 -> 초대 유저 방으로 이동(메세지 삭제) | 보통 | 알림 모달 |
| 방의 모든 사람들에게 채팅 전송 | 채팅 전송 | 전체 채팅 | webSocket or webRTC를 이용한 실시간 채팅기능 구현 | 게임(팀전) 대기방 -> 채팅 버튼 활성화 -> 전체/팀탭 중 팀탭 선택하여 채팅 전송 | 높음 | 채팅 모달 창 화면 |
|  |  | 팀 채팅 | webSocket or webRTC를 이용한 실시간 채팅기능 구현 | 게임(팀전) 대기방 -> 채팅 버튼 활성화 -> 전체/팀탭 중 전체탭 선택하여 채팅 전송 | 높음 | 채팅 모달 창 화면 |
| 랭킹 | 랭킹 조회 | 클래식 랭킹 조회 | 클래식전의 점수별로 상위 100명을 가져옴. 한 페이지당 10명씩 나열. | 로비 -> 랭킹 버튼 클릭 시 -> 랭킹 모달 활성화 -> default(클래식)탭에서 랭킹 확인 | 보통 | 랭킹 보기 - 클래식 |
|  |  | 아이템전 랭킹 조회 | 아이템전의 점수별로 상위 100명을 가져옴. 한 페이지당 10명씩 나열 | 로비 -> 랭킹 버튼 클릭 시 -> 랭킹 모달 활성화 -> 아이템전탭에서 랭킹 확인 | 보통 | 랭킹 보기 - 아이템 |
|  |  | 랭킹 조회 | Redis를 사용해 30분마다 랭크 업데이트 |  |  |  |
### ✨API 명세서
|   |   |   |   |   |   |
|---|---|---|---|---|---|
|유저|회원가입|POST|/api/user|{  <br>email: "gildong@gmail.com",  <br>password: "1234",  <br>nickname: "gildongnickname",  <br>profileImg: "2"  <br>}|{  <br>email: "gildong@gmail.com",  <br>}|
||로그인|POST|/api/auth/login|{  <br>email: "gildong@gmail.com",  <br>password: "1234"  <br>}|{  <br>email: "gildong@gmail.com,  <br>nickname: "gildongnickname",  <br>profileImg: 2,  <br>classic_pt: 50,  <br>item_pt: 235,  <br>winNumItem: 3,  <br>loseNumItem: 5,  <br>winNumClassic: 4,  <br>loseNumClassic: 7  <br>}|
||로그아웃|POST|/api/auth/logout|{  <br>grantType: "Bearer",  <br>accessToken: "accessToken",  <br>refreshToken: "refreshToken"  <br>}|status: 200|
||access token 만료 시 토큰 재발급|POST|/api/auth/reissue|{  <br>grantType: "Bearer",  <br>accessToken: "accessToken",  <br>refreshToken: "refreshToken"  <br>}|{  <br>grantType: "Bearer",  <br>accessToken: "accessToken",  <br>refreshToken: "refreshToken"  <br>}|
||정보수정 - 비밀번호|PATCH|/api/user/password|{  <br>currentPassword: "currentpassword",  <br>newPassword: "newpassword"  <br>}||
||정보수정 - 닉네임|PATCH|/api/user/nickname|{  <br>nickname: "newnickname"  <br>}||
||정보수정 - 프로필 이미지|PATCH|/api/user/profile-image|{  <br>profileImage: 4  <br>}||
||닉네임 중복확인|GET|/api/user/check/nickname="nickname"||{  <br>check: true  <br>}|
||이메일 중복확인|GET|/api/user/check/email="email"||{  <br>check: true  <br>}|
||비밀번호 확인|POST|/api/user/check/password|RequestUserDto  <br>{  <br>password:"1234"  <br>}|비밀번호 일치 시 : 200  <br>비밀번호 불일치 시 : 401|
||회원탈퇴|PATCH|/api/user|{  <br>password: "1234"  <br>}||
||유저 검색|GET|/api/user/search?searchWord="홍길동"||{  <br>email:"gildong@gmail.com"  <br>nickname: "gildongnickname",  <br>profileImg: 2,  <br>classic_pt: 50,  <br>item_pt: 235,  <br>winNumItem: 5,  <br>loseNumItem: 3,  <br>winNumClassic: 4,  <br>loseNumClassic: 7  <br>}|
|친구 관리|친구 목록 확인|GET|/api/friend/{page}||[  <br>{  <br>email: "friend@gmail.com", nickname: "friend", profileImg: 3,  <br>classic_pt: 30, item_pt : 360, winNum: 5, loseNum: 3  <br>},  <br>{  <br>email: "friend2@gmail.com", nickname: "friend2", profileImg: 3,  <br>classic_pt: 30, item_pt : 360, winNum: 6, loseNum: 4  <br>}  <br>]|
||친구 요청|POST|/api/friend|{  <br>userTo : "userNickname"  <br>}||
||친구 삭제|DELETE|/api/friend/{userId}||status: 200|
||친구 따라가기|보류||||
|랭크 게임|매칭 요청|GET|/api/point/matching|{  <br>point: 15,  <br>ifItem: true,  <br>email: "gildong@gmail.com"  <br>}|openvidu token|
||랭크 게임이 끝나면 게임 결과를 테이블에 저장|POST|/api/game-result|{  <br>is_item : true  <br>user_winner: "winnerNickname"  <br>user_loser : "loserNickname"  <br>}|status 200|
||랭크 게임이 끝나면 얻은 포인트를 나에게 반영|PATCH|/api/point|{  <br>classicPt : 123 or itemPt : -123  <br>}|status 200|
|일반 게임|게임 방 만들기|POST|/api/room|{  <br>roomName: "gildongRoom",  <br>password: "1234" or "",  <br>maxCapacity: "3",  <br>isItem: "true"  <br>}|openvidu token|
||게임 방 목록 조회|GET|/api/room/item||방 목록(페이지네이션)|
|||GET|/api/room/classic||방 목록(페이지네이션)|
||게임 방 들어가기 (토큰 요구하기)|POST|/api/room/enter|{  <br>roomId: "id",  <br>password: "1234", ""  <br>}|openvidu token,  <br>예외: 비밀번호가 틀림, 방이 꽉 참, 블랙리스트 유저임, 방이 없어진 상태임|
||빠른 참가|GET|/api/room/quick/item||openvidu token,  <br>예외: 참가할 수 있는 방이 없음|
|||GET|/api/room/quick/classic|||
||게임방 상태 변경|PATCH|/api/room|{  <br>roomId: "id",  <br>status : true  <br>}||
||게임 방 나가기|POST|/api/room|{  <br>roomId: "id"  <br>}||
|강퇴 하기(블랙리스트 설정)|블랙리스트 추가|POST|/api/blacklist|RequestBlackListDto  <br>{  <br>userId : "id",  <br>roomId : "id"  <br>}||
|메세지|메세지 리스트 확인: 친구 요청 메세지|GET|/api/message/friend-request||[{msgId: 3, msgType: 1, msgText: "철수님이 친구 요청을 보냈습니다", isRead: false, userFromEmail: "gildong@gmail.com", userFromNickname:"gildongId", createdAt: "2023-12-21-09-12"}]|
||메세지 리스트 확인: 쪽지|GET|/api/message/text||[{msgId: 3, msgType: 1, msgText: "안녕하세요", isRead: false, userFromEmail: "gildong@gmail.com", userFromNickname:"gildongId", createdAt: "2023-12-21-09-12"}]|
||메세지 확인|PATCH|/api/message/{messageId}|{  <br>isRead: true  <br>}||
||메세지 보내기|POST|/api/message|{  <br>msgType : 0,  <br>msgText : "HI",  <br>userToEmail : "gildong@gmail.com",|webSocket subscribe url로 새로운 메시지가 왔다는 내용 보내기|
||친구 추가 수락|POST|/api/message/friend|{  <br>userFrom : "userNickname"  <br>}|webSocket subscribe url로 친구를 수락했다는 내용 보내기|
||시스템 메세지 수락/거절 후 메세지 삭제|DELETE|/api/message/{messageId}|||
|랭킹 조회|클래식 랭킹 조회|GET|/api/point/rank/classic/{page}||[{nickname: "gildongnickname", profileImg: 2, point : 1000}]|
||아이템전 랭킹 조회|GET|/api/point/rank/item/{page}||[{nickname: "gildongnickname", profileImg: 2, point : 1000}]|
# 🔧설계

### 🔧아키텍처 설계
![아키텍쳐](https://github.com/crcho5133/EYEBIRD/assets/140131170/88adc5c8-c1c4-45ed-a4cc-ad23ce240c12)

### 🔧DB 설계(ERD)
![ERD](https://github.com/crcho5133/EYEBIRD/assets/140131170/eea90eff-748c-4722-8b9e-4a41040b2595)
# 👀실제 화면

## 랭킹
<img src = "https://github.com/crcho5133/EYEBIRD/assets/140131170/5a0c2489-4492-4ffa-9b24-cc168c61a739" width="30%" height="30%"/>

## 로비
<img src = "https://github.com/crcho5133/EYEBIRD/assets/140131170/1ff86794-8b81-495b-badd-17b35f675210" width="30%" height="30%"/>

## 클래식전과 아이템전 중 하나를 선택할 수 있음
<img src = "https://github.com/crcho5133/EYEBIRD/assets/140131170/2766042d-ec5d-4370-af2b-b2596195f40e" width="30%" height="30%"/>

## 매칭 찾는 중
<img src = "https://github.com/crcho5133/EYEBIRD/assets/140131170/2d8a0b77-e96d-4d8d-82a5-4e33118e7e52" width="30%" height="30%"/>

## 매칭성공
<img src = "https://github.com/crcho5133/EYEBIRD/assets/140131170/53841b10-541e-4604-980d-6117c825526f" width="30%" height="30%"/>

## 게임 준비
<img src = "https://github.com/crcho5133/EYEBIRD/assets/140131170/e572cb16-7fe9-489a-98b2-b04bd8200673" width="30%" height="30%"/>

## 예상 승점
<img src = "https://github.com/crcho5133/EYEBIRD/assets/140131170/8eb68bdb-108f-4aa1-a856-204190644d9e" width="30%" height="30%"/>

## 게임 시작 직전
<img src = "https://github.com/crcho5133/EYEBIRD/assets/140131170/e22def2d-945e-4266-8ab7-6aa68af952b2" width="30%" height="30%"/>

## 게임 진행 중
<img src = "https://github.com/crcho5133/EYEBIRD/assets/140131170/bd79f6de-e55b-4fe3-89e3-e057abf8b5e1" width="30%" height="30%"/>

## 게임 승리 후의 화면
<img src = "https://github.com/crcho5133/EYEBIRD/assets/140131170/7fcfbfd3-b1ac-4ae8-b3ba-48c639abec62" width="30%" height="30%"/>




# EC2 화면 포트
| **PORT** | **이름** |
| :--: | :--: |
| 443 | HTTPS |
| 80 | HTTP - HTTPS로 리다이렉트(프론트 페이지지로 리다이렉트) |
| 8443 | Openvidu |
| 6379 | Redis |
| 3306 | MySQL |
| 8080 | Jenkins |
| 8787 | Backend |
