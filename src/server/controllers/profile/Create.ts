
import { Request, RequestHandler, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';

interface IProfile {
  nome: string
  estado: string
}

const bodyValidation: yup.Schema<IProfile> = yup.object().shape({
  nome: yup.string().required().min(3),
  estado: yup.string().required().min(3)
});

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
  return res.send('Created');
};