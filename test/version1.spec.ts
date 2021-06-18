import { readDatabaseFile } from './helpers';
import { getSortedTableNames } from '../src/version1';

describe('Test version 1 of the challenge', () => {
  const database = readDatabaseFile('original');
  const brokenDatabase = readDatabaseFile('broken');
  const circularDatabase = readDatabaseFile('circular');
  const complexDatabase = readDatabaseFile('complex');

  it('should pass with a working database schema', () => {
    const result = getSortedTableNames(database);
    // expect(result).toMatchSnapshot();
    expect(result).toEqual([
      'users',
      'clients',
      'audit_log',
      'invoices',
      'payment_request',
      'line_items',
    ]);
  });

  it('should pass with a complex database schema', () => {
    const result = getSortedTableNames(complexDatabase);
    // expect(result).toMatchSnapshot();
    expect(result).toEqual([
      'users',
      'clients',
      'audit_log',
      'invoices',
      'payment_request',
      'line_items',
      'test',
    ]);
  });

  it('should fail with a broken database schema', () => {
    expect.assertions(1);
    try {
      getSortedTableNames(brokenDatabase);
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
    }
  });

  it('should fail with a circular database schema', () => {
    expect.assertions(1);
    try {
      getSortedTableNames(circularDatabase);
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
    }
  });
});
