// @ts-nocheck
import { useQuery } from '@tanstack/react-query';
import { MRT_ColumnDef } from 'material-react-table';
import { useMemo } from 'react';
import ChildTable from './ChildTable';
import { getColumns } from './fakeApi';

export type Person = Record<string, any>;

const ParentComponent = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['columns'],
    queryFn: () => getColumns(),
  });

  const columns = useMemo<MRT_ColumnDef<Person>[]>(() => {
    if (!data?.columns) return [];

    return data.columns.map((col) => ({
      accessorKey: col,
      header: col.replace(/_/g, ' '),
      size: 150,
    }));
  }, [data]);

  if (isLoading) return <div>Loading columns...</div>;
  if (error) return <div>Error loading columns</div>;

  return (
    <ChildTable
      columns={columns}
      totalRowCount={data?.totalRowCount}
    />
  );
};

export default ParentComponent;
