import { Expenses } from '../entities/Expenses';
import { AppDataSource } from '@nc/utils/db';
import { to } from '@nc/utils/async';
import { InternalError, NotFound } from '@nc/utils/errors';
import { Request } from 'express';

export async function getAllExpenses(): Promise <Expenses[]> {
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

export async function getExpense(expense_id: string): Promise <Expenses> {
  const ExpensesRepository = AppDataSource.getRepository(Expenses);
  const [error, expense] = await to(ExpensesRepository.findOneBy({
    id: expense_id,
  }));

  if (error) {
    throw InternalError(`Error fetching data from the DB: ${error.message}`);
  }

  if (!expense) {
    throw NotFound('Could not find expenses with expense_id: ' + expense_id);
  }

  return expense;
}

export async function getUserExpenses(user_id: string): Promise <Expenses[]> {
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
