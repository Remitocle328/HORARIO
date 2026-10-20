import { StudentInfo, Subject, TimeInterval, ScheduleSlot } from '../types';

export const INITIAL_STUDENT_INFO: StudentInfo = {
  periodoActual: '2026 - 2',
  academico: 'Normal',
  codigo: '0182420021',
  identificacion: '1124481817',
  sexo: 'Masculino',
  apellidos: 'ATENCIO IPUANA',
  nombres: 'TEMISTOCLE EISYANIOR',
  email: 'teatencio@uniguajira.edu.co',
  programa: 'INGENIERIA DE SISTEMAS - RIOHACHA',
  semestre: '05',
  reformaPensum: '2872',
  fechaInicio: '12/Agosto/2026',
  fechaFin: '18/Diciembre/2026',
  semanaFecha: '2026-10-19',
  semanaAcademica: 11,
};

// All 21 intervals as defined in the official SMAUDG portal HTML
export const TIME_INTERVALS: TimeInterval[] = [
  { id: 0, label: '06:30-07:14', start: '06:30', end: '07:14' },
  { id: 1, label: '07:15-07:59', start: '07:15', end: '07:59' },
  { id: 2, label: '08:00-08:44', start: '08:00', end: '08:44' },
  { id: 3, label: '08:45-09:29', start: '08:45', end: '09:29' },
  { id: 4, label: '09:30-10:14', start: '09:30', end: '10:14' },
  { id: 5, label: '10:15-10:59', start: '10:15', end: '10:59' },
  { id: 6, label: '11:00-11:44', start: '11:00', end: '11:44' },
  { id: 7, label: '11:45-12:29', start: '11:45', end: '12:29' },
  { id: 8, label: '12:30-13:14', start: '12:30', end: '13:14' },
  { id: 9, label: '13:30-14:14', start: '13:30', end: '14:14' },
  { id: 10, label: '14:15-14:59', start: '14:15', end: '14:59' },
  { id: 11, label: '15:00-15:44', start: '15:00', end: '15:44' },
  { id: 12, label: '15:45-16:29', start: '15:45', end: '16:29' },
  { id: 13, label: '16:30-17:14', start: '16:30', end: '17:14' },
  { id: 14, label: '17:15-17:59', start: '17:15', end: '17:59' },
  { id: 15, label: '18:00-18:44', start: '18:00', end: '18:44' },
  { id: 16, label: '18:45-19:29', start: '18:45', end: '19:29' },
  { id: 17, label: '19:30-20:14', start: '19:30', end: '20:14' },
  { id: 18, label: '20:15-20:59', start: '20:15', end: '20:59' },
  { id: 19, label: '21:00-21:44', start: '21:00', end: '21:44' },
  { id: 20, label: '21:45-22:29', start: '21:45', end: '22:29' },
];

export const DAYS = [
  { id: 0, name: 'LUNES.', short: 'LUN' },
  { id: 1, name: 'MARTES', short: 'MAR' },
  { id: 2, name: 'MIERCO', short: 'MIE' },
  { id: 3, name: 'JUEVES', short: 'JUE' },
  { id: 4, name: 'VIERNE', short: 'VIE' },
  { id: 5, name: 'SABADO', short: 'SAB' },
];

export interface FullSubject extends Subject {
  nropak: string;
  codprf: string;
  nomsde: string;
  nomedf: string;
  nomaul: string;
  sedeEdificioAula: string;
}

// EXACT REAL DATA extracted from official Universidad de La Guajira document (descarga_4b0ade67.pdf)
export const SUBJECTS: FullSubject[] = [
  {
    code: '273251',
    group: 'B1',
    nropak: '0000979991',
    displayName: '273251-B1\nMetodos Numeric',
    fullName: 'METODOS NUMERICO',
    shortName: 'Metodos Numeric',
    credits: 3,
    professor: 'YISSET ANDREA PIMIENTA ZAPATA',
    codprf: '1124481817',
    classroom: 'AULA 6101',
    building: 'Edificio [F] - Aula [001]',
    nomsde: 'SEDE [01]',
    nomedf: 'EDIFICIO [F]',
    nomaul: 'AULA 6101',
    sedeEdificioAula: 'Sede [01] - Edificio [F] - Aula [001]',
    hoursPerWeek: 3,
    scheduleDescription: 'Miércoles: 15:00 - 17:14 (AULA 6101)',
  },
  {
    code: '273261',
    group: 'D2',
    nropak: '0000983042',
    displayName: '273261-D2\nInvestigacion D',
    fullName: 'INVESTIGACION DE OPERACIONES',
    shortName: 'Investigacion D',
    credits: 3,
    professor: 'NICOLAS DE JESUS SANCHEZ VASQUEZ',
    codprf: '1124481817',
    classroom: 'AULA 6202',
    building: 'Edificio [F] - Aula [007]',
    nomsde: 'SEDE [01]',
    nomedf: 'EDIFICIO [F]',
    nomaul: 'AULA 6202',
    sedeEdificioAula: 'Sede [01] - Edificio [F] - Aula [007]',
    hoursPerWeek: 3,
    scheduleDescription: 'Viernes: 12:30 - 14:59 (AULA 6202)',
  },
  {
    code: '273262',
    group: 'C1',
    nropak: '0000980315',
    displayName: '273262-C1\nMetodologia De',
    fullName: 'METODOLOGIA DE LA INVESTIGACION',
    shortName: 'Metodologia De',
    credits: 3,
    professor: 'SANDY ROMERO CUELLO',
    codprf: '1124481817',
    classroom: 'AULA 6301',
    building: 'Edificio [F] - Aula [008]',
    nomsde: 'SEDE [01]',
    nomedf: 'EDIFICIO [F]',
    nomaul: 'AULA 6301',
    sedeEdificioAula: 'Sede [01] - Edificio [F] - Aula [008]',
    hoursPerWeek: 3,
    scheduleDescription: 'Miércoles: 10:15 - 12:29 (AULA 6301)',
  },
  {
    code: '273345',
    group: 'B4',
    nropak: '0000980307',
    displayName: '273345-B4\nProgramacion Av',
    fullName: 'PROGRAMACION AVANZADA',
    shortName: 'Programacion Av',
    credits: 3,
    professor: 'BRYAN JOSE OTERO ARRIETA',
    codprf: '1124481817',
    classroom: 'AULA 6301',
    building: 'Edificio [F] - Aula [008]',
    nomsde: 'SEDE [01]',
    nomedf: 'EDIFICIO [F]',
    nomaul: 'AULA 6301',
    sedeEdificioAula: 'Sede [01] - Edificio [F] - Aula [008]',
    hoursPerWeek: 3,
    scheduleDescription: 'Lunes: 12:30 - 14:59 (AULA 6301)',
  },
  {
    code: '273346',
    group: 'A1',
    nropak: '0000979964',
    displayName: '273346-A1\nEstructura De D',
    fullName: 'ESTRUCTURA DE DATOS II',
    shortName: 'Estructura De D',
    credits: 3,
    professor: 'DAVID FERNANDEZ PEREZ',
    codprf: '1124481817',
    classroom: 'AULA 6305',
    building: 'Edificio [F] - Aula [012]',
    nomsde: 'SEDE [01]',
    nomedf: 'EDIFICIO [F]',
    nomaul: 'AULA 6305',
    sedeEdificioAula: 'Sede [01] - Edificio [F] - Aula [012]',
    hoursPerWeek: 4,
    scheduleDescription: 'Lunes: 08:00 - 09:29 y Miércoles: 08:00 - 09:29 (AULA 6305)',
  },
  {
    code: '273352',
    group: 'B1',
    nropak: '0000979992',
    displayName: '273352-B1\nArquitectura De',
    fullName: 'ARQUITECTURA DEL COMPUTADOR',
    shortName: 'Arquitectura De',
    credits: 3,
    professor: 'ASLIN GONZALO BOTELLO PLATA',
    codprf: '1124481817',
    classroom: 'AULA 6401',
    building: 'Edificio [F] - Aula [014]',
    nomsde: 'SEDE [01]',
    nomedf: 'EDIFICIO [F]',
    nomaul: 'AULA 6401',
    sedeEdificioAula: 'Sede [01] - Edificio [F] - Aula [014]',
    hoursPerWeek: 3,
    scheduleDescription: 'Martes: 08:00 - 10:14 (AULA 6401)',
  },
  {
    code: '273366',
    group: 'D2',
    nropak: '0000980323',
    displayName: '273366-D2\nRedes I',
    fullName: 'REDES I',
    shortName: 'Redes I',
    credits: 3,
    professor: 'FABIO ORLANDO MOYA CAMACHO',
    codprf: '1124481817',
    classroom: 'LAB REDES 6103',
    building: 'Edificio [F] - Aula [022]',
    nomsde: 'SEDE [01]',
    nomedf: 'EDIFICIO [F]',
    nomaul: 'LAB REDES 6103',
    sedeEdificioAula: 'Sede [01] - Edificio [F] - Aula [022]',
    hoursPerWeek: 4,
    scheduleDescription: 'Jueves: 15:00 - 17:59 (LAB REDES 6103)',
  },
  {
    code: '3104',
    group: 'D3',
    nropak: '0000981181',
    displayName: '3104-D3\ningles iv',
    fullName: 'INGLES IV',
    shortName: 'ingles iv',
    credits: 0,
    professor: 'BETZAIDA MARIA MORALES BARON',
    codprf: '1124481817',
    classroom: 'AULA 5305 / AULA 5304',
    building: 'Edificio [V] - Aula [018 / 019]',
    nomsde: 'SEDE [01]',
    nomedf: 'EDIFICIO [V]',
    nomaul: 'AULA 5305 / 5304',
    sedeEdificioAula: 'Sede [01] - Edificio [V] - Aula [018 / 019]',
    hoursPerWeek: 4,
    scheduleDescription: 'Martes: 18:00-19:29 (AULA 5305) & Jueves: 18:00-19:29 (AULA 5304)',
  },
];

export const SCHEDULE_SLOTS: ScheduleSlot[] = [
  // 08:00 - 08:44 (Interval 2)
  {
    intervalIndex: 2,
    dayIndex: 0, // Lunes
    subjectCode: '273346',
    group: 'A1',
    textLine1: '273346-A1',
    textLine2: 'Estructura De D',
  },
  {
    intervalIndex: 2,
    dayIndex: 1, // Martes
    subjectCode: '273352',
    group: 'B1',
    textLine1: '273352-B1',
    textLine2: 'Arquitectura De',
  },
  {
    intervalIndex: 2,
    dayIndex: 2, // Miercoles
    subjectCode: '273346',
    group: 'A1',
    textLine1: '273346-A1',
    textLine2: 'Estructura De D',
  },

  // 08:45 - 09:29 (Interval 3)
  {
    intervalIndex: 3,
    dayIndex: 0, // Lunes
    subjectCode: '273346',
    group: 'A1',
    textLine1: '273346-A1',
    textLine2: 'Estructura De D',
  },
  {
    intervalIndex: 3,
    dayIndex: 1, // Martes
    subjectCode: '273352',
    group: 'B1',
    textLine1: '273352-B1',
    textLine2: 'Arquitectura De',
  },
  {
    intervalIndex: 3,
    dayIndex: 2, // Miercoles
    subjectCode: '273346',
    group: 'A1',
    textLine1: '273346-A1',
    textLine2: 'Estructura De D',
  },

  // 09:30 - 10:14 (Interval 4)
  {
    intervalIndex: 4,
    dayIndex: 1, // Martes
    subjectCode: '273352',
    group: 'B1',
    textLine1: '273352-B1',
    textLine2: 'Arquitectura De',
  },

  // 10:15 - 10:59 (Interval 5)
  {
    intervalIndex: 5,
    dayIndex: 2, // Miercoles
    subjectCode: '273262',
    group: 'C1',
    textLine1: '273262-C1',
    textLine2: 'Metodologia De',
  },

  // 11:00 - 11:44 (Interval 6)
  {
    intervalIndex: 6,
    dayIndex: 2, // Miercoles
    subjectCode: '273262',
    group: 'C1',
    textLine1: '273262-C1',
    textLine2: 'Metodologia De',
  },

  // 11:45 - 12:29 (Interval 7)
  {
    intervalIndex: 7,
    dayIndex: 2, // Miercoles
    subjectCode: '273262',
    group: 'C1',
    textLine1: '273262-C1',
    textLine2: 'Metodologia De',
  },

  // 12:30 - 13:14 (Interval 8)
  {
    intervalIndex: 8,
    dayIndex: 0, // Lunes
    subjectCode: '273345',
    group: 'B4',
    textLine1: '273345-B4',
    textLine2: 'Programacion Av',
  },
  {
    intervalIndex: 8,
    dayIndex: 4, // Viernes
    subjectCode: '273261',
    group: 'D2',
    textLine1: '273261-D2',
    textLine2: 'Investigacion D',
  },

  // 13:30 - 14:14 (Interval 9)
  {
    intervalIndex: 9,
    dayIndex: 0, // Lunes
    subjectCode: '273345',
    group: 'B4',
    textLine1: '273345-B4',
    textLine2: 'Programacion Av',
  },
  {
    intervalIndex: 9,
    dayIndex: 4, // Viernes
    subjectCode: '273261',
    group: 'D2',
    textLine1: '273261-D2',
    textLine2: 'Investigacion D',
  },

  // 14:15 - 14:59 (Interval 10)
  {
    intervalIndex: 10,
    dayIndex: 0, // Lunes
    subjectCode: '273345',
    group: 'B4',
    textLine1: '273345-B4',
    textLine2: 'Programacion Av',
  },
  {
    intervalIndex: 10,
    dayIndex: 4, // Viernes
    subjectCode: '273261',
    group: 'D2',
    textLine1: '273261-D2',
    textLine2: 'Investigacion D',
  },

  // 15:00 - 15:44 (Interval 11)
  {
    intervalIndex: 11,
    dayIndex: 2, // Miercoles
    subjectCode: '273251',
    group: 'B1',
    textLine1: '273251-B1',
    textLine2: 'Metodos Numeric',
  },
  {
    intervalIndex: 11,
    dayIndex: 3, // Jueves
    subjectCode: '273366',
    group: 'D2',
    textLine1: '273366-D2 Redes',
    textLine2: 'I',
  },

  // 15:45 - 16:29 (Interval 12)
  {
    intervalIndex: 12,
    dayIndex: 2, // Miercoles
    subjectCode: '273251',
    group: 'B1',
    textLine1: '273251-B1',
    textLine2: 'Metodos Numeric',
  },
  {
    intervalIndex: 12,
    dayIndex: 3, // Jueves
    subjectCode: '273366',
    group: 'D2',
    textLine1: '273366-D2 Redes',
    textLine2: 'I',
  },

  // 16:30 - 17:14 (Interval 13)
  {
    intervalIndex: 13,
    dayIndex: 2, // Miercoles
    subjectCode: '273251',
    group: 'B1',
    textLine1: '273251-B1',
    textLine2: 'Metodos Numeric',
  },
  {
    intervalIndex: 13,
    dayIndex: 3, // Jueves
    subjectCode: '273366',
    group: 'D2',
    textLine1: '273366-D2 Redes',
    textLine2: 'I',
  },

  // 17:15 - 17:59 (Interval 14)
  {
    intervalIndex: 14,
    dayIndex: 3, // Jueves
    subjectCode: '273366',
    group: 'D2',
    textLine1: '273366-D2 Redes',
    textLine2: 'I',
  },

  // 18:00 - 18:44 (Interval 15)
  {
    intervalIndex: 15,
    dayIndex: 1, // Martes
    subjectCode: '3104',
    group: 'D3',
    textLine1: '3104-D3 ingles iv',
    textLine2: '',
  },
  {
    intervalIndex: 15,
    dayIndex: 3, // Jueves
    subjectCode: '3104',
    group: 'D3',
    textLine1: '3104-D3 ingles iv',
    textLine2: '',
  },

  // 18:45 - 19:29 (Interval 16)
  {
    intervalIndex: 16,
    dayIndex: 1, // Martes
    subjectCode: '3104',
    group: 'D3',
    textLine1: '3104-D3 ingles iv',
    textLine2: '',
  },
  {
    intervalIndex: 16,
    dayIndex: 3, // Jueves
    subjectCode: '3104',
    group: 'D3',
    textLine1: '3104-D3 ingles iv',
    textLine2: '',
  },
];
