export class ApplicationError extends Error {
  constructor(public readonly status: number, public readonly message: string) {
    super(message);
  }
}

export class BadRequest extends ApplicationError {
  constructor(message = "Bad Request") {
    super(400, message);
  }
}

export class Unauthorized extends ApplicationError {
  constructor(message = "Unauthorized") {
    super(401, message);
  }
}

export class Forbidden extends ApplicationError {
  constructor(message = "Forbidden") {
    super(403, message);
  }
}

export class NotFound extends ApplicationError {
  constructor(message = "Not Found") {
    super(404, message);
  }
}

export class Conflict extends ApplicationError {
  constructor(message = "Conflict") {
    super(409, message);
  }
}
