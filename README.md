# Node Challenge

Take home test for Node.js developers.

## The challenge

This challenge has been designed to measure your knowledge of Node.js, Express, Typescript and various technologies, like monorepos, databases and testing. For your exercise, you will be enhancing this API which serves as the backend for the Pleo app. Whenever a user of the app navigates to the expenses view, it calls this API to collect the list of expenses for that user.

Your objective is to write this new route to fetch the list of expenses for a given user. Right now that domain is empty, so you'll have to build everything from scratch- but you can look over at the user domain for inspiration. Please make sure that the endpoint scales adequately and supports paging, sorting and filtering. Additionally, we would also like you to write some tests for your route.

Finally, as a bonus objective, try to improve any aspect of this API. It could be to add more TS types, better security, tests, add features, graphql support, etc. 

## Instructions

Fork this repo with your solution. Ideally, we'd like to see your progression through commits, and don't forget to update the README.md to explain your thought process.

Please let us know how long the challenge takes you. We're not looking for how speedy or lengthy you are. It's just really to give us a clearer idea of what you've produced in the time you decided to take. Feel free to go as big or as small as you want.

## Install

Make sure that you have a modern version of `yarn` that supports workspaces (`>= 1.0`), then run:

```bash
yarn
```

You will also need to [install Postgres](https://www.postgresqltutorial.com/install-postgresql-macos/), create a `challenge` database and load the sql file `dump.sql`:

```bash
psql challenge < dump.sql
```

## Start

To enable logs, use the standard `NODE_DEBUG` flag with the value `DEBUG`

```bash
NODE_DEBUG=DEBUG yarn start
```

## Test

Make sure that you have a modern version of `yarn` that supports workspaces, then run:

```bash
yarn test
```

The command above will run the following test suites sequentially:

| Test suite | Run command | Description |
-------------|-------------|-------------|
| Unit | `yarn test:unit` | Simple unit tests. |
| Mid-level | `yarn test:mid-level` | Small integration tests that integration of small components together.  |
| Acceptances | `yarn test:acceptance` | Large integration tests, system tests, end-to-end tests. |


Happy hacking 😁!


---
## Notes
### 1st session (1 hour)
Summary: Clone repo, setting up, install software, create DB, looking around and running initial code.
- Fix `TypeError: res.status is not a function` error by adding nextFunction
- Need to remove straight SQL queries from db-user.ts (`"SELECT * FROM USERS"`) by creating models -> typeorm
- Investigate https support
- Add more checks to security.ts
- API routes don't seem optimal, something like `/v1/users/:id/details` would be better than
`/user/v1/get-user-details/?userId=d`. 
- I understand the `/user` route is implemented as its own package within the monorepo architecture, so it is good to 
have versioning for each package (in case they are managed by different teams, for example). 
- Something like `/user/v1/:id/details` might be better.
- Potential improvements to the db schemas, `expenses.status` column is varchar(100). It could be a foreign key 
reference to a `status` table that contains all possible statuses. Same for `users.company_name` column and 
`expenses.user_id`

### 2nd session (1.5 hours)
Summary: Creating expense domain
- Setting up basic expense domain as a starting point. Major refactoring to come :)
- I might need to consolidate both formatter.ts into 1 file under `packages/utils`
- Field validation -> allow negative numbers for `expenses.amounts_in_cents` ?
- Need to add API documentation -> text file containing a summary of the available routes. Something like : `GET /expense/v1/expense ->
return all expense`)

### 3rd session (2 hours)
Summary : Setting up ORM for database operations
- Set up typeorm for expense domain and adding 2 basic queries
- Got rid of the 'get-*' part of the routes. It is unnecessary, since we know what type of action to do based on the
 HTTP query (GET, POST, PUT, DELETE, etc)
- Cleanup of unused or unnecessary code and rearranged the folders for the expense domain into a MVC-like structure

### 4th session (1 hour)
Summary: Work on user domain and other fix and improvments
- Migrated user domain to typeorm. I reused the formatter display the correct columns and capitalize. Another option
would be to only select these columns in the `find()` statement + capitalize the result directly with a `.then()` or 
something
- I decided to change the `expense/v1/expenses/:user_id` route to `expense/v1/expenses/user/:user_id` in order to make
it clearer that we are getting the users expenses. I also added `expense/v1/expenses/:expense_id`
- Added type definitions on the controllers so that the TS gods stay happy

### 5th session (2 hours)
Summary: Created and tested (manually) paging, sorting and filtering.
- Added paging, filtering and sorting in the package utils + testing
- Need to write tests for my routes that covers all cases