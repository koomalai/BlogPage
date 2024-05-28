import './App.css'
import { QueryClient, QueryClientProvider } from 'react-query'
import AppRouters from './App/AppRoutes';
import SnackbarProvider from './Shared/Contexts/SnackbarProvider';
import HeaderTab from './Shared/Components/HeaderTab';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0,
      suspense: true,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SnackbarProvider>
        <HeaderTab>
          <AppRouters/>
        </HeaderTab>
      </SnackbarProvider>
    </QueryClientProvider>
  )
}

export default App
