import { createContext } from 'react';
import type { AuthenticatedUser, AuthLoginRequest } from '../types/authTypes';

/**
 * Define la forma del estado global de autenticación.
 *
 * Este contexto permitirá que cualquier componente conozca:
 * - Usuario autenticado.
 * - Si la sesión está cargando.
 * - Si existe sesión activa.
 * - Acciones de login, logout y recarga de usuario.
 */
export type AuthContextValue = {
  user: AuthenticatedUser | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (request: AuthLoginRequest) => Promise<void>;
  logout: () => void;
  refreshCurrentUser: () => Promise<void>;
};

/**
 * Contexto global de autenticación.
 *
 * Se inicializa como undefined para detectar cuando useAuth se use fuera
 * del AuthProvider.
 */
export const AuthContext = createContext<AuthContextValue | undefined>(undefined);
