import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import './App.css';
import ProjectDashboardView from './Project/ProjectDashboardView';

const queryClient = new QueryClient();

function App() {
  //return;
  return (
    <>
      <QueryClientProvider client={queryClient}>
        {/*<MainComponent />*/}
        {/* <ParentComponent />*/}
        <ProjectDashboardView />
      </QueryClientProvider>
    </>
  );
}

export default App;
