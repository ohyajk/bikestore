import ReactDOM from 'react-dom/client'
import './index.css'
import Layout from './Layout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()


ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <QueryClientProvider client={queryClient}>
      <Layout />
      <ToastContainer theme='dark' position='top-right' progressStyle={{ color: '#FFFFFF', backgroundColor: '#FFF' }} />
    </QueryClientProvider>
  </>
)
