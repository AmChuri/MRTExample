import { Card, CardContent, Typography } from '@mui/material';
import {
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const data = [
  { week: 'Wk1', Opened: 15, Resolved: 5 },
  { week: 'Wk2', Opened: 10, Resolved: 8 },
  { week: 'Wk3', Opened: 8, Resolved: 10 },
  { week: 'Wk4', Opened: 5, Resolved: 12 },
];

const QueryTrendWidget: React.FC = () => {
  return (
    <Card sx={{ height: '100%', borderRadius: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          📊 Query Resolution Trend
        </Typography>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={data}>
            <XAxis dataKey="week" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="Opened"
              stroke="#ff6f61"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="Resolved"
              stroke="#4caf50"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default QueryTrendWidget;
