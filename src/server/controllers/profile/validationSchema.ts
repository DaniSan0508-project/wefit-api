import * as yup from 'yup';
import { cpf as cpfValidator, cnpj as cnpjValidator } from 'cpf-cnpj-validator';

export interface IProfile {
  name: string;
  state: string;
  personType: 'individual' | 'legalEntity';
  cpf?: string;
  cnpj?: string;
  cellphone?: string;
  telephone?: string;
  email: string;
  zipCode: string;
  address: string;
  number: string;
  complement?: string;
  city: string;
  district: string;
  acceptTerms?: boolean;
}

const validateCPF = (value: string | undefined, context: any) => {
  const { personType, cnpj } = context.parent;
  if (personType === 'individual' && (!value || !cpfValidator.isValid(value))) {
    return context.createError({ message: 'Invalid or non-existent CPF' });
  }
  if (personType === 'individual' && cnpj) {
    return context.createError({ message: 'CNPJ is not allowed for individuals' });
  }
  return true;
};



const validateCNPJ = (value: string | undefined, context: any) => {
  const { personType, cpf } = context.parent;
  if (personType === 'legalEntity' && (!value || !cnpjValidator.isValid(value))) {
    return context.createError({ message: 'Invalid or non-existent CNPJ' });
  }

  if (personType === 'legalEntity' && !cpf) {
    return context.createError({ message: 'CPF is required for legal entities' });
  }
  return true;
};

export const bodyValidation: yup.Schema<IProfile> = yup.object().shape({
  acceptTerms: yup.boolean().required().oneOf([true], 'Terms must be accepted'),
  name: yup.string().required('Name is required'),
  state: yup.string().required('State is required'),
  personType: yup.string().oneOf(['individual', 'legalEntity']).required('Person type is required'),
  cpf: yup.string().test('cpf-test', 'Invalid or non-existent CPF', validateCPF),
  cnpj: yup.string().test('cnpj-test', 'Invalid or non-existent CNPJ', validateCNPJ),
  cellphone: yup.string(),
  telephone: yup.string(),
  email: yup.string().email('Invalid email').required('Email is required'),
  zipCode: yup.string().required('Zip code is required'),
  address: yup.string().required('Address is required'),
  number: yup.string().required('Number is required'),
  complement: yup.string(),
  city: yup.string().required('City is required'),
  district: yup.string().required('District is required'),
  phoneOrCellphoneRequired: yup
    .mixed()
    .test('phone-or-cellphone-required', 'At least one of phone or cellphone is required', function () {
      const { telephone, cellphone } = this.parent;
      return Boolean(telephone || cellphone);
    }),
});