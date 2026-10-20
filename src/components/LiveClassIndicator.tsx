import React from 'react';
import { ActiveClassState } from '../utils/timeUtils';
import { Clock, MapPin, User, Sparkles, CheckCircle2 } from 'lucide-react';

interface LiveClassIndicatorProps {
  activeState: ActiveClassState;
  simulationPreset: string;
  onSelectSimulation: (preset: string) => void;
  onResetRealTime: () => void;
}

export const LiveClassIndicator: React.FC<LiveClassIndicatorProps> = ({
  activeState,
  simulationPreset,
  onSelectSimulation,
  onResetRealTime,
}) => {
  const isSimulated = simulationPreset !== 'realtime';

  return (
    <div className="w-full bg-white border border-[#9bb5cf] rounded-xs mb-2 p-2 px-3 text-xs shadow-2xs font-sans">
      <div className="flex flex-wrap items-center justify-between gap-2">
        {/* Status indicator on the left */}
        <div className="flex items-center gap-2">
          {activeState.isActive && activeState.subject ? (
            <div className="flex flex-wrap items-center gap-2">
              <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-900 font-bold text-[11px] shadow-2xs">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
                </span>
                EN CLASE AHORA
              </span>

              <span className="font-bold text-gray-900 text-[12px]">
                {activeState.subject.fullName} ({activeState.subject.code}-{activeState.subject.group})
              </span>

              <span className="text-gray-400 hidden sm:inline">&bull;</span>

              <span className="flex items-center gap-1 text-blue-900 font-semibold bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                <MapPin className="w-3 h-3 text-red-500" />
                {activeState.subject.classroom} ({activeState.subject.nomedf})
              </span>

              <span className="text-gray-400 hidden sm:inline">&bull;</span>

              <span className="flex items-center gap-1 text-gray-700">
                <User className="w-3 h-3 text-gray-500" />
                {activeState.subject.professor}
              </span>

              {activeState.timeRemainingMinutes !== null && (
                <span className="text-emerald-700 font-mono text-[11px] font-semibold bg-emerald-50/80 px-1.5 py-0.5 rounded">
                  Finaliza en ~{activeState.timeRemainingMinutes} min
                </span>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2 text-gray-600">
              <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-slate-100 border border-slate-300 text-slate-700 font-medium text-[11px]">
                <Clock className="w-3 h-3 text-slate-500" />
                Fuera de clase
              </span>

              {activeState.nextClass ? (
                <span className="text-[11.5px] text-gray-700">
                  Próxima clase: <strong className="text-blue-950 font-bold">{activeState.nextClass.subject.fullName}</strong> ({activeState.nextClass.dayName} a las {activeState.nextClass.timeStart}) en <span className="font-semibold text-emerald-800">{activeState.nextClass.classroom}</span>
                </span>
              ) : (
                <span className="text-[11px] text-gray-500">
                  No hay clases programadas para hoy.
                </span>
              )}
            </div>
          )}
        </div>

        {/* Simulation selector on the right */}
        <div className="flex items-center gap-2 text-[11px]">
          <span className="text-gray-500 hidden md:inline flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-500" />
            Simulador de hora:
          </span>
          <select
            value={simulationPreset}
            onChange={(e) => onSelectSimulation(e.target.value)}
            className={`border rounded px-2 py-0.5 text-[11px] font-medium outline-none cursor-pointer transition-colors ${
              isSimulated
                ? 'bg-amber-50 border-amber-400 text-amber-950 font-semibold'
                : 'bg-gray-50 border-gray-300 text-gray-700 hover:bg-white'
            }`}
          >
            <option value="realtime">🕒 Hora Real (Automático)</option>
            <option value="lun_0800">Lunes 08:15 (Estructura de Datos II)</option>
            <option value="lun_1230">Lunes 12:45 (Programación Avanzada)</option>
            <option value="mar_0800">Martes 08:30 (Arquitectura del Computador)</option>
            <option value="mar_1800">Martes 18:15 (Inglés IV)</option>
            <option value="mie_1015">Miércoles 10:30 (Metodología de la Investigación)</option>
            <option value="mie_1500">Miércoles 15:30 (Métodos Numéricos)</option>
            <option value="jue_1500">Jueves 16:00 (Redes I)</option>
            <option value="vie_1230">Viernes 13:00 (Investigación de Operaciones)</option>
          </select>

          {isSimulated && (
            <button
              onClick={onResetRealTime}
              className="text-[10px] text-blue-700 underline font-semibold cursor-pointer"
            >
              Volver a hora real
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
