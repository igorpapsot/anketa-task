import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './App.css'
import Form from './components/FormComponents/Form'
import NavHeader from './components/Header/NavHeader'
import { Provider } from 'react-redux'
import store from './redux/store'

function App() {

  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <NavHeader />
        <Form />
      </Provider>
    </QueryClientProvider>
  )
}

export default App
