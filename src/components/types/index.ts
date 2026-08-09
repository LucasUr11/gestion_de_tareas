export type TaskStatus = 'Pendiente' | 'En Progreso' | 'Completada';
export type TaskPriority = 'Baja' | 'Media' | 'Alta';

export interface DataInicial {
    id: number,
    title: string,
    category: string,
    priority: string,
    status: string,
    createdAt: string
}