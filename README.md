# SOOM Backend

Node.js + Express 기반 백엔드 서버 레포지토리입니다.  

## 📁 프로젝트 구조

```
SOOM-backend/
 ├─ src/                # 메인 소스 코드
 │   ├─ routes/         # 라우터 (엔드포인트 정의)
 │   ├─ controllers/    # 요청/응답 처리 (비즈니스 로직 호출)
 │   ├─ services/       # 서비스 계층 (핵심 비즈니스 로직)
 │   ├─ models/         # 데이터베이스 모델 (ORM/스키마)
 │   ├─ middlewares/    # 공통 미들웨어 (인증, 로깅 등)
 │   └─ utils/          # 유틸 함수 (공용 함수, 헬퍼)
 │
 ├─ server.js           # 서버 실행 엔트리 포인트
 ├─ package.json        # 프로젝트 메타 정보 및 의존성
 ├─ .gitignore          # Git 제외 설정
 └─ README.md           # 프로젝트 설명 문서
```
