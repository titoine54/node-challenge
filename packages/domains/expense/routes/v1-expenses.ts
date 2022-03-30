import { ApiError } from '@nc/utils/errors';
import { getAllExpenses, getExpense, getUserExpenses } from '../controllers/expenseController';
import { Router } from 'express';
import { to } from '@nc/utils/async';

export const router = Router();

router.get('/expenses', async (req, res, next) => {
  const [error, response] = await to(getAllExpenses());

  if (error) {
    return next(new ApiError(error, error.status, `Could not get expense details: ${error}`, error.title, req));
  }

  return res.json(response);
});

router.get('/expenses/:expense_id', async (req, res, next) => {
  const [error, response] = await to(getExpense(req.params.expense_id));

  if (error) {
    return next(new ApiError(error, error.status, `Could not get expense details: ${error}`, error.title, req));
  }

  return res.json(response);
});

router.get('/expenses/user/:user_id', async (req, res, next) => {
  const [error, response] = await to(getUserExpenses(req.params.user_id));

  if (error) {
    return next(new ApiError(error, error.status, `Could not get expense details: ${error}`, error.title, req));
  }

  return res.json(response);
});
