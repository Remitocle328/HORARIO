import React from 'react';
import { Subject, StudentInfo } from '../types';
import { X, Calendar, Download, Printer, Copy, Check } from 'lucide-react';
import { SCHEDULE_SLOTS, TIME_INTERVALS, DAYS } from '../data/scheduleData';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  subjects: Subject[];
  student: StudentInfo;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  subjects,
  student,
}) => {
  const [copied, setCopied] = React.useState(false);

  if (!isOpen) return null;

  // Generate .ics calendar file
  const handleDownloadICS = () => {
    // 2026-08-12 to 2026-12-18
    const icsLines: string[] = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Universidad de La Guajira//Horario Academico//ES',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'X-WR-CALNAME:Horario 2026-2 (' + student.nombres + ')',
      'X-WR-TIMEZONE:America/Bogota',
    ];

    // Day mapping for RRULE: 0 -> MO, 1 -> TU, 2 -> WE, 3 -> TH, 4 -> FR, 5 -> SA
    const rruleDays = ['MO', 'TU', 'WE', 'TH', 'FR', 'SA'];

    // Map through unique subject sessions
    for (const slot of SCHEDULE_SLOTS) {
      const subject = subjects.find((s) => s.code === slot.subjectCode);
      const interval = TIME_INTERVALS.find((i) => i.id === slot.intervalIndex);
      if (!subject || !interval) continue;

      const dayCode = rruleDays[slot.dayIndex];
      const startClean = interval.start.replace(':', '') + '00';
      const endClean = interval.end.replace(':', '') + '00';

      // Pick base date in mid-semester week: 2026-08-17 (Monday) + dayIndex
      const baseDay = 17 + slot.dayIndex;
      const dtStart = `202608${baseDay}T${startClean}`;
      const dtEnd = `202608${baseDay}T${endClean}`;
      const uid = `horario-${slot.subjectCode}-${slot.dayIndex}-${slot.intervalIndex}@uniguajira.edu.co`;

      icsLines.push(
        'BEGIN:VEVENT',
        `UID:${uid}`,
        `SUMMARY:${subject.fullName} (${subject.code}-${subject.group})`,
        `DESCRIPTION:Docente: ${subject.professor} | Creditos: ${subject.credits}`,
        `LOCATION:${subject.classroom} - ${subject.building}`,
        `DTSTART;TZID=America/Bogota:${dtStart}`,
        `DTEND;TZID=America/Bogota:${dtEnd}`,
        `RRULE:FREQ=WEEKLY;UNTIL=20261218T235959Z;BYDAY=${dayCode}`,
        'STATUS:CONFIRMED',
        'END:VEVENT'
      );
    }

    icsLines.push('END:VCALENDAR');
    const icsContent = icsLines.join('\r\n');
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Horario_2026_2_${student.codigo}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleCopyTextSchedule = () => {
    let text = `=================================================\n`;
    text += `UNIVERSIDAD DE LA GUAJIRA - CONSULTAR HORARIO\n`;
    text += `Periodo: ${student.periodoActual} | Estudiante: ${student.nombres} ${student.apellidos}\n`;
    text += `Código: ${student.codigo} | Programa: ${student.programa}\n`;
    text += `=================================================\n\n`;

    for (const sub of subjects) {
      text += `[${sub.code}-${sub.group}] ${sub.fullName}\n`;
      text += `  Docente: ${sub.professor}\n`;
      text += `  Aula: ${sub.classroom} (${sub.building})\n`;
      text += `  Horario: ${sub.scheduleDescription}\n`;
      text += `  Créditos: ${sub.credits}\n\n`;
    }

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <div className="bg-white rounded-lg shadow-2xl border border-gray-300 w-full max-w-lg overflow-hidden text-gray-800">
        <div className="bg-gradient-to-r from-[#1b4e86] to-[#2f6faf] px-4 py-3 flex items-center justify-between text-white">
          <h3 className="font-bold text-sm tracking-wide flex items-center gap-2">
            <Calendar className="w-4 h-4 text-sky-200" />
            Opciones de Exportación e Impresión
          </h3>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white p-1 hover:bg-white/20 rounded transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 space-y-3 text-xs">
          <p className="text-gray-600">
            Exporta tu horario oficial de <strong>Universidad de La Guajira</strong> para tener todas tus clases sincronizadas en tu teléfono o computadora:
          </p>

          <div className="grid grid-cols-1 gap-2.5 pt-1">
            {/* Download .ICS */}
            <button
              onClick={handleDownloadICS}
              className="flex items-center justify-between p-3 rounded-lg border border-blue-200 bg-blue-50/60 hover:bg-blue-100/70 transition-colors text-left group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-blue-600 text-white flex items-center justify-center shadow-xs">
                  <Download className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-gray-900 group-hover:text-blue-900">
                    Descargar Calendario (.ICS)
                  </div>
                  <div className="text-[11px] text-gray-500">
                    Compatible con Google Calendar, Apple Calendar y Outlook
                  </div>
                </div>
              </div>
            </button>

            {/* Print Official Format */}
            <button
              onClick={() => {
                onClose();
                window.print();
              }}
              className="flex items-center justify-between p-3 rounded-lg border border-emerald-200 bg-emerald-50/60 hover:bg-emerald-100/70 transition-colors text-left group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                  <Printer className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-gray-900 group-hover:text-emerald-900">
                    Imprimir Horario (PDF / Papel)
                  </div>
                  <div className="text-[11px] text-gray-500">
                    Formato oficial de consulta académica Uniguajira
                  </div>
                </div>
              </div>
            </button>

            {/* Copy Text */}
            <button
              onClick={handleCopyTextSchedule}
              className="flex items-center justify-between p-3 rounded-lg border border-amber-200 bg-amber-50/60 hover:bg-amber-100/70 transition-colors text-left group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-amber-600 text-white flex items-center justify-center shadow-xs">
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </div>
                <div>
                  <div className="font-bold text-gray-900 group-hover:text-amber-900">
                    {copied ? '¡Copiado al portapapeles!' : 'Copiar Resumen en Texto'}
                  </div>
                  <div className="text-[11px] text-gray-500">
                    Listo para compartir por WhatsApp o notas
                  </div>
                </div>
              </div>
            </button>
          </div>
        </div>

        <div className="bg-gray-50 px-4 py-2.5 border-t border-gray-200 flex justify-end">
          <button
            onClick={onClose}
            className="text-xs font-medium text-white bg-[#1e5898] hover:bg-[#16467a] px-4 py-1.5 rounded transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
