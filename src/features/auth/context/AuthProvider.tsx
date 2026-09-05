import type { ReactNode } from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { getAccessToken, removeAccessToken, saveAccessToken } from '../../../lib/auth/tokenStorage';
import { getCurrentUser, login as loginRequest } from '../api/authApi';
import type { AuthenticatedUser, AuthLoginRequest } from '../types/authTypes';
import { AuthContext, type AuthContextValue } from './authContext';

/**
 * Props que recibe AuthProvider.
 *
 * children representa toda la aplicación o el árbol de componentes
 * que tendrá acceso al contexto de autenticación.
 */
type AuthProviderProps = {
  children: ReactNode;
};

/**
 * Provider principal de autenticación.
 *
 * Envuelve la aplicación y centraliza:
 * - Carga inicial de sesión si existe token.
 * - Inicio de sesión.
 * - Cierre de sesión.
 * - Usuario autenticado disponible globalmente.
 */
export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthenticatedUser | null>(null);
  const [loading, setLoading] = useState(true);

  /**
   * Consulta /auth/me para obtener el usuario vigente.
   *
   * Si el token es inválido o el backend responde error, se limpia la sesión local
   * para evitar que el frontend siga creyendo que hay un usuario autenticado.
   */
  const refreshCurrentUser = useCallback(async () => {
    try {
      const currentUser = await getCurrentUser();

      setUser(currentUser);
    } catch {
      removeAccessToken();
      setUser(null);
    }
  }, []);

  /**
   * Inicia sesión contra el backend.
   *
   * Flujo:
   * 1. Envía email y password a /auth/login.
   * 2. Guarda el JWT recibido.
   * 3. Consulta /auth/me para cargar usuario, roles y estacionamientos vigentes.
   * 4. Si /auth/me falla, elimina el token para no dejar una sesión inválida.
   */
  const login = useCallback(async (request: AuthLoginRequest) => {
    const authResponse = await loginRequest(request);

    saveAccessToken(authResponse.accessToken);

    try {
      const currentUser = await getCurrentUser();

      setUser(currentUser);
    } catch (error) {
      removeAccessToken();
      setUser(null);

      throw error;
    }
  }, []);

  /**
   * Cierra la sesión local.
   *
   * Actualmente elimina el JWT del navegador y limpia el usuario en memoria.
   * No llama al backend porque todavía no existe endpoint de logout server-side.
   */
  const logout = useCallback(() => {
    removeAccessToken();
    setUser(null);
  }, []);

  /**
   * Carga la sesión inicial cuando arranca la aplicación.
   *
   * Si existe token guardado, intenta consultar /auth/me.
   * Si no existe token, termina la carga sin usuario autenticado.
   */
  useEffect(() => {
    async function loadInitialSession() {
      const token = getAccessToken();

      if (token) {
        await refreshCurrentUser();
      }

      setLoading(false);
    }

    void loadInitialSession();
  }, [refreshCurrentUser]);

  /**
   * Memoriza el valor del contexto para evitar renders innecesarios
   * en componentes consumidores cuando no cambian user/loading/login/logout.
   */
  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      loading,
      isAuthenticated: Boolean(user),
      login,
      logout,
      refreshCurrentUser,
    }),
    [user, loading, login, logout, refreshCurrentUser],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
