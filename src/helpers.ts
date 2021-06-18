import * as fs from 'fs'
import { Database } from '../types/Database';

export function readDatabaseFile(path: string): Database {
    const string: string = fs.readFileSync(path, 'utf8')
    const database: Database = JSON.parse(string)
    return database;
}