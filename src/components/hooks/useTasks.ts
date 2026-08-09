import { useState, useEffect } from "react";
import { type DataInicial } from "../types";

export const useTasks = () => {

    // Estados de los datos de la app.-
    const [tasks, setTasks] = useState<DataInicial[]>(() => {
        const saved = localStorage.getItem('tareas');
        return saved ? JSON.parse(saved) : [];
    });

    // Se guardan los datos en el localStorage.-
    useEffect(() => {
        localStorage.setItem('tareas', JSON.stringify(tasks))
    }, [tasks]);

    // Funcion para CREAR una tarea.-
    const handleCreateTask = (newTaskData: Omit<DataInicial, 'id'>) => {
        const created: DataInicial = {
            ...newTaskData,
            id: Date.now(),
            status: 'Pendiente',
        };
        setTasks(prev => [...prev, created]);
    };

    // Funcion para EDITAR una tarea.-
    const handleEditTask = (updatedTask: DataInicial) => {
        setTasks(prev => prev.map(task =>
            task.id === updatedTask.id ? updatedTask : task
        ));
    };

    // Funcion para BORRAR una tarea.-
    const handleDeleteTask = (id: number) => {
        setTasks(prev => prev.filter(task => task.id !== id));
    };

    // Funcion para cambiar el estado de una tarea.-
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
        handleCreateTask,
        handleEditTask,
        handleDeleteTask,
        handleToggleStatus,
    }
}