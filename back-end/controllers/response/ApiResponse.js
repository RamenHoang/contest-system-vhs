const ApiResponse = (
  data,
  totalRecord = 0,
  statusCode = 200,
  message = "Successfully"
) => {
  return {
    message,
    statusCode,
    totalRecord,
    data,
  };
};

module.exports = ApiResponse;
