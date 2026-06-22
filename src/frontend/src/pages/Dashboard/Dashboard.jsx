import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    AlertTriangle,
    ArrowUpRight,
    CheckCircle2,
    CircleAlert,
    ClipboardList,
    MoreHorizontal,
    Package,
    Plus,
    Tags,
    TrendingUp,
    Truck,
    XCircle
} from 'lucide-react';
import {
    Area,
    AreaChart,
    Cell,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip as RechartsTooltip,
    XAxis,
    YAxis
} from 'recharts';
import { dashboardService } from '../../services/dashboardService';
import { productService } from '../../services/productService';
import './Dashboard.css';

const CATEGORY_COLORS = ['#009C7A', '#16B890', '#1677B8', '#68B9AB', '#F4AB2C', '#A1A9B8'];

function formatQuantity(value) {
    return new Intl.NumberFormat('pt-BR').format(Number(value || 0));
}

function formatChartDate(value) {
    return new Date(`${value}T00:00:00`).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit'
    });
}

function getAvailability(product) {
    if (Number(product.quantidade_atual) === 0) {
        return { label: 'Sem estoque', className: 'out' };
    }

    if (Number(product.quantidade_atual) <= Number(product.quantidade_minima)) {
        return { label: 'Baixo', className: 'low' };
    }

    return { label: 'Disponível', className: 'available' };
}

function getCategoryDistribution(products) {
    const grouped = products.reduce((accumulator, product) => {
        const category = product.categoria_nome || 'Outros';
        accumulator[category] = (accumulator[category] || 0) + 1;
        return accumulator;
    }, {});

    const total = products.length || 1;
    const ordered = Object.entries(grouped)
        .map(([name, quantity]) => ({ name, quantity }))
        .sort((first, second) => second.quantity - first.quantity);

    const highlighted = ordered.slice(0, 5);
    const remaining = ordered.slice(5).reduce((sum, item) => sum + item.quantity, 0);

    if (remaining > 0) {
        highlighted.push({ name: 'Outros', quantity: remaining });
    }

    return highlighted.map((item, index) => ({
        ...item,
        percentage: Math.round((item.quantity / total) * 100),
        color: CATEGORY_COLORS[index]
    }));
}

function StatCard({ label, value, icon: Icon, color, detail }) {
    return (
        <article className={`stat-card stat-${color}`}>
            <div className="stat-icon-wrap">
                <Icon size={19} />
            </div>
            <div className="stat-body">
                <span className="stat-label">{label}</span>
                <strong className="stat-value">{value ?? '—'}</strong>
                <span className="stat-detail">{detail}</span>
            </div>
        </article>
    );
}

function ProductAvatar({ product, compact = false }) {
    if (product.imagem_url) {
        return <img src={product.imagem_url} alt="" className="product-image" />;
    }

    return (
        <span className={`product-avatar ${compact ? 'compact' : ''}`} aria-hidden="true">
            <Package size={compact ? 15 : 18} />
        </span>
    );
}

function MovementTooltip({ active, payload, label }) {
    if (!active || !payload?.length) {
        return null;
    }

    return (
        <div className="chart-tooltip">
            <span>{label}</span>
            <strong>{formatQuantity(payload[0].value)} movimentações</strong>
        </div>
    );
}

function Dashboard() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [summary, setSummary] = useState(null);
    const [chartData, setChartData] = useState([]);
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadDashboard();
    }, []);

    async function loadDashboard() {
        setLoading(true);
        setError(null);

        try {
            const [dashboardSummary, movements, productList] = await Promise.all([
                dashboardService.getSummary(),
                dashboardService.getMovementsChart(),
                productService.getAll()
            ]);

            setSummary(dashboardSummary);
            setProducts(productList || []);
            setChartData((movements || []).map((movement) => ({
                day: formatChartDate(movement.dia),
                total: Number(movement.ENTRADA || 0) + Number(movement.SAIDA || 0) + Number(movement.RETORNO || 0) + Number(movement.AJUSTE || 0)
            })));
        } catch (requestError) {
            console.error('Erro ao carregar dashboard:', requestError);
            setError('Não foi possível carregar os dados. Verifique se o backend está rodando.');
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return (
            <div className="dash-loading">
                <div className="spinner" />
                <p>Organizando o seu painel...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="dash-error">
                <AlertTriangle size={40} />
                <h3>Erro de conexão</h3>
                <p>{error}</p>
                <button className="btn-primary" onClick={loadDashboard}>Tentar novamente</button>
            </div>
        );
    }

    const totals = summary?.totais || {};
    const stock = summary?.estoque || {};
    const categoryData = getCategoryDistribution(products);
    const lowStockProducts = products
        .filter((product) => Number(product.quantidade_atual) <= Number(product.quantidade_minima))
        .sort((first, second) => Number(first.quantidade_atual) - Number(second.quantidade_atual))
        .slice(0, 5);
    const recentProducts = [...products]
        .sort((first, second) => new Date(second.atualizado_em || second.criado_em || 0) - new Date(first.atualizado_em || first.criado_em || 0))
        .slice(0, 6);
    const replenishmentPriorities = lowStockProducts.slice(0, 3);

    return (
        <main className="page-container dashboard-page">
            <header className="dashboard-header">
                <div>
                    <span className="dashboard-eyebrow">Green Estoque</span>
                    <h2>Painel de controle</h2>
                    <p>Visão organizada do estoque e das reposições fotovoltaicas.</p>
                </div>
                <button className="btn-primary" onClick={() => navigate('/produtos/novo')}>
                    <Plus size={18} />
                    Novo produto
                </button>
            </header>

            <section className="stat-cards" aria-label="Resumo do estoque">
                <StatCard label="Produtos" value={totals.produtos} icon={Package} color="blue" detail="Itens ativos no catálogo" />
                <StatCard label="Fornecedores" value={totals.fornecedores} icon={Truck} color="purple" detail="Parceiros cadastrados" />
                <StatCard label="Categorias" value={totals.categorias} icon={Tags} color="teal" detail="Catálogo organizado" />
                <StatCard label="Estoque baixo" value={stock.estoque_baixo} icon={AlertTriangle} color="warning" detail={stock.itens_a_receber > 0 ? `${formatQuantity(stock.itens_a_receber)} itens em reposição` : 'Reposição recomendada'} />
                <StatCard label="Sem estoque" value={stock.sem_estoque} icon={XCircle} color="critical" detail={stock.sem_estoque > 0 ? 'Prioridade imediata' : 'Nenhum item indisponível'} />
            </section>

            <section className="dashboard-insights" aria-label="Análises do estoque">
                <article className="dashboard-panel movement-panel">
                    <div className="panel-heading">
                        <div>
                            <h3>Movimentações do estoque</h3>
                            <p>Volume de entradas, saídas e retornos.</p>
                        </div>
                        <span className="period-pill">Últimos 30 dias</span>
                    </div>

                    {chartData.length > 0 ? (
                        <div className="movement-chart">
                            <ResponsiveContainer width="100%" height={250}>
                                <AreaChart data={chartData} margin={{ top: 18, right: 8, left: -18, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="movement-area-gradient" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#00A986" stopOpacity={0.32} />
                                            <stop offset="100%" stopColor="#00A986" stopOpacity={0.02} />
                                        </linearGradient>
                                    </defs>
                                    <XAxis dataKey="day" stroke="var(--text-light)" fontSize={11} tickLine={false} axisLine={false} />
                                    <YAxis stroke="var(--text-light)" fontSize={11} tickLine={false} axisLine={false} allowDecimals={false} width={32} />
                                    <RechartsTooltip cursor={{ stroke: 'var(--border-color)', strokeDasharray: '4 4' }} content={<MovementTooltip />} />
                                    <Area type="monotone" dataKey="total" stroke="#009C7A" strokeWidth={3} fill="url(#movement-area-gradient)" activeDot={{ r: 5, fill: '#009C7A', stroke: 'var(--bg-card)', strokeWidth: 3 }} />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    ) : (
                        <div className="panel-empty">
                            <TrendingUp size={28} />
                            <span>Nenhuma movimentação registrada no período.</span>
                        </div>
                    )}
                </article>

                <article className="dashboard-panel category-panel">
                    <div className="panel-heading compact-heading">
                        <div>
                            <h3>Categorias de produtos</h3>
                            <p>Distribuição do catálogo.</p>
                        </div>
                        <MoreHorizontal size={20} aria-hidden="true" />
                    </div>

                    {categoryData.length > 0 ? (
                        <div className="category-content">
                            <div className="pie-chart-wrapper">
                                <ResponsiveContainer width="100%" height={210}>
                                    <PieChart>
                                        <Pie data={categoryData} dataKey="quantity" nameKey="name" innerRadius={56} outerRadius={85} paddingAngle={3} stroke="none">
                                            {categoryData.map((category) => <Cell key={category.name} fill={category.color} />)}
                                        </Pie>
                                    </PieChart>
                                </ResponsiveContainer>
                                <div className="pie-chart-center">
                                    <strong>{formatQuantity(totals.produtos || products.length)}</strong>
                                    <span>produtos</span>
                                </div>
                            </div>
                            <ul className="category-legend">
                                {categoryData.map((category) => (
                                    <li key={category.name}>
                                        <span className="legend-dot" style={{ backgroundColor: category.color }} />
                                        <span className="legend-label">{category.name}</span>
                                        <strong>{category.percentage}%</strong>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ) : (
                        <div className="panel-empty">
                            <Tags size={28} />
                            <span>Cadastre produtos para visualizar as categorias.</span>
                        </div>
                    )}
                </article>

                <article className="dashboard-panel low-stock-panel">
                    <div className="panel-heading compact-heading">
                        <div>
                            <h3>Estoque baixo</h3>
                            <p>Itens que precisam de atenção.</p>
                        </div>
                        <CircleAlert size={20} className="panel-alert-icon" aria-hidden="true" />
                    </div>

                    {lowStockProducts.length > 0 ? (
                        <ul className="low-stock-list">
                            {lowStockProducts.map((product) => {
                                const isOutOfStock = Number(product.quantidade_atual) === 0;

                                return (
                                    <li key={product.id}>
                                        <button type="button" onClick={() => navigate(`/produtos/editar/${product.id}`)}>
                                            <ProductAvatar product={product} compact />
                                            <span className="low-stock-info">
                                                <strong>{product.nome}</strong>
                                                <small>Estoque: {formatQuantity(product.quantidade_atual)} un.</small>
                                            </span>
                                            <span className={`low-stock-indicator ${isOutOfStock ? 'out' : 'low'}`} aria-label={isOutOfStock ? 'Sem estoque' : 'Estoque baixo'} />
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                    ) : (
                        <div className="panel-empty compact-empty">
                            <CheckCircle2 size={28} />
                            <span>Todos os níveis estão saudáveis.</span>
                        </div>
                    )}
                </article>
            </section>

            <section className="dashboard-lower-grid" aria-label="Detalhamento do estoque">
                <article className="dashboard-panel products-panel">
                    <div className="panel-heading compact-heading">
                        <div>
                            <h3>Produtos recentes</h3>
                            <p>Itens atualizados mais recentemente.</p>
                        </div>
                        <MoreHorizontal size={20} aria-hidden="true" />
                    </div>

                    <div className="products-table-wrapper">
                        <table className="dashboard-products-table">
                            <thead>
                                <tr>
                                    <th>Produto</th>
                                    <th>Categoria</th>
                                    <th>Estoque</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentProducts.map((product) => {
                                    const availability = getAvailability(product);

                                    return (
                                        <tr key={product.id} onClick={() => navigate(`/produtos/editar/${product.id}`)}>
                                            <td>
                                                <div className="product-cell">
                                                    <ProductAvatar product={product} />
                                                    <div>
                                                        <strong>{product.nome}</strong>
                                                        <span>{product.sku}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>{product.categoria_nome || 'Sem categoria'}</td>
                                            <td className="stock-value">{formatQuantity(product.quantidade_atual)}</td>
                                            <td><span className={`product-status ${availability.className}`}>{availability.label}</span></td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    <button type="button" className="panel-link" onClick={() => navigate('/produtos')}>
                        Ver todos os produtos <ArrowUpRight size={16} />
                    </button>
                </article>

                <article className="dashboard-panel replenishment-panel">
                    <div className="panel-heading compact-heading">
                        <div>
                            <h3>Prioridades de reposição</h3>
                            <p>Itens abaixo do nível seguro.</p>
                        </div>
                        <ClipboardList size={20} aria-hidden="true" />
                    </div>

                    {replenishmentPriorities.length > 0 ? (
                        <ul className="replenishment-list">
                            {replenishmentPriorities.map((product) => {
                                const missingQuantity = Math.max(Number(product.quantidade_minima) - Number(product.quantidade_atual), 0);

                                return (
                                    <li key={product.id}>
                                        <ProductAvatar product={product} compact />
                                        <div>
                                            <strong>{product.nome}</strong>
                                            <span>Reposição sugerida: {formatQuantity(missingQuantity)} un.</span>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    ) : (
                        <div className="panel-empty compact-empty">
                            <CheckCircle2 size={28} />
                            <span>Não há reposições prioritárias.</span>
                        </div>
                    )}
                </article>
            </section>
        </main>
    );
}

export default Dashboard;
