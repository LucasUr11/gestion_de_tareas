import { useState, useEffect } from "react";
import { Modal } from "./Modal";
import { type DataInicial } from "../../types";
import { Toaster, toast } from "react-hot-toast";

interface TaskModalWrapperProps {
    isOpen: boolean;
    onClose: () => void;
    task: DataInicial | null;
    onSave: (task: Omit<DataInicial, 'id'> & { id?: number }) => void;
}

// Tipo para el estado interno del formulario.-
type FormState = Omit<DataInicial, 'id'>;

const INITIAL_FORM_STATE: FormState = {
    title: '',
    category: 'Desarrollo',
    priority: 'Media',
    status: 'Pendiente',
    createdAt: ''
};

export const TaskModalWrapper = ({ isOpen, onClose, task, onSave }: TaskModalWrapperProps) => {
    const [formData, setFormData] = useState<FormState>(INITIAL_FORM_STATE);
    const Toast = () => toast.success("Tarea agregada correctamente.");

    useEffect(() => {
        if (task) {
            setFormData({
                title: task.title,
                category: task.category,
                priority: task.priority,
                status: task.status,
                createdAt: task.createdAt,
            })
        } else {
            setFormData(INITIAL_FORM_STATE);
        }
    }, [task, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({
            ...(task?.id ? { id: task.id } : {}),
            ...formData,
        });
        onClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >
            <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                <div className="w-full max-w-md mx-auto relative overflow-hidden z-10 bg-white p-6 sm:p-8 rounded-2xl shadow-xl border border-slate-100 before:w-32 before:h-32 before:absolute before:bg-indigo-500/20 before:rounded-full before:-z-10 before:blur-2xl before:-top-10 before:-left-10 after:w-40 after:h-40 after:absolute after:bg-sky-400/20 after:rounded-full after:-z-10 after:blur-2xl after:-bottom-10 after:-right-10">

                    <div className="rounded-2xl text-center font-bold text-2xl text-indigo-600 max-w-md w-full p-6 border border-slate-100">
                        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                            {task ? 'Editar Tarea' : 'Crear Tarea'}
                        </h2>
                    </div>
                    
                    <Toaster
                        position="top-right"
                        reverseOrder={true}
                    />
                    
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col mt-4 gap-4"
                    >
                        <div>
                            <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1.5">Título de la Tarea</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                placeholder="Ej. Implementar módulo de facturación"
                                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1.5">Categoría</label>
                                <select
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all cursor-pointer"
                                >
                                    <option value="Desarrollo">Desarrollo</option>
                                    <option value="Diseño">Diseño</option>
                                    <option value="Backend">Backend</option>
                                    <option value="QA">QA</option>
                                    <option value="Documentación">Documentación</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1.5">Prioridad</label>
                                <select
                                    value={formData.priority}
                                    onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all cursor-pointer"
                                >
                                    <option value="Alta">Alta</option>
                                    <option value="Media">Media</option>
                                    <option value="Baja">Baja</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1.5">Fecha Límite</label>
                            <input
                                type="date"
                                value={formData.createdAt}
                                onChange={(e) => setFormData({ ...formData, createdAt: e.target.value })}
                                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all cursor-pointer"
                            />
                        </div>

                        <div className="flex justify-end gap-3 pt-4">
                            <button
                                type="button"
                                onClick={() => onClose()}
                                className="w-full mt-2 bg-sky-600 hover:bg-sky-700 active:bg-sky-800 text-white font-semibold py-3 px-4 rounded-xl shadow-md shadow-sky-500/10 transition-all focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 cursor-pointer text-sm"
                            >
                                Cancelar
                            </button>
                            <button
                            onClick={Toast}
                                type="submit"
                                className="w-full mt-2 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-semibold py-3 px-4 rounded-xl shadow-md shadow-indigo-500/10 transition-all focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 cursor-pointer text-sm"
                            >
                                Guardar Tarea
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Modal>
    )
}