import { Expenses } from '../entities/Expenses';
import { AppDataSource } from '@nc/utils/db';
import { to } from '@nc/utils/async';
import { InternalError, NotFound } from '@nc/utils/errors';

export async function getAllExpenses(query: any): Promise<any> {
  const ExpensesRepository = AppDataSource.getRepository(Expenses);
  const [error, expenses] = await to(ExpensesRepository.find());

  if (error) {
    throw InternalError(`Error fetching data from the DB: ${error.message}`);
  }

  if (!expenses) {
    throw NotFound('Could not find expenses');
  }

  return expenses;
}

export async function getUserExpenses(query: any, user_id: string): Promise<any> {
  const ExpensesRepository = AppDataSource.getRepository(Expenses);
  const [error, expenses] = await to(ExpensesRepository.findBy({
    user_id,
  }));

  if (error) {
    throw InternalError(`Error fetching data from the DB: ${error.message}`);
  }

  if (!expenses) {
    throw NotFound('Could not find expenses for user_id: ' + user_id);
  }

  return expenses;
}
