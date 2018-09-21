First commit for MindSpace project with Ardelia Tay and Yang Yu for week 5 project @ LHL

## Getting Started

1. Create the `.env` file: **ask Benji for proper .env config**
2. **Update the .env file with your correct local information**
3. Install dependencies: `npm i`
4. Fix to binaries for sass: `npm rebuild node-sass`
5. **Run migrations!!**: `knex migrate:latest`
  - Run latest migration
6. **Run the seed!!**: `knex seed:run`
  - Check the seeds file to see what gets seeded in the DB
  - If db has already been seeded, run `knex migrate:rollback` and then `knex migrate:latest`
7. Run the server: `npm run local`
8. Visit `http://localhost:8080/`

## Dependencies

- Node 10.10.x or above
- NPM 6.4.1 or above
