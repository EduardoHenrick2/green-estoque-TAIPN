import React, { useState, useEffect } from 'react';
import { supplierService } from '../../services/supplierService';
import Modal from '../../components/Modal/Modal';
import { Plus, Edit2, Trash2, Mail, Phone, Truck } from 'lucide-react';
import { toast } from 'react-toastify';
import { useAuth } from '../../hooks/useAuth';
import './Suppliers.css';

const EMPTY_FORM = { nome: '', cnpj: '', contato: '', email: '', telefone: '' };

const Suppliers = () => {
    const { user } = useAuth();
    const isAdmin = user?.perfil === 'ADMINISTRADOR';

    const [suppliers, setSuppliers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingSupplier, setEditingSupplier] = useState(null);
    const [formData, setFormData] = useState(EMPTY_FORM);

    useEffect(() => { loadSuppliers(); }, []);

    const loadSuppliers = async () => {
        setLoading(true);
        try {
            const data = await supplierService.getAll();
            setSuppliers(data);
        } catch (error) {
            console.error('Erro ao carregar fornecedores:', error);
            toast.error('Erro ao carregar fornecedores.');
        } finally {
            setLoading(false);
        }
    };

    const handleOpenModal = (supplier = null) => {
        if (supplier) {
            setEditingSupplier(supplier);
            setFormData({
                nome:     supplier.nome     || '',
                cnpj:     supplier.cnpj     || '',
                contato:  supplier.contato  || '',
                email:    supplier.email    || '',
                telefone: supplier.telefone || ''
            });
        } else {
            setEditingSupplier(null);
            setFormData(EMPTY_FORM);
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingSupplier) {
                await supplierService.update(editingSupplier.id, formData);
                toast.success('Fornecedor atualizado!');
            } else {
                await supplierService.create(formData);
                toast.success('Fornecedor cadastrado!');
            }
            setIsModalOpen(false);
            loadSuppliers();
        } catch (error) {
            toast.error(error.response?.data?.error || 'Erro ao salvar fornecedor.');
        }
    };

    const handleDelete = async (id, nome) => {
        if (!window.confirm(`Excluir o fornecedor "${nome}"?`)) return;
        try {
            await supplierService.delete(id);
            toast.success('Fornecedor excluído.');
            loadSuppliers();
        } catch (error) {
            toast.error(error.response?.data?.error || 'Erro ao excluir fornecedor.');
        }
    };

    const filteredSuppliers = suppliers.filter(s =>
        s.nome.toLowerCase().includes(search.toLowerCase()) ||
        (s.cnpj || '').includes(search) ||
        (s.email || '').toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="page-container">
            <div className="page-header">
                <h2>Fornecedores</h2>
                {isAdmin && (
                    <button className="btn-primary" onClick={() => handleOpenModal()}>
                        <Plus size={18} />
                        Novo Fornecedor
                    </button>
                )}
            </div>

            {/* Busca inline */}
            <div className="filters-card">
                <div className="filters-form">
                    <div className="filter-group">
                        <label>Buscar fornecedor</label>
                        <input
                            type="text"
                            placeholder="Nome, CNPJ ou e-mail..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className="table-container">
                {loading ? (
                    <div className="loading-state">
                        <div className="spinner" /> Carregando fornecedores...
                    </div>
                ) : (
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Nome / CNPJ</th>
                                <th>Contato</th>
                                <th>E-mail</th>
                                <th>Telefone</th>
                                <th>Cadastrado em</th>
                                <th className="text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredSuppliers.map(sup => (
                                <tr key={sup.id}>
                                    <td>
                                        <div className="supplier-cell">
                                            <div className="supplier-icon">
                                                <Truck size={16} />
                                            </div>
                                            <div>
                                                <strong>{sup.nome}</strong>
                                                <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
                                                    {sup.cnpj ? `CNPJ: ${sup.cnpj}` : 'CNPJ não informado'}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{sup.contato || '—'}</td>
                                    <td>
                                        {sup.email ? (
                                            <a href={`mailto:${sup.email}`} style={{ color: 'var(--status-info)' }}>
                                                {sup.email}
                                            </a>
                                        ) : '—'}
                                    </td>
                                    <td>{sup.telefone || '—'}</td>
                                    <td>
                                        {sup.criado_em
                                            ? new Date(sup.criado_em).toLocaleDateString('pt-BR')
                                            : '—'}
                                    </td>
                                    <td className="text-right actions-cell">
                                        {isAdmin ? (
                                            <>
                                                <button
                                                    className="icon-btn edit"
                                                    onClick={() => handleOpenModal(sup)}
                                                    title="Editar"
                                                >
                                                    <Edit2 size={16} />
                                                </button>
                                                <button
                                                    className="icon-btn delete"
                                                    onClick={() => handleDelete(sup.id, sup.nome)}
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
                            {filteredSuppliers.length === 0 && (
                                <tr>
                                    <td colSpan="6">
                                        <div className="empty-state">
                                            <Truck size={36} />
                                            <h3>Nenhum fornecedor encontrado</h3>
                                            <p>Cadastre o primeiro fornecedor clicando em "Novo Fornecedor".</p>
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
                title={editingSupplier ? 'Editar Fornecedor' : 'Novo Fornecedor'}
            >
                <form onSubmit={handleSubmit} className="standard-form">
                    <div className="form-group">
                        <label>Razão Social / Nome *</label>
                        <input
                            type="text"
                            required
                            placeholder="Ex: SolarTech Importadora Ltda"
                            value={formData.nome}
                            onChange={e => setFormData({ ...formData, nome: e.target.value })}
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>CNPJ</label>
                            <input
                                type="text"
                                placeholder="00.000.000/0000-00"
                                value={formData.cnpj}
                                onChange={e => setFormData({ ...formData, cnpj: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label>Nome do contato</label>
                            <input
                                type="text"
                                placeholder="Ex: João Silva"
                                value={formData.contato}
                                onChange={e => setFormData({ ...formData, contato: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>E-mail</label>
                            <input
                                type="email"
                                placeholder="vendas@fornecedor.com"
                                value={formData.email}
                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label>Telefone</label>
                            <input
                                type="text"
                                placeholder="(11) 99999-9999"
                                value={formData.telefone}
                                onChange={e => setFormData({ ...formData, telefone: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="form-actions">
                        <button type="button" className="btn-secondary" onClick={() => setIsModalOpen(false)}>
                            Cancelar
                        </button>
                        <button type="submit" className="btn-primary">
                            {editingSupplier ? 'Salvar alterações' : 'Cadastrar fornecedor'}
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default Suppliers;
