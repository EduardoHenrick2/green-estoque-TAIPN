import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || '/api',
    headers: { 'Content-Type': 'application/json' },
});

// Injeta o token JWT em toda requisição
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('@GreenEstoque:token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Trata erros globais
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Token expirado — limpa sessão e redireciona
            localStorage.removeItem('@GreenEstoque:token');
            localStorage.removeItem('@GreenEstoque:user');
            sessionStorage.removeItem('@GreenEstoque:token');
            sessionStorage.removeItem('@GreenEstoque:user');
            if (window.location.pathname !== '/login') {
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

export default api;
