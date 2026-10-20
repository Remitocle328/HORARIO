export interface PensumCourse {
  name: string;
  code?: string;
  credits: number;
  area: 'general' | 'ciencias_basicas' | 'profesional' | 'socio_humanistico';
  areaName: string;
  status: 'approved' | 'enrolled' | 'pending';
  grade?: string;
}

export interface PensumSemester {
  semesterNumber: number;
  roman: string;
  subtotalCredits: number;
  courses: PensumCourse[];
}

export const CAMPOS_FORMACION = {
  general: {
    name: 'BÁSICO GENERAL CIENTÍFICO DISCIPLINAR',
    color: '#84cc16',
    border: '#4d7c0f',
    bg: '#f7fee7',
    text: '#365314',
  },
  ciencias_basicas: {
    name: 'CIENCIAS BÁSICAS DE INGENIERÍA',
    color: '#0284c7',
    border: '#0369a1',
    bg: '#f0f9ff',
    text: '#0c4a6e',
  },
  profesional: {
    name: 'BÁSICO ESPECÍFICO PROFESIONAL',
    color: '#e11d48',
    border: '#be123c',
    bg: '#fff1f2',
    text: '#881337',
  },
  socio_humanistico: {
    name: 'SOCIO HUMANÍSTICO INVESTIGATIVO',
    color: '#f59e0b',
    border: '#b45309',
    bg: '#fffbeb',
    text: '#78350f',
  },
};

export const PENSUM_INGENIERIA_SISTEMAS: PensumSemester[] = [
  {
    semesterNumber: 1,
    roman: 'I',
    subtotalCredits: 19,
    courses: [
      { name: 'Cálculo Diferencial', code: '273111', credits: 3, area: 'general', areaName: 'Básico General Científico Disciplinar', status: 'approved', grade: '4.40' },
      { name: 'Lógica y Teoría de Conjuntos', code: '273112', credits: 3, area: 'general', areaName: 'Básico General Científico Disciplinar', status: 'approved', grade: '3.50' },
      { name: 'Introducción a la Ingeniería de Sistemas', code: '273313', credits: 3, area: 'profesional', areaName: 'Básico Específico Profesional', status: 'approved', grade: '3.90' },
      { name: 'Algoritmo y Programación I', code: '273314', credits: 5, area: 'profesional', areaName: 'Básico Específico Profesional', status: 'approved', grade: '3.70' },
      { name: 'Competencia Comunicativa I', code: '273515', credits: 3, area: 'socio_humanistico', areaName: 'Socio Humanístico Investigativo', status: 'approved', grade: '4.80' },
      { name: 'Cátedra Uniguajira', code: '273516', credits: 2, area: 'socio_humanistico', areaName: 'Socio Humanístico Investigativo', status: 'approved', grade: '3.70' },
    ],
  },
  {
    semesterNumber: 2,
    roman: 'II',
    subtotalCredits: 19,
    courses: [
      { name: 'Cálculo Integral', code: '273121', credits: 3, area: 'general', areaName: 'Básico General Científico Disciplinar', status: 'approved', grade: '3.60' },
      { name: 'Física (I) Mecánica y Laboratorio', code: '273122', credits: 4, area: 'general', areaName: 'Básico General Científico Disciplinar', status: 'approved', grade: '3.50' },
      { name: 'Álgebra Lineal', code: '273123', credits: 3, area: 'general', areaName: 'Básico General Científico Disciplinar', status: 'approved', grade: '3.70' },
      { name: 'Algoritmo y Programación II', code: '273324', credits: 5, area: 'profesional', areaName: 'Básico Específico Profesional', status: 'approved', grade: '3.40' },
      { name: 'Competencia Comunicativa II', code: '273525', credits: 2, area: 'socio_humanistico', areaName: 'Socio Humanístico Investigativo', status: 'approved', grade: '4.10' },
      { name: 'Humanidades', code: '273526', credits: 2, area: 'socio_humanistico', areaName: 'Socio Humanístico Investigativo', status: 'approved', grade: '4.50' },
    ],
  },
  {
    semesterNumber: 3,
    roman: 'III',
    subtotalCredits: 18,
    courses: [
      { name: 'Cálculo Vectorial', code: '273131', credits: 3, area: 'general', areaName: 'Básico General Científico Disciplinar', status: 'approved', grade: '4.00' },
      { name: 'Física (II) Eléctrica y Magnética - Lab', code: '273132', credits: 4, area: 'general', areaName: 'Básico General Científico Disciplinar', status: 'approved', grade: '3.80' },
      { name: 'Teoría de Sistemas', code: '273233', credits: 3, area: 'ciencias_basicas', areaName: 'Ciencias Básicas de Ingeniería', status: 'approved', grade: '4.40' },
      { name: 'Fundamentos del Diseño Gráfico', code: '273234', credits: 3, area: 'ciencias_basicas', areaName: 'Ciencias Básicas de Ingeniería', status: 'approved', grade: '4.80' },
      { name: 'Estructura de Datos I', code: '273335', credits: 3, area: 'profesional', areaName: 'Básico Específico Profesional', status: 'approved', grade: '3.20' },
      { name: 'Electiva en Ciencias Humanísticas', code: '273536', credits: 2, area: 'socio_humanistico', areaName: 'Socio Humanístico Investigativo', status: 'approved', grade: '4.30' },
    ],
  },
  {
    semesterNumber: 4,
    roman: 'IV',
    subtotalCredits: 19,
    courses: [
      { name: 'Ecuaciones Diferenciales', code: '273141', credits: 3, area: 'general', areaName: 'Básico General Científico Disciplinar', status: 'approved', grade: '3.50' },
      { name: 'Física (III) Moderna', code: '273142', credits: 4, area: 'general', areaName: 'Básico General Científico Disciplinar', status: 'pending' },
      { name: 'Estadística y Probabilidad', code: '273243', credits: 3, area: 'ciencias_basicas', areaName: 'Ciencias Básicas de Ingeniería', status: 'approved', grade: '4.20' },
      { name: 'Electrónica Digital', code: '273244', credits: 3, area: 'ciencias_basicas', areaName: 'Ciencias Básicas de Ingeniería', status: 'approved', grade: '3.60' },
      { name: 'Programación Avanzada', code: '273345', credits: 3, area: 'profesional', areaName: 'Básico Específico Profesional', status: 'enrolled', grade: 'Cursando' },
      { name: 'Estructura de Datos II', code: '273346', credits: 3, area: 'profesional', areaName: 'Básico Específico Profesional', status: 'enrolled', grade: 'Cursando' },
    ],
  },
  {
    semesterNumber: 5,
    roman: 'V',
    subtotalCredits: 17,
    courses: [
      { name: 'Métodos Numéricos', code: '273251', credits: 3, area: 'ciencias_basicas', areaName: 'Ciencias Básicas de Ingeniería', status: 'enrolled', grade: 'Cursando' },
      { name: 'Arquitectura del Computador', code: '273352', credits: 3, area: 'profesional', areaName: 'Básico Específico Profesional', status: 'enrolled', grade: 'Cursando' },
      { name: 'Base de Datos I', code: '273353', credits: 3, area: 'profesional', areaName: 'Básico Específico Profesional', status: 'pending' },
      { name: 'Análisis y Diseño de Sistemas', code: '273354', credits: 3, area: 'profesional', areaName: 'Básico Específico Profesional', status: 'approved', grade: '3.50' },
      { name: 'Compiladores', code: '273355', credits: 3, area: 'profesional', areaName: 'Básico Específico Profesional', status: 'pending' },
      { name: 'Organizaciones', code: '273556', credits: 2, area: 'socio_humanistico', areaName: 'Socio Humanístico Investigativo', status: 'approved', grade: '3.30' },
    ],
  },
  {
    semesterNumber: 6,
    roman: 'VI',
    subtotalCredits: 18,
    courses: [
      { name: 'Investigación de Operaciones', code: '273261', credits: 3, area: 'ciencias_basicas', areaName: 'Ciencias Básicas de Ingeniería', status: 'enrolled', grade: 'Cursando (Adelantada)' },
      { name: 'Sistemas Operativos', code: '273363', credits: 3, area: 'profesional', areaName: 'Básico Específico Profesional', status: 'pending' },
      { name: 'Base de Datos II', code: '273364', credits: 3, area: 'profesional', areaName: 'Básico Específico Profesional', status: 'pending' },
      { name: 'Ingeniería de Software I', code: '273365', credits: 3, area: 'profesional', areaName: 'Básico Específico Profesional', status: 'pending' },
      { name: 'Redes I', code: '273366', credits: 3, area: 'profesional', areaName: 'Básico Específico Profesional', status: 'enrolled', grade: 'Cursando (Adelantada)' },
      { name: 'Metodología de la Investigación', code: '273262', credits: 3, area: 'socio_humanistico', areaName: 'Socio Humanístico Investigativo', status: 'enrolled', grade: 'Cursando (Adelantada)' },
    ],
  },
  {
    semesterNumber: 7,
    roman: 'VII',
    subtotalCredits: 15,
    courses: [
      { name: 'Modelos', code: '273372', credits: 3, area: 'profesional', areaName: 'Básico Específico Profesional', status: 'pending' },
      { name: 'Ingeniería de Software II', code: '273374', credits: 3, area: 'profesional', areaName: 'Básico Específico Profesional', status: 'pending' },
      { name: 'Redes II', code: '273375', credits: 3, area: 'profesional', areaName: 'Básico Específico Profesional', status: 'pending' },
      { name: 'Formulación y Ev. de Proyectos', code: '273271', credits: 3, area: 'socio_humanistico', areaName: 'Socio Humanístico Investigativo', status: 'pending' },
      { name: 'Ingeniería Económica', code: '273576', credits: 3, area: 'socio_humanistico', areaName: 'Socio Humanístico Investigativo', status: 'pending' },
    ],
  },
  {
    semesterNumber: 8,
    roman: 'VIII',
    subtotalCredits: 18,
    courses: [
      { name: 'Simulación', code: '273381', credits: 3, area: 'profesional', areaName: 'Básico Específico Profesional', status: 'pending' },
      { name: 'Electiva de Profundización I', code: '273382', credits: 3, area: 'profesional', areaName: 'Básico Específico Profesional', status: 'pending' },
      { name: 'Gerencia de Proyectos', code: '273383', credits: 3, area: 'profesional', areaName: 'Básico Específico Profesional', status: 'pending' },
      { name: 'Sistemas de Información', code: '273384', credits: 3, area: 'profesional', areaName: 'Básico Específico Profesional', status: 'pending' },
      { name: 'Desarrollo Web', code: '273385', credits: 3, area: 'profesional', areaName: 'Básico Específico Profesional', status: 'pending' },
      { name: 'Auditoría y Seguridad de la información', code: '273386', credits: 3, area: 'profesional', areaName: 'Básico Específico Profesional', status: 'pending' },
    ],
  },
  {
    semesterNumber: 9,
    roman: 'IX',
    subtotalCredits: 15,
    courses: [
      { name: 'Gestión Tecnológica', code: '273391', credits: 3, area: 'profesional', areaName: 'Básico Específico Profesional', status: 'pending' },
      { name: 'Inteligencia Artificial', code: '273392', credits: 3, area: 'profesional', areaName: 'Básico Específico Profesional', status: 'pending' },
      { name: 'Electiva de Profundización II', code: '273393', credits: 3, area: 'profesional', areaName: 'Básico Específico Profesional', status: 'pending' },
      { name: 'Desarrollo Móvil', code: '273394', credits: 3, area: 'profesional', areaName: 'Básico Específico Profesional', status: 'pending' },
      { name: 'Proyecto I', code: '273595', credits: 3, area: 'socio_humanistico', areaName: 'Socio Humanístico Investigativo', status: 'pending' },
    ],
  },
  {
    semesterNumber: 10,
    roman: 'X',
    subtotalCredits: 11,
    courses: [
      { name: 'Electiva de Profundización III', code: '273301', credits: 3, area: 'profesional', areaName: 'Básico Específico Profesional', status: 'pending' },
      { name: 'Electiva de Profundización IV', code: '273302', credits: 3, area: 'profesional', areaName: 'Básico Específico Profesional', status: 'pending' },
      { name: 'Proyecto II', code: '273503', credits: 3, area: 'socio_humanistico', areaName: 'Socio Humanístico Investigativo', status: 'pending' },
      { name: 'Legislación Informática', code: '273504', credits: 2, area: 'socio_humanistico', areaName: 'Socio Humanístico Investigativo', status: 'pending' },
    ],
  },
];

export const TOTAL_CREDITOS_CARRERA = 169;
