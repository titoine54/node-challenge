import { getParams } from '@nc/utils/parse-url-params';
import { Users } from '../entities/Users';
import { AppDataSource } from '@nc/utils/db';
import { to } from '@nc/utils/async';
import { InternalError, NotFound } from '@nc/utils/errors';

export async function getAllUsers(query): Promise <Users[]> {
  const params = getParams(query);
  const ExpensesRepository = AppDataSource.getRepository(Users);
  const [error, users] = await to(ExpensesRepository.find(params));

  if (error) {
    throw InternalError(`Error fetching data from the DB: ${error.message}`);
  }

  if (!users) {
    throw NotFound('Could not find users');
  }

  return users;
}

export async function getUser(id: string): Promise <Users> {
  const UsersRepository = AppDataSource.getRepository(Users);
  const [error, user] = await to(UsersRepository.findOneBy({
    id,
  }));

  if (error) {
    throw InternalError(`Error fetching data from the DB: ${error.message}`);
  }

  if (!user) {
    throw NotFound('Could not find user for user_id: ' + id);
  }

  return user;
}
