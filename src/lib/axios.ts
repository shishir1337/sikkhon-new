import axios from 'axios';

// Create a custom Axios instance
const api = axios.create({
  baseURL: 'https://your-api-url.com', // Replace with your actual API base URL
  timeout: 10000, // Optional: set a timeout for requests
});

export { api };
