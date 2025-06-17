import { Box } from '@mui/material';
import React from 'react';
import ProjectDashboard from './ProjectDashboard';

const ProjectDashboardView: React.FC = () => {
  return (
    <Box sx={{ height: '100vh', width: '100vw' }}>
      <ProjectDashboard />
    </Box>
  );
};

export default ProjectDashboardView;
