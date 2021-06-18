import { Database } from '../types/Database';

/**
 * This function takes a database schema and returns an array of the table names
 * sorted in which order they have to be inserted to prevent missing dependencies.
 *
 * @returns An array sorted for dependencies
 */
export function getSortedTableNames(db: Database): string[] {
  const sortedTables: string[] = [];
  while (sortedTables.length < db.length) {
    let didChange = false;
    for (const table of db) {
      // Ignore tables we already pushed to the final array
      if (sortedTables.includes(table.name)) {
        continue;
      }

      // Create an array of all dependencies the current table has
      const foreignTables = table.columns
        .map((column) => column.foreign_key?.split('.')[0])
        .filter(Boolean) as string[];

      // Check if all the dependencies are already pushed in the final array
      const dependenciesAvailable = foreignTables.every((tableName: string) =>
        sortedTables.includes(tableName),
      );

      // If all dependencies are available let's push the current table to the final array
      if (dependenciesAvailable) {
        sortedTables.push(table.name);
        didChange = true;
      }
    }
    // If nothing got pushed to the final array in one full loop there's a problem
    // with the dependencies. Maybe a table is referring to a table which doesn't
    // exist or there are some circular dependencies. To prevent being stuck in infinite
    // loop we throw an error here.
    if (!didChange) {
      throw new Error(
        'Nothing happened for a full loop. Maybe your schema is borked 🤷',
      );
    }
  }
  return sortedTables;
}
