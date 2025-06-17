import { Box } from '@mui/material';
import { Layout, Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import DataListingStatusWidget from './DataListingStatusWidget';
import QueryTrendWidget from './QueryTrendWidget';
import SiteQualityScoreWidget from './SiteQualityScoreWidget';
import StatsWidget from './StatsWidget';
import TodoListWidget from './TodolistWidget';

const ResponsiveGridLayout = WidthProvider(Responsive);

const GRID_ROW_HEIGHT = 35;

const layout: Layout[] = [
  { i: 'stats1', x: 0, y: 0, w: 4, h: 4 },
  { i: 'stats2', x: 4, y: 0, w: 4, h: 4 },
  { i: 'stats3', x: 8, y: 0, w: 4, h: 4 },
  { i: 'todoList', x: 12, y: 0, w: 4, h: 4 },
  { i: 'queryTrend', x: 4, y: 3, w: 4, h: 4 },
  { i: 'listingStatus', x: 8, y: 3, w: 4, h: 4 },
  { i: 'siteQuality', x: 8, y: 3, w: 4, h: 4 },
];

const ProjectDashboard: React.FC = () => {
  return (
    <Box>
      <ResponsiveGridLayout
        className="layout"
        layouts={{ lg: layout }}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 20, md: 20, sm: 12, xs: 8, xxs: 4 }}
        rowHeight={GRID_ROW_HEIGHT}
        width={1200}
      >
        <div key="stats1">
          <StatsWidget
            title="Total Page Views"
            value="4,42,236"
            percentage="59.3%"
            extra="35,000"
          />
        </div>
        <div key="stats2">
          <StatsWidget
            title="Total Signups"
            value="12,845"
            percentage="31.8%"
            extra="3,100"
          />
        </div>
        <div key="stats3">
          <StatsWidget
            title="Revenue"
            value="$92,300"
            percentage="14.5%"
            extra="$11,000"
          />
        </div>
        <div key="todoList">
          <TodoListWidget />
        </div>
        <div key="queryTrend">
          <QueryTrendWidget />
        </div>
        <div key="listingStatus">
          <DataListingStatusWidget />
        </div>
        <div key="siteQuality">
          <SiteQualityScoreWidget />
        </div>
      </ResponsiveGridLayout>
    </Box>
  );
};

export default ProjectDashboard;
