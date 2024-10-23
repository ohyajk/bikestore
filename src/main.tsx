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

axios.defaults.baseURL = import.meta.env.VITE_API 
const queryClient = new QueryClient()
console.log(import.meta.env.VITE_API)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <QueryClientProvider client={queryClient}>
      <Layout />
      <ToastContainer theme='dark' position='top-right' progressStyle={{ color: '#FFFFFF', backgroundColor: '#FFF' }} />
    </QueryClientProvider>
  </>
)
