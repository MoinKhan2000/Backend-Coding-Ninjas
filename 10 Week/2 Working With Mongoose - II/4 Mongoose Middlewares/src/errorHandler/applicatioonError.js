export class ApplicationError extends Error {
        constructor(message, statusCode) {
                super(message)
                this.code = statusCode
        }
}