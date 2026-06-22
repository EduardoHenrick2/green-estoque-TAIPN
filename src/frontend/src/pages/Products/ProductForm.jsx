import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { productService } from '../../services/productService';
import { categoryService } from '../../services/categoryService';
import { supplierService } from '../../services/supplierService';
import { ArrowLeft, Save } from 'lucide-react';
import { toast } from 'react-toastify';
import PageHeader from '../../components/ui/PageHeader';
import FormSection from '../../components/ui/FormSection';
import Card from '../../components/ui/Card';
import '../Categories/Categories.css'; // Usando o padrão de form
const ProductForm = () => {
    const { id } = useParams(); // Se existir ID, é Edição. Senão é Criação.
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const isEditMode = Boolean(id);

    const [categories, setCategories] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [loading, setLoading] = useState(isEditMode);
    
    const [formData, setFormData] = useState({
        nome: searchParams.get('nome') || '',
        sku: '',
        categoria_id: '',
        marca: '',
        potencia_w: '',
        dimensoes: '',
        preco_compra: '',
        preco_venda: '',
        quantidade_atual: 0,
        quantidade_minima: 5,
        validade: '',
        imagem_url: '',
        // Campo extra para vincular fornecedores (embora a API seja para produto, precisamos criar o relacionamento)
        fornecedores: [] 
    });

    useEffect(() => {
        loadDependencies();
        if (isEditMode) {
            loadProduct();
        }
    }, [id]); // eslint-disable-line

    const loadDependencies = async () => {
        try {
            const [cats, sups] = await Promise.all([
                categoryService.getAll(),
                supplierService.getAll()
            ]);
            setCategories(cats);
            setSuppliers(sups);
        } catch (error) {
            console.error('Erro ao carregar dependências', error);
        }
    };

    const loadProduct = async () => {
        try {
            const data = await productService.getById(id);
            // Formatar dados para o Form
            setFormData({
                nome: data.nome,
                sku: data.sku,
                categoria_id: data.categoria_id || '',
                marca: data.marca || '',
                potencia_w: data.potencia_w || '',
                dimensoes: data.dimensoes || '',
                preco_compra: data.preco_compra,
                preco_venda: data.preco_venda,
                quantidade_atual: data.quantidade_atual,
                quantidade_minima: data.quantidade_minima,
                validade: data.validade ? data.validade.split('T')[0] : '', // formata para YYYY-MM-DD
                imagem_url: data.imagem_url || '',
                fornecedores: data.fornecedores ? data.fornecedores.map(f => f.id) : []
            });
        } catch (error) {
            toast.error('Erro ao carregar dados do produto.');
            navigate('/produtos');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSupplierToggle = (supplierId) => {
        setFormData(prev => {
            const isSelected = prev.fornecedores.includes(supplierId);
            const newSuppliers = isSelected 
                ? prev.fornecedores.filter(id => id !== supplierId)
                : [...prev.fornecedores, supplierId];
            return { ...prev, fornecedores: newSuppliers };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Monta o payload conforme a API espera
        const payload = {
            ...formData,
            potencia_w: formData.potencia_w ? Number(formData.potencia_w) : null,
            preco_compra: Number(formData.preco_compra),
            preco_venda: Number(formData.preco_venda),
            quantidade_atual: Number(formData.quantidade_atual),
            quantidade_minima: Number(formData.quantidade_minima)
        };

        try {
            if (isEditMode) {
                await productService.update(id, payload);
            } else {
                await productService.create(payload);
            }
            toast.success('Produto salvo com sucesso!');
            navigate('/produtos');
        } catch (error) {
            console.error('Erro:', error);
            toast.error('Erro ao salvar produto. Verifique se o SKU já existe.');
        }
    };

    if (loading) return <div className="page-container"><div className="loading-state">Carregando formulário...</div></div>;

    return (
        <div className="page-container" style={{ maxWidth: '900px', margin: '0 auto' }}>
            <PageHeader 
                title={isEditMode ? 'Editar Produto' : 'Novo Produto'} 
                showBack={true} 
                backPath="/produtos" 
            />

            <Card>
                <form className="standard-form" onSubmit={handleSubmit}>
                    
                    <FormSection title="Identificação">
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                            <div className="form-group">
                                <label>Nome do Produto *</label>
                                <input type="text" name="nome" required value={formData.nome} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label>SKU (Código Único) *</label>
                                <input type="text" name="sku" required value={formData.sku} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label>Categoria *</label>
                                <select name="categoria_id" required value={formData.categoria_id} onChange={handleChange}>
                                    <option value="">Selecione...</option>
                                    {categories.map(c => <option key={c.id} value={c.id}>{c.nome}</option>)}
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Marca</label>
                                <input type="text" name="marca" value={formData.marca} onChange={handleChange} />
                            </div>
                        </div>
                    </FormSection>

                    <FormSection title="Valores e Estoque">
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                            <div className="form-group">
                                <label>Preço de Compra (R$) *</label>
                                <input type="number" step="0.01" name="preco_compra" required value={formData.preco_compra} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label>Preço de Venda (R$) *</label>
                                <input type="number" step="0.01" name="preco_venda" required value={formData.preco_venda} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label>Quantidade Atual (Em estoque) *</label>
                                <input type="number" name="quantidade_atual" required value={formData.quantidade_atual} onChange={handleChange} disabled={isEditMode} />
                            </div>
                            <div className="form-group">
                                <label>Quantidade Mínima (Aviso de Estoque Baixo) *</label>
                                <input type="number" name="quantidade_minima" required value={formData.quantidade_minima} onChange={handleChange} />
                            </div>
                        </div>
                    </FormSection>

                    <FormSection title="Especificações Técnicas">
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                            <div className="form-group">
                                <label>Potência (Watts)</label>
                                <input type="number" name="potencia_w" value={formData.potencia_w} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label>Dimensões</label>
                                <input type="text" placeholder="Ex: 220x110x35mm" name="dimensoes" value={formData.dimensoes} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label>Data de Validade (Se aplicável)</label>
                                <input type="date" name="validade" value={formData.validade} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label>URL da Imagem</label>
                                <input type="url" placeholder="https://..." name="imagem_url" value={formData.imagem_url} onChange={handleChange} />
                            </div>
                        </div>
                    </FormSection>

                    <FormSection title="Fornecedores Vinculados">
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                            {suppliers.map(sup => (
                                <label key={sup.id} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-main)', fontSize: '14px', background: 'var(--bg-input-hover)', border: '1px solid var(--border-color)', padding: '10px 16px', borderRadius: '8px', cursor: 'pointer' }}>
                                    <input 
                                        type="checkbox" 
                                        style={{ width: 'auto' }}
                                        checked={formData.fornecedores.includes(sup.id)}
                                        onChange={() => handleSupplierToggle(sup.id)}
                                    />
                                    {sup.nome}
                                </label>
                            ))}
                        </div>
                    </FormSection>

                    <div className="form-actions" style={{ marginTop: '32px' }}>
                        <button type="button" className="btn-secondary" onClick={() => navigate('/produtos')}>Cancelar</button>
                        <button type="submit" className="btn-primary" style={{ padding: '12px 24px', fontSize: '15px' }}>
                            <Save size={18} />
                            {isEditMode ? 'Salvar Alterações' : 'Cadastrar Produto'}
                        </button>
                    </div>

                </form>
            </Card>
        </div>
    );
};

export default ProductForm;
