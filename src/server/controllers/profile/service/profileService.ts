import { Knex } from '../../../database/knex/index';

export const insertIndividual = async (data: any) => {
  try {
    const insertedData = await Knex('individuals').insert(data).returning('*');
    return insertedData;
  } catch (error) {
    throw error; 
  }
};

export const insertLegalEntity = async (data: any) => {
  try {
    const insertedData = await Knex('legal_entities').insert(data).returning('*');
    return insertedData;
  } catch (error) {
    throw error;
  }
};