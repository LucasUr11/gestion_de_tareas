import { useState, useEffect } from "react";
import { supabase } from "./supabase";
import { Auth } from "./components/Auth/Auth";
import { Home } from "./pages/Home";
import { type User } from "@supabase/supabase-js";

export default function App() {

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

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
    return <div className="min-h-screen bg-slate-50 flex items-center justify-center">Cargando...</div>;
  }

  if (!user) return <Auth />;

  return (
    <div>
      <header className="p-4 bg-white border-b border-slate-200 flex justify-between items-center">
        <span className="text-sm font-medium text-slate-600">{user.email}</span>
        <button
          onClick={() => supabase.auth.signOut()}
          className="text-sm text-rose-600 hover:underline"
        >
          Cerrar Sesión
        </button>
      </header>

      <Home />
    </div>
  );
}