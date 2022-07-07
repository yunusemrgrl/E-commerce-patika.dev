import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './reset.css';
import 'antd/dist/antd.min.css';
import App from './App';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ChakraProvider } from '@chakra-ui/react';
import { ReactQueryDevtools } from 'react-query/devtools';

// context
import { BasketProvider } from './context/BasketContext';

import { AuthProvider } from './context/AuthContext';
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <QueryClientProvider client={queryClient}>
    <ChakraProvider>
      <AuthProvider>
        <BasketProvider>
          <App />
        </BasketProvider>
      </AuthProvider>
    </ChakraProvider>

    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>,
);
