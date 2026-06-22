/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/set-state-in-effect */
import { createContext, useCallback, useEffect, useState } from 'react';
import api from '../api/api';

export const AuthContext = createContext({});

const USER_KEY = '@GreenEstoque:user';
const TOKEN_KEY = '@GreenEstoque:token';

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));
    const [loading, setLoading] = useState(true);

    const clearStoredSession = useCallback(() => {
        localStorage.removeItem(USER_KEY);
        localStorage.removeItem(TOKEN_KEY);
        sessionStorage.removeItem(USER_KEY);
        sessionStorage.removeItem(TOKEN_KEY);
    }, []);

    const persistSession = ({ usuario, token: sessionToken }) => {
        clearStoredSession();
        localStorage.setItem(USER_KEY, JSON.stringify(usuario));
        localStorage.setItem(TOKEN_KEY, sessionToken);

        setUser(usuario);
        setToken(sessionToken);
        api.defaults.headers.Authorization = `Bearer ${sessionToken}`;
    };

    const logout = useCallback(() => {
        setUser(null);
        setToken(null);
        clearStoredSession();
        delete api.defaults.headers.Authorization;
        window.location.href = '/login';
    }, [clearStoredSession]);

    const loadUser = useCallback(async () => {
        const storagedToken = localStorage.getItem(TOKEN_KEY);

        if (!storagedToken) {
            setUser(null);
            setToken(null);
            setLoading(false);
            return null;
        }

        api.defaults.headers.Authorization = `Bearer ${storagedToken}`;
        setToken(storagedToken);

        try {
            const response = await api.get('/auth/me');
            setUser(response.data);
            localStorage.setItem(USER_KEY, JSON.stringify(response.data));
            return response.data;
        } catch (error) {
            clearStoredSession();
            setUser(null);
            setToken(null);
            delete api.defaults.headers.Authorization;

            if (error.response?.status === 401 && window.location.pathname !== '/login') {
                window.location.href = '/login';
            }

            return null;
        } finally {
            setLoading(false);
        }
    }, [clearStoredSession]);

    useEffect(() => {
        loadUser();
    }, [loadUser]);

    const login = async (email, senha) => {
        try {
            const response = await api.post('/auth/login', { email, senha });
            persistSession(response.data);
            return true;
        } catch (error) {
            console.error('Erro na autenticacao:', error);
            throw new Error(error.response?.data?.error || 'Erro ao realizar login. Verifique as credenciais.', {
                cause: error
            });
        }
    };

    const register = async (data) => {
        try {
            const response = await api.post('/auth/register', data);
            persistSession(response.data);
            return true;
        } catch (error) {
            console.error('Erro no cadastro:', error);
            throw new Error(error.response?.data?.error || 'Erro ao criar conta. Verifique os dados informados.', {
                cause: error
            });
        }
    };

    const isAuthenticated = !!user && !!token;

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                isAuthenticated,
                signed: isAuthenticated,
                login,
                register,
                logout,
                loadUser,
                loading
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
