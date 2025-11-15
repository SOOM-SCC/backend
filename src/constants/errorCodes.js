// src/constants/errorCodes.js
// 커스텀 에러코드 마음대로 정의해도 됩니다.

const ErrorCodes = {
    // 공통 에러
    INVALID_INPUT: {
        statusCode: 400,
        message: "잘못된 요청입니다.",
        code: "INVALID_INPUT",
    },
    UNAUTHORIZED: {
        statusCode: 401,
        message: "인증이 필요합니다.",
        code: "UNAUTHORIZED",
    },
    FORBIDDEN: {
        statusCode: 403,
        message: "접근 권한이 없습니다.",
        code: "FORBIDDEN",
    },
    NOT_FOUND: {
        statusCode: 404,
        message: "요청한 자원을 찾을 수 없습니다.",
        code: "NOT_FOUND",
    },

    // 유저 관련
    USER_NOT_FOUND: {
        statusCode: 404,
        message: "존재하지 않는 유저입니다.",
        code: "USER_NOT_FOUND",
    },
    USER_ALREADY_EXISTS: {
        statusCode: 409,
        message: "이미 존재하는 유저입니다.",
        code: "USER_ALREADY_EXISTS",
    },

    // 인증 관련
    INVALID_TOKEN: {
        statusCode: 401,
        message: "유효하지 않은 토큰입니다.",
        code: "INVALID_TOKEN",
    },
};

module.exports = ErrorCodes;
