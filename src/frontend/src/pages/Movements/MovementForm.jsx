import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { movementService } from '../../services/movementService';
import { productService } from '../../services/productService';
import { supplierService } from '../../services/supplierService';
import { ArrowLeft, Save, Plus, Trash2, AlertTriangle } from 'lucide-react';
import { toast } from 'react-toastify';
import PageHeader from '../../components/ui/PageHeader';
import FormSection from '../../components/ui/FormSection';
import Card from '../../components/ui/Card';
import '../Categories/Categories.css';

const MovementForm = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    
    // Header da Movimentação
    const [tipo, setTipo] = useState('ENTRADA');
    const [status, setStatus] = useState('RECEBIDO');
    const [fornecedorId, setFornecedorId] = useState('');
    const [observacao, setObservacao] = useState('');
    const [notificarEntrega, setNotificarEntrega] = useState(false);

    // Lista de Itens (Produtos)
    const [itens, setItens] = useState([]);

    useEffect(() => {
        loadDependencies();
    }, []);

    const loadDependencies = async () => {
        try {
            const [prods, sups] = await Promise.all([
                productService.getAll(),
                supplierService.getAll()
            ]);
            setProducts(prods);
            setSuppliers(sups);
        } catch (error) {
            console.error('Erro ao carregar dados', error);
        }
    };

    const handleAddItem = () => {
        setItens([
            ...itens, 
            { 
                uid: Date.now(), // key única pro react
                produto_id: '', 
                quantidade: 1, 
                valor_unitario: 0,
                estoque_atual: 0 // Auxiliar para validação de saída
            }
        ]);
    };

    const handleRemoveItem = (uid) => {
        setItens(itens.filter(i => i.uid !== uid));
    };

    const handleItemChange = (uid, field, value) => {
        setItens(itens.map(item => {
            if (item.uid === uid) {
                const updatedItem = { ...item, [field]: value };
                
                // Se o campo alterado for o produto, atualizamos o valor unitário e o estoque atual auxiliar
                if (field === 'produto_id') {
                    const prod = products.find(p => p.id === Number(value));
                    if (prod) {
                        updatedItem.valor_unitario = tipo === 'ENTRADA' ? prod.preco_compra : prod.preco_venda;
                        updatedItem.estoque_atual = prod.quantidade_atual;
                    }
                }
                return updatedItem;
            }
            return item;
        }));
    };

    // Atualiza os preços sugeridos se o tipo da operação mudar (Compra vs Venda)
    useEffect(() => {
        setItens(itens.map(item => {
            if (item.produto_id) {
                const prod = products.find(p => p.id === Number(item.produto_id));
                if (prod) {
                    return {
                        ...item,
                        valor_unitario: tipo === 'ENTRADA' ? prod.preco_compra : prod.preco_venda
                    };
                }
            }
            return item;
        }));
        // eslint-disable-next-line
    }, [tipo]);

    const getValidationError = () => {
        if (itens.length === 0) return "Adicione ao menos um produto.";
        
        for (let item of itens) {
            if (!item.produto_id) return "Selecione um produto para todos os itens.";
            if (item.quantidade <= 0) return "A quantidade deve ser maior que zero.";
            
            // Atividade 14.4 - Validar Saída (Estoque Negativo)
            if (tipo === 'SAIDA' && item.quantidade > item.estoque_atual) {
                const prod = products.find(p => p.id === Number(item.produto_id));
                return `Estoque insuficiente para a saída de: ${prod?.nome}. (Estoque Atual: ${item.estoque_atual})`;
            }
        }
        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const error = getValidationError();
        if (error) {
            toast.error(error);
            return;
        }

        const payload = {
            tipo,
            status,
            fornecedor_id: fornecedorId ? Number(fornecedorId) : null,
            observacao,
            notificar_entrega: notificarEntrega,
            itens: itens.map(i => ({
                produto_id: Number(i.produto_id),
                quantidade: Number(i.quantidade),
                valor_unitario: Number(i.valor_unitario)
            }))
        };

        try {
            await movementService.create(payload);
            toast.success('Movimentação registrada com sucesso!');
            navigate('/movimentacoes');
        } catch (err) {
            console.error('Erro ao salvar:', err);
            toast.error(err.response?.data?.error || 'Erro ao registrar movimentação.');
        }
    };

    const valorTotalDaMovimentacao = itens.reduce((acc, item) => acc + (item.quantidade * item.valor_unitario), 0);
    const validationError = getValidationError();

    return (
        <div className="page-container" style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <PageHeader 
                title="Nova Movimentação" 
                showBack={true} 
                backPath="/movimentacoes" 
            />

            <form onSubmit={handleSubmit}>
                <Card style={{ marginBottom: '24px' }}>
                    <FormSection title="Detalhes da Operação">
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
                            <div className="form-group">
                                <label>Tipo Operação *</label>
                                <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
                                    <option value="ENTRADA">ENTRADA (Aumenta Estoque)</option>
                                    <option value="SAIDA">SAÍDA (Diminui Estoque)</option>
                                    <option value="RETORNO">RETORNO (Aumenta Estoque)</option>
                                    <option value="AJUSTE">AJUSTE</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Status *</label>
                                <select value={status} onChange={(e) => setStatus(e.target.value)}>
                                    <option value="PENDENTE">PENDENTE</option>
                                    <option value="EM_TRANSITO">EM TRÂNSITO</option>
                                    <option value="RECEBIDO">RECEBIDO (Efetiva no Estoque)</option>
                                    <option value="ENTREGUE">ENTREGUE (Efetiva no Estoque)</option>
                                    <option value="RETORNADO">RETORNADO (Efetiva no Estoque)</option>
                                    <option value="CANCELADO">CANCELADO</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Fornecedor (Opcional)</label>
                                <select value={fornecedorId} onChange={(e) => setFornecedorId(e.target.value)}>
                                    <option value="">Nenhum</option>
                                    {suppliers.map(s => <option key={s.id} value={s.id}>{s.nome}</option>)}
                                </select>
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px', marginTop: '20px' }}>
                            <div className="form-group">
                                <label>Observações</label>
                                <input type="text" placeholder="NF nº, Motivo do Ajuste, etc..." value={observacao} onChange={(e) => setObservacao(e.target.value)} />
                            </div>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-main)', fontSize: '14px', cursor: 'pointer' }}>
                                <input type="checkbox" style={{ width: 'auto' }} checked={notificarEntrega} onChange={(e) => setNotificarEntrega(e.target.checked)} />
                                Gerar notificação ao mudar para Entregue / Recebido
                            </label>
                        </div>
                    </FormSection>
                </Card>

                <Card>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '1px solid var(--border-soft)', paddingBottom: '8px' }}>
                        <h3 style={{ color: 'var(--text-main)', fontSize: '16px', margin: 0, fontWeight: '600' }}>
                            Itens da Movimentação
                        </h3>
                        <button type="button" className="btn-secondary" onClick={handleAddItem} style={{ padding: '6px 12px', fontSize: '13px' }}>
                            <Plus size={16} /> Adicionar Produto
                        </button>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {itens.map((item, index) => (
                            <div key={item.uid} style={{ display: 'flex', gap: '16px', alignItems: 'center', background: 'var(--bg-input-hover)', border: '1px solid var(--border-soft)', padding: '16px', borderRadius: '12px' }}>
                                <div className="form-group" style={{ flex: 2 }}>
                                    <label>Produto</label>
                                    <select value={item.produto_id} onChange={(e) => handleItemChange(item.uid, 'produto_id', e.target.value)} required>
                                        <option value="">Selecione...</option>
                                        {products.map(p => (
                                            <option key={p.id} value={p.id}>
                                                {p.sku} - {p.nome} (Estoque: {p.quantidade_atual})
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group" style={{ flex: 1 }}>
                                    <label>Quantidade</label>
                                    <input type="number" min="1" value={item.quantidade} onChange={(e) => handleItemChange(item.uid, 'quantidade', e.target.value)} required />
                                </div>
                                <div className="form-group" style={{ flex: 1 }}>
                                    <label>Valor Unit. (R$)</label>
                                    <input type="number" step="0.01" value={item.valor_unitario} onChange={(e) => handleItemChange(item.uid, 'valor_unitario', e.target.value)} required />
                                </div>
                                <div className="form-group" style={{ width: '100px', textAlign: 'right' }}>
                                    <label>Total</label>
                                    <div style={{ padding: '12px 0', color: 'var(--text-main)', fontWeight: '600' }}>
                                        {((item.quantidade || 0) * (item.valor_unitario || 0)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                    </div>
                                </div>
                                <div style={{ paddingTop: '24px' }}>
                                    <button type="button" className="icon-btn delete" onClick={() => handleRemoveItem(item.uid)}>
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        ))}
                        
                        {itens.length === 0 && (
                            <div className="empty-state" style={{ padding: '24px' }}>
                                Nenhum produto adicionado. Clique no botão acima para inserir.
                            </div>
                        )}
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '32px', paddingTop: '16px', borderTop: '1px solid var(--border-soft)' }}>
                        <div>
                            {validationError && (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--danger)', fontSize: '14px', background: 'rgba(220, 38, 38, 0.1)', padding: '12px 16px', borderRadius: '8px' }}>
                                    <AlertTriangle size={18} />
                                    {validationError}
                                </div>
                            )}
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '4px' }}>Valor Total Previsto</div>
                            <div style={{ fontSize: '24px', fontWeight: '700', color: 'var(--success)' }}>
                                {valorTotalDaMovimentacao.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                            </div>
                        </div>
                    </div>

                    <div className="form-actions" style={{ marginTop: '32px' }}>
                        <button type="button" className="btn-secondary" onClick={() => navigate('/movimentacoes')}>Cancelar</button>
                        <button type="submit" className="btn-primary" style={{ padding: '12px 24px', fontSize: '15px' }} disabled={!!validationError}>
                            <Save size={18} />
                            Salvar Movimentação
                        </button>
                    </div>

                </Card>
            </form>
        </div>
    );
};

export default MovementForm;
