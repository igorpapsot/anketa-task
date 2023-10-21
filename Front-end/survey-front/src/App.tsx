import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './App.css'
import NavHeader from './components/Header/NavHeader'
import { Provider } from 'react-redux'
import store from './redux/store'
import { Outlet } from 'react-router-dom'

function App() {

  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <NavHeader />
        <Outlet />
      </Provider>
    </QueryClientProvider>
  )
}

export default App
