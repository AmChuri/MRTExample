import { Box, Card, CardContent, Typography } from '@mui/material';
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

const COLORS = ['#ff9800', '#03a9f4', '#4caf50']; // Not Started, In Progress, Completed

const data = [
  { name: 'AE', status: 'Completed', value: 100 },
  { name: 'CM', status: 'In Progress', value: 70 },
  { name: 'LAB', status: 'Not Started', value: 50 },
  { name: 'VS', status: 'Completed', value: 100 },
  { name: 'DM', status: 'In Progress', value: 60 },
];

const groupedData = ['Completed', 'In Progress', 'Not Started'].map(
  (status, idx) => ({
    name: status,
    value: data.filter((d) => d.status === status).length,
    color: COLORS[idx],
  })
);

const DataListingStatusWidget: React.FC = () => {
  return (
    <Card sx={{ borderRadius: 2, height: '100%', minWidth: 300 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          📂 Data Listing Status Summary
        </Typography>

        <Box height={200}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={groupedData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={70}
                label
              >
                {groupedData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
};

export default DataListingStatusWidget;
