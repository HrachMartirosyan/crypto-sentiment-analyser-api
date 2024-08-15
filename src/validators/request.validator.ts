import { NextFunction, Request, Response } from 'express';
import { validate, ValidationError } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { AuthHeaderDto } from '@/dto/headers.dto';
import { JWTPayload, RequestWithUser } from '@interfaces/routes.interface';
import { JWT_SECRET } from '@config';
import jwt from 'jsonwebtoken';
import { Unauthorized } from '@exceptions/Unauthorized';

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
  async validateAuth(req: RequestWithUser, _res: Response, next: NextFunction) {
    try {
      // @ts-ignore
      const errors = await validate(plainToInstance(AuthHeaderDto, req.headers));

      if (errors.length > 0) {
        throw new Unauthorized('Unauthorized');
      }

      // @ts-ignore
      const { authorization } = req.headers;

      try {
        const split = authorization.split(' ');
        const token = split[1] || '';

        req.user = jwt.verify(token, JWT_SECRET) as JWTPayload;
        next();
      } catch (e) {
        throw new Unauthorized('Unauthorized');
      }
    } catch (e) {
      next(e);
    }
  }
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
        res.status(400).json(transformValidationErrorsToJSON(errors));
        return;
      }

      next();
    };
  }
}

export default RequestValidator;
