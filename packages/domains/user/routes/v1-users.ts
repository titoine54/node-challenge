import { format, secureTrim } from '../formatter';
import { ApiError } from '@nc/utils/errors';
import { getAllUsers, getUser } from '../controllers/userController';
import { Router } from 'express';
import { to } from '@nc/utils/async';

export const router = Router();

router.get('/users', async (req, res, next) => {
  const [error, response] = await to(getAllUsers());

  if (error) {
    return next(new ApiError(error, error.status, `Could not get user details: ${error}`, error.title, req));
  }
  const formatted_response = [];

  response.forEach((user) => {
    formatted_response.push(secureTrim(format(user)));
  });

  return res.json(formatted_response);
});

router.get('/users/:user_id', async (req, res, next) => {
  const [error, response] = await to(getUser(req.params.user_id));

  if (error) {
    return next(new ApiError(error, error.status, `Could not get user details: ${error}`, error.title, req));
  }

  return res.json(secureTrim(format(response)));
});
