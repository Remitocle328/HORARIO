export interface Subject {
  code: string;
  group: string;
  displayName: string;
  fullName: string;
  shortName: string;
  credits: number;
  professor: string;
  classroom: string;
  building: string;
  colorScheme?: string;
  hoursPerWeek: number;
  scheduleDescription: string;
}

export interface ScheduleSlot {
  intervalIndex: number;
  dayIndex: number; // 0: Lunes, 1: Martes, 2: Miercoles, 3: Jueves, 4: Viernes, 5: Sabado
  subjectCode: string;
  group: string;
  textLine1: string;
  textLine2: string;
}

export interface TimeInterval {
  id: number;
  label: string; // e.g. "06:30-07:14"
  start: string;
  end: string;
}

export interface StudentInfo {
  periodoActual: string;
  academico: string;
  codigo: string;
  identificacion: string;
  sexo: string;
  apellidos: string;
  nombres: string;
  email: string;
  programa: string;
  semestre: string;
  reformaPensum: string;
  fechaInicio: string;
  fechaFin: string;
  semanaFecha: string;
  semanaAcademica: number;
}
