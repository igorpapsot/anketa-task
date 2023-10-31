import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import NavHeader from './components/Header/NavHeader'
import { Outlet } from 'react-router-dom'
import AuthProvider from './components/Contexts/AuthContext'
import ToastProvider from './components/Contexts/ToastContext'

function App() {

  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ToastProvider>
          <>
            <NavHeader />
            <Outlet />
          </>
        </ToastProvider>
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App