// ChildTable.tsx
import { useInfiniteQuery } from '@tanstack/react-query';
import {
  MaterialReactTable,
  MRT_TableOptions,
  useMaterialReactTable,
} from 'material-react-table';
import React from 'react';
import { getRows } from './fakeApi';
import { Person } from './ParentComponent';

type ChildTableProps = {
  columns: MRT_TableOptions<Person>['columns'];
  totalRowCount: number;
};

const PAGE_SIZE = 500;

const ChildTable: React.FC<ChildTableProps> = ({
  columns,
  totalRowCount,
}) => {
  const { data, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ['rows'],
      queryFn: async ({ pageParam = 0 }) => {
        const delay = Math.floor(Math.random() * 400) + 200; // 200–600ms
        await new Promise((res) => setTimeout(res, delay));
        return getRows({
          skip: pageParam * PAGE_SIZE,
          limit: PAGE_SIZE,
        });
      },
      getNextPageParam: (lastPage, allPages) => {
        const totalFetched = allPages.flatMap((p) => p.rows).length;
        return totalFetched < totalRowCount
          ? allPages.length
          : undefined;
      },
    });

  const allRows = data?.pages.flatMap((page) => page.rows) ?? [];
  console.log(allRows);
  const table = useMaterialReactTable({
    columns,
    data: allRows,
    enableRowNumbers: true,
    enableRowVirtualization: true,
    manualPagination: true,
    rowCount: totalRowCount,
    enableColumnOrdering: true,
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
  });

  return <MaterialReactTable table={table} />;
};

export default ChildTable;
