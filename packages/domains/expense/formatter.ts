import { Expense } from './types';

export function capitalize(word) {
  const str = `${word}`;
  return str[0].toUpperCase() + str.slice(1);
}

export function format(rawExpense): Expense {
  return {
    id: rawExpense.id,
    merchant_name: capitalize(rawExpense.merchant_name),
    amount_in_cents: rawExpense.amount_in_cents,
    currency: rawExpense.currency,
    user_id: rawExpense.user_id,
    date_created: rawExpense.date_created,
    status: rawExpense.status,
  };
}
