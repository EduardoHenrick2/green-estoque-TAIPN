import React, { useState, useEffect } from 'react';
import { categoryService } from '../../services/categoryService';
import Modal from '../../components/Modal/Modal';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { toast } from 'react-toastify';
import './Categories.css';

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);
    const [formData, setFormData] = useState({ nome: '', descricao: '' });

    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = async () => {
        try {
            const data = await categoryService.getAll();
            setCategories(data);
        } catch (error) {
            console.error('Erro ao carregar categorias:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenModal = (category = null) => {
        if (category) {
            setEditingCategory(category);
            setFormData({ nome: category.nome, descricao: category.descricao || '' });
        } else {
            setEditingCategory(null);
            setFormData({ nome: '', descricao: '' });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingCategory) {
                await categoryService.update(editingCategory.id, formData);
            } else {
                await categoryService.create(formData);
            }
            setIsModalOpen(false);
            loadCategories();
        } catch (error) {
            toast.error('Erro ao salvar categoria. Verifique se não há duplicidade.');
            console.error(error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Tem certeza que deseja excluir esta categoria?')) {
            try {
                await categoryService.delete(id);
                toast.success('Categoria excluída com sucesso.');
                loadCategories();
            } catch (error) {
                toast.error('Não foi possível excluir. Esta categoria pode estar em uso por algum produto.');
            }
        }
    };

    return (
        <div className="page-container">
            <div className="page-header">
                <h2>Categorias</h2>
                <button className="btn-primary" onClick={() => handleOpenModal()}>
                    <Plus size={18} />
                    Nova Categoria
                </button>
            </div>

            <div className="table-container">
                {loading ? (
                    <div className="loading-state">Carregando...</div>
                ) : (
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nome</th>
                                <th>Descrição</th>
                                <th className="text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map(cat => (
                                <tr key={cat.id}>
                                    <td>{cat.id}</td>
                                    <td><strong>{cat.nome}</strong></td>
                                    <td>{cat.descricao || '-'}</td>
                                    <td className="text-right actions-cell">
                                        <button className="icon-btn edit" onClick={() => handleOpenModal(cat)} title="Editar">
                                            <Edit2 size={16} />
                                        </button>
                                        <button className="icon-btn delete" onClick={() => handleDelete(cat.id)} title="Excluir">
                                            <Trash2 size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {categories.length === 0 && (
                                <tr>
                                    <td colSpan="4" className="empty-state">Nenhuma categoria cadastrada ainda.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}
            </div>

            <Modal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)}
                title={editingCategory ? "Editar Categoria" : "Nova Categoria"}
            >
                <form onSubmit={handleSubmit} className="standard-form">
                    <div className="form-group">
                        <label>Nome da Categoria</label>
                        <input 
                            type="text" 
                            required 
                            placeholder="ex: Painel Solar Monocristalino"
                            value={formData.nome}
                            onChange={(e) => setFormData({...formData, nome: e.target.value})}
                        />
                    </div>
                    <div className="form-group">
                        <label>Descrição (Opcional)</label>
                        <textarea 
                            rows="3"
                            placeholder="Breve descrição dos produtos desta categoria..."
                            value={formData.descricao}
                            onChange={(e) => setFormData({...formData, descricao: e.target.value})}
                        />
                    </div>
                    <div className="form-actions">
                        <button type="button" className="btn-secondary" onClick={() => setIsModalOpen(false)}>Cancelar</button>
                        <button type="submit" className="btn-primary">Salvar Categoria</button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default Categories;
