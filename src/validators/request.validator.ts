import { NextFunction, Request, Response } from 'express';
import { validate, ValidationError } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { UserDto } from '@/dto/user.dto';

function transformValidationErrorsToJSON(errors: ValidationError[]) {
  return errors.reduce((p, c: ValidationError) => {
    if (!c.children || !c.children.length) {
      p[c.property] = Object.keys(c.constraints).map(key => c.constraints[key]);
    } else {
      p[c.property] = transformValidationErrorsToJSON(c.children);
    }
    return p;
  }, {});
}

class RequestValidator {
  validateBody(dto: any) {
    return async (req: Request, res: Response, next: NextFunction) => {
      const errors = await validate(plainToInstance(dto, req.body));

      if (errors.length > 0) {
        res.status(400).json(transformValidationErrorsToJSON(errors));
        return;
      }

      next();
    };
  }

  validateHeaders(dto: any) {
    return async (req: Request, res: Response, next: NextFunction) => {
      const errors = await validate(plainToInstance(dto, req.headers));

      if (errors.length > 0) {
        res.status(400).json(transformValidationErrorsToJSON(errors));
        return;
      }

      next();
    };
  }

  validateQuery(dto: any) {
    return async (req: Request, res: Response, next: NextFunction) => {
      const errors = await validate(plainToInstance(dto, req.query));

      if (errors.length > 0) {
        res.status(401).json(transformValidationErrorsToJSON(errors));
        return;
      }

      next();
    };
  }
}

export default RequestValidator;
