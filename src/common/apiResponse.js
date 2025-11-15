// 성공 응답
function success(res, data = null, message = "요청이 성공적으로 처리되었습니다.", statusCode = 200) {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
}

// 실패 응답 (에러 핸들러에서 주로 사용)
function fail(res, message = "요청 처리 중 에러가 발생했습니다.", statusCode = 500, errorCode = null) {
  return res.status(statusCode).json({
    success: false,
    message,
    errorCode, // 프론트/클라이언트에서 분기할 때 사용 (선택)
  });
}

module.exports = {
  success,
  fail,
};
