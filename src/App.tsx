import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { useState } from 'react';
import './App.css';
import ParentComponent from './ParentComponent';

const queryClient = new QueryClient();

function App() {
  const [count, setCount] = useState(0);

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
