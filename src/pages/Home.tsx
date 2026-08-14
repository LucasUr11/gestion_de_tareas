import { useState, useMemo } from "react";
import { getPriorityBadgeClass, getStatusBadgeClass } from "../components/utils/taskHelper";
import { CheckCircleIcon, TrashIcon, PlusIcon, IconEdit } from '../assets/Iconos_SVG'
import { useTasks } from "../components/hooks/useTasks";
import { type DataInicial } from "../components/types";
import { TaskModalWrapper } from "../components/ui/modal/TaskModalWrapper";
import { CardMetric } from "../components/Cards/CardsMetric";
import { FilterAndSearch } from "../components/FilterAndSearch/FilterAndSearch";

export const Home = () => {

    // Extraer las funciones y datos del hook.-
    const {
        tasks,
        handleCreateTask,
        handleEditTask,
        handleDeleteTask,
        handleToggleStatus
    } = useTasks();

    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('Todas');
    const [priorityFilter, setPriorityFilter] = useState('Todas');

    const [editarTarea, setEditarTarea] = useState<DataInicial | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // <---------- CREAR TAREA ( <<< ABREN EL MODAL UNICAMENTE >>>)  ---------->
    const handleStartCreate = () => {
        setEditarTarea(null);
        setIsModalOpen(true);
    };

    // <---------- EDITAR TAREA ( <<< ABREN EL MODAL UNICAMENTE >>>) ---------->
    const handleStartEdit = (task: DataInicial) => {
        setEditarTarea(task);
        setIsModalOpen(true);
    };

    // Funcion unificada par 'onSave' del Modal.-
    const handleSaveTask = (taskData: Omit<DataInicial, 'id'> & { id?: number }) => {
        if (taskData.id !== undefined) {
            handleEditTask(taskData as DataInicial);
        } else {
            handleCreateTask({
                title: taskData.title,
                category: taskData.category,
                priority: taskData.priority,
                status: taskData.status,
                createdAt: taskData.createdAt,
            })
        }
    }

    // Filtrado reactivo de tareas
    const filteredTasks = useMemo(() => {
        return tasks.filter(task => {
            const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                task.category.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesStatus = statusFilter === 'Todas' || task.status === statusFilter;
            const matchesPriority = priorityFilter === 'Todas' || task.priority === priorityFilter;

            return matchesSearch && matchesStatus && matchesPriority;
        });
    }, [tasks, searchTerm, statusFilter, priorityFilter]);

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 p-3 sm:p-8 font-sans">
            <div className="max-w-6xl mx-auto space-y-4 sm:space-y-8">

                {/* Encabezado */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-4 sm:pb-6">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Gestor de Proyectos</h1>
                        <p className="text-xs sm:text-sm text-slate-500 mt-0.5 sm:mt-1">Panel de control interactivo con React y Tailwind CSS</p>
                    </div>
                    <button
                        onClick={() => { handleStartCreate() }}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-semibold px-5 py-3 sm:py-2.5 rounded-xl sm:rounded-lg shadow-sm transition-all focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 cursor-pointer text-sm"
                    >
                        <PlusIcon className="w-5 h-5" />
                        Nueva Tarea
                    </button>
                </div>

                {/* Tarjetas de Métricas */}
                <CardMetric tasks={tasks} />

                {/* Filtros y Búsqueda */}
                <FilterAndSearch
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                    statusFilter={statusFilter}
                    onStatusChange={setStatusFilter}
                    priorityFilter={priorityFilter}
                    onPriorityChange={setPriorityFilter}
                />

                {/* Lista de Tareas */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                    {filteredTasks.length === 0 ? (
                        <div className="p-8 sm:p-12 text-center text-slate-500">
                            <p className="text-base sm:text-lg font-medium">No se encontraron tareas</p>
                            <p className="text-xs sm:text-sm mt-1">Prueba cambiando los términos de búsqueda o los filtros.</p>
                        </div>
                    ) : (
                        <div className="divide-y divide-slate-100">
                            {filteredTasks.map((task) => (
                                <div
                                    key={task.id}
                                    className="p-4 sm:p-5 hover:bg-slate-50/80 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4"
                                >
                                    {/* Lado izquierdo: Checkbox + Información */}
                                    <div className="flex items-start gap-3 w-full sm:w-auto">
                                        <button
                                            onClick={() => handleToggleStatus(task.id)}
                                            className="mt-0.5 text-slate-300 hover:text-indigo-600 transition-colors p-1 sm:p-0 -ml-1 sm:ml-0"
                                            title="Cambiar estado"
                                        >
                                            <CheckCircleIcon className={`w-6 h-6 ${task.status === 'Completada' ? 'text-emerald-500 fill-emerald-50' : ''}`} />
                                        </button>

                                        <div className="flex-1 min-w-0">
                                            <h3 className={`font-semibold text-sm sm:text-base text-slate-800 wrap-break-word ${task.status === 'Completada' ? 'line-through text-slate-400' : ''}`}>
                                                {task.title}
                                            </h3>

                                            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mt-1.5">
                                                <span className="text-[11px] sm:text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-medium">
                                                    {task.category}
                                                </span>
                                                <span className={`text-[11px] sm:text-xs px-2 py-0.5 rounded font-medium border ${getPriorityBadgeClass(task.priority)}`}>
                                                    {task.priority}
                                                </span>
                                                <span className="text-[11px] sm:text-xs text-slate-400 block w-full sm:w-auto mt-0.5 sm:mt-0">
                                                    Fecha límite: {task.createdAt}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Lado derecho: Estado + Acciones */}
                                    <div className="flex items-center justify-between sm:justify-end gap-2 pt-2 sm:pt-0 border-t border-slate-100 sm:border-t-0 w-full sm:w-auto mt-1 sm:mt-0">
                                        <button
                                            onClick={() => handleToggleStatus(task.id)}
                                            className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors cursor-pointer ${getStatusBadgeClass(task.status)}`}
                                        >
                                            {task.status}
                                        </button>

                                        <div className="flex items-center gap-1">
                                            <button
                                                onClick={() => handleStartEdit(task)}
                                                className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 active:bg-emerald-100 rounded-lg transition-colors cursor-pointer"
                                                title="Editar tarea"
                                            >
                                                <IconEdit className="w-5 h-5" />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteTask(task.id)}
                                                className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 active:bg-rose-100 rounded-lg transition-colors cursor-pointer"
                                                title="Eliminar tarea"
                                            >
                                                <TrashIcon className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )).reverse()}
                        </div>
                    )}
                </div>

                {/* Modal.- */}
                <TaskModalWrapper
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    task={editarTarea}
                    onSave={handleSaveTask}
                />
            </div>
        </div>
    );
}
