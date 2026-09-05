import type { ReactNode } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';

/**
 * Props que recibe PrivateLayout.
 *
 * children representa la pantalla privada que se va a mostrar
 * dentro del layout principal.
 */
type PrivateLayoutProps = {
  children: ReactNode;
};

/**
 * Layout principal para pantallas privadas.
 *
 * Este componente concentra la estructura visual común que usarán
 * las secciones autenticadas de Parkio:
 * - Sidebar lateral.
 * - Header superior.
 * - Área central de contenido.
 */
export function PrivateLayout({ children }: PrivateLayoutProps) {
  return (
    <div className="parkio-app-background flex min-h-screen">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <Header />

        <main className="flex-1 px-6 py-8">
          <div className="mx-auto w-full max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
