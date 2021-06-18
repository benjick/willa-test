interface Table {
  name: string;
  columns: {
    name: string;
    foreign_key: string | null;
  }[];
}

export type Database = Table[];
