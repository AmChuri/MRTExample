import { Button } from '@mui/material';
import {
  MRT_ColumnDef,
  useMaterialReactTable,
} from 'material-react-table';
import { useEffect, useMemo, useState } from 'react';
import Example from './Example';
import { makeData, Person } from './makeData';
import Test from './Test';

const MainComponent = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const columns = useMemo<MRT_ColumnDef<Person>[]>(
    //column definitions...
    () => [
      {
        accessorKey: 'firstName',
        header: 'First Name',
        size: 150,
      },
      {
        accessorKey: 'middleName',
        header: 'Middle Name',
        size: 170,
      },
      {
        accessorKey: 'lastName',
        header: 'Last Name',
        size: 150,
      },
      {
        accessorKey: 'email',
        header: 'Email Address',
        size: 300,
      },
      {
        accessorKey: 'phoneNumber',
        header: 'Phone Number',
        size: 250,
      },
      {
        accessorKey: 'address',
        header: 'Address',
        size: 300,
      },
      {
        accessorKey: 'zipCode',
        header: 'Zip Code',
      },
      {
        accessorKey: 'city',
        header: 'City',
        size: 220,
      },
      {
        accessorKey: 'state',
        header: 'State',
      },
      {
        accessorKey: 'country',
        header: 'Country',
        size: 350,
      },
      {
        accessorKey: 'petName',
        header: 'Pet Name',
      },
      {
        accessorKey: 'age',
        header: 'Age',
      },
      {
        accessorKey: 'salary',
        header: 'Salary',
      },
      {
        accessorKey: 'dateOfBirth',
        header: 'Date of Birth',
      },
      {
        accessorKey: 'dateOfJoining',
        header: 'Date of Joining',
      },
      {
        accessorKey: 'isActive',
        header: 'Is Active',
      },
    ],
    []
    //end
  );
  const [data, setData] = useState<Person[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setData(makeData(10_000));
    }
  }, []);
  const table = useMaterialReactTable({
    columns,
    data,
  });

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button>
      <Test
        open={open}
        onClick={handleClose}
        columns={columns}
        table={table}
      />
      <Example columns={columns} />
    </>
  );
};

export default MainComponent;
