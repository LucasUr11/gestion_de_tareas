import { useState } from "react";
import { supabase } from "../../supabase";

export const Auth = () => {

    const [isRegister, setIsRegister] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (isRegister) {
            const { error } = await supabase.auth.signUp(
                {
                    email,
                    password,
                    options: {
                        data: {
                            full_name: name,
                        }
                    }
                }
            );

            if (error) setError(error.message);
            else alert('¡Registro Existoso! Ahora podes Iniciar Sesión.');

        } else {
            const { error } = await supabase.auth.signInWithPassword({ email, password });

            if (error) setError(error.message);
        };
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md mx-auto relative overflow-hidden z-10 bg-white p-6 sm:p-8 rounded-2xl shadow-xl border border-slate-100 before:w-32 before:h-32 before:absolute before:bg-indigo-500/20 before:rounded-full before:-z-10 before:blur-2xl before:-top-10 before:-left-10 after:w-40 after:h-40 after:absolute after:bg-sky-400/20 after:rounded-full after:-z-10 after:blur-2xl after:-bottom-10 after:-right-10">

                {/* Encabezado */}
                <div className="text-center mb-6">
                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                        {isRegister ? 'Crear Cuenta' : 'Iniciar Sesión'}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                        {isRegister ? 'Ingresá tus datos para registrarte' : '¡Hola de nuevo! Ingresá a tu cuenta'}
                    </p>
                </div>

                {/* Alerta de Error */}
                {error && (
                    <div className="mb-5 p-3.5 bg-rose-50 text-rose-700 text-xs sm:text-sm rounded-xl border border-rose-200/80 flex items-center gap-2">
                        <span>{error}</span>
                    </div>
                )}

                <form onSubmit={handleAuth} className="space-y-4">
                    {isRegister && (
                        <div>
                            <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1.5">
                                Nombre completo
                            </label>
                            <input
                                type="text"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all"
                                placeholder="Ej. Cosme Fulanito"
                            />
                        </div>
                    )}

                    <div>
                        <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1.5">
                            Correo electrónico
                        </label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all"
                            placeholder="tu@email.com"
                        />
                    </div>

                    <div>
                        <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1.5">
                            Contraseña
                        </label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full mt-2 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-semibold py-3 px-4 rounded-xl shadow-md shadow-indigo-500/10 transition-all focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 cursor-pointer text-sm"
                    >
                        {isRegister ? 'Registrarse' : 'Ingresar'}
                    </button>
                </form>

                {/* Conmutador de modo (Login / Registro) */}
                <div className="mt-6 pt-5 border-t border-slate-100 text-center">
                    <button
                        type="button"
                        onClick={() => setIsRegister(!isRegister)}
                        className="text-xs sm:text-sm text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
                    >
                        {isRegister ? (
                            <>¿Ya tenés una cuenta? <span className="font-semibold text-indigo-600 hover:underline">Iniciá Sesión</span></>
                        ) : (
                            <>¿No tenés cuenta? <span className="font-semibold text-indigo-600 hover:underline">Registrate</span></>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );

}