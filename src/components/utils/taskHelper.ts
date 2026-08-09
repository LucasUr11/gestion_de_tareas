
export const getPriorityBadgeClass = (priority: string) => {
    switch (priority) {
        case 'Alta': return 'bg-red-100 text-red-800 border-red-200';
        case 'Media': return 'bg-amber-100 text-amber-800 border-amber-200';
        case 'Baja': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
        default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
};

export const getStatusBadgeClass = (status: string) => {
    switch (status) {
        case 'Completada': return 'bg-blue-100 text-blue-800';
        case 'En Progreso': return 'bg-purple-100 text-purple-800';
        case 'Pendiente': return 'bg-gray-100 text-gray-700';
        default: return 'bg-gray-100 text-gray-800';
    }
};