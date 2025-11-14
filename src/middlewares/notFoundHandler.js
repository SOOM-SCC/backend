// src/middlewares/notFoundHandler.js
const { fail } = require("../utils/apiResponse");

function notFoundHandler(req, res, next) {
  return fail(res, "존재하지 않는 API 엔드포인트입니다.", 404, "NOT_FOUND");
}

module.exports = notFoundHandler;
