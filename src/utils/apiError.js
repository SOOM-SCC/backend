// src/utils/apiError.js

class ApiError extends Error {
  constructor(errorCodeObj) {
    super(errorCodeObj.message);
    this.statusCode = errorCodeObj.statusCode;
    this.errorCode = errorCodeObj.code;
  }
}

module.exports = ApiError;
