
import { Request, RequestHandler, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { IProfile, bodyValidation } from './validationSchema';
import { getPaginatedData, insertProfile } from './service/profileService';
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


export const getAll = async (req: Request, res: Response) => {
  const tableName = req.params.tableName;
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;

  try {
    const data = await getPaginatedData(page, limit, tableName);
    return res.status(StatusCodes.OK).json(data);
  } catch (error: any) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: 'Error retrieving data',
      error: error.message,
    });
  }
};

export const create = async (req: Request<{}, {}, IProfile>, res: Response) => {

  try {
    await insertProfile(req.body);

    return res.status(StatusCodes.CREATED).json({
      message: 'Created',
      data: req.body,
    });
  } catch (error: any) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: 'Failed to create the record',
      error: error.message,
    });
  }
};
