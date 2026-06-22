import React, { useState, useEffect } from 'react';
import { userService } from '../../services/userService';
import Modal from '../../components/Modal/Modal';
import { Plus, Edit2, Trash2, User } from 'lucide-react';
import { toast } from 'react-toastify';
import { useAuth } from '../../hooks/useAuth';
import './Users.css';

const Users = () => {
    const { user } = useAuth();
    const isAdmin = user?.perfil === 'ADMINISTRADOR';

    const [users, setUsers] = useState([]);
    const [perfis, setPerfis] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [formData, setFormData] = useState({
        nome: '', email: '', senha: '', perfil_id: ''
    });

    useEffect(() => { 
        loadData(); 
    }, []);

    const loadData = async () => {
        setLoading(true);
        try {
            const [usersData, perfisData] = await Promise.all([
                userService.getAll(),
                userService.getPerfis()
            ]);
            setUsers(usersData);
            setPerfis(perfisData);
        } catch (err) {
            console.error('Erro ao carregar dados:', err);
            toast.error('Erro ao carregar lista de usuários e perfis.');
        } finally {
            setLoading(false);
        }
    };

    const handleOpenModal = (user = null) => {
        if (user) {
            setEditingUser(user);
            setFormData({
                nome: user.nome,
                email: user.email,
                senha: '',
                perfil_id: user.perfil_id || (perfis.length > 0 ? perfis[0].id : '')
            });
        } else {
            setEditingUser(null);
            setFormData({ 
                nome: '', 
                email: '', 
                senha: '', 
                perfil_id: perfis.length > 0 ? perfis[0].id : '' 
            });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingUser) {
                const payload = { ...formData };
                if (!payload.senha) delete payload.senha; // Se não digitou senha, mantém a antiga
                await userService.update(editingUser.id, payload);
                toast.success('Usuário atualizado!');
            } else {
                if (!formData.senha) return toast.error('Senha é obrigatória para novos usuários.');
                await userService.create(formData);
                toast.success('Usuário criado com sucesso!');
            }
            setIsModalOpen(false);
            loadData();
        } catch (err) {
            toast.error(err.response?.data?.error || 'Erro ao salvar usuário.');
        }
    };

    const handleDelete = async (user) => {
        if (!window.confirm(`Tem certeza que deseja excluir o usuário ${user.nome}?`)) return;
        try {
            await userService.delete(user.id);
            toast.success('Usuário excluído com sucesso.');
            loadData();
        } catch (err) {
            toast.error('Erro ao excluir usuário.');
        }
    };

    const perfilBadgeColor = (perfil) => {
        if (!perfil) return 'grey';
        const p = perfil.toUpperCase();
        if (p === 'ADMINISTRADOR') return 'admin';
        if (p === 'GESTOR') return 'gerente';
        if (p === 'OPERACIONAL') return 'estoquista';
        return 'vendedor';
    };

    return (
        <div className="page-container">
            <div className="page-header">
                <h2>Usuários</h2>
                {isAdmin && (
                    <button className="btn-primary" onClick={() => handleOpenModal()}>
                        <Plus size={18} />
                        Novo Usuário
                    </button>
                )}
            </div>

            <div className="table-container">
                {loading ? (
                    <div className="loading-state">
                        <div className="spinner" /> Carregando usuários...
                    </div>
                ) : (
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Usuário</th>
                                <th>Perfil</th>
                                <th>Criado em</th>
                                <th className="text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(u => (
                                <tr key={u.id}>
                                    <td>
                                        <div className="user-cell">
                                            <div className="user-avatar">{u.nome?.charAt(0)?.toUpperCase()}</div>
                                            <div>
                                                <strong>{u.nome}</strong>
                                                <div className="user-email">{u.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <span className={`perfil-badge ${perfilBadgeColor(u.perfil)}`}>
                                            {u.perfil || 'Sem perfil'}
                                        </span>
                                    </td>
                                    <td>
                                        {u.criado_em
                                            ? new Date(u.criado_em).toLocaleDateString('pt-BR')
                                            : '—'
                                        }
                                    </td>
                                    <td className="text-right actions-cell">
                                        {isAdmin ? (
                                            <>
                                                <button
                                                    className="icon-btn edit"
                                                    onClick={() => handleOpenModal(u)}
                                                    title="Editar"
                                                >
                                                    <Edit2 size={16} />
                                                </button>
                                                <button
                                                    className="icon-btn delete"
                                                    onClick={() => handleDelete(u)}
                                                    title="Excluir"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </>
                                        ) : (
                                            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Sem acesso</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                            {users.length === 0 && (
                                <tr>
                                    <td colSpan="4">
                                        <div className="empty-state">
                                            <User size={32} />
                                            <h3>Nenhum usuário cadastrado</h3>
                                            <p>Clique em "Novo Usuário" para começar.</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={editingUser ? 'Editar Usuário' : 'Novo Usuário'}
            >
                <form onSubmit={handleSubmit} className="standard-form">
                    <div className="form-group">
                        <label>Nome completo *</label>
                        <input
                            type="text"
                            required
                            placeholder="Ex: João Silva"
                            value={formData.nome}
                            onChange={e => setFormData({ ...formData, nome: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <label>E-mail *</label>
                        <input
                            type="email"
                            required
                            placeholder="joao@greenvolt.com.br"
                            value={formData.email}
                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label>Senha {editingUser ? '(deixe vazio para manter)' : '*'}</label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                value={formData.senha}
                                onChange={e => setFormData({ ...formData, senha: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label>Perfil *</label>
                            <select
                                required
                                value={formData.perfil_id}
                                onChange={e => setFormData({ ...formData, perfil_id: Number(e.target.value) })}
                            >
                                <option value="" disabled>Selecione um perfil...</option>
                                {perfis.map(p => (
                                    <option key={p.id} value={p.id}>{p.nome}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    
                    <div className="form-actions">
                        <button type="button" className="btn-secondary" onClick={() => setIsModalOpen(false)}>
                            Cancelar
                        </button>
                        <button type="submit" className="btn-primary">
                            {editingUser ? 'Salvar alterações' : 'Criar usuário'}
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default Users;
