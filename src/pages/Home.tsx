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
        refreshTasks
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
        <div className="min-h-screen bg-slate-50 text-slate-900 p-4 sm:p-8 font-sans">
            <div className="max-w-6xl mx-auto space-y-8">

                {/* Encabezado */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Gestor de Proyectos</h1>
                        <p className="text-slate-500 mt-1">Panel de control interactivo con React y Tailwind CSS</p>
                    </div>
                    <button
                        onClick={() => { handleStartCreate() }}
                        className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-5 py-2.5 rounded-lg shadow-sm transition-all focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 cursor-pointer"
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
                        <div className="p-12 text-center text-slate-500">
                            <p className="text-lg font-medium">No se encontraron tareas</p>
                            <p className="text-sm mt-1">Prueba cambiando los términos de búsqueda o los filtros.</p>
                        </div>
                    ) : (
                        <div className="divide-y divide-slate-100">
                            {filteredTasks.map((task) => (
                                <div
                                    key={task.id}
                                    className="p-4 sm:p-5 hover:bg-slate-50/80 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                                >
                                    <div className="flex items-start gap-3">
                                        <button
                                            onClick={() => refreshTasks()}
                                            className="mt-0.5 text-slate-300 hover:text-indigo-600 transition-colors"
                                            title="Cambiar estado"
                                        >
                                            <CheckCircleIcon className={`w-6 h-6 ${task.status === 'Completada' ? 'text-emerald-500 fill-emerald-50' : ''}`} />
                                        </button>
                                        <div>
                                            <h3 className={`font-semibold text-slate-800 ${task.status === 'Completada' ? 'line-through text-slate-400' : ''}`}>
                                                {task.title}
                                            </h3>
                                            <div className="flex flex-wrap items-center gap-2 mt-1">
                                                <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-medium">
                                                    {task.category}
                                                </span>
                                                <span className={`text-xs px-2 py-0.5 rounded font-medium border ${getPriorityBadgeClass(task.priority)}`}>
                                                    {task.priority}
                                                </span>
                                                <span className="text-xs text-slate-400">
                                                    Fecha límite: {task.createdAt}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0">
                                        <button
                                            onClick={() => refreshTasks()}
                                            className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors cursor-pointer ${getStatusBadgeClass(task.status)}`}
                                        >
                                            {task.status}
                                        </button>
                                        <button
                                            onClick={() => handleDeleteTask(task.id)}
                                            className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                                            title="Eliminar tarea"
                                        >
                                            <TrashIcon className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={() => handleStartEdit(task)}
                                            className="p-1.5 text-slate-400 hover:text-green-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                                            title="Editar tarea"
                                        >
                                            <IconEdit className="w-5 h-5" />
                                        </button>
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
