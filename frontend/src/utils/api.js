import axios from 'axios';

const api = axios.create({
    baseURL: 'https://expensetracker-4l3q.onrender.com/api/v1',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to add the auth token to every request
api.interceptors.request.use(
    (config) => {
        const user = localStorage.getItem('user');
        if (user) {
            try {
                const { token } = JSON.parse(user);
                config.headers.Authorization = `Bearer ${token}`;
            } catch (error) {
                console.error("Invalid user data in localStorage", error);
                localStorage.removeItem('user');
            }
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;
