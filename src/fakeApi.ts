// fakeApi.ts
type ColumnResponse = {
  columns: string[];
  totalRowCount: number;
};

type RowResponse = {
  rows: Record<string, any>[];
};

let cachedData: {
  columns: string[];
  totalRowCount: number;
  allRows: Record<string, any>[];
} | null = null;

// Utility to generate random string column names
const generateColumnNames = (count: number): string[] => {
  return Array.from({ length: count }, (_, i) => `Column_${i + 1}`);
};

// Utility to generate a single row with the given columns
const generateRow = (columns: string): Record<string, any> =>
  Object.fromEntries(
    columns.map((col) => [
      col,
      Math.random() > 0.5
        ? Math.random().toFixed(2)
        : Math.random().toString(36).substring(7),
    ])
  );

// First endpoint: get column names and total rows
export const getColumns = async (
  count = Math.floor(Math.random() * 6) + 20
): Promise<ColumnResponse> => {
  const totalRowCount = Math.floor(Math.random() * 4501) + 500; // 500-5000
  const columns = generateColumnNames(count);
  const allRows = Array.from({ length: totalRowCount }, () =>
    generateRow(columns)
  );

  // Cache the data for row generation
  cachedData = {
    columns,
    totalRowCount,
    allRows,
  };

  return { columns, totalRowCount };
};

// Second endpoint: get rows
export const getRows = async ({
  skip = 0,
  limit = 500,
}: {
  skip: number;
  limit: number;
}): Promise<RowResponse> => {
  if (!cachedData) {
    throw new Error(
      'You must call getColumns() first to initialize data.'
    );
  }

  const { allRows, totalRowCount } = cachedData;

  const end = Math.min(skip + limit, totalRowCount);
  const sliced = allRows.slice(skip, end);

  return { rows: sliced };
};
