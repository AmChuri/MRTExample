// ChildTable.tsx
import { Typography } from '@mui/material';
import { useInfiniteQuery } from '@tanstack/react-query';
import {
  MaterialReactTable,
  MRT_TableOptions,
  useMaterialReactTable,
} from 'material-react-table';
import { getRows, RowResponse } from './fakeApi';
import { Person } from './ParentComponent';

type ChildTableProps = {
  columns: MRT_TableOptions<Person>['columns'];
  totalRowCount: number;
};

const PAGE_SIZE = 500;

const ChildTable = ({ columns, totalRowCount }: ChildTableProps) => {
  const { data, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useInfiniteQuery<
      RowResponse,
      Error,
      RowResponse,
      string[],
      number
    >({
      queryKey: ['rows'],
      queryFn: async ({ pageParam = 0 }) => {
        const delay = Math.floor(Math.random() * 400) + 200; // 200–600ms
        await new Promise((res) => setTimeout(res, delay));
        return getRows({
          skip: pageParam * PAGE_SIZE,
          limit: PAGE_SIZE,
        });
      },
      initialPageParam: 0,
      getNextPageParam: (_lastPage, allPages) => {
        const totalFetched = allPages.flatMap((p) => p.rows).length;
        return totalFetched < totalRowCount
          ? allPages.length
          : undefined;
      },
    });

  // @ts-ignore
  const allRows = data?.pages.flatMap((page) => page.rows) ?? [];
  const table = useMaterialReactTable({
    columns,
    data: allRows,
    enableRowNumbers: true,
    enableRowVirtualization: true,
    enablePagination: false,
    manualPagination: true,
    rowCount: totalRowCount,
    enableColumnOrdering: true,
    rowVirtualizerOptions: { overscan: 4 },
    muiTableBodyRowProps: ({ row }) => ({
      sx: {
        height: '24px',
        backgroundColor: row.index % 2 === 0 ? '#f9f9f9' : 'white',
      },
    }),
    muiTableContainerProps: {
      sx: { maxHeight: '600px', overflowY: 'auto' },
      onScroll: (e) => {
        const { scrollTop, scrollHeight, clientHeight } =
          e.currentTarget;
        const scrollPercentage =
          (scrollTop + clientHeight) / scrollHeight;

        if (
          scrollPercentage > 0.75 &&
          hasNextPage &&
          !isFetchingNextPage
        ) {
          fetchNextPage();
        }
      },
    },
    renderBottomToolbarCustomActions: () => (
      <Typography>
        Fetched {allRows.length} of {totalRowCount} total rows.
      </Typography>
    ),
  });

  return <MaterialReactTable table={table} />;
};

export default ChildTable;
