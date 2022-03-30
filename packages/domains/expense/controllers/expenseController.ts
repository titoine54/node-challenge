import { Expenses } from '../entities/Expenses';
import { AppDataSource } from '@nc/utils/db';
import { getParams } from '@nc/utils/parse-url-params';
import { to } from '@nc/utils/async';
import { InternalError, NotFound } from '@nc/utils/errors';
import { Request } from 'express';

export async function getAllExpenses(query): Promise <Expenses[]> {
  const params = getParams(query);
  const ExpensesRepository = AppDataSource.getRepository(Expenses);
  const [error, expenses] = await to(ExpensesRepository.find(params));

  if (error) {
    throw InternalError(`Error fetching data from the DB: ${error.message}`);
  }

  if (!expenses) {
    throw NotFound('Could not find expenses');
  }

  return expenses;
}

export async function getExpense(query, expense_id: string): Promise <Expenses> {
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

export async function getUserExpenses(query, user_id: string): Promise <Expenses[]> {
  const params = getParams(query);
  if (params['where'] == undefined){
    params['where'] = {}
  }
  params['where']['user_id'] = user_id;

  console.log(params)
  const ExpensesRepository = AppDataSource.getRepository(Expenses);
  const [error, expenses] = await to(ExpensesRepository.find(params));

  if (error) {
    throw InternalError(`Error fetching data from the DB: ${error.message}`);
  }

  if (!expenses) {
    throw NotFound('Could not find expenses for user_id: ' + user_id);
  }

  return expenses;
}
