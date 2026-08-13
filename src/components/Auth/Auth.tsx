import { useState } from "react";
import { supabase } from "../../supabase";

export const Auth = () => {

    const [isRegister, setIsRegister] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (isRegister) {
            const { error } = await supabase.auth.signUp({ email, password });

            if (error) setError(error.message);
            else alert('¡Registro Existoso! Ahora podes Iniciar Sesión.');

        } else {
            const { error } = await supabase.auth.signInWithPassword({ email, password });

            if (error) setError(error.message);
        };
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm w-full max-w-md">
                <h2 className="text-xl font-bold text-slate-800 text-center">
                    {isRegister ? 'Crear Cuenta' : 'Iniciar Sesión'}
                </h2>

                {error && (
                    <div className="mb-4 p-3 bg-rose-50 text-rose-700 text-sm rounded-lg border border-rose-200">
                        {error}
                    </div>
                )}

                <form onSubmit={handleAuth} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                            placeholder="tu@email.com"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Contraseña</label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                            placeholder="*********"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-indigo-700 hover:bg-indigo-800 text-white font-medium py-2 rounded-lg text-sm transition-colors"
                    >
                        {isRegister ? 'Registrarse' : 'Ingresar'}
                    </button>
                </form>

                <button
                    onClick={() => setIsRegister(!isRegister)}
                >
                    {isRegister ? '¿Ya tenés una cuenta? Iniciá Sesión' : '¿No tenes cuenta? Registrate.'}
                </button>
            </div>
        </div>
    );

}