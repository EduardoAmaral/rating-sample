import { ValidationError } from 'express-validator';

export class BadRequestError {
  statusCode = 400;

  constructor(private errors: ValidationError[]) {
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  serializeErrors() {
    const errors = this.errors?.reduce((map, err) => {
      // @ts-ignore: Provide a better solution to create generic object
      map[err.param] = err.msg;
      return map;
    }, {});

    return {
      errors,
    };
  }
}
