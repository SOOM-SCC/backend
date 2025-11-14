// src/middlewares/errorHandler.js
const { fail } = require("../utils/apiResponse");
const ApiError = require("../utils/apiError");

function errorHandler(err, req, res, next) {
  console.error("🔥 Error:", err);

  // 커스텀 ApiError 인 경우
  if (err instanceof ApiError) {
    return fail(res, err.message, err.statusCode, err.errorCode);
  }

  // Prisma 에러 등 기타 에러 커스터마이징 예시
  // if (err.code === "P2002") { ... }

  // 알 수 없는 서버 에러
  return fail(res, "서버 내부 에러가 발생했습니다.", 500, "INTERNAL_SERVER_ERROR");
}

module.exports = errorHandler;
