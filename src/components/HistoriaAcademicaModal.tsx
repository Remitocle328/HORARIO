import React from 'react';
import { X, Award, FileText, CheckCircle2 } from 'lucide-react';

interface HistoriaAcademicaModalProps {
  isOpen: boolean;
  onClose: () => void;
  studentCode: string;
  studentName: string;
}

export const HistoriaAcademicaModal: React.FC<HistoriaAcademicaModalProps> = ({
  isOpen,
  onClose,
  studentCode,
  studentName,
}) => {
  if (!isOpen) return null;

  const records = [
    { period: '2024-1', sem: '01', credits: 16, gpa: 4.25, status: 'Aprobado Completo' },
    { period: '2024-2', sem: '02', credits: 17, gpa: 4.10, status: 'Aprobado Completo' },
    { period: '2025-1', sem: '03', credits: 16, gpa: 4.30, status: 'Aprobado Completo' },
    { period: '2025-2', sem: '04', credits: 15, gpa: 4.15, status: 'Aprobado Completo' },
    { period: '2026-2', sem: '05', credits: 23, gpa: 0.0, status: 'En Curso (Matriculado)' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
      <div className="bg-white rounded border border-[#003399] shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden text-gray-800">
        <div className="bg-gradient-to-r from-[#2b5b99] to-[#204a80] text-white px-4 py-2 flex items-center justify-between text-xs font-bold border-b border-[#1a3d6b]">
          <span className="flex items-center gap-1.5">
            <FileText className="w-4 h-4 text-sky-200" />
            Historia Académica del Estudiante - Código: {studentCode}
          </span>
          <button
            onClick={onClose}
            className="hover:bg-red-600 px-1.5 py-0.5 rounded text-white font-bold transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4 overflow-y-auto flex-1 text-xs space-y-4">
          <div className="bg-blue-50/70 border border-blue-200 p-3 rounded flex items-center justify-between">
            <div>
              <div className="font-bold text-[#000088] text-sm">{studentName}</div>
              <div className="text-gray-600 text-[11px]">
                Programa: INGENIERIA DE SISTEMAS - RIOHACHA • Pensum 2872
              </div>
            </div>
            <div className="text-right">
              <span className="text-gray-500 text-[10px] block">Promedio Acumulado</span>
              <span className="text-xl font-bold text-emerald-800">4.20 / 5.0</span>
            </div>
          </div>

          <div className="border border-slate-300 rounded overflow-hidden">
            <table className="w-full text-[11px] text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-300">
                  <th className="p-2 border-r border-slate-300">Periodo</th>
                  <th className="p-2 text-center border-r border-slate-300">Semestre</th>
                  <th className="p-2 text-center border-r border-slate-300">Créditos</th>
                  <th className="p-2 text-center border-r border-slate-300">Promedio</th>
                  <th className="p-2">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {records.map((r) => (
                  <tr key={r.period} className="hover:bg-sky-50/50">
                    <td className="p-2 font-mono font-bold text-blue-900 border-r border-slate-200">
                      {r.period}
                    </td>
                    <td className="p-2 text-center border-r border-slate-200">{r.sem}</td>
                    <td className="p-2 text-center font-bold text-gray-800 border-r border-slate-200">
                      {r.credits}
                    </td>
                    <td className="p-2 text-center font-bold text-emerald-700 border-r border-slate-200">
                      {r.gpa > 0 ? r.gpa.toFixed(2) : '-'}
                    </td>
                    <td className="p-2 font-medium">
                      {r.gpa > 0 ? (
                        <span className="text-emerald-700 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> {r.status}
                        </span>
                      ) : (
                        <span className="text-blue-700 font-semibold">{r.status}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-2.5 bg-gray-50 border border-gray-200 rounded">
              <span className="text-gray-500 block text-[11px]">Créditos Aprobados Totales</span>
              <span className="text-base font-bold text-gray-900">64 / 160 créditos (40%)</span>
            </div>
            <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded">
              <span className="text-gray-500 block text-[11px]">Estado Académico Oficial</span>
              <span className="text-base font-bold text-emerald-900">Estudiante Regular Activo</span>
            </div>
          </div>
        </div>

        <div className="bg-[#f2f4f7] px-4 py-2 border-t border-slate-300 flex justify-end gap-2 text-xs">
          <button
            onClick={onClose}
            className="px-4 py-1 bg-gradient-to-b from-[#ffffff] to-[#e4e7eb] border border-[#a2a9b3] rounded text-gray-800 hover:bg-[#e4e7eb] font-medium"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
