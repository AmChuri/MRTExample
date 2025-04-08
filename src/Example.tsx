import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
  type MRT_RowVirtualizer,
  type MRT_SortingState,
} from 'material-react-table';
import { useEffect, useRef, useState } from 'react';
import { makeData, type Person } from './makeData';

interface IExample {
  columns: MRT_ColumnDef<Person, unknown>[];
}

const Example = ({ columns }: IExample) => {
  //optionally access the underlying virtualizer instance
  const rowVirtualizerInstanceRef = useRef<MRT_RowVirtualizer>(null);

  const [data, setData] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sorting, setSorting] = useState<MRT_SortingState>([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setData(makeData(10_000));
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    //scroll to the top of the table when the sorting changes
    try {
      rowVirtualizerInstanceRef.current?.scrollToIndex?.(0);
    } catch (error) {
      console.error(error);
    }
  }, [sorting]);

  const table = useMaterialReactTable({
    columns,
    data, //10,000 rows
    defaultDisplayColumn: { enableResizing: true },
    enableBottomToolbar: false,
    enableColumnResizing: true,
    enableColumnVirtualization: true,
    enableClickToCopy: false,
    enableCellActions: 'context-menu',
    enableGlobalFilterModes: true,
    enablePagination: false,
    enableColumnPinning: true,
    enableRowNumbers: true,
    enableRowVirtualization: true,
    muiTableContainerProps: { sx: { maxHeight: '600px' } },
    onSortingChange: setSorting,
    state: { isLoading, sorting },
    rowVirtualizerInstanceRef, //optional
    rowVirtualizerOptions: { overscan: 5 }, //optionally customize the row virtualizer
    columnVirtualizerOptions: { overscan: 2 }, //optionally customize the column virtualizer
  });

  return <MaterialReactTable table={table} />;
};

export default Example;
