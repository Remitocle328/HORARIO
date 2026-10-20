import React, { useState } from 'react';
import { Subject } from '../types';
import { FullSubject } from '../data/scheduleData';
import { X, CheckCircle2, Building2, MapPin } from 'lucide-react';

interface AllGroupsModalProps {
  isOpen: boolean;
  onClose: () => void;
  subjects: (Subject | FullSubject)[];
  onSelectSubject: (subject: Subject) => void;
}

export const AllGroupsModal: React.FC<AllGroupsModalProps> = ({
  isOpen,
  onClose,
  subjects,
  onSelectSubject,
}) => {
  const [viewFormat, setViewFormat] = useState<'table' | 'report'>('table');

  if (!isOpen) return null;

  const totalCredits = subjects.reduce((acc, s) => acc + s.credits, 0);
  const totalHours = subjects.reduce((acc, s) => acc + s.hoursPerWeek, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 backdrop-blur-xs p-3 animate-in fade-in duration-150">
      <div className="bg-white rounded-lg shadow-2xl border border-gray-300 w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden text-gray-800 font-sans">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#1b4e86] via-[#2f6faf] to-[#1e5898] px-4 py-3 flex items-center justify-between text-white shrink-0">
          <div>
            <h3 className="font-bold text-sm tracking-wide flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-300" />
              DETALLE DE ASIGNATURAS Y GRUPOS MATRICULADOS
            </h3>
            <p className="text-[11px] text-sky-100">
              Periodo Académico 2026 - 2 • Universidad de La Guajira (Datos Oficiales)
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="inline-flex rounded border border-white/30 bg-black/15 p-0.5 text-[10px]">
              <button
                onClick={() => setViewFormat('table')}
                className={`px-2 py-0.5 rounded font-semibold transition-colors cursor-pointer ${
                  viewFormat === 'table' ? 'bg-white text-blue-900 shadow-2xs' : 'text-white/80 hover:text-white'
                }`}
              >
                Vista Tabla
              </button>
              <button
                onClick={() => setViewFormat('report')}
                className={`px-2 py-0.5 rounded font-semibold transition-colors cursor-pointer ${
                  viewFormat === 'report' ? 'bg-white text-blue-900 shadow-2xs' : 'text-white/80 hover:text-white'
                }`}
              >
                Formato Informe Oficial
              </button>
            </div>

            <button
              onClick={onClose}
              className="text-white/80 hover:text-white p-1 hover:bg-white/20 rounded transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto flex-1 text-xs">
          {viewFormat === 'table' ? (
            <div className="border border-gray-200 rounded-md overflow-hidden shadow-2xs">
              <table className="w-full text-[12px] text-left border-collapse">
                <thead>
                  <tr className="bg-[#e2e8f0] text-gray-800 font-bold border-b border-gray-300 text-[11.5px]">
                    <th className="py-2 px-3 border-r border-gray-300">Código</th>
                    <th className="py-2 px-2 text-center border-r border-gray-300">Grup.</th>
                    <th className="py-2 px-3 border-r border-gray-300">Nombre de la Asignatura</th>
                    <th className="py-2 px-2 text-center border-r border-gray-300">Créditos</th>
                    <th className="py-2 px-3 border-r border-gray-300">Docente Oficial</th>
                    <th className="py-2 px-3 border-r border-gray-300">Aula en Horario</th>
                    <th className="py-2 px-3">Ubicación / Sede</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 font-sans">
                  {subjects.map((sub, idx) => {
                    const fullSub = sub as FullSubject;
                    return (
                      <tr
                        key={sub.code}
                        onClick={() => {
                          onSelectSubject(sub);
                          onClose();
                        }}
                        className={`hover:bg-sky-50/70 cursor-pointer transition-colors ${
                          idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                        }`}
                      >
                        <td className="py-2 px-3 font-mono font-bold text-blue-900 border-r border-gray-200">
                          {sub.code}
                        </td>
                        <td className="py-2 px-2 text-center font-bold text-gray-700 border-r border-gray-200">
                          {sub.group}
                        </td>
                        <td className="py-2 px-3 font-semibold text-gray-900 border-r border-gray-200">
                          {sub.fullName}
                        </td>
                        <td className="py-2 px-2 text-center font-bold text-emerald-700 border-r border-gray-200 font-mono">
                          {sub.credits === 0 ? (
                            <span className="text-gray-500 font-mono text-[11px]" title="Requisito institucional de idiomas (0 créditos)">
                              0
                            </span>
                          ) : (
                            sub.credits
                          )}
                        </td>
                        <td className="py-2 px-3 text-gray-800 border-r border-gray-200 font-medium">
                          {sub.professor}
                        </td>
                        <td className="py-2 px-3 text-blue-900 font-medium border-r border-gray-200">
                          {sub.classroom}
                        </td>
                        <td className="py-2 px-3 text-gray-600 text-[11px]">
                          {fullSub.sedeEdificioAula || sub.building}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            /* Official Report Format replicating descarga_4b0ade67.pdf exactly */
            <div className="space-y-2.5 font-mono text-xs bg-slate-50 p-3 rounded border border-slate-300">
              <div className="border-b pb-2 mb-2 font-sans flex justify-between items-center text-gray-700">
                <span className="font-bold text-[#000088] text-xs">
                  DETALLE OFICIAL DE ASIGNATURAS, DOCENTES Y AULAS (Universidad de La Guajira)
                </span>
                <span className="text-[10px] text-gray-500">Versión: ix12 CL SMA LTD</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 font-sans">
                {subjects.map((sub) => {
                  const fullSub = sub as FullSubject;
                  return (
                    <div
                      key={sub.code}
                      onClick={() => {
                        onSelectSubject(sub);
                        onClose();
                      }}
                      className="p-2.5 bg-white rounded border border-gray-200 hover:border-blue-400 hover:bg-sky-50/40 cursor-pointer transition-all shadow-2xs"
                    >
                      <div className="font-bold text-gray-900 text-[11.5px] flex items-center justify-between border-b border-gray-100 pb-1 mb-1">
                        <span>
                          [{sub.code}] - [{sub.group}] {sub.fullName}
                        </span>
                        <span className="text-[10px] font-mono font-bold text-emerald-800 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                          {sub.credits} CR
                        </span>
                      </div>
                      <div className="text-[11px] text-gray-700 space-y-0.5">
                        <div>
                          <strong className="text-gray-500 font-medium">Docente:</strong> {sub.professor}
                        </div>
                        <div className="text-blue-900 font-medium flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-red-500 shrink-0" />
                          <span>Horario: {sub.classroom}</span>
                        </div>
                        <div className="text-gray-600 text-[10.5px] flex items-center gap-1">
                          <Building2 className="w-3 h-3 text-gray-400 shrink-0" />
                          <span>{fullSub.sedeEdificioAula || sub.building}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4 text-xs font-sans">
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
              <span className="text-gray-600 block text-[11px]">Total Asignaturas</span>
              <span className="text-lg font-bold text-blue-900">{subjects.length} materias</span>
            </div>
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-md">
              <span className="text-gray-600 block text-[11px]">Total Créditos Académicos</span>
              <span className="text-lg font-bold text-emerald-900">{totalCredits} créditos</span>
              <span className="text-[10px] text-gray-500 block">(Inglés IV: 0 CR de requisito)</span>
            </div>
            <div className="p-3 bg-purple-50 border border-purple-200 rounded-md">
              <span className="text-gray-600 block text-[11px]">Carga Horaria Semanal</span>
              <span className="text-lg font-bold text-purple-900">{totalHours} horas / semana</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-4 py-2.5 border-t border-gray-200 flex items-center justify-between shrink-0 font-sans">
          <span className="text-[11px] text-gray-500">
            Haga clic en cualquier fila para resaltar la materia en el horario
          </span>
          <button
            onClick={onClose}
            className="text-xs font-medium text-white bg-[#1e5898] hover:bg-[#16467a] px-4 py-1.5 rounded transition-colors cursor-pointer"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
};
