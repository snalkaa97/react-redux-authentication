import axios from 'axios';
 
const apiClient = axios.create({
    baseURL: 'http://localhost:5555',
    withCredentials: true,
});
 
export default apiClient;
