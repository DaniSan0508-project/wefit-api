import { Knex } from '../../../database/knex/index';
import { IProfile } from '../validationSchema';

export const getPaginatedData = async (page: number, limit: number, tableName: string) => {
  const offset = (page - 1) * limit;
  const data = await Knex(tableName).limit(limit).offset(offset);
  return data;
};

export async function insertProfile(data: IProfile): Promise<void> {
  try {
    await Knex('profiles').insert(data);

  } catch (error) {
    throw error;
  }
}