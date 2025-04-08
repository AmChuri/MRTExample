// @ts-nocheck
import {
  AddCircleOutline,
  RemoveCircleOutline,
} from '@mui/icons-material';
import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  IconButton,
  TextField,
} from '@mui/material';
import {
  MRT_ColumnDef,
  MRT_TableInstance,
} from 'material-react-table';
import { useState } from 'react';

// Possible filter conditions
const FILTER_OPTIONS = [
  'contains',
  'doesNotContain',
  'equals',
  'notEquals',
  'startsWith',
  'endsWith',
  'greaterThan',
  'lessThan',
  'between',
];

interface Filter {
  column: string;
  condition: string;
  value: string;
}

interface FilterDialogProps<T> {
  open: boolean;
  onClose: () => void;
  columns: MRT_ColumnDef<T>[];
  table: MRT_TableInstance<T>;
}

export default function FilterDialog<T>({
  open,
  onClose,
  columns,
  table,
}: FilterDialogProps<T>) {
  const [filters, setFilters] = useState<Filter[]>([
    { column: '', condition: '', value: '' },
  ]);

  // Update filter array
  const updateFilter = (
    index: number,
    key: keyof Filter,
    value: string
  ) => {
    const updatedFilters = [...filters];
    updatedFilters[index][key] = value;
    setFilters(updatedFilters);
  };

  // Add new filter row
  const addFilter = () => {
    setFilters([
      ...filters,
      { column: '', condition: '', value: '' },
    ]);
  };

  // Remove filter row
  const removeFilter = (index: number) => {
    setFilters(filters.filter((_, i) => i !== index));
  };

  // Apply filters to MRT
  const handleApply = () => {
    const validFilters = filters.filter(
      (f) => f.column && f.condition && f.value
    );
    table.setColumnFilters(
      validFilters.map((filter) => ({
        id: filter.column,
        value: { condition: filter.condition, value: filter.value },
      }))
    );
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Apply Multiple Filters</DialogTitle>
      <DialogContent>
        {filters.map((filter, index) => (
          <Grid container spacing={2} key={index} alignItems="center">
            {/* Column Selection */}
            <Grid item xs={4}>
              <FormControl fullWidth>
                <Autocomplete
                  options={columns.map((col) => col.accessorKey!)}
                  renderInput={(params) => (
                    <TextField {...params} label="Column" />
                  )}
                  value={filter.column}
                  onChange={(_, value) =>
                    updateFilter(index, 'column', value || '')
                  }
                />
              </FormControl>
            </Grid>

            {/* Condition Selection */}
            <Grid item xs={4}>
              <FormControl fullWidth>
                <Autocomplete
                  options={FILTER_OPTIONS}
                  renderInput={(params) => (
                    <TextField {...params} label="Filter Type" />
                  )}
                  value={filter.condition}
                  onChange={(_, value) =>
                    updateFilter(index, 'condition', value || '')
                  }
                />
              </FormControl>
            </Grid>

            {/* Value Input */}
            <Grid item xs={3}>
              <TextField
                fullWidth
                label="Value"
                value={filter.value}
                onChange={(e) =>
                  updateFilter(index, 'value', e.target.value)
                }
              />
            </Grid>

            {/* Add/Remove Buttons */}
            <Grid item xs={1}>
              <IconButton
                onClick={() => removeFilter(index)}
                color="error"
              >
                <RemoveCircleOutline />
              </IconButton>
            </Grid>
          </Grid>
        ))}

        {/* Add Filter Button */}
        <Button
          startIcon={<AddCircleOutline />}
          onClick={addFilter}
          sx={{ mt: 2 }}
        >
          Add Another Filter
        </Button>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={handleApply}
          variant="contained"
          color="primary"
        >
          Apply Filters
        </Button>
      </DialogActions>
    </Dialog>
  );
}
