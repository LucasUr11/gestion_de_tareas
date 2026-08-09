import { useState, useEffect } from "react";
import { Modal } from "./Modal";
import { type DataInicial } from "../../types";

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
                <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-100">

                    <div className="rounded-2xl text-center font-bold text-2xl text-indigo-600 max-w-md w-full p-6 border border-slate-100">
                        <h2>{task ? 'Editar Tarea' : 'Crear Tarea'}</h2>
                    </div>

                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col mt-4 gap-4"
                    >
                        <div>
                            <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Título de la Tarea</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                placeholder="Ej. Implementar módulo de facturación"
                                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Categoría</label>
                                <select
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm bg-white cursor-pointer"
                                >
                                    <option value="Desarrollo">Desarrollo</option>
                                    <option value="Diseño">Diseño</option>
                                    <option value="Backend">Backend</option>
                                    <option value="QA">QA</option>
                                    <option value="Documentación">Documentación</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Prioridad</label>
                                <select
                                    value={formData.priority}
                                    onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm bg-white cursor-pointer"
                                >
                                    <option value="Alta">Alta</option>
                                    <option value="Media">Media</option>
                                    <option value="Baja">Baja</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Fecha Límite</label>
                            <input
                                type="date"
                                value={formData.createdAt}
                                onChange={(e) => setFormData({ ...formData, createdAt: e.target.value })}
                                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm cursor-pointer"
                            />
                        </div>

                        <div className="flex justify-end gap-3 pt-4">
                            <button
                                type="button"
                                onClick={() => onClose()}
                                className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 text-sm font-semibold bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors shadow-sm cursor-pointer"
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