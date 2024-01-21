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

export const cpfValidation = yup.string().test(
  'cpf-test',
  'Invalid or non-existent CPF',
  function(value) {
    const { personType } = this.parent;
    return personType !== 'individual' || (personType === 'individual' && value != null && cpfValidator.isValid(value));
  }
);

export const cnpjValidation = yup.string().test(
  'cnpj-test',
  'Invalid or non-existent CNPJ',
  function(value) {
    const { personType } = this.parent;
    return personType !== 'legalEntity' || (personType === 'legalEntity' && value != null && cnpjValidator.isValid(value));
  }
);

export const cellphoneValidation = yup.string().test(
  'cellphone-test',
  'Cellphone is required for individuals',
  function(value) {
    const { personType } = this.parent;
    return personType !== 'individual' || (personType === 'individual' && value != null);
  }
);

export const bodyValidation: yup.Schema<IProfile> = yup.object().shape({
  acceptTerms: yup.boolean().required().oneOf([true], 'Terms must be accepted'),
  name: yup.string().required('Name is required'),
  state: yup.string().required('State is required'),
  personType: yup.string().oneOf(['individual', 'legalEntity']).required('Person type is required'),
  cpf: cpfValidation,
  cnpj: cnpjValidation,
  cellphone: cellphoneValidation,
  telephone: yup.string(),
  email: yup.string().email('Invalid email').required('Email is required'),
  zipCode: yup.string().required('Zip code is required'),
  address: yup.string().required('Address is required'),
  number: yup.string().required('Number is required'),
  complement: yup.string(),
  city: yup.string().required('City is required'),
  district: yup.string().required('District is required'),
});

