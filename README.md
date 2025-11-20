# SOOM Backend
Node.js + Express 기반 백엔드 서버 레포지토리입니다.



## 📁 프로젝트 구조

```
SOOM-backend/
 ├─ src/                # 메인 소스 코드
 │   ├─ routes/         # 라우터 (엔드포인트 정의)
 │   ├─ controllers/    # 요청/응답 처리 (비즈니스 로직 호출)
 │   ├─ services/       # 서비스 계층 (핵심 비즈니스 로직)
 │   ├─ middlewares/    # 공통 미들웨어 (인증, 로깅 등)
 │   └─ utils/          # 유틸 함수 (공용 함수, 헬퍼)
 ├─ prisma/
 │   └─ schema.prisma   # DB 모델 정의
 │
 ├─ server.js           # 서버 실행 엔트리 포인트
 ├─ package.json        # 프로젝트 메타 정보 및 의존성
 ├─ .gitignore          # Git 제외 설정
 └─ README.md           # 프로젝트 설명 문서
```


## 📦 기술 스택

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white) ![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white) ![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white) ![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript%20(CommonJS)-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)


## 🔌 서버 실행

```bash
npm install
npx prisma migrate dev
node src/server.js
