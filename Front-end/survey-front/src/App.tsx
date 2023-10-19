import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './App.css'
import Form from './components/FormComponents/Form'
import NavHeader from './components/Header/NavHeader'

function App() {

  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <NavHeader />
      <Form />
    </QueryClientProvider>
  )
}

export default App
