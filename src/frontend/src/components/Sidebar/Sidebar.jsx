import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import {
    LayoutDashboard,
    Package,
    ArrowRightLeft,
    Truck,
    Settings,
    LogOut,
    Users,
    ShieldCheck,
    Tags
} from 'lucide-react';
import logoGreenEstoque from '../../assets/logo-horizontal.png';
import './Sidebar.css';

const Sidebar = () => {
    const { logout, user } = useAuth();

    return (
        <aside className="sidebar">
            <div className="sidebar-brand">
                <img
                    src={logoGreenEstoque}
                    alt="Green Estoque"
                    className="sidebar-logo-full"
                />
            </div>

            <nav className="sidebar-nav">
                <p className="nav-section-label">MENU</p>

                <NavLink to="/" end className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
                    <LayoutDashboard size={18} />
                    <span>Dashboard</span>
                </NavLink>

                <NavLink to="/produtos" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
                    <Package size={18} />
                    <span>Produtos</span>
                </NavLink>

                <NavLink to="/categorias" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
                    <Tags size={18} />
                    <span>Categorias</span>
                </NavLink>

                <NavLink to="/movimentacoes" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
                    <ArrowRightLeft size={18} />
                    <span>Movimentações</span>
                </NavLink>

                <NavLink to="/fornecedores" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
                    <Truck size={18} />
                    <span>Fornecedores</span>
                </NavLink>

                {user?.perfil === 'ADMINISTRADOR' && (
                    <>
                        <p className="nav-section-label" style={{ marginTop: '16px' }}>ACESSO</p>

                        <NavLink to="/usuarios" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
                            <Users size={18} />
                            <span>Usuários</span>
                        </NavLink>

                        <NavLink to="/permissoes" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
                            <ShieldCheck size={18} />
                            <span>Permissões</span>
                        </NavLink>
                    </>
                )}
            </nav>

            <div className="sidebar-footer">
                <NavLink to="/configuracoes" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
                    <Settings size={18} />
                    <span>Configurações</span>
                </NavLink>
                <button className="nav-item logout-btn" onClick={logout}>
                    <LogOut size={18} />
                    <span>Sair</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
