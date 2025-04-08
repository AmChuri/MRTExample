import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import './App.css';
import ParentComponent from './ParentComponent';

const queryClient = new QueryClient();

function App() {
  //return;
  return (
    <>
      <QueryClientProvider client={queryClient}>
        {/*<MainComponent />*/}
        <ParentComponent />
      </QueryClientProvider>
    </>
  );
}

export default App;
