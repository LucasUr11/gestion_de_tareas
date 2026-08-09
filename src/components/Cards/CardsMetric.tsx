import { useMemo } from "react";
import { CheckCircleIcon, ClockIcon, AlertCircleIcon } from '../../assets/Iconos_SVG'
import { type DataInicial } from "../types";

interface CardMetricProps {
  tasks: DataInicial[]; // Recibe las tareas por props
}

export const CardMetric = ({ tasks }: CardMetricProps) => {

    const metrics = useMemo(() => {
        const total = tasks.length;
        const completed = tasks.filter(t => t.status === 'Completada').length;
        const inProgress = tasks.filter(t => t.status === 'En Progreso').length;
        const pending = tasks.filter(t => t.status === 'Pendiente').length;
        const progressPercentage = total > 0 ? Math.round((completed / total) * 100) : 0;

        return { total, completed, inProgress, pending, progressPercentage };
    }, [tasks]);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-slate-500">Total Tareas</p>
                    <p className="text-3xl font-bold text-slate-900 mt-1">{metrics.total}</p>
                </div>
                <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600">
                    <ClockIcon className="w-6 h-6" />
                </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-slate-500">Completadas</p>
                    <p className="text-3xl font-bold text-emerald-600 mt-1">{metrics.completed}</p>
                </div>
                <div className="w-12 h-12 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-600">
                    <CheckCircleIcon className="w-6 h-6" />
                </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-slate-500">En Progreso</p>
                    <p className="text-3xl font-bold text-purple-600 mt-1">{metrics.inProgress}</p>
                </div>
                <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center text-purple-600">
                    <AlertCircleIcon className="w-6 h-6" />
                </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
                <div className="flex justify-between items-center">
                    <p className="text-sm font-medium text-slate-500">Progreso Global</p>
                    <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-1 rounded">
                        {metrics.progressPercentage}%
                    </span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2.5 mt-3">
                    <div
                        className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500"
                        style={{ width: `${metrics.progressPercentage}%` }}
                    ></div>
                </div>
            </div>
        </div>
    )
}