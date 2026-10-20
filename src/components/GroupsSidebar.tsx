import React, { useState } from 'react';
import { FullSubject } from '../data/scheduleData';

interface GroupsSidebarProps {
  subjects: FullSubject[];
  visibleCodes: Set<string>;
  selectedCode: string | null;
  hoveredCode: string | null;
  activeSubjectCode?: string | null;
  onToggleCode: (code: string) => void;
  onToggleAll: () => void;
  onSelectSubject: (subject: FullSubject) => void;
  onHoverSubject: (code: string | null) => void;
}

export const GroupsSidebar: React.FC<GroupsSidebarProps> = ({
  subjects,
  visibleCodes,
  selectedCode,
  hoveredCode,
  activeSubjectCode,
  onToggleCode,
  onToggleAll,
  onSelectSubject,
  onHoverSubject,
}) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const allVisible = subjects.every((s) => visibleCodes.has(s.code));

  return (
    <div className="w-full md:w-[145px] shrink-0 select-none font-sans pt-1">
      {/* Mobile Accordion Toggle: only on screens smaller than md */}
      <div className="md:hidden flex items-center justify-between bg-[#ececec] border border-gray-300 px-3 py-1.5 rounded mb-2 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-bold text-[#0000CC] tracking-wide">
            GRUPOS MATRICULADOS ({visibleCodes.size}/{subjects.length})
          </span>
        </div>
        <button
          type="button"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="text-blue-900 font-bold px-2 py-0.5 bg-white border border-slate-300 rounded shadow-xs cursor-pointer text-[11px]"
        >
          {isMobileOpen ? 'Ocultar ▲' : 'Mostrar lista ▼'}
        </button>
      </div>

      <div className={`${isMobileOpen ? 'block' : 'hidden'} md:block midterms`}>
        <table className="w-full border-collapse">
          <tbody>
            {/* Header: GRUPOS + Ver Checkbox */}
            <tr className="align-middle h-[28px]">
              <td className="text-center p-0.5">
                <span className="font-bold text-[#0000CC] text-[11px] tracking-wide block">
                  GRUPOS
                </span>
              </td>
              <td className="text-center p-0.5 w-[38px]">
                <button
                  type="button"
                  onClick={onToggleAll}
                  className={`px-1.5 py-0.5 text-[11px] font-bold border rounded cursor-pointer ${
                    allVisible
                      ? 'bg-orange-50 text-[#bd5100] border-[#ff8c00]'
                      : 'bg-gray-100 text-gray-500 border-gray-300'
                  }`}
                  title="Mostrar / Ocultar todas las asignaturas"
                >
                  Ver
                </button>
              </td>
            </tr>

            {/* 8 Course Rows */}
            {subjects.map((sub) => {
              const isChecked = visibleCodes.has(sub.code);
              const isSelected = selectedCode === sub.code;
              const isHovered = hoveredCode === sub.code;
              const isCurrentInClass = activeSubjectCode === sub.code;

              return (
                <tr key={sub.nropak} className="h-[48px]">
                  {/* Left Column: .item Box */}
                  <td className="p-0.5">
                    <button
                      type="button"
                      id={sub.nropak}
                      onClick={() => onSelectSubject(sub)}
                      onMouseEnter={() => onHoverSubject(sub.code)}
                      onMouseLeave={() => onHoverSubject(null)}
                      title={`${sub.fullName} (${sub.code}-${sub.group})\nDocente: ${sub.professor}${isCurrentInClass ? '\nEN CLASE EN ESTE MOMENTO' : ''}`}
                      className={`w-full md:w-[102px] min-h-[42px] px-1 py-1 rounded-xs text-center border cursor-pointer flex flex-col items-center justify-center ${
                        isCurrentInClass
                          ? 'border-2 border-[#16a34a] bg-white'
                          : isSelected
                          ? 'border-2 border-[#16a34a] bg-white'
                          : isHovered
                          ? 'border border-[#16a34a] bg-[#fafafa]'
                          : 'border border-[#499B33] bg-[#fafafa] hover:bg-gray-50'
                      }`}
                    >
                      {isCurrentInClass && (
                        <span className="text-[7.5px] font-bold text-[#16a34a] uppercase tracking-tight block leading-none mb-0.5">
                          EN CLASE
                        </span>
                      )}

                      <div className="text-[11px] leading-[13px] text-black font-normal">
                        <div className={isCurrentInClass ? 'font-bold' : ''}>
                          {`${sub.code}-${sub.group}`}
                        </div>
                        <div className="truncate max-w-[130px] md:max-w-[95px]">
                          {sub.shortName}
                        </div>
                      </div>
                    </button>
                  </td>

                  {/* Right Column: Checkbox #formatCheck */}
                  <td className="text-center align-middle p-0.5 w-[34px]">
                    <input
                      type="checkbox"
                      id={`check_${sub.nropak}`}
                      checked={isChecked}
                      onChange={() => onToggleCode(sub.code)}
                      className="w-3.5 h-3.5 accent-[#2b5b99] cursor-pointer"
                      title={isChecked ? 'Ocultar esta asignatura' : 'Mostrar esta asignatura'}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
