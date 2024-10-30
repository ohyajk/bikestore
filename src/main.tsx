import ReactDOM from 'react-dom/client'
import './index.css'
import Layout from './Layout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';

axios.defaults.baseURL = import.meta.env.VITE_API
const queryClient = new QueryClient()




ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
      <ToastContainer theme='dark' position='top-center' />
    </QueryClientProvider>
  </>
)
