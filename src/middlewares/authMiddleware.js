const jwt = require("jsonwebtoken");
const prisma = require("../utils/prisma");
const ApiError = require("../common/apiError");
const ErrorCodes = require("../constants/errorCodes");

const authMiddleware = async (req, res, next) => {
  try {
    // Authorization 헤더에서 토큰 추출
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new ApiError(ErrorCodes.UNAUTHORIZED);
    }

    const token = authHeader.substring(7); // "Bearer " 제거

    if (!token) {
      throw new ApiError(ErrorCodes.UNAUTHORIZED);
    }

    // JWT 토큰 검증
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 사용자 정보 조회
    const user = await prisma.users.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        is_active: true,
      },
    });

    if (!user || !user.is_active) {
      throw new ApiError(ErrorCodes.UNAUTHORIZED);
    }

    // req.user에 사용자 정보 저장
    req.user = user;
    next();
  } catch (err) {
    if (err instanceof ApiError) {
      return next(err);
    }

    // JWT 검증 실패 (만료, 변조 등)
    if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") {
      return next(new ApiError(ErrorCodes.INVALID_TOKEN));
    }

    next(err);
  }
};

module.exports = authMiddleware;

