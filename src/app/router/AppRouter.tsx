import { Navigate, Route, Routes } from 'react-router-dom';
import { LoginPage } from '../../features/auth/pages/LoginPage';
import { RegisterPage } from '../../features/auth/pages/RegisterPage';
import { HomePage } from '../../features/dashboard/pages/HomePage';

/**
 * Define las rutas principales de Parkio Frontend.
 *
 * En esta primera versión solo se registran rutas públicas/base.
 * Más adelante agregaremos rutas protegidas por autenticación y roles.
 */
export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/home" element={<HomePage />} />
    </Routes>
  );
}
