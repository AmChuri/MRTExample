// ChildTable.tsx
import { Box, Button, Typography } from '@mui/material';
import { useInfiniteQuery } from '@tanstack/react-query';
import {
  MaterialReactTable,
  MRT_RowSelectionState,
  MRT_TableOptions,
  useMaterialReactTable,
} from 'material-react-table';
import { useCallback, useState } from 'react';
import { getRows, RowResponse } from './fakeApi';
import { Person } from './ParentComponent';

type ChildTableProps = {
  columns: MRT_TableOptions<Person>['columns'];
  totalRowCount: number;
};

const PAGE_SIZE = 500;

const ChildTable = ({ columns, totalRowCount }: ChildTableProps) => {
  const [isMultiSelectEnabled, setIsMultiSelectEnabled] =
    useState(false);
  const [rowSelection, setRowSelection] =
    useState<MRT_RowSelectionState>({});
  const [selectedRowIds, setSelectedRowIds] = useState<string[]>([]);
  console.log(rowSelection);
  // 2️⃣ Toggle Row ID Selection
  const handleRowId = useCallback((id: string) => {
    setSelectedRowIds((prevIds) =>
      prevIds.includes(id)
        ? prevIds.filter((prevId) => prevId !== id)
        : [...prevIds, id]
    );

    setRowSelection((prev) => {
      const newSelection = { ...prev };
      if (newSelection[id]) {
        delete newSelection[id];
      } else {
        newSelection[id] = true;
      }
      return newSelection;
    });
  }, []);
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

  const getRowProps = useCallback(
    ({ row }: { row: any }) => ({
      onClick: () => handleRowId(row.id),
      sx: {
        height: '24px',
        cursor: 'pointer',
        backgroundColor: selectedRowIds.includes(row.id)
          ? '#ffcccc' // 🔴 red highlight
          : row.index % 2 === 0
          ? '#f9f9f9'
          : 'white',
      },
    }),
    [selectedRowIds, handleRowId]
  );

  const table = useMaterialReactTable({
    columns,
    data: allRows,
    enableRowNumbers: true,
    enableRowVirtualization: true,
    enablePagination: false,
    manualPagination: true,
    rowCount: totalRowCount,
    enableColumnOrdering: true,
    enableColumnPinning: true,
    enableMultiRowSelection: isMultiSelectEnabled,
    onRowSelectionChange: setRowSelection,
    muiTableBodyRowProps: getRowProps,
    rowVirtualizerOptions: { overscan: 4 },

    muiTableHeadProps: {
      sx: { display: 'flex', justifyContent: 'space-between' }, // space between header and toggle
      children: (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            width: '100%',
          }}
        >
          <Button
            onClick={() => setIsMultiSelectEnabled((prev) => !prev)}
            variant="contained"
            sx={{ marginBottom: '16px' }}
          >
            {isMultiSelectEnabled
              ? 'Disable Multi-Select'
              : 'Enable Multi-Select'}
          </Button>
        </Box>
      ),
    },
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

  return (
    <>
      <MaterialReactTable table={table} />
    </>
  );
};

export default ChildTable;
