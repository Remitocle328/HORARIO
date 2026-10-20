import React, { useState } from 'react';
import { Subject } from '../types';
import { X, BookOpen, User, MapPin, Clock, Award, Calendar, Share2, Check, Calculator, FileText } from 'lucide-react';
import { METODOS_NUMERICOS_LESSON } from '../data/metodosNumericosData';

interface CourseModalProps {
  subject: Subject | null;
  onClose: () => void;
  onHighlight: (code: string) => void;
}

export const CourseModal: React.FC<CourseModalProps> = ({
  subject,
  onClose,
  onHighlight,
}) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'info' | 'material'>('info');
  const [selectedMethod, setSelectedMethod] = useState<'jacobi' | 'gaussSeidel'>('jacobi');

  if (!subject) return null;

  const isMetodosNumericos = subject.code === '273251';

  const handleCopy = () => {
    const text = `${subject.fullName} (${subject.code}-${subject.group})\nDocente: ${subject.professor}\nAula: ${subject.classroom} (${subject.building})\nHorario: ${subject.scheduleDescription}\nCréditos: ${subject.credits}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 backdrop-blur-xs p-3 animate-in fade-in duration-150">
      <div className={`bg-white rounded-lg shadow-2xl border border-gray-300 w-full ${isMetodosNumericos && activeTab === 'material' ? 'max-w-2xl' : 'max-w-md'} max-h-[90vh] flex flex-col overflow-hidden text-gray-800 font-sans transition-all`}>
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[#1e5898] to-[#2f6faf] px-4 py-2.5 flex items-center justify-between text-white shrink-0">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-sky-200" />
            <h3 className="font-bold text-sm tracking-wide">
              Detalle de la Asignatura
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white p-1 hover:bg-white/20 rounded transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Selector if Métodos Numéricos */}
        {isMetodosNumericos && (
          <div className="flex border-b border-gray-200 bg-gray-50 px-3 pt-2 gap-2 text-xs shrink-0">
            <button
              onClick={() => setActiveTab('info')}
              className={`pb-2 px-2.5 font-semibold flex items-center gap-1.5 border-b-2 transition-colors cursor-pointer ${
                activeTab === 'info'
                  ? 'border-[#1e5898] text-[#1e5898]'
                  : 'border-transparent text-gray-500 hover:text-gray-800'
              }`}
            >
              <FileText className="w-3.5 h-3.5" /> Ficha Técnica
            </button>
            <button
              onClick={() => setActiveTab('material')}
              className={`pb-2 px-2.5 font-semibold flex items-center gap-1.5 border-b-2 transition-colors cursor-pointer ${
                activeTab === 'material'
                  ? 'border-[#1e5898] text-[#1e5898]'
                  : 'border-transparent text-gray-500 hover:text-gray-800'
              }`}
            >
              <Calculator className="w-3.5 h-3.5 text-blue-600" />
              Material de Clase (Jacobi y Gauss-Seidel)
            </button>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-4 space-y-3 text-xs font-sans overflow-y-auto flex-1">
          {activeTab === 'info' ? (
            <>
              {/* Main Title & Code */}
              <div className="border-b border-gray-100 pb-2">
                <div className="inline-block px-2 py-0.5 bg-blue-50 border border-blue-200 text-blue-800 font-mono font-bold rounded text-[11px] mb-1">
                  {subject.code} - Grupo {subject.group}
                </div>
                <h2 className="text-base font-bold text-gray-900 leading-snug">
                  {subject.fullName}
                </h2>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-1 gap-2">
                <div className="flex items-start gap-2.5 p-2 rounded bg-gray-50 border border-gray-100">
                  <User className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                  <div>
                    <span className="text-[11px] text-gray-500 font-medium block">Docente Responsable</span>
                    <span className="font-semibold text-gray-800 text-[12px]">{subject.professor}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-2 rounded bg-gray-50 border border-gray-100">
                  <MapPin className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                  <div>
                    <span className="text-[11px] text-gray-500 font-medium block">Ubicación y Salón</span>
                    <span className="font-semibold text-gray-800 text-[12px]">{subject.classroom}</span>
                    <span className="text-gray-500 block text-[11px]">{subject.building}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-2 rounded bg-gray-50 border border-gray-100">
                  <Clock className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                  <div>
                    <span className="text-[11px] text-gray-500 font-medium block">Horario Programado</span>
                    <span className="font-semibold text-gray-800 text-[12px]">{subject.scheduleDescription}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center gap-2 p-2 rounded bg-gray-50 border border-gray-100">
                    <Award className="w-4 h-4 text-indigo-600 shrink-0" />
                    <div>
                      <span className="text-[11px] text-gray-500 font-medium block">Créditos</span>
                      <span className="font-bold text-gray-800 text-[12px]">
                        {subject.credits === 0 ? '0 créditos (Requisito institucional)' : `${subject.credits} créditos`}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 p-2 rounded bg-gray-50 border border-gray-100">
                    <Calendar className="w-4 h-4 text-purple-600 shrink-0" />
                    <div>
                      <span className="text-[11px] text-gray-500 font-medium block">Horas/Semana</span>
                      <span className="font-bold text-gray-800 text-[12px]">{subject.hoursPerWeek} horas</span>
                    </div>
                  </div>
                </div>

                {isMetodosNumericos && (
                  <div className="mt-2 p-2.5 bg-blue-50/80 border border-blue-200 rounded text-blue-950">
                    <div className="font-bold text-[11px] mb-1 flex items-center justify-between">
                      <span>Unidad en curso: Sistemas de Ecuaciones Lineales</span>
                      <button
                        onClick={() => setActiveTab('material')}
                        className="text-[10px] text-blue-700 underline font-semibold cursor-pointer"
                      >
                        Ver presentación →
                      </button>
                    </div>
                    <p className="text-[11px] text-blue-900/80">
                      Material disponible: <strong>Método de Jacobi y Gauss-Seidel</strong> (cálculo en paralelo vs. secuencial, ejercicios prácticos resueltos y propuestos).
                    </p>
                  </div>
                )}
              </div>
            </>
          ) : (
            /* Material de Clase Extracted from PDF */
            <div className="space-y-3">
              <div className="bg-slate-50 border border-slate-200 p-2.5 rounded">
                <span className="font-bold text-[#000088] text-sm block">
                  {METODOS_NUMERICOS_LESSON.title}
                </span>
                <p className="text-gray-600 text-[11px] mb-1.5">
                  {METODOS_NUMERICOS_LESSON.subtitle} • Docente: {METODOS_NUMERICOS_LESSON.professor}
                </p>
                <p className="text-gray-700 leading-relaxed text-[11px] border-t border-slate-200 pt-1.5">
                  {METODOS_NUMERICOS_LESSON.queSonMetodosIterativos}
                </p>
              </div>

              {/* Sub-selector: Jacobi vs Gauss-Seidel */}
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedMethod('jacobi')}
                  className={`flex-1 py-1.5 px-2 rounded border text-center font-bold text-xs transition-colors cursor-pointer ${
                    selectedMethod === 'jacobi'
                      ? 'bg-blue-600 text-white border-blue-700 shadow-xs'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  Método de Jacobi (Paralelo)
                </button>
                <button
                  onClick={() => setSelectedMethod('gaussSeidel')}
                  className={`flex-1 py-1.5 px-2 rounded border text-center font-bold text-xs transition-colors cursor-pointer ${
                    selectedMethod === 'gaussSeidel'
                      ? 'bg-blue-600 text-white border-blue-700 shadow-xs'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  Método de Gauss-Seidel (Secuencial)
                </button>
              </div>

              {/* Details of Selected Method */}
              {selectedMethod === 'jacobi' ? (
                <div className="p-3 bg-white border border-gray-200 rounded space-y-2">
                  <div className="font-bold text-gray-900 text-xs">
                    {METODOS_NUMERICOS_LESSON.jacobi.name}
                  </div>
                  <p className="text-gray-600 text-[11px]">
                    {METODOS_NUMERICOS_LESSON.jacobi.concept}
                  </p>
                  <ul className="list-disc pl-4 space-y-0.5 text-gray-600 text-[11px]">
                    {METODOS_NUMERICOS_LESSON.jacobi.characteristics.map((c, i) => (
                      <li key={i}>{c}</li>
                    ))}
                  </ul>

                  {/* Ejercicio 1 Resuelto */}
                  <div className="mt-3 p-2 bg-blue-50/70 border border-blue-200 rounded">
                    <div className="font-bold text-blue-950 mb-1">
                      {METODOS_NUMERICOS_LESSON.jacobi.exercise1.title}
                    </div>
                    <div className="font-mono text-[10.5px] text-gray-800 space-y-0.5 bg-white p-1.5 rounded border border-blue-100">
                      <div>Sistema: 4x - y = 7 &nbsp;|&nbsp; x + 3y = 5</div>
                      <div>Despejes: x = (7 + y)/4 &nbsp;|&nbsp; y = (5 - x)/3</div>
                      <div>Arranque: x(0) = 0, y(0) = 0 &nbsp;|&nbsp; Solución objetivo: (2, 1)</div>
                    </div>
                    <div className="mt-2 space-y-1">
                      {METODOS_NUMERICOS_LESSON.jacobi.exercise1.iterations.map((it) => (
                        <div key={it.iteration} className="flex justify-between items-center bg-white/80 px-2 py-1 rounded text-[11px]">
                          <span>Iteración {it.iteration}: {it.xCalc} &bull; {it.yCalc}</span>
                          <span className="font-bold text-blue-900 font-mono">{it.result}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-3 bg-white border border-gray-200 rounded space-y-2">
                  <div className="font-bold text-gray-900 text-xs">
                    {METODOS_NUMERICOS_LESSON.gaussSeidel.name}
                  </div>
                  <p className="text-gray-600 text-[11px]">
                    {METODOS_NUMERICOS_LESSON.gaussSeidel.concept}
                  </p>
                  <ul className="list-disc pl-4 space-y-0.5 text-gray-600 text-[11px]">
                    {METODOS_NUMERICOS_LESSON.gaussSeidel.characteristics.map((c, i) => (
                      <li key={i}>{c}</li>
                    ))}
                  </ul>

                  {/* Ejercicio 2 Resuelto */}
                  <div className="mt-3 p-2 bg-emerald-50/70 border border-emerald-200 rounded">
                    <div className="font-bold text-emerald-950 mb-1">
                      {METODOS_NUMERICOS_LESSON.gaussSeidel.exercise2.title}
                    </div>
                    <div className="font-mono text-[10.5px] text-gray-800 space-y-0.5 bg-white p-1.5 rounded border border-emerald-100">
                      <div>Sistema: 4x - y = 7 &nbsp;|&nbsp; x + 3y = 5</div>
                      <div>Actualización inmediata de variables ("datos frescos")</div>
                    </div>
                    <div className="mt-2 space-y-1">
                      {METODOS_NUMERICOS_LESSON.gaussSeidel.exercise2.iterations.map((it) => (
                        <div key={it.iteration} className="flex justify-between items-center bg-white/80 px-2 py-1 rounded text-[11px]">
                          <span>Iteración {it.iteration}: {it.xCalc} &bull; {it.yCalc}</span>
                          <span className="font-bold text-emerald-900 font-mono">{it.result}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Ejercicios Propuestos del PDF */}
              <div className="border border-slate-200 rounded p-2.5 bg-slate-50">
                <span className="font-bold text-gray-900 text-[11px] block mb-1.5">
                  Ejercicios Propuestos para Práctica:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {METODOS_NUMERICOS_LESSON.ejerciciosPropuestos.map((ej) => (
                    <div key={ej.id} className="bg-white p-2 rounded border border-gray-200 text-[10.5px]">
                      <div className="font-semibold text-blue-900 mb-0.5">{ej.title}</div>
                      <div className="font-mono text-gray-700">
                        {ej.equations.map((eq, i) => (
                          <div key={i}>{eq}</div>
                        ))}
                      </div>
                      <div className="mt-1 text-[10px] text-emerald-700 font-bold">
                        Solución: x={ej.targetSolution.x}, y={ej.targetSolution.y}
                        {ej.targetSolution.z !== undefined && `, z=${ej.targetSolution.z}`}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-gray-50 px-4 py-2.5 border-t border-gray-200 flex items-center justify-between shrink-0">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 text-xs text-gray-600 hover:text-gray-900 px-2.5 py-1 rounded border border-gray-300 bg-white hover:bg-gray-50 transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Share2 className="w-3.5 h-3.5" />}
            {copied ? 'Copiado' : 'Copiar info'}
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onHighlight(subject.code);
                onClose();
              }}
              className="text-xs font-medium text-blue-700 bg-blue-50 border border-blue-200 hover:bg-blue-100 px-3 py-1 rounded transition-colors cursor-pointer"
            >
              Resaltar en tabla
            </button>
            <button
              onClick={onClose}
              className="text-xs font-medium text-white bg-[#1e5898] hover:bg-[#16467a] px-3.5 py-1 rounded transition-colors cursor-pointer"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
