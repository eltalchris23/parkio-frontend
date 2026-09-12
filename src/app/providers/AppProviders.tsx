import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
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
 * Aquí se centralizan los providers que deben estar disponibles
 * en toda la aplicación:
 * - BrowserRouter para rutas.
 * - MantineProvider para componentes Mantine.
 * - ModalsProvider para modales globales.
 * - Notifications para mensajes emergentes.
 * - AuthProvider para sesión/autenticación.
 */
export function AppProviders({ children }: AppProvidersProps) {
  return (
    <BrowserRouter>
      <MantineProvider>
        <ModalsProvider>
          <Notifications position="top-right" />
          <AuthProvider>{children}</AuthProvider>
        </ModalsProvider>
      </MantineProvider>
    </BrowserRouter>
  );
}
