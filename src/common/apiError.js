class ApiError extends Error {
    constructor(errorCodeObj, customMessage = null) {
        super(customMessage || errorCodeObj.message);
        this.statusCode = errorCodeObj.statusCode;
        this.errorCode = errorCodeObj.code;
    }
}

module.exports = ApiError;
