export interface FlowchartNode {
  id: string; // e.g. "273111"
  code: string;
  name: string;
  credits: number;
  grade: string;
  status: 'approved' | 'enrolled' | 'pending';
  mod: number; // 1 to 10
  row: number; // vertical order
}

export interface FlowchartEdge {
  from: string;
  to: string;
  color?: string;
}

export const FLOWCHART_NODES: FlowchartNode[] = [
  // Mod: 01
  { id: '273111', code: '273111', name: 'Calculo diferen', credits: 3, grade: '4.40', status: 'approved', mod: 1, row: 1 },
  { id: '273112', code: '273112', name: 'Logica y teoria', credits: 3, grade: '3.50', status: 'approved', mod: 1, row: 2 },
  { id: '273313', code: '273313', name: 'Introduccion a', credits: 3, grade: '3.90', status: 'approved', mod: 1, row: 3 },
  { id: '273314', code: '273314', name: 'Algoritmo y pro', credits: 5, grade: '3.70', status: 'approved', mod: 1, row: 4 },
  { id: '273515', code: '273515', name: 'Competencia com', credits: 3, grade: '4.80', status: 'approved', mod: 1, row: 5 },
  { id: '273516', code: '273516', name: 'Catedra uniguaj', credits: 2, grade: '3.70', status: 'approved', mod: 1, row: 6 },

  // Mod: 02
  { id: '273121', code: '273121', name: 'Calculo integra', credits: 3, grade: '3.60', status: 'approved', mod: 2, row: 1 },
  { id: '273122', code: '273122', name: 'Fisica mecanica', credits: 4, grade: '3.50', status: 'approved', mod: 2, row: 2 },
  { id: '273123', code: '273123', name: 'Algebra lineal', credits: 3, grade: '3.70', status: 'approved', mod: 2, row: 3 },
  { id: '273324', code: '273324', name: 'Algoritmo y pro', credits: 5, grade: '3.40', status: 'approved', mod: 2, row: 4 },
  { id: '273525', code: '273525', name: 'Competencia com', credits: 2, grade: '4.10', status: 'approved', mod: 2, row: 5 },
  { id: '273526', code: '273526', name: 'Humanidades', credits: 2, grade: '4.50', status: 'approved', mod: 2, row: 6 },

  // Mod: 03
  { id: '273131', code: '273131', name: 'Calculo vectori', credits: 3, grade: '4.00', status: 'approved', mod: 3, row: 1 },
  { id: '273132', code: '273132', name: 'Fisica electric', credits: 4, grade: '3.80', status: 'approved', mod: 3, row: 2 },
  { id: '273233', code: '273233', name: 'Teoria de siste', credits: 3, grade: '4.40', status: 'approved', mod: 3, row: 3 },
  { id: '273234', code: '273234', name: 'Fundamento de d', credits: 3, grade: '4.80', status: 'approved', mod: 3, row: 4 },
  { id: '273335', code: '273335', name: 'Estructura de d', credits: 3, grade: '3.20', status: 'approved', mod: 3, row: 5 },
  { id: '273536', code: '273536', name: 'Electiva en cie', credits: 2, grade: '4.30', status: 'approved', mod: 3, row: 6 },

  // Mod: 04
  { id: '273141', code: '273141', name: 'Ecuaciones dife', credits: 3, grade: '3.50', status: 'approved', mod: 4, row: 1 },
  { id: '273142', code: '273142', name: 'Fisica moderna', credits: 4, grade: '.00', status: 'enrolled', mod: 4, row: 2 },
  { id: '273243', code: '273243', name: 'Estadistica y p', credits: 3, grade: '4.20', status: 'approved', mod: 4, row: 3 },
  { id: '273244', code: '273244', name: 'Electronica dig', credits: 3, grade: '3.60', status: 'approved', mod: 4, row: 4 },
  { id: '273346', code: '273346', name: 'Estructura de d', credits: 3, grade: '.00', status: 'enrolled', mod: 4, row: 5 },
  { id: '273556', code: '273556', name: 'Organizaciones', credits: 2, grade: '3.30', status: 'approved', mod: 4, row: 6 },

  // Mod: 05
  { id: '273251', code: '273251', name: 'Metodos numeric', credits: 3, grade: '.00', status: 'enrolled', mod: 5, row: 1 },
  { id: '273352', code: '273352', name: 'Arquitectura de', credits: 3, grade: '.00', status: 'enrolled', mod: 5, row: 2 },
  { id: '273353', code: '273353', name: 'Bases de datos', credits: 3, grade: '.00', status: 'pending', mod: 5, row: 3 },
  { id: '273354', code: '273354', name: 'Analisis y dise', credits: 3, grade: '3.50', status: 'approved', mod: 5, row: 4 },
  { id: '273355', code: '273355', name: 'Compiladores', credits: 3, grade: '.00', status: 'pending', mod: 5, row: 5 },
  { id: '273345', code: '273345', name: 'Programacion av', credits: 3, grade: '.00', status: 'enrolled', mod: 5, row: 6 },

  // Mod: 06
  { id: '273261', code: '273261', name: 'Investigacion d', credits: 3, grade: '.00', status: 'enrolled', mod: 6, row: 1 },
  { id: '273262', code: '273262', name: 'Metodologia de', credits: 3, grade: '.00', status: 'enrolled', mod: 6, row: 2 },
  { id: '273363', code: '273363', name: 'Sistemas operat', credits: 3, grade: '.00', status: 'pending', mod: 6, row: 3 },
  { id: '273364', code: '273364', name: 'Bases de datos', credits: 3, grade: '.00', status: 'pending', mod: 6, row: 4 },
  { id: '273365', code: '273365', name: 'Ingenieria de s', credits: 3, grade: '.00', status: 'enrolled', mod: 6, row: 5 },
  { id: '273366', code: '273366', name: 'Redes i', credits: 3, grade: '.00', status: 'enrolled', mod: 6, row: 6 },

  // Mod: 07
  { id: '273271', code: '273271', name: 'Formulacion y e', credits: 3, grade: '.00', status: 'pending', mod: 7, row: 1 },
  { id: '273372', code: '273372', name: 'Modelos', credits: 3, grade: '.00', status: 'pending', mod: 7, row: 2 },
  { id: '273374', code: '273374', name: 'Ingenieria de s', credits: 3, grade: '.00', status: 'pending', mod: 7, row: 3 },
  { id: '273375', code: '273375', name: 'Redes ii', credits: 3, grade: '.00', status: 'pending', mod: 7, row: 4 },
  { id: '273576', code: '273576', name: 'Ingenieria econ', credits: 3, grade: '.00', status: 'pending', mod: 7, row: 5 },

  // Mod: 08
  { id: '273381', code: '273381', name: 'Simulacion', credits: 3, grade: '.00', status: 'pending', mod: 8, row: 1 },
  { id: '273382', code: '273382', name: 'Electiva de pro', credits: 3, grade: '.00', status: 'pending', mod: 8, row: 2 },
  { id: '273383', code: '273383', name: 'Gerencia de pro', credits: 3, grade: '.00', status: 'pending', mod: 8, row: 3 },
  { id: '273384', code: '273384', name: 'Sistema de info', credits: 3, grade: '.00', status: 'pending', mod: 8, row: 4 },
  { id: '273385', code: '273385', name: 'Desarrollo web', credits: 3, grade: '.00', status: 'pending', mod: 8, row: 5 },
  { id: '273386', code: '273386', name: 'Auditoria y seg', credits: 3, grade: '.00', status: 'pending', mod: 8, row: 6 },
  { id: '273504', code: '273504', name: 'Legislacion inf', credits: 2, grade: '.00', status: 'pending', mod: 8, row: 7 },

  // Mod: 09
  { id: '273391', code: '273391', name: 'Gestion tecnolo', credits: 3, grade: '.00', status: 'pending', mod: 9, row: 1 },
  { id: '273392', code: '273392', name: 'Inteligencia ar', credits: 3, grade: '.00', status: 'pending', mod: 9, row: 2 },
  { id: '273393', code: '273393', name: 'Electiva de pro', credits: 3, grade: '.00', status: 'pending', mod: 9, row: 3 },
  { id: '273394', code: '273394', name: 'Desarrollo movi', credits: 3, grade: '.00', status: 'pending', mod: 9, row: 4 },
  { id: '273595', code: '273595', name: 'Proyecto i', credits: 3, grade: '.00', status: 'pending', mod: 9, row: 5 },

  // Mod: 10
  { id: '273301', code: '273301', name: 'Electiva de pro', credits: 3, grade: '.00', status: 'pending', mod: 10, row: 1 },
  { id: '273302', code: '273302', name: 'Electiva de pro', credits: 3, grade: '.00', status: 'pending', mod: 10, row: 2 },
  { id: '273503', code: '273503', name: 'Proyecto ii', credits: 3, grade: '.00', status: 'pending', mod: 10, row: 3 },
];

export const FLOWCHART_EDGES: FlowchartEdge[] = [
  // Math & Physics lines
  { from: '273111', to: '273121', color: '#0ea5e9' }, // Calculo diferen -> integra
  { from: '273121', to: '273131', color: '#334155' }, // Calculo integra -> vectori
  { from: '273121', to: '273122', color: '#0284c7' }, // Calculo integra -> fisica mecanica
  { from: '273131', to: '273141', color: '#334155' }, // Calculo vectori -> ecuaciones
  { from: '273122', to: '273132', color: '#334155' }, // Fisica mecanica -> electric
  { from: '273132', to: '273142', color: '#10b981' }, // Fisica electric -> moderna
  { from: '273141', to: '273251', color: '#334155' }, // Ecuaciones -> metodos numericos

  // Algorithms & Programming line
  { from: '273314', to: '273324', color: '#334155' }, // Algoritmo 1 -> 2
  { from: '273324', to: '273335', color: '#6366f1' }, // Algoritmo 2 -> Estructura datos 1
  { from: '273324', to: '273353', color: '#0ea5e9' }, // Algoritmo 2 -> Bases de datos
  { from: '273335', to: '273346', color: '#22c55e' }, // Estructura datos 1 -> 2
  { from: '273346', to: '273345', color: '#22c55e' }, // Estructura datos 2 -> Programacion av
  { from: '273346', to: '273355', color: '#0ea5e9' }, // Estructura datos 2 -> Compiladores

  // Hardware line
  { from: '273244', to: '273352', color: '#06b6d4' }, // Electronica dig -> Arquitectura
  { from: '273352', to: '273363', color: '#3b82f6' }, // Arquitectura -> Sistemas operat

  // Communication line
  { from: '273515', to: '273525', color: '#334155' }, // Competencia com 1 -> 2

  // Advanced Systems line
  { from: '273251', to: '273261', color: '#0284c7' }, // Metodos numeric -> Investigacion d
  { from: '273354', to: '273365', color: '#06b6d4' }, // Analisis -> Ingenieria software 1
  { from: '273365', to: '273374', color: '#22c55e' }, // Ingenieria software 1 -> 2
  { from: '273366', to: '273375', color: '#06b6d4' }, // Redes 1 -> Redes 2
  { from: '273374', to: '273383', color: '#22c55e' }, // Ingenieria software 2 -> Gerencia de pro
  { from: '273261', to: '273381', color: '#22c55e' }, // Investigacion d -> Simulacion
  { from: '273595', to: '273503', color: '#0284c7' }, // Proyecto 1 -> Proyecto 2
];
