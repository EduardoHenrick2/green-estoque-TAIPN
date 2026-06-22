import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { productService } from '../../services/productService';
import { categoryService } from '../../services/categoryService';
import { Plus, Edit2, Trash2, Search as SearchIcon, FilterX, Package } from 'lucide-react';
import { toast } from 'react-toastify';
import './Products.css';

const getStatusClass = (status) => {
    if (!status) return '';
    const s = status.toLowerCase().replace(/\s/g, '-');
    return s;
};

const Products = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { user } = useAuth();
    
    const isAdmin = user?.perfil === 'ADMINISTRADOR';
    const canEdit = isAdmin || user?.perfil === 'OPERACIONAL';

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    const [filters, setFilters] = useState({
        nome: searchParams.get('search') || '',
        sku: '',
        categoria_id: ''
    });

    useEffect(() => {
        loadCategories();
    }, []);

    // Recarrega produtos sempre que searchParams mudar (busca global do header)
    useEffect(() => {
        const searchTerm = searchParams.get('search') || '';
        const newFilters = { ...filters, nome: searchTerm };
        setFilters(newFilters);
        loadProducts(newFilters);
    }, [searchParams]); // eslint-disable-line

    const loadCategories = async () => {
        try {
            const data = await categoryService.getAll();
            setCategories(data);
        } catch (err) {
            console.error('Erro ao carregar categorias', err);
        }
    };

    const loadProducts = async (currentFilters = filters) => {
        setLoading(true);
        try {
            const params = {};
            if (currentFilters.nome) params.nome = currentFilters.nome;
            if (currentFilters.sku) params.sku = currentFilters.sku;
            if (currentFilters.categoria_id) params.categoria = currentFilters.categoria_id;

            const data = await productService.getAll(params);
            setProducts(data);
        } catch (err) {
            console.error('Erro ao carregar produtos:', err);
            toast.error('Erro ao carregar produtos.');
        } finally {
            setLoading(false);
        }
    };

    const handleFilterSubmit = (e) => {
        e.preventDefault();
        loadProducts(filters);
    };

    const handleClearFilters = () => {
        const cleared = { nome: '', sku: '', categoria_id: '' };
        setFilters(cleared);
        loadProducts(cleared);
        navigate('/produtos');
    };

    const handleDelete = async (id, nome) => {
        if (!window.confirm(`Inativar o produto "${nome}"?`)) return;
        try {
            await productService.delete(id);
            toast.success('Produto inativado com sucesso.');
            loadProducts();
        } catch {
            toast.error('Erro ao inativar produto.');
        }
    };

    return (
        <div className="page-container">
            <div className="page-header">
                <h2>Produtos</h2>
                {canEdit && (
                    <button className="btn-primary" onClick={() => navigate('/produtos/novo')}>
                        <Plus size={18} />
                        Novo Produto
                    </button>
                )}
            </div>

            {/* Filtros */}
            <div className="filters-card">
                <form className="filters-form" onSubmit={handleFilterSubmit}>
                    <div className="filter-group">
                        <label>Nome do produto</label>
                        <input
                            type="text"
                            placeholder="Ex: Painel 550W..."
                            value={filters.nome}
                            onChange={e => setFilters({ ...filters, nome: e.target.value })}
                        />
                    </div>
                    <div className="filter-group">
                        <label>SKU</label>
                        <input
                            type="text"
                            placeholder="Ex: PNL-550..."
                            value={filters.sku}
                            onChange={e => setFilters({ ...filters, sku: e.target.value })}
                        />
                    </div>
                    <div className="filter-group">
                        <label>Categoria</label>
                        <select
                            value={filters.categoria_id}
                            onChange={e => setFilters({ ...filters, categoria_id: e.target.value })}
                        >
                            <option value="">Todas as categorias</option>
                            {categories.map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.nome}</option>
                            ))}
                        </select>
                    </div>
                    <div className="filter-actions">
                        <button type="submit" className="btn-secondary" title="Buscar">
                            <SearchIcon size={17} />
                            Buscar
                        </button>
                        <button type="button" className="btn-secondary" onClick={handleClearFilters} title="Limpar filtros">
                            <FilterX size={17} />
                        </button>
                    </div>
                </form>
            </div>

            {/* Tabela */}
            <div className="table-container">
                {loading ? (
                    <div className="loading-state">
                        <div className="spinner" /> Carregando produtos...
                    </div>
                ) : (
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Produto / SKU</th>
                                <th>Categoria</th>
                                <th>Marca</th>
                                <th>Estoque</th>
                                <th>Status</th>
                                <th className="text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(prod => (
                                <tr key={prod.id}>
                                    <td>
                                        <div className="product-cell">
                                            <div className="prod-img">
                                                {prod.imagem_url
                                                    ? <img src={prod.imagem_url} alt={prod.nome} />
                                                    : <Package size={18} color="var(--text-muted)" />
                                                }
                                            </div>
                                            <div className="prod-info">
                                                <strong>{prod.nome}</strong>
                                                <span className="prod-sku">SKU: {prod.sku || '—'}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{prod.categoria_nome || '—'}</td>
                                    <td>{prod.marca || '—'}</td>
                                    <td>
                                        <div className="stock-info">
                                            <strong style={{ fontSize: '0.95rem' }}>{prod.quantidade_atual}</strong>
                                            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                                                mín: {prod.quantidade_minima}
                                            </span>
                                        </div>
                                    </td>
                                    <td>
                                        <span className={`stock-badge ${getStatusClass(prod.status_disponibilidade)}`}>
                                            {prod.status_disponibilidade || 'N/A'}
                                        </span>
                                    </td>
                                    <td className="text-right actions-cell">
                                        {canEdit && (
                                            <button
                                                className="icon-btn edit"
                                                onClick={() => navigate(`/produtos/editar/${prod.id}`)}
                                                title="Editar"
                                            >
                                                <Edit2 size={16} />
                                            </button>
                                        )}
                                        {isAdmin && (
                                            <button
                                                className="icon-btn delete"
                                                onClick={() => handleDelete(prod.id, prod.nome)}
                                                title="Inativar"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        )}
                                        {!canEdit && !isAdmin && (
                                            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Sem acesso</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                            {products.length === 0 && (
                                <tr>
                                    <td colSpan="6">
                                        <div className="empty-state">
                                            <Package size={36} />
                                            {filters.nome ? (
                                                <>
                                                    <h3>Nenhum produto encontrado para "{filters.nome}"</h3>
                                                    {canEdit && (
                                                        <button 
                                                            className="btn-primary" 
                                                            style={{ marginTop: '16px' }}
                                                            onClick={() => navigate(`/produtos/novo?nome=${encodeURIComponent(filters.nome)}`)}
                                                        >
                                                            <Plus size={16} /> Cadastrar "{filters.nome}"
                                                        </button>
                                                    )}
                                                </>
                                            ) : (
                                                <>
                                                    <h3>Nenhum produto encontrado</h3>
                                                    <p>Tente ajustar os filtros ou cadastre um novo produto.</p>
                                                </>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default Products;
