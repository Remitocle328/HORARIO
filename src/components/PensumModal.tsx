import React, { useState } from 'react';
import { X, Printer, CheckCircle, Clock, CircleDot, Filter } from 'lucide-react';
import { PENSUM_INGENIERIA_SISTEMAS, CAMPOS_FORMACION, TOTAL_CREDITOS_CARRERA } from '../data/pensumData';

interface PensumModalProps {
  isOpen: boolean;
  onClose: () => void;
  studentCode: string;
}

export const PensumModal: React.FC<PensumModalProps> = ({
  isOpen,
  onClose,
  studentCode,
}) => {
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<'all' | 'enrolled' | 'approved' | 'pending'>('all');

  if (!isOpen) return null;

  // Count metrics
  let totalApprovedCred = 0;
  let totalEnrolledCred = 0;
  let totalPendingCred = 0;

  for (const sem of PENSUM_INGENIERIA_SISTEMAS) {
    for (const c of sem.courses) {
      if (c.status === 'approved') totalApprovedCred += c.credits;
      else if (c.status === 'enrolled') totalEnrolledCred += c.credits;
      else totalPendingCred += c.credits;
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 backdrop-blur-xs p-2 sm:p-4 animate-in fade-in duration-150">
      <div className="bg-white rounded border border-[#003399] shadow-2xl w-full max-w-6xl max-h-[92vh] flex flex-col overflow-hidden text-gray-800 font-sans">
        {/* Title bar (matches jquery-ui titlebar) */}
        <div className="bg-gradient-to-r from-[#2b5b99] via-[#3b6ea5] to-[#204a80] text-white px-4 py-2 flex items-center justify-between text-xs font-bold border-b border-[#1a3d6b] shrink-0">
          <span className="tracking-wide flex items-center gap-2">
            Plan de Estudios - Ingeniería de Sistemas • Universidad de La Guajira (Pensum Normal)
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="text-white hover:text-amber-200 flex items-center gap-1 font-normal text-[11px] px-2 py-0.5 rounded bg-white/10 cursor-pointer"
            >
              <Printer className="w-3 h-3" /> Imprimir
            </button>
            <button
              onClick={onClose}
              className="hover:bg-red-600 px-1.5 py-0.5 rounded text-white font-bold transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Header Controls & Status Legend */}
        <div className="p-3 bg-slate-50 border-b border-slate-200 text-xs shrink-0">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
            <div>
              <span className="font-bold text-[#000088] text-sm block">
                PENSUM ACADÉMICO - CÓDIGO: {studentCode}
              </span>
              <p className="text-gray-600 text-[11px]">
                Programa de Ingeniería de Sistemas (Reforma 2872) • Semestre 05
              </p>
            </div>

            {/* Quick Status Buttons / Filters */}
            <div className="flex flex-wrap items-center gap-2 text-[11px]">
              <button
                onClick={() => setStatusFilter(statusFilter === 'enrolled' ? 'all' : 'enrolled')}
                className={`px-2.5 py-1 rounded font-bold border flex items-center gap-1.5 transition-all cursor-pointer ${
                  statusFilter === 'enrolled'
                    ? 'bg-yellow-400 text-yellow-950 border-yellow-600 ring-2 ring-yellow-400 shadow-xs'
                    : 'bg-yellow-100 text-yellow-900 border-yellow-400 hover:bg-yellow-200'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-yellow-600 animate-pulse"></span>
                Cursando Actualmente ({totalEnrolledCred} CR)
              </button>

              <button
                onClick={() => setStatusFilter(statusFilter === 'approved' ? 'all' : 'approved')}
                className={`px-2.5 py-1 rounded font-semibold border flex items-center gap-1.5 transition-all cursor-pointer ${
                  statusFilter === 'approved'
                    ? 'bg-emerald-600 text-white border-emerald-700 ring-2 ring-emerald-500 shadow-xs'
                    : 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100'
                }`}
              >
                <CheckCircle className="w-3.5 h-3.5" />
                Aprobadas ({totalApprovedCred} CR)
              </button>

              <button
                onClick={() => setStatusFilter(statusFilter === 'pending' ? 'all' : 'pending')}
                className={`px-2.5 py-1 rounded font-semibold border flex items-center gap-1.5 transition-all cursor-pointer ${
                  statusFilter === 'pending'
                    ? 'bg-slate-700 text-white border-slate-800 ring-2 ring-slate-500 shadow-xs'
                    : 'bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200'
                }`}
              >
                <CircleDot className="w-3.5 h-3.5" />
                Pendientes ({totalPendingCred} CR)
              </button>

              {statusFilter !== 'all' && (
                <button
                  onClick={() => setStatusFilter('all')}
                  className="text-blue-700 underline font-semibold text-[11px] cursor-pointer ml-1"
                >
                  Ver todas
                </button>
              )}
            </div>
          </div>

          {/* Campos de Formación Filter Row */}
          <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-200">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-tight mr-1 flex items-center gap-1">
              <Filter className="w-3 h-3" /> Áreas:
            </span>
            {Object.entries(CAMPOS_FORMACION).map(([key, info]) => {
              const isActive = selectedArea === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedArea(isActive ? null : key)}
                  className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all cursor-pointer border ${
                    isActive ? 'ring-2 ring-blue-600 shadow-xs scale-102' : 'opacity-85 hover:opacity-100'
                  }`}
                  style={{
                    backgroundColor: info.bg,
                    borderColor: info.border,
                    color: info.text,
                  }}
                >
                  {info.name}
                </button>
              );
            })}
            {selectedArea && (
              <button
                onClick={() => setSelectedArea(null)}
                className="text-[10px] text-blue-700 underline font-medium cursor-pointer ml-1"
              >
                Limpiar área
              </button>
            )}
          </div>
        </div>

        {/* 10 Semesters Grid Layout (Normal Pensum, NO lines) */}
        <div className="p-3 overflow-y-auto flex-1 text-xs bg-slate-100/60">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5">
            {PENSUM_INGENIERIA_SISTEMAS.map((sem) => {
              const isCurrentSemester = sem.semesterNumber === 5;

              return (
                <div
                  key={sem.roman}
                  className={`border rounded overflow-hidden bg-white shadow-2xs flex flex-col ${
                    isCurrentSemester
                      ? 'border-yellow-500 ring-2 ring-yellow-400/80 shadow-sm'
                      : 'border-slate-300'
                  }`}
                >
                  {/* Semester Header */}
                  <div
                    className={`px-2.5 py-1.5 font-bold text-[11px] flex justify-between items-center border-b ${
                      isCurrentSemester
                        ? 'bg-gradient-to-r from-yellow-200 to-amber-200 text-yellow-950 border-yellow-400'
                        : 'bg-[#e9f2fb] text-[#002277] border-slate-300'
                    }`}
                  >
                    <span className="flex items-center gap-1">
                      Semestre {sem.roman}
                      {isCurrentSemester && (
                        <span className="bg-yellow-600 text-white text-[9px] px-1 rounded-full font-bold">
                          Actual
                        </span>
                      )}
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-white/80 border border-slate-300 font-bold">
                      {sem.subtotalCredits} CR
                    </span>
                  </div>

                  {/* Course Cards */}
                  <div className="p-1.5 space-y-1.5 flex-1 flex flex-col">
                    {sem.courses.map((course) => {
                      const areaStyle = CAMPOS_FORMACION[course.area];
                      const isEnrolled = course.status === 'enrolled';
                      const isApproved = course.status === 'approved';

                      // Status & Area Filtering
                      const matchesStatus =
                        statusFilter === 'all' || course.status === statusFilter;
                      const matchesArea = !selectedArea || course.area === selectedArea;

                      if (!matchesStatus || !matchesArea) {
                        return (
                          <div
                            key={course.name}
                            className="p-1 rounded border border-gray-200 bg-gray-50/50 opacity-20 text-[10px]"
                          >
                            <span className="text-gray-400 truncate block">{course.name}</span>
                          </div>
                        );
                      }

                      return (
                        <div
                          key={course.name}
                          className={`p-2 rounded border text-[11px] flex flex-col justify-between transition-all relative ${
                            isEnrolled
                              ? 'bg-[#fffbe6] border-yellow-500 ring-2 ring-yellow-400/70 shadow-xs'
                              : isApproved
                              ? 'bg-white border-slate-300 hover:border-slate-400'
                              : 'bg-slate-50/70 border-slate-200 text-slate-600'
                          }`}
                          style={{
                            borderLeftWidth: '4px',
                            borderLeftColor: isEnrolled ? '#eab308' : areaStyle.color,
                          }}
                        >
                          {/* Course Name & Current Badge */}
                          <div className="flex items-start justify-between gap-1 mb-1">
                            <span
                              className={`font-semibold leading-tight ${
                                isEnrolled
                                  ? 'text-yellow-950 font-bold'
                                  : isApproved
                                  ? 'text-gray-900'
                                  : 'text-gray-600'
                              }`}
                            >
                              {course.name}
                            </span>
                          </div>

                          {/* Code, Area and Status Footer */}
                          <div className="flex items-center justify-between pt-1 border-t border-gray-100 text-[10px]">
                            <span className="font-mono text-gray-500 font-medium">
                              {course.code || 'CR ' + course.credits}
                            </span>

                            {isEnrolled ? (
                              <span className="font-bold text-yellow-900 bg-yellow-300/80 border border-yellow-500 px-1.5 py-0.2 rounded text-[9.5px] flex items-center gap-1 shadow-2xs">
                                <span className="w-1.5 h-1.5 rounded-full bg-yellow-700 animate-ping"></span>
                                CURSANDO
                              </span>
                            ) : isApproved ? (
                              <span className="font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-1 py-0.2 rounded text-[9px] flex items-center gap-0.5">
                                ✓ {course.grade || 'Aprobada'}
                              </span>
                            ) : (
                              <span className="text-gray-400 text-[9px]">
                                {course.credits} cr
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Modal Footer with exact totals */}
        <div className="bg-[#ececec] px-4 py-2 border-t border-slate-300 flex flex-wrap items-center justify-between text-xs shrink-0">
          <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-[11px] text-gray-700 font-sans">
            <span className="font-bold text-[#000088]">
              TOTAL CARRERA: {TOTAL_CREDITOS_CARRERA} CRÉDITOS
            </span>
            <span className="text-emerald-800 font-medium">
              Aprobados: <strong>{totalApprovedCred} CR</strong> ({Math.round((totalApprovedCred / TOTAL_CREDITOS_CARRERA) * 100)}%)
            </span>
            <span className="text-yellow-900 font-bold bg-yellow-200/90 px-2 py-0.5 rounded border border-yellow-400">
              Cursando (2026-2): <strong>{totalEnrolledCred} CR</strong>
            </span>
            <span className="text-gray-600">
              Pendientes: <strong>{totalPendingCred} CR</strong>
            </span>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-1 bg-gradient-to-b from-[#ffffff] to-[#e4e7eb] border border-[#a2a9b3] rounded text-gray-800 hover:bg-[#e4e7eb] font-medium shadow-xs cursor-pointer"
          >
            Salir
          </button>
        </div>
      </div>
    </div>
  );
};
