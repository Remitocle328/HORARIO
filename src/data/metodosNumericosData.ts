export interface SolvedIteration {
  iteration: number;
  xFormula: string;
  xValue: number;
  yFormula: string;
  yValue: number;
  resultPair: string;
}

export interface ProposedExercise {
  id: number;
  title: string;
  equations: string[];
  targetSolution: { x: number; y: number; z?: number };
  systemType: '2x2' | '3x3';
}

export const METODOS_NUMERICOS_LESSON = {
  title: 'Método de Jacobi y Gauss-Seidel',
  subtitle: 'Métodos Iterativos para Sistemas de Ecuaciones Lineales',
  courseCode: '273251',
  group: 'B1',
  professor: 'YISSET ANDREA PIMIENTA ZAPATA',

  queSonMetodosIterativos:
    'Un método iterativo es un algoritmo que trata de resolver un sistema de ecuaciones mediante aproximaciones sucesivas, repitiendo un ciclo (bucle) hasta encontrar la respuesta con el nivel de precisión deseado.',

  interpretacionAlgoritmica:
    'A diferencia de métodos directos (como eliminación de Gauss), aquí no resolvemos todo de un golpe. Empezamos con una "adivinanza" inicial (usualmente x=0, y=0) y la actualizamos constantemente. Para que estos métodos converjan, la matriz del sistema debe ser diagonalmente dominante (el valor absoluto del coeficiente de la diagonal principal debe ser estrictamente mayor o igual a la suma de los demás coeficientes en su fila).',

  jacobi: {
    name: 'Método de Jacobi (El cálculo en paralelo)',
    concept:
      'Calcula el siguiente valor de las variables utilizando únicamente los resultados de la iteración anterior.',
    characteristics: [
      'Se basa en una "fotografía" de los datos viejos.',
      'Calcula todas las variables al mismo tiempo para el nuevo ciclo.',
      'Al ser cálculos independientes, es un proceso paralelizable a nivel computacional.',
      'La actualización de las variables en memoria ocurre solo al final de la iteración.',
    ],
    formulaGeneral:
      'x_i^(k+1) = (1 / a_ii) * [ b_i - sum_{j != i} (a_ij * x_j^(k)) ]',
    exercise1: {
      title: 'Ejercicio 1: Método de Jacobi (Arranque)',
      system: ['4x - y = 7', 'x + 3y = 5'],
      despejes: ['x = (7 + y) / 4', 'y = (5 - x) / 3'],
      targetSolution: 'x = 2, y = 1',
      initialGuess: 'x(0) = 0, y(0) = 0',
      iterations: [
        {
          iteration: 1,
          xCalc: 'x(1) = (7 + 0) / 4 = 1.75',
          yCalc: 'y(1) = (5 - 0) / 3 = 1.666...',
          result: '(1.75, 1.66)',
        },
        {
          iteration: 2,
          xCalc: 'x(2) = (7 + 1.66) / 4 = 8.66 / 4 = 2.165',
          yCalc: 'y(2) = (5 - 1.75) / 3 = 3.25 / 3 = 1.083',
          result: '(2.165, 1.083)',
        },
        {
          iteration: 3,
          xCalc: 'x(3) = (7 + 1.083) / 4 = 8.083 / 4 = 2.020',
          yCalc: 'y(3) = (5 - 2.165) / 3 = 2.835 / 3 = 0.945',
          result: '(2.020, 0.945)',
        },
      ],
      convergenceNote: 'Converge hacia x = 2.000, y = 1.000.',
    },
  },

  gaussSeidel: {
    name: 'Método de Gauss-Seidel (El cálculo secuencial / efecto dominó)',
    concept:
      'Gauss-Seidel es una mejora del método de Jacobi. Apenas calcula una nueva variable, la utiliza inmediatamente para calcular la siguiente en ese mismo ciclo.',
    characteristics: [
      'Utiliza la información más reciente disponible en el sistema ("datos frescos").',
      'Es un proceso estrictamente secuencial (no se puede calcular y sin haber calculado x primero).',
      'Sobreescribe las variables en memoria de inmediato.',
      'Diferencia Clave: Generalmente necesita menos iteraciones (ciclos) para converger a la respuesta correcta.',
    ],
    formulaGeneral:
      'x_i^(k+1) = (1 / a_ii) * [ b_i - sum_{j=1}^{i-1} (a_ij * x_j^(k+1)) - sum_{j=i+1}^{n} (a_ij * x_j^(k)) ]',
    exercise2: {
      title: 'Ejercicio 2: Método de Gauss-Seidel (El efecto dominó)',
      system: ['4x - y = 7', 'x + 3y = 5'],
      despejes: ['x = (7 + y) / 4', 'y = (5 - x) / 3'],
      targetSolution: 'x = 2, y = 1',
      initialGuess: 'x(0) = 0, y(0) = 0',
      iterations: [
        {
          iteration: 1,
          xCalc: 'x(1) = (7 + 0) / 4 = 1.75',
          yCalc: 'y(1) = (5 - 1.75) / 3 = 3.25 / 3 = 1.083 (usando el nuevo x)',
          result: '(1.75, 1.08)',
        },
        {
          iteration: 2,
          xCalc: 'x(2) = (7 + 1.08) / 4 = 8.08 / 4 = 2.02',
          yCalc: 'y(2) = (5 - 2.02) / 3 = 2.98 / 3 = 0.99 (usando el nuevo x)',
          result: '(2.02, 0.99)',
        },
        {
          iteration: 3,
          xCalc: 'x(3) = (7 + 0.99) / 4 = 7.99 / 4 = 1.997... ≈ 2.00',
          yCalc: 'y(3) = (5 - 2.00) / 3 = 3.00 / 3 = 1.00',
          result: '(2.00, 1.00)',
        },
      ],
      convergenceNote: 'Alcanza la solución exacta (2, 1) en solo 3 iteraciones.',
    },
  },

  ejerciciosPropuestos: [
    {
      id: 1,
      title: 'Ejercicio Propuesto 1 (2x2)',
      equations: ['4x + y = 11', 'x + 5y = 17'],
      targetSolution: { x: 2, y: 3 },
      systemType: '2x2',
    },
    {
      id: 2,
      title: 'Ejercicio Propuesto 2 (2x2)',
      equations: ['5x - y = 13', 'x + 4y = 11'],
      targetSolution: { x: 3, y: 2 },
      systemType: '2x2',
    },
    {
      id: 3,
      title: 'Ejercicio Propuesto 3 (3x3)',
      equations: ['5x + y - z = 4', 'x + 6y + z = 16', 'x - y + 5z = 14'],
      targetSolution: { x: 1, y: 2, z: 3 },
      systemType: '3x3',
    },
    {
      id: 4,
      title: 'Ejercicio Propuesto 4 (3x3)',
      equations: ['6x + y + z = 15', 'x + 5y - z = 5', '2x - y + 6z = 15'],
      targetSolution: { x: 2, y: 1, z: 2 },
      systemType: '3x3',
    },
  ],
};
