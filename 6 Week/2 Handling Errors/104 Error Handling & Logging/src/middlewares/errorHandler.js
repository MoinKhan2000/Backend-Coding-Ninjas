export class customErrorHandler extends Error {
  constructor(statusCode, errMessage) {
    super(errMessage);
    this.statusCode = statusCode;
  }
}

export const errorHandlerMiddleware = (err, req, res, next) => {
  // Check if the error is an instance of customErrorHandler
  if (err instanceof customErrorHandler) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  // Handle unhandled errors
  return res.status(500).json({
    success: false,
    message: 'Oops! Something went wrong... Please try again later!',
  });
};
