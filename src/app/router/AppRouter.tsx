import { Navigate, Route, Routes } from 'react-router-dom';
import { LoginPage } from '../../features/auth/pages/LoginPage';
import { CajonesPage } from '../../features/cajones/pages/CajonesPage';
import { RegisterPage } from '../../features/auth/pages/RegisterPage';
import { HomePage } from '../../features/dashboard/pages/HomePage';
import { EstacionamientosPage } from '../../features/estacionamientos/pages/EstacionamientosPage';
import { PrivateLayout } from '../../features/layout/components/PrivateLayout';
import { PagosPage } from '../../features/pagos/pages/PagosPage';
import { ReservasPage } from '../../features/reservas/pages/ReservasPage';
import { TarifasPage } from '../../features/tarifas/pages/TarifasPage';
import { TicketsPage } from '../../features/tickets/pages/TicketsPage';
import { UsuariosPage } from '../../features/usuarios/pages/UsuariosPage';
import { ProtectedRoute } from './ProtectedRoute';
import { PublicOnlyRoute } from './PublicOnlyRoute';

/**
 * Define las rutas principales de Parkio Frontend.
 *
 * En esta versión:
 * - /login y /register son públicas solo para usuarios sin sesión.
 * - Las rutas privadas requieren sesión activa.
 * - Las rutas privadas se muestran dentro del layout principal.
 */
export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route
        path="/login"
        element={
          <PublicOnlyRoute>
            <LoginPage />
          </PublicOnlyRoute>
        }
      />

      <Route
        path="/register"
        element={
          <PublicOnlyRoute>
            <RegisterPage />
          </PublicOnlyRoute>
        }
      />

      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <PrivateLayout>
              <HomePage />
            </PrivateLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/usuarios"
        element={
          <ProtectedRoute>
            <PrivateLayout>
              <UsuariosPage />
            </PrivateLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/estacionamientos"
        element={
          <ProtectedRoute>
            <PrivateLayout>
              <EstacionamientosPage />
            </PrivateLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/cajones"
        element={
          <ProtectedRoute>
            <PrivateLayout>
              <CajonesPage />
            </PrivateLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/reservas"
        element={
          <ProtectedRoute>
            <PrivateLayout>
              <ReservasPage />
            </PrivateLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/tickets"
        element={
          <ProtectedRoute>
            <PrivateLayout>
              <TicketsPage />
            </PrivateLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/tarifas"
        element={
          <ProtectedRoute>
            <PrivateLayout>
              <TarifasPage />
            </PrivateLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/pagos"
        element={
          <ProtectedRoute>
            <PrivateLayout>
              <PagosPage />
            </PrivateLayout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
