export class ApplicationErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message)
    this.code = statusCode
  }
}