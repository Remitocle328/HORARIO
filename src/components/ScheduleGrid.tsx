import React, { useState, useRef } from 'react';
import { DAYS, SCHEDULE_SLOTS, TIME_INTERVALS, FullSubject } from '../data/scheduleData';
import { ClassSession } from '../utils/currentClassHelper';

interface ScheduleGridProps {
  subjects: FullSubject[];
  visibleCodes: Set<string>;
  selectedCode: string | null;
  hoveredCode: string | null;
  currentDayIndex: number;
  currentIntervalIndex: number | null;
  activeSession: ClassSession | null;
  timeRemainingMinutes: number | null;
  onSlotClick: (subject: FullSubject) => void;
  onHoverSubject: (code: string | null) => void;
}

export const ScheduleGrid: React.FC<ScheduleGridProps> = ({
  subjects,
  visibleCodes,
  selectedCode,
  hoveredCode,
  currentDayIndex,
  currentIntervalIndex,
  activeSession,
  timeRemainingMinutes,
  onSlotClick,
  onHoverSubject,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tooltipData, setTooltipData] = useState<{
    subject: FullSubject;
    slot: typeof SCHEDULE_SLOTS[0];
    x: number;
    y: number;
  } | null>(null);

  // Quick lookup helper: map `${intervalIndex}-${dayIndex}` -> slot
  const slotMap = React.useMemo(() => {
    const map = new Map<string, typeof SCHEDULE_SLOTS[0]>();
    for (const slot of SCHEDULE_SLOTS) {
      map.set(`${slot.intervalIndex}-${slot.dayIndex}`, slot);
    }
    return map;
  }, []);

  const handleMouseEnterSlot = (
    e: React.MouseEvent,
    subject: FullSubject,
    slot: typeof SCHEDULE_SLOTS[0]
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltipData({
      subject,
      slot,
      x: rect.left + rect.width / 2,
      y: rect.top - 8,
    });
    onHoverSubject(subject.code);
  };

  const handleMouseLeaveSlot = () => {
    setTooltipData(null);
    onHoverSubject(null);
  };

  const scrollToDay = (dayIndex: number) => {
    if (!containerRef.current) return;
    if (dayIndex === -1) {
      containerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      return;
    }
    const day = DAYS[dayIndex];
    if (!day) return;
    const dayTh = containerRef.current.querySelector(`th#th_${day.id}, td#${day.name}`);
    if (dayTh) {
      const offsetLeft = (dayTh as HTMLElement).offsetLeft;
      containerRef.current.scrollTo({ left: Math.max(0, offsetLeft - 90), behavior: 'smooth' });
    }
  };

  const renderHeaderRow = (isTop = true) => (
    <tr className="bg-[#a8a8a8] text-white text-[11px] sm:text-[11.5px] font-bold h-[28px]">
      <td className="sticky left-0 z-20 w-[90px] sm:w-[115px] border border-white font-bold text-center uppercase tracking-wide bg-[#a8a8a8] shadow-xs">
        INTERVALOS
      </td>
      {DAYS.map((day) => {
        const isCurrentDay = day.id === currentDayIndex;
        return (
          <td
            key={day.id}
            id={isTop ? day.name : undefined}
            className={`border border-white font-bold text-center uppercase tracking-wide px-1 min-w-[100px] sm:min-w-[110px] ${
              isCurrentDay ? 'bg-[#16a34a] text-white' : ''
            }`}
          >
            {day.name}
          </td>
        );
      })}
    </tr>
  );

  return (
    <div className="flex-1 w-full select-none font-sans relative">
      {/* Title Centered: PROGRAMACION (exact .ttlrow from raw HTML) */}
      <div className="flex flex-col sm:flex-row items-center justify-between pb-1 mb-1 gap-1">
        <div className="font-bold text-[#0000CC] text-[12px] tracking-widest uppercase">
          PROGRAMACION
        </div>

        {/* Mobile quick day scroll navigator (visible on small screens) */}
        <div className="flex sm:hidden items-center gap-1 overflow-x-auto w-full pb-1 pt-0.5 text-[10px]">
          <span className="text-slate-500 font-medium shrink-0">Ir a:</span>
          {currentDayIndex >= 0 && (
            <button
              onClick={() => scrollToDay(currentDayIndex)}
              className="px-2 py-0.5 rounded bg-[#16a34a] text-white font-bold shrink-0 cursor-pointer"
            >
              HOY ({DAYS[currentDayIndex]?.short || 'DÍA'})
            </button>
          )}
          {DAYS.map((d) => (
            <button
              key={d.id}
              onClick={() => scrollToDay(d.id)}
              className={`px-1.5 py-0.5 rounded border shrink-0 cursor-pointer ${
                d.id === currentDayIndex
                  ? 'border-[#16a34a] text-[#16a34a] font-bold bg-white'
                  : 'border-slate-300 text-slate-700 bg-white'
              }`}
            >
              {d.short}
            </button>
          ))}
          <button
            onClick={() => scrollToDay(-1)}
            className="px-1.5 py-0.5 rounded border border-slate-300 text-slate-700 bg-white shrink-0 cursor-pointer"
          >
            Inicio
          </button>
        </div>
      </div>

      {/* Main Table with horizontal scroll & sticky column */}
      <div
        ref={containerRef}
        className="w-full overflow-x-auto relative rounded-xs border border-[#96cce9]"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        <table className="w-full border-collapse min-w-[700px] table-fixed">
          <thead>
            {renderHeaderRow(true)}
          </thead>
          <tbody>
            {TIME_INTERVALS.map((interval) => {
              const isCurrentIntervalRow = interval.id === currentIntervalIndex && currentDayIndex >= 0;

              return (
                <tr key={interval.id} className="h-[43px]">
                  {/* Sticky INTERVALOS Column */}
                  <td
                    className={`sticky left-0 z-10 w-[90px] sm:w-[115px] text-[10px] sm:text-[11px] font-normal text-center border border-white tracking-tight px-1 font-sans shadow-xs ${
                      isCurrentIntervalRow
                        ? 'bg-[#16a34a] text-white font-bold'
                        : 'bg-[#b3b3b3] text-[#111111]'
                    }`}
                  >
                    {interval.label}
                  </td>

                  {/* 6 Days (LUNES. to SABADO) */}
                  {DAYS.map((day) => {
                    const key = `${interval.id}-${day.id}`;
                    const slot = slotMap.get(key);

                    // If empty slot or this subject is currently unchecked/hidden
                    if (!slot || !visibleCodes.has(slot.subjectCode)) {
                      return (
                        <td
                          key={day.id}
                          className="bg-white border-[1.5px] border-[#93cbe8] p-1 hover:bg-sky-50/40 min-w-[100px] sm:min-w-[110px]"
                        />
                      );
                    }

                    const subjectObj = subjects.find((s) => s.code === slot.subjectCode);
                    const isSelected = selectedCode === slot.subjectCode;
                    const isHovered = hoveredCode === slot.subjectCode;

                    // Active class autoselection: ONLY for this day and active intervals
                    const isCurrentClass =
                      slot.dayIndex === currentDayIndex &&
                      Boolean(
                        activeSession &&
                        activeSession.subject.code === slot.subjectCode &&
                        activeSession.intervalIndices.includes(slot.intervalIndex)
                      );

                    return (
                      <td
                        key={day.id}
                        className="bg-white border-[1.5px] border-[#93cbe8] p-[3px] align-middle min-w-[100px] sm:min-w-[110px]"
                      >
                        <button
                          onClick={() => subjectObj && onSlotClick(subjectObj)}
                          onMouseEnter={(e) => subjectObj && handleMouseEnterSlot(e, subjectObj, slot)}
                          onMouseLeave={handleMouseLeaveSlot}
                          className={`w-full h-full min-h-[35px] flex flex-col items-center justify-center rounded-[2px] cursor-pointer ${
                            isCurrentClass
                              ? 'bg-[#c7fbfb] border-[2.5px] border-[#16a34a]'
                              : isSelected
                              ? 'bg-[#a5f3fc] border-2 border-[#16a34a]'
                              : isHovered
                              ? 'bg-[#cffafe] border border-[#16a34a]'
                              : 'bg-[#c7fbfb] border border-[#b31b3b] hover:bg-[#b0f5f7]'
                          }`}
                        >
                          {isCurrentClass && (
                            <span className="text-[8px] sm:text-[8.5px] font-bold text-[#16a34a] uppercase tracking-wide leading-none mb-0.5">
                              EN CLASE
                            </span>
                          )}

                          <span className={`text-[10px] sm:text-[10.5px] leading-[13px] text-center px-0.5 truncate max-w-full ${
                            isCurrentClass ? 'font-bold text-black' : 'text-black font-normal'
                          }`}>
                            {slot.textLine1}
                          </span>
                          {slot.textLine2 && (
                            <span className="text-[10px] sm:text-[10.5px] leading-[13px] text-black font-normal text-center px-0.5 truncate max-w-full">
                              {slot.textLine2}
                            </span>
                          )}
                        </button>
                      </td>
                    );
                  })}
                </tr>
              );
            })}

            {/* Bottom Duplicate Header Row */}
            {renderHeaderRow(false)}
          </tbody>
        </table>
      </div>

      {/* Floating Tooltip matching Uniguajira get_content_tooltip() */}
      {tooltipData && (
        <div
          className="fixed z-50 pointer-events-none transform -translate-x-1/2 -translate-y-full mb-2 bg-white border border-[#330099] rounded shadow-xl text-[11px] font-sans overflow-hidden w-[260px]"
          style={{
            left: `${tooltipData.x}px`,
            top: `${tooltipData.y}px`,
          }}
        >
          <div className="bg-[#330099] text-white font-bold px-2 py-1 text-[11px] flex justify-between items-center">
            <span>{tooltipData.subject.code}-{tooltipData.subject.group}</span>
            <span className="text-[10px] text-sky-200">{tooltipData.subject.shortName}</span>
          </div>
          <table className="w-full text-left border-collapse bg-white">
            <tbody>
              <tr className="border-b border-gray-100">
                <td className="p-1 font-bold text-gray-700 w-[75px] pl-2">FECHA</td>
                <td className="p-1 text-gray-800">2026-10-19</td>
              </tr>
              <tr className="border-b border-gray-100 bg-gray-50/60">
                <td className="p-1 font-bold text-gray-700 pl-2">PROFESOR</td>
                <td className="p-1 text-gray-800 font-medium truncate max-w-[170px]">
                  {tooltipData.subject.professor}
                </td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="p-1 font-bold text-gray-700 pl-2">ID PROF:</td>
                <td className="p-1 text-gray-800 font-mono">{tooltipData.subject.codprf}</td>
              </tr>
              <tr className="border-b border-gray-100 bg-gray-50/60">
                <td className="p-1 font-bold text-gray-700 pl-2">SEDE</td>
                <td className="p-1 text-gray-800 text-[10px]">{tooltipData.subject.nomsde}</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="p-1 font-bold text-gray-700 pl-2">EDIFICIO</td>
                <td className="p-1 text-gray-800">{tooltipData.subject.nomedf}</td>
              </tr>
              <tr>
                <td className="p-1 font-bold text-gray-700 pl-2">AULA</td>
                <td className="p-1 text-blue-900 font-semibold">{tooltipData.subject.nomaul}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
