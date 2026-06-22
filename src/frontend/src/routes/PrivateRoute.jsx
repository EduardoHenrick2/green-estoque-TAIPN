import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const PrivateRoute = () => {
    const { signed, loading } = useAuth();

    if (loading) {
        // Exibe um fallback visual super simples enquanto verifica se há sessão no LocalStorage
        return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#0b1a20', color: '#4ade80' }}>Carregando sistema...</div>;
    }

    // Se estiver logado (signed = true), renderiza os componentes filhos (<Outlet />).
    // Se não, redireciona o usuário para a página /login e substitui o histórico (replace).
    return signed ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
