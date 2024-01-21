
import { Request, RequestHandler, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { IProfile, bodyValidation } from './validationSchema';
import { Knex as knex } from '../../database/knex/index';
import * as yup from 'yup';



export const createBodyValidation: RequestHandler = async (req, res, next) => {
  let validatedData: IProfile | undefined = undefined;
  try {
    validatedData = await bodyValidation.validate(req.body, { abortEarly: false });
    return next();
  } catch (error) {
    const yupError = error as yup.ValidationError;
    const errors: Record<string, string> = {};

    yupError.inner.forEach(error => {
      if (!error.path) return;
      errors[error.path] = error.message;
    });
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors,
    });
  }
};

export const create = async (req: Request<{}, {}, IProfile>, res: Response) => {
  const { personType, ...data } = req.body;

  try {
    if (personType === 'individual') {
      const insertedData = await knex('individuals').insert(data).returning('*');
      
      return res.status(StatusCodes.CREATED).json({
        message: 'Created individual',
        data: insertedData,
      });
    } else if (personType === 'legalEntity') {
      const insertedData = await knex('legal_entities').insert(data).returning('*');
      
      return res.status(StatusCodes.CREATED).json({
        message: 'Created legal entity',
        data: insertedData,
      });
    } else {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: 'Invalid personType',
      });
    }
  } catch (error: any) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: 'Failed to create the record',
      error: error.message,
    });
  }
};
