import * as fs from 'fs';
import * as path from 'path';
import { Database } from '../types/Database';

export function readDatabaseFile(fixture: string): Database {
  const string = fs.readFileSync(
    path.resolve(__dirname, 'fixtures', fixture + '.json'),
    'utf8',
  );
  const database: Database = JSON.parse(string);
  return database;
}
