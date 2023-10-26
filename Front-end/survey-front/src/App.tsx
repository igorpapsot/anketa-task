import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './App.css'
import NavHeader from './components/Header/NavHeader'
import { Outlet } from 'react-router-dom'
import AuthProvider from './components/ToolComponents/Auth'

function App() {

  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <>
          <NavHeader />
          <Outlet />
        </>
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App