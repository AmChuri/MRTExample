import { Box, Card, CardContent, Typography } from '@mui/material';
import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const data = [
  { site: 'Site 101', score: 92 },
  { site: 'Site 203', score: 88 },
  { site: 'Site 115', score: 65 },
  { site: 'Site 178', score: 73 },
  { site: 'Site 220', score: 55 },
];

const getColor = (score: number) => {
  if (score >= 85) return '#4caf50'; // green
  if (score >= 70) return '#ff9800'; // orange
  return '#f44336'; // red
};

const SiteQualityScoreWidget: React.FC = () => {
  return (
    <Card sx={{ height: '100%', borderRadius: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          🧪 Site Data Quality Score
        </Typography>
        <Box height={220}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              layout="vertical"
              margin={{ top: 10, right: 20, left: 20, bottom: 10 }}
            >
              <XAxis type="number" domain={[0, 100]} hide />
              <YAxis
                dataKey="site"
                type="category"
                width={80}
                tick={{ fontSize: 12 }}
              />
              <Tooltip />
              <Bar dataKey="score" barSize={14}>
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={getColor(entry.score)}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
};

export default SiteQualityScoreWidget;
