# Database Model Population Challenge

`src/version1.ts`

This file contains the function used to extract the table names in the order which they need to be inserted.

### Run tests

There are a few test cases; the initial database, one with a missing reference, one with a circular dependency and one with a "complex" structure (a table depends on a table which depends on a table).

```sh
yarn
yarn test
```
