import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchBikes = async (): Promise<any[]> => {
    const response = await axios.get('/bike/all'); 
    return response.data; 
  };
  
  const useBikes = () => {
    return useQuery({
      queryKey: ['allbikes'],
      queryFn: fetchBikes,
      staleTime: 30000, 
      refetchInterval: 30000, 
    });
  };
  
  export default useBikes;
