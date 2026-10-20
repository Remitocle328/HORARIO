import { TIME_INTERVALS, SCHEDULE_SLOTS, SUBJECTS, FullSubject } from '../data/scheduleData';

export interface ActiveClassState {
  isActive: boolean;
  dayIndex: number | null; // 0: Lunes, 1: Martes, etc.
  intervalIndex: number | null;
  subject: FullSubject | null;
  slot: typeof SCHEDULE_SLOTS[0] | null;
  intervalLabel: string | null;
  timeRemainingMinutes: number | null;
  nextClass: {
    subject: FullSubject;
    dayName: string;
    timeStart: string;
    classroom: string;
  } | null;
}

export function parseMinutes(timeStr: string): number {
  const [h, m] = timeStr.split(':').map(Number);
  return h * 60 + m;
}

export function getDayIndexFromDay(dayOfWeek: number): number | null {
  // 1: Lunes -> 0, 2: Martes -> 1, 3: Miércoles -> 2, 4: Jueves -> 3, 5: Viernes -> 4, 6: Sábado -> 5
  if (dayOfWeek >= 1 && dayOfWeek <= 6) {
    return dayOfWeek - 1;
  }
  return null; // Domingo
}

export function getCurrentActiveClass(customDate?: Date): ActiveClassState {
  const now = customDate || new Date();
  const dayIndex = getDayIndexFromDay(now.getDay());
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  // If Sunday, no classes
  if (dayIndex === null) {
    return {
      isActive: false,
      dayIndex: null,
      intervalIndex: null,
      subject: null,
      slot: null,
      intervalLabel: null,
      timeRemainingMinutes: null,
      nextClass: findNextClass(0, 0), // Look for Monday morning
    };
  }

  // Find matching interval
  let matchedIntervalIndex: number | null = null;
  let timeRemaining: number | null = null;
  let intervalLabel: string | null = null;

  for (let i = 0; i < TIME_INTERVALS.length; i++) {
    const startM = parseMinutes(TIME_INTERVALS[i].start);
    const endM = parseMinutes(TIME_INTERVALS[i].end);

    if (currentMinutes >= startM && currentMinutes <= endM) {
      matchedIntervalIndex = i;
      timeRemaining = endM - currentMinutes;
      intervalLabel = TIME_INTERVALS[i].label;
      break;
    }
  }

  if (matchedIntervalIndex !== null) {
    // Check if there is an active class slot at this day and interval
    const slot = SCHEDULE_SLOTS.find(
      (s) => s.dayIndex === dayIndex && s.intervalIndex === matchedIntervalIndex
    );

    if (slot) {
      const subject = SUBJECTS.find((s) => s.code === slot.subjectCode) || null;
      return {
        isActive: true,
        dayIndex,
        intervalIndex: matchedIntervalIndex,
        subject,
        slot,
        intervalLabel,
        timeRemainingMinutes: timeRemaining,
        nextClass: null,
      };
    }
  }

  // If not currently in class, find next class
  return {
    isActive: false,
    dayIndex,
    intervalIndex: matchedIntervalIndex,
    subject: null,
    slot: null,
    intervalLabel,
    timeRemainingMinutes: null,
    nextClass: findNextClass(dayIndex, currentMinutes),
  };
}

const DAY_NAMES = ['LUNES', 'MARTES', 'MIÉRCOLES', 'JUEVES', 'VIERNES', 'SÁBADO'];

function findNextClass(startDayIndex: number, currentMinutes: number) {
  // Search today first after currentMinutes
  for (let dayOffset = 0; dayOffset < 6; dayOffset++) {
    const dIndex = (startDayIndex + dayOffset) % 6;
    const isToday = dayOffset === 0;

    for (const interval of TIME_INTERVALS) {
      const startM = parseMinutes(interval.start);
      if (isToday && startM <= currentMinutes) continue;

      const slot = SCHEDULE_SLOTS.find(
        (s) => s.dayIndex === dIndex && s.intervalIndex === interval.id
      );

      if (slot) {
        const subject = SUBJECTS.find((s) => s.code === slot.subjectCode);
        if (subject) {
          return {
            subject,
            dayName: isToday ? 'Hoy' : DAY_NAMES[dIndex],
            timeStart: interval.start,
            classroom: subject.classroom,
          };
        }
      }
    }
  }
  return null;
}
