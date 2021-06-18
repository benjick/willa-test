import { readDatabaseFile } from './helpers';
import { getSortedTableNames as version1 } from './version1';

const database = readDatabaseFile('./database.json')
const brokenDatabase = readDatabaseFile('./database-error.json')

try {
    const result = version1(database)
    console.log('result', result)
    version1(brokenDatabase)
} catch (error) {
    console.log(error.message)   
}