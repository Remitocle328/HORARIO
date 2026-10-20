import React, { useState } from 'react';
import { StudentInfo } from '../types';

interface StudentHeaderProps {
  student: StudentInfo;
  onWeekChange: (newDate: string) => void;
  onOpenPensum: () => void;
  onOpenHistoria: () => void;
}

export const StudentHeader: React.FC<StudentHeaderProps> = ({
  student,
  onWeekChange,
  onOpenPensum,
  onOpenHistoria,
}) => {
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleEmailClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(student.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <div className="w-full select-none font-sans">
      {/* Top Banner Tab: CONSULTAR HORARIO (from title="CONSULTAR HORARIO") */}
      <div className="relative flex items-center justify-between px-3 py-1.5 sm:py-1 rounded-t-md bg-[#205b9b] border border-[#1b4e86]">
        <h1 className="text-white font-bold text-[12px] sm:text-[13px] tracking-wide">
          CONSULTAR HORARIO
        </h1>
        <div className="flex items-center gap-2">
          <span className="text-[10px] sm:text-[11px] text-white/90">
            Universidad de La Guajira • SMAUDG
          </span>
        </div>
      </div>

      {/* Main Student Data Container (tableHprs) */}
      <div className="bg-[#CCCCCC] p-1 border-x border-[#999999]">
        <div className="bg-[#ececec] border border-gray-400 p-1.5 sm:p-2 flex flex-col-reverse md:flex-row justify-between items-center md:items-start gap-3 md:gap-4">
          {/* Left table with student metadata */}
          <div className="flex-1 w-full overflow-x-auto">
            <table className="w-full text-[11px] sm:text-[12px] border-collapse">
              <tbody>
                {/* Periodo Actual & Academico */}
                <tr className="leading-tight">
                  <td className="w-[85px] sm:w-[110px] text-right pr-2 italic text-[#333333] font-normal font-sans py-0.5">
                    Periodo Actual
                  </td>
                  <td className="py-0.5">
                    <span className="font-bold text-[#330099] mr-2">
                      {student.periodoActual}
                    </span>

                    {/* Plan de Estudio & Historia Académica Buttons */}
                    <button
                      onClick={onOpenPensum}
                      title="Plan de Estudio Gráfico del Estudiante"
                      className="inline-flex items-center align-middle mx-0.5 sm:mx-1 px-1.5 py-0.2 bg-[#16a34a] text-white text-[9px] font-bold rounded cursor-pointer"
                    >
                      Pensum
                    </button>

                    <button
                      onClick={onOpenHistoria}
                      title="Historia Académica del Estudiante"
                      className="inline-flex items-center align-middle mx-0.5 sm:mx-1 px-1.5 py-0.2 bg-[#b45309] text-white text-[9px] font-bold rounded cursor-pointer"
                    >
                      Historia
                    </button>

                    <span className="italic text-[#333333] font-normal ml-3 sm:ml-8 mr-1">
                      Académico
                    </span>
                    <span className="font-bold text-[#330099]">
                      {student.academico}
                    </span>
                  </td>
                </tr>

                {/* Código, Nº Ident., Sexo */}
                <tr className="leading-tight">
                  <td className="w-[85px] sm:w-[110px] text-right pr-2 italic text-[#333333] font-normal py-0.5">
                    Código
                  </td>
                  <td className="py-0.5">
                    <span className="font-bold text-[#330099] mr-2 sm:mr-3">
                      {student.codigo}
                    </span>
                    <span className="italic text-[#333333] font-normal mr-1">
                      Nº Ident.
                    </span>
                    <span className="font-bold text-[#330099] mr-2 sm:mr-3">
                      {student.identificacion}
                    </span>
                    <span className="italic text-[#333333] font-normal mr-1">
                      Sexo
                    </span>
                    <span className="font-bold text-[#330099]">
                      {student.sexo}
                    </span>
                  </td>
                </tr>

                {/* Apellidos */}
                <tr className="leading-tight">
                  <td className="w-[85px] sm:w-[110px] text-right pr-2 italic text-[#333333] font-normal py-0.5">
                    Apellidos
                  </td>
                  <td className="py-0.5 font-bold text-[#330099]">
                    {student.apellidos}
                  </td>
                </tr>

                {/* Nombre */}
                <tr className="leading-tight">
                  <td className="w-[85px] sm:w-[110px] text-right pr-2 italic text-[#333333] font-normal py-0.5">
                    Nombre
                  </td>
                  <td className="py-0.5 font-bold text-[#330099]">
                    {student.nombres}
                  </td>
                </tr>

                {/* E-mail */}
                <tr className="leading-tight">
                  <td className="w-[85px] sm:w-[110px] text-right pr-2 italic text-[#333333] font-normal py-0.5">
                    E-mail
                  </td>
                  <td className="py-0.5">
                    <a
                      href={`mailto:${student.email}`}
                      onClick={handleEmailClick}
                      className="text-[#0000aa] underline font-normal hover:text-blue-800 cursor-pointer break-all"
                      title="Copiar email institucional"
                    >
                      {student.email}
                    </a>
                    {copiedEmail && (
                      <span className="ml-2 text-[10px] bg-[#16a34a] text-white px-1.5 py-0.2 rounded font-sans inline-block">
                        Copiado
                      </span>
                    )}
                  </td>
                </tr>

                {/* Programa & Semestre */}
                <tr className="leading-tight">
                  <td className="w-[85px] sm:w-[110px] text-right pr-2 italic text-[#333333] font-normal py-0.5">
                    Programa
                  </td>
                  <td className="py-0.5">
                    <span className="font-bold text-[#330099] mr-2 block sm:inline">
                      {student.programa}
                    </span>
                    <span className="italic text-[#333333] font-normal mr-1">
                      Sem:
                    </span>
                    <span className="font-bold text-[#330099]">
                      {student.semestre}
                    </span>
                  </td>
                </tr>

                {/* Reforma Pensum */}
                <tr className="leading-tight">
                  <td className="w-[85px] sm:w-[110px] text-right pr-2 italic text-[#333333] font-normal py-0.5">
                    Reforma Pensum
                  </td>
                  <td className="py-0.5 font-normal text-gray-800">
                    {student.reformaPensum}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Right column: Student photo (id="phoprs") */}
          <div className="shrink-0 self-center md:self-start mb-1 md:mb-0">
            <div
              className="w-[85px] sm:w-[98px] h-[105px] sm:h-[120px] bg-white border border-gray-400 flex flex-col items-center justify-center relative overflow-hidden group shadow-inner"
              title={`Foto del Estudiante: ${student.codigo}`}
            >
              {photoUrl ? (
                <img
                  src={photoUrl}
                  alt={student.nombres}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center justify-center p-1 text-center text-gray-400">
                  <div className="w-8 sm:w-10 h-8 sm:h-10 border border-gray-300 rounded flex items-center justify-center mb-1 text-[9px] sm:text-[10px] font-bold text-gray-400">
                    FOTO
                  </div>
                  <span className="text-[8px] sm:text-[9px] text-gray-400 font-mono">0182420021</span>
                </div>
              )}
              <label className="absolute inset-0 bg-black/50 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center text-[10px] cursor-pointer transition-opacity text-center p-1 font-sans">
                Cambiar foto
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setPhotoUrl(URL.createObjectURL(file));
                    }
                  }}
                />
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Date and Week Bar */}
      <div className="bg-[#e4e4e4] border-x border-b border-gray-400 px-2 sm:px-4 py-2 text-[11px] sm:text-[12px] text-gray-800">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          {/* Inicia & Termina */}
          <div className="flex items-center gap-4 sm:gap-8 flex-wrap">
            <div>
              <span className="italic text-[#333333] font-normal mr-1.5">Inicia:</span>
              <span className="font-bold text-[#330099]" id="lblDataInicia">
                {student.fechaInicio}
              </span>
            </div>
            <div>
              <span className="italic text-[#333333] font-normal mr-1.5">Termina:</span>
              <span className="font-bold text-[#330099]" id="lblDataFin">
                {student.fechaFin}
              </span>
            </div>
          </div>

          {/* Semana Input & Yellow Badge */}
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <div className="flex items-center gap-1.5">
              <span className="italic text-[#333333] font-normal">Semana</span>
              <div className="inline-flex items-center bg-white border border-gray-400 px-1 py-0.5 rounded-xs">
                <input
                  id="dtpSemana"
                  type="date"
                  value={student.semanaFecha}
                  onChange={(e) => onWeekChange(e.target.value)}
                  className="outline-none bg-transparent cursor-pointer font-sans text-xs text-gray-800"
                />
              </div>
            </div>

            {/* Yellow Badge: 11 Semana Académica */}
            <div
              id="lblSemGraf"
              className="px-2.5 sm:px-3 py-0.5 bg-[#fceb92] border border-[#d3aa14] rounded-full text-[10px] sm:text-[11px] font-bold text-[#553600]"
            >
              {student.semanaAcademica} Semana Académica
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
