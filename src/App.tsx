/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { INITIAL_STUDENT_INFO, SUBJECTS, FullSubject } from './data/scheduleData';
import { StudentInfo } from './types';
import { StudentHeader } from './components/StudentHeader';
import { GroupsSidebar } from './components/GroupsSidebar';
import { ScheduleGrid } from './components/ScheduleGrid';
import { CourseModal } from './components/CourseModal';
import { AllGroupsModal } from './components/AllGroupsModal';
import { ExportModal } from './components/ExportModal';
import { PensumModal } from './components/PensumModal';
import { HistoriaAcademicaModal } from './components/HistoriaAcademicaModal';
import { PWAInstallButton } from './components/PWAInstallButton';
import { getCurrentClassInfo } from './utils/currentClassHelper';

export default function App() {
  const [student, setStudent] = useState<StudentInfo>(INITIAL_STUDENT_INFO);
  const [visibleCodes, setVisibleCodes] = useState<Set<string>>(
    new Set(SUBJECTS.map((s) => s.code))
  );
  const [selectedSubject, setSelectedSubject] = useState<FullSubject | null>(null);
  const [activeSubjectModal, setActiveSubjectModal] = useState<FullSubject | null>(null);
  const [hoveredCode, setHoveredCode] = useState<string | null>(null);

  // Modals state
  const [isVerModalOpen, setIsVerModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isPensumModalOpen, setIsPensumModalOpen] = useState(false);
  const [isHistoriaModalOpen, setIsHistoriaModalOpen] = useState(false);

  // Real-time clock (updates every 2 seconds)
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  // Compute live active class directly from real system time
  const currentClassState = useMemo(() => {
    return getCurrentClassInfo(currentTime);
  }, [currentTime]);

  const handleWeekChange = (newDate: string) => {
    const startDate = new Date('2026-08-12');
    const currentDate = new Date(newDate);
    const diffTime = Math.max(0, currentDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const calculatedWeek = Math.min(18, Math.max(1, Math.ceil(diffDays / 7)));

    setStudent((prev) => ({
      ...prev,
      semanaFecha: newDate,
      semanaAcademica: calculatedWeek,
    }));
  };

  const handleToggleCode = (code: string) => {
    setVisibleCodes((prev) => {
      const next = new Set(prev);
      if (next.has(code)) {
        next.delete(code);
      } else {
        next.add(code);
      }
      return next;
    });
  };

  const handleToggleAll = () => {
    if (visibleCodes.size === SUBJECTS.length) {
      setVisibleCodes(new Set());
    } else {
      setVisibleCodes(new Set(SUBJECTS.map((s) => s.code)));
    }
  };

  const handleSelectSubject = (subject: FullSubject) => {
    if (selectedSubject?.code === subject.code) {
      setSelectedSubject(null);
    } else {
      setSelectedSubject(subject);
      setVisibleCodes((prev) => new Set(prev).add(subject.code));
    }
  };

  const handleSlotClick = (subject: FullSubject) => {
    setActiveSubjectModal(subject);
  };

  const handleResetSchedule = () => {
    setVisibleCodes(new Set(SUBJECTS.map((s) => s.code)));
    setSelectedSubject(null);
  };

  return (
    <div className="min-h-screen bg-[#dce7f3] text-gray-900 font-sans p-1 sm:p-3 md:p-4 flex flex-col items-center select-none print:p-0 print:bg-white">
      {/* Top action bar: responsive wrap with PWA install button */}
      <div className="w-full max-w-[1240px] mb-2 px-1 flex flex-wrap items-center justify-between gap-1.5 sm:gap-2 text-xs text-slate-700 print:hidden">
        <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
          <span className="font-semibold text-blue-950 text-[11px] sm:text-xs bg-white px-2 sm:px-2.5 py-1 rounded-sm border border-blue-200">
            DATOS DEL HORARIO • Universidad de La Guajira
          </span>
          {visibleCodes.size < SUBJECTS.length && (
            <button
              onClick={handleResetSchedule}
              className="px-2 py-1 rounded bg-white hover:bg-slate-50 text-blue-900 border border-slate-300 font-medium cursor-pointer text-[11px] sm:text-xs"
            >
              Restablecer ({visibleCodes.size}/{SUBJECTS.length})
            </button>
          )}
          {selectedSubject && (
            <button
              onClick={() => setSelectedSubject(null)}
              className="px-2 py-1 rounded bg-white hover:bg-slate-50 text-blue-900 border border-slate-300 font-medium cursor-pointer text-[11px] sm:text-xs"
            >
              Quitar filtro
            </button>
          )}
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
          {/* PWA Phone Install Button (with single install icon) */}
          <PWAInstallButton />

          <button
            onClick={() => setIsVerModalOpen(true)}
            className="px-2 sm:px-2.5 py-1 rounded bg-white hover:bg-slate-50 text-blue-900 border border-slate-300 font-medium cursor-pointer text-[11px] sm:text-xs"
          >
            Asignaturas (8)
          </button>
          <button
            onClick={() => setIsExportModalOpen(true)}
            className="px-2 sm:px-2.5 py-1 rounded bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-medium cursor-pointer text-[11px] sm:text-xs"
          >
            Calendario (.ics)
          </button>
          <button
            onClick={() => window.print()}
            className="px-2 sm:px-2.5 py-1 rounded bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-medium cursor-pointer text-[11px] sm:text-xs"
          >
            Imprimir
          </button>
        </div>
      </div>

      {/* Main Container Replica */}
      <div
        id="panel"
        className="w-full max-w-[1240px] bg-white border border-[#9bb5cf] shadow-md flex flex-col print:border-none print:shadow-none"
      >
        {/* Top Header Card with Student Data */}
        <StudentHeader
          student={student}
          onWeekChange={handleWeekChange}
          onOpenPensum={() => setIsPensumModalOpen(true)}
          onOpenHistoria={() => setIsHistoriaModalOpen(true)}
        />

        {/* Live Class Real-Time Status Bar */}
        <div className="bg-white border-y border-slate-200 px-2 sm:px-3 py-1.5 sm:py-2 text-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 print:hidden">
          {/* Active Class or Current Schedule State */}
          <div className="flex items-center gap-2 flex-1 min-w-0">
            {currentClassState.activeSession ? (
              <div className="bg-[#16a34a] text-white px-2.5 sm:px-3 py-1.5 rounded text-[11px] sm:text-xs w-full sm:w-auto flex flex-wrap items-center gap-x-2 gap-y-0.5">
                <span className="font-bold uppercase tracking-wider">
                  EN CLASE AHORA:
                </span>
                <span className="font-semibold">
                  {currentClassState.activeSession.subject.code}-{currentClassState.activeSession.subject.group} {currentClassState.activeSession.subject.fullName}
                </span>
                <span>
                  | Aula: {currentClassState.activeSession.classroom} ({currentClassState.activeSession.startTime} - {currentClassState.activeSession.endTime})
                </span>
                {currentClassState.timeRemainingMinutes !== null && (
                  <span>
                    | Termina en {currentClassState.timeRemainingMinutes} min
                  </span>
                )}
                <button
                  onClick={() => setActiveSubjectModal(currentClassState.activeSession!.subject)}
                  className="underline text-white font-bold cursor-pointer ml-1"
                >
                  [Ver detalles]
                </button>
              </div>
            ) : (
              <div className="text-slate-700 bg-white border border-slate-300 px-2.5 sm:px-3 py-1.5 rounded text-[11px] sm:text-xs w-full sm:w-auto">
                <span className="font-medium mr-2">
                  Sin clase en este instante ({currentClassState.dayDisplay} {currentClassState.timeDisplay}).
                </span>
                {currentClassState.nextSession && (
                  <span className="text-[#16a34a] font-semibold">
                    Próxima clase: {currentClassState.nextSession.dayName} a las {currentClassState.nextSession.startTime} ({currentClassState.nextSession.subject.shortName} - {currentClassState.nextSession.classroom})
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Real-time clock indicator */}
          <div className="shrink-0 text-left sm:text-right">
            <span className="px-2.5 py-1 rounded text-[11px] sm:text-xs font-semibold border border-[#16a34a] text-[#16a34a] bg-white inline-block">
              En Vivo: {currentClassState.dayDisplay} {currentClassState.timeDisplay}
            </span>
          </div>
        </div>

        {/* Content Body: Sidebar + Schedule Table */}
        <div className="p-1.5 sm:p-2 md:p-3 bg-[#fdfefe] flex flex-col md:flex-row gap-2 md:gap-3 items-start relative">
          {/* Watermark decoration on left edge */}
          <div className="hidden lg:flex flex-col items-center justify-around absolute left-0 top-0 bottom-0 w-4 pointer-events-none opacity-20 select-none overflow-hidden">
            <span className="[writing-mode:vertical-rl] rotate-180 text-[9px] tracking-widest font-serif text-blue-900 uppercase">
              UNIVERSIDAD DE LA GUAJIRA
            </span>
          </div>

          {/* Left Column: GRUPOS with individual checkboxes and Ver */}
          <GroupsSidebar
            subjects={SUBJECTS}
            visibleCodes={visibleCodes}
            selectedCode={selectedSubject?.code || null}
            hoveredCode={hoveredCode}
            activeSubjectCode={currentClassState.activeSession?.subject.code || null}
            onToggleCode={handleToggleCode}
            onToggleAll={handleToggleAll}
            onSelectSubject={handleSelectSubject}
            onHoverSubject={setHoveredCode}
          />

          {/* Right Area: PROGRAMACION & Table */}
          <ScheduleGrid
            subjects={SUBJECTS}
            visibleCodes={visibleCodes}
            selectedCode={selectedSubject?.code || null}
            hoveredCode={hoveredCode}
            currentDayIndex={currentClassState.currentDayIndex}
            currentIntervalIndex={currentClassState.activeIntervalIndex}
            activeSession={currentClassState.activeSession}
            timeRemainingMinutes={currentClassState.timeRemainingMinutes}
            onSlotClick={handleSlotClick}
            onHoverSubject={setHoveredCode}
          />
        </div>

        {/* Dialog footer with Imprimir and Salir buttons as configured in jQuery UI */}
        <div className="px-2 sm:px-4 py-2 bg-[#ececec] border-t border-[#c6d7e8] flex flex-wrap items-center justify-between text-xs gap-2">
          <div className="text-gray-500 text-[10px] sm:text-[11px]">
            SMAUDG - Sistema de Matrícula Académica • Universidad de La Guajira • Sede Riohacha
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="px-2.5 sm:px-3 py-1 bg-white border border-[#a2a9b3] rounded text-gray-800 hover:bg-gray-100 font-medium cursor-pointer text-xs"
            >
              Imprimir
            </button>
            <button
              onClick={handleResetSchedule}
              className="px-2.5 sm:px-3 py-1 bg-white border border-[#a2a9b3] rounded text-gray-800 hover:bg-gray-100 font-medium cursor-pointer text-xs"
            >
              Salir
            </button>
          </div>
        </div>
      </div>

      {/* Course Detail Modal */}
      <CourseModal
        subject={activeSubjectModal}
        onClose={() => setActiveSubjectModal(null)}
        onHighlight={(code) => {
          const s = SUBJECTS.find((item) => item.code === code);
          if (s) {
            setSelectedSubject(s);
            setVisibleCodes((prev) => new Set(prev).add(s.code));
          }
        }}
      />

      {/* Pensum del Estudiante Modal */}
      <PensumModal
        isOpen={isPensumModalOpen}
        onClose={() => setIsPensumModalOpen(false)}
        studentCode={student.codigo}
      />

      {/* Historia Académica Modal */}
      <HistoriaAcademicaModal
        isOpen={isHistoriaModalOpen}
        onClose={() => setIsHistoriaModalOpen(false)}
        studentCode={student.codigo}
        studentName={`${student.nombres} ${student.apellidos}`}
      />

      {/* All Groups Enrolled Modal */}
      <AllGroupsModal
        isOpen={isVerModalOpen}
        onClose={() => setIsVerModalOpen(false)}
        subjects={SUBJECTS}
        onSelectSubject={(s) => {
          setSelectedSubject(s as FullSubject);
          setActiveSubjectModal(s as FullSubject);
        }}
      />

      {/* Export & Calendar Sync Modal */}
      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        subjects={SUBJECTS}
        student={student}
      />
    </div>
  );
}
