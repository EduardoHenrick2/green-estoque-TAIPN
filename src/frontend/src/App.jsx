import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import PrivateRoute from './routes/PrivateRoute';
import Layout from './components/Layout/Layout';

// Páginas
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import Categories from './pages/Categories/Categories';
import Suppliers from './pages/Suppliers/Suppliers';
import Products from './pages/Products/Products';
import ProductForm from './pages/Products/ProductForm';
import Movements from './pages/Movements/Movements';
import MovementForm from './pages/Movements/MovementForm';
import Users from './pages/Users/Users';
import Permissions from './pages/Permissions/Permissions';
import Settings from './pages/Settings/Settings';
import Profile from './pages/Profile/Profile';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />

            {/* Rotas Protegidas */}
            <Route element={<PrivateRoute />}>
              <Route element={<Layout />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/categorias" element={<Categories />} />
                <Route path="/fornecedores" element={<Suppliers />} />
                <Route path="/produtos" element={<Products />} />
                <Route path="/produtos/novo" element={<ProductForm />} />
                <Route path="/produtos/editar/:id" element={<ProductForm />} />
                <Route path="/movimentacoes" element={<Movements />} />
                <Route path="/movimentacoes/nova" element={<MovementForm />} />
                <Route path="/usuarios" element={<Users />} />
                <Route path="/permissoes" element={<Permissions />} />
                <Route path="/configuracoes" element={<Settings />} />
                <Route path="/perfil" element={<Profile />} />
              </Route>
            </Route>

            {/* Fallback */}
            <Route path="*" element={
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', fontFamily: 'inherit', color: '#94A3B8' }}>
                404 — Página não encontrada
              </div>
            } />
          </Routes>
          <ToastContainer theme="colored" position="bottom-right" autoClose={3000} />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
