import { useState, useEffect } from "react";
import { supabase } from "./supabase";
import { Auth } from "./components/Auth/Auth";
import { Home } from "./pages/Home";
import { type User } from "@supabase/supabase-js";
import { Circle } from "./assets/Iconos_SVG";

export default function App() {

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const nombreDeUsuario = user?.user_metadata?.full_name || "Usuario";

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <button
          className="bg-linear-to-r from-blue-600 to-purple-600 text-white font-bold py-3 px-6 rounded-full shadow-lg flex items-center transition duration-300 transform hover:scale-105 active:scale-95"
        >
          <Circle className="w-5 h-5" />
          Cargando...
        </button>

      </div>
    );
  }

  if (!user) return <Auth />;

  return (
    <div>
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-8 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">

          {/* Identidad / Saludo */}
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            {/* Avatar con la inicial del usuario */}
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-indigo-100 text-indigo-700 font-bold text-xs sm:text-sm flex items-center justify-center shrink-0 border border-indigo-200">
              {nombreDeUsuario ? nombreDeUsuario.charAt(0).toUpperCase() : 'U'}
            </div>

            <div className="flex flex-col min-w-0">
              <span className="text-xs text-slate-400 font-medium hidden sm:block">
                Bienvenido de nuevo
              </span>
              <span className="text-sm font-semibold text-slate-800 truncate">
                {nombreDeUsuario || 'Usuario'}
              </span>
            </div>
          </div>

          {/* Botón de Cerrar Sesión */}
          <button
            onClick={() => supabase.auth.signOut()}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-rose-600 hover:text-rose-700 bg-rose-50/60 hover:bg-rose-100/80 active:bg-rose-100 px-3 py-2 sm:px-3.5 sm:py-2 rounded-xl transition-all border border-rose-200/60 cursor-pointer shrink-0"
            title="Cerrar sesión"
          >
            <svg
              className="w-4 h-4 shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span className="hidden xs:inline sm:inline">Cerrar Sesión</span>
          </button>

        </div>
      </header>

      <Home />
    </div>
  );
}