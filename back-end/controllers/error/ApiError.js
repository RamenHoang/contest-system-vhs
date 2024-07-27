module.exports = class ApiError extends Error {
  constructor(apiResponse) {
    super(apiResponse.message);
    this.statusCode = apiResponse.statusCode;
    this.error = apiResponse.data;
    this.totalRecord = apiResponse.totalRecord;
  }
};
