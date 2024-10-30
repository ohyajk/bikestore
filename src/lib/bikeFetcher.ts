import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchBikes = async (): Promise<any[]> => {
    const response = await axios.get('/bike/all');
    if (!response.data || response.data === null || response.data.length === 0) {
      throw new Error('No bike data available'); 
    }
    return response.data;
  };
  
  const useBikes = () => {
    return useQuery({
      queryKey: ['allbikes'],
      queryFn: fetchBikes,
    });
  };
  
  export default useBikes;
