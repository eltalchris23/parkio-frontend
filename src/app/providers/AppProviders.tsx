import type { ReactNode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../../features/auth/context/AuthProvider';

/**
 * Props que recibe AppProviders.
 *
 * children representa la aplicación completa que será envuelta
 * por los providers globales.
 */
type AppProvidersProps = {
  children: ReactNode;
};

/**
 * Agrupa los providers globales de Parkio Frontend.
 *
 * Actualmente solo registra AuthProvider, pero este archivo será el punto
 * central para agregar futuros providers como Router, React Query o temas.
 */
export function AppProviders({ children }: AppProvidersProps) {
  return (
    <BrowserRouter>
      <AuthProvider>{children}</AuthProvider>
    </BrowserRouter>
  );
}
