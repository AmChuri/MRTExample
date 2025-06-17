import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { Box, Chip, Paper, Typography } from '@mui/material';
import React from 'react';

interface StatsWidgetProps {
  title: string;
  value: string;
  percentage: string;
  extra: string;
  height?: number; // Accept dynamic height
}

const GRID_ROW_HEIGHT = 35;

const StatsWidget: React.FC<StatsWidgetProps> = ({
  title,
  value,
  percentage,
  extra,
  height,
}) => {
  return (
    <Paper
      elevation={3}
      sx={{
        p: 2,
        height: height ? `${height}px` : `${GRID_ROW_HEIGHT * 4}px`,
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <Typography variant="subtitle2" color="textSecondary">
        {title}
      </Typography>
      <Box
        sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}
      >
        <Typography variant="h5" fontWeight="bold">
          {value}
        </Typography>
        <Chip
          icon={<TrendingUpIcon fontSize="small" />}
          label={percentage}
          size="small"
          color="primary"
          sx={{ fontWeight: 'bold' }}
        />
      </Box>
      <Typography
        variant="body2"
        color="textSecondary"
        sx={{ mt: 1 }}
      >
        You made an extra{' '}
        <Typography
          component="span"
          color="primary"
          fontWeight="bold"
        >
          {extra}
        </Typography>{' '}
        this year
      </Typography>
    </Paper>
  );
};

export default StatsWidget;
