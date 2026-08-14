import { useState, useEffect } from "react";
import { supabase } from "../../supabase";
import { type DataInicial } from "../types";
export const useTasks = () => {

    // Estados de los datos de la app.-
    const [tasks, setTasks] = useState<DataInicial[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Obtener tareas.-
    const fetchTasks = async () => {
        try {
            setLoading(true);
            setError(null);

            const { data, error } = await supabase
                .from('tasks')
                .select('*')
                .order('id', { ascending: false });

            if (error) throw error;

            setTasks(data as DataInicial[]);
        } catch (err: any) {
            console.error('Error al cargar tareas: ', err.message);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Cargas las tareas al montar el componente.-
    useEffect(() => {
        fetchTasks();
    }, []);

    // Crear Tareas.-
    const handleCreateTask = async (newTaskData: Omit<DataInicial, 'id'>) => {
        try {
            setError(null);

            const { data, error } = await supabase
                .from('tasks')
                .insert([newTaskData])
                .select(); // Devuelve la fila insertada con su ID generado.-

            if (error) throw error;

            if (data) {
                // Agrega la tarea devuelta por la BD al estado local.-
                setTasks((prev) => [data[0] as DataInicial, ...prev]);
            }
        } catch (err: any) {
            console.error('Error al crear tarea: ', err.message);
            setError(err.message);
        }
    };

    // Edita Tarea.-
    const handleEditTask = async (updatedTask: DataInicial) => {
        try {
            setError(null);

            const { error } = await supabase
                .from('tasks')
                .update({
                    title: updatedTask.title,
                    category: updatedTask.category,
                    priority: updatedTask.priority,
                    status: updatedTask.status,
                    createdAt: updatedTask.createdAt,
                })
                .eq('id', updatedTask.id); // Condicion WHERE id = updatedTask.id.-

            if (error) throw error;

            setTasks((prev) =>
                prev.map((t) => (t.id === updatedTask.id ? updatedTask : t))
            );
        } catch (err: any) {
            console.error('Error al editar tarea: ', err.message);
            setError(err.message);
        }
    };

    // Eliminar Tarea.-
    const handleDeleteTask = async (id: number) => {
        try {
            setError(null);

            const { error } = await supabase
                .from('tasks')
                .delete()
                .eq('id', id);

            if (error) throw error;

            // Filtrar la tarea eliminada del estado local.-
            setTasks((prev) => prev.filter((t) => t.id !== id));
        } catch (err: any) {
            console.error('Error al eliminar la tarea: ', err.message);
            setError(err.message);
        }
    };

    const handleToggleStatus = (id: number) => {
        setTasks(prev => prev.map(task => {
            if (task.id === id) {
                const nextStatus = task.status === 'Pendiente' ? 'En Progreso' :
                    task.status === 'En Progreso' ? 'Completada' : 'Pendiente';
                return { ...task, status: nextStatus };
            }
            return task;
        }));
    };

    return {
        tasks,
        loading,
        error,
        handleCreateTask,
        handleEditTask,
        handleDeleteTask,
        handleToggleStatus,
        refreshTasks: fetchTasks,
    }
}