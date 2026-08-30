import { useContext } from 'react';
import { AuthContext } from '../context/authContext';

/**
 * Hook personalizado para consumir el contexto de autenticación.
 *
 * Permite usar:
 * - user
 * - loading
 * - isAuthenticated
 * - login
 * - logout
 * - refreshCurrentUser
 *
 * desde cualquier componente dentro de AuthProvider.
 */
export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }

  return context;
}
