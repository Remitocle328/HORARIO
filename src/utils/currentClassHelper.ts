import { DAYS, SCHEDULE_SLOTS, TIME_INTERVALS, SUBJECTS, FullSubject } from '../data/scheduleData';
import { ScheduleSlot } from '../types';

export interface ClassSession {
  subject: FullSubject;
  dayIndex: number;
  dayName: string;
  intervalIndices: number[];
  startTime: string; // e.g. "08:00"
  endTime: string;   // e.g. "09:29"
  startMinutes: number;
  endMinutes: number;
  classroom: string;
  building: string;
}

export function parseTimeToMinutes(timeStr: string): number {
  const [h, m] = timeStr.split(':').map(Number);
  return h * 60 + m;
}

/**
 * Computes all consolidated continuous class sessions from SCHEDULE_SLOTS.
 */
export function getAllClassSessions(): ClassSession[] {
  const sessions: ClassSession[] = [];

  for (let day = 0; day < 6; day++) {
    const daySlots = SCHEDULE_SLOTS.filter((s) => s.dayIndex === day).sort(
      (a, b) => a.intervalIndex - b.intervalIndex
    );

    let currentSession: {
      subjectCode: string;
      intervalIndices: number[];
    } | null = null;

    for (const slot of daySlots) {
      if (
        currentSession &&
        currentSession.subjectCode === slot.subjectCode &&
        (slot.intervalIndex === currentSession.intervalIndices[currentSession.intervalIndices.length - 1] + 1 ||
         (currentSession.intervalIndices[currentSession.intervalIndices.length - 1] === 8 && slot.intervalIndex === 9))
      ) {
        currentSession.intervalIndices.push(slot.intervalIndex);
      } else {
        if (currentSession) {
          const sub = SUBJECTS.find((s) => s.code === currentSession!.subjectCode);
          if (sub) {
            const firstInterval = TIME_INTERVALS[currentSession.intervalIndices[0]];
            const lastInterval = TIME_INTERVALS[currentSession.intervalIndices[currentSession.intervalIndices.length - 1]];
            sessions.push({
              subject: sub,
              dayIndex: day,
              dayName: DAYS[day].name,
              intervalIndices: currentSession.intervalIndices,
              startTime: firstInterval.start,
              endTime: lastInterval.end,
              startMinutes: parseTimeToMinutes(firstInterval.start),
              endMinutes: parseTimeToMinutes(lastInterval.end),
              classroom: sub.classroom,
              building: sub.building,
            });
          }
        }
        currentSession = {
          subjectCode: slot.subjectCode,
          intervalIndices: [slot.intervalIndex],
        };
      }
    }

    if (currentSession) {
      const sub = SUBJECTS.find((s) => s.code === currentSession.subjectCode);
      if (sub) {
        const firstInterval = TIME_INTERVALS[currentSession.intervalIndices[0]];
        const lastInterval = TIME_INTERVALS[currentSession.intervalIndices[currentSession.intervalIndices.length - 1]];
        sessions.push({
          subject: sub,
          dayIndex: day,
          dayName: DAYS[day].name,
          intervalIndices: currentSession.intervalIndices,
          startTime: firstInterval.start,
          endTime: lastInterval.end,
          startMinutes: parseTimeToMinutes(firstInterval.start),
          endMinutes: parseTimeToMinutes(lastInterval.end),
          classroom: sub.classroom,
          building: sub.building,
        });
      }
    }
  }

  return sessions;
}

export interface CurrentClassState {
  currentDayIndex: number; // 0..5 (Lunes..Sabado) or -1 for Domingo
  currentMinutes: number;
  activeSession: ClassSession | null;
  activeIntervalIndex: number | null;
  activeSlots: ScheduleSlot[];
  timeRemainingMinutes: number | null;
  nextSession: ClassSession | null;
  timeDisplay: string;
  dayDisplay: string;
}

/**
 * Calculates current active class in real time from system clock.
 */
export function getCurrentClassInfo(date: Date): CurrentClassState {
  const allSessions = getAllClassSessions();

  // JavaScript getDay(): 0 is Sunday, 1 is Monday...
  const jsDay = date.getDay();
  let dayIndex: number;
  if (jsDay >= 1 && jsDay <= 6) {
    dayIndex = jsDay - 1; // 0 is Lunes, 1 is Martes, etc.
  } else {
    dayIndex = -1; // Sunday
  }
  const currentMinutes = date.getHours() * 60 + date.getMinutes();

  // Find if within any session on this day
  const activeSession = dayIndex >= 0
    ? allSessions.find(
        (s) =>
          s.dayIndex === dayIndex &&
          currentMinutes >= s.startMinutes &&
          currentMinutes <= s.endMinutes
      ) || null
    : null;

  // Find exact interval
  let activeIntervalIndex: number | null = null;
  if (dayIndex >= 0) {
    for (const interval of TIME_INTERVALS) {
      const sMin = parseTimeToMinutes(interval.start);
      const eMin = parseTimeToMinutes(interval.end);
      if (currentMinutes >= sMin && currentMinutes <= eMin) {
        activeIntervalIndex = interval.id;
        break;
      }
    }
  }

  // Find all slots belonging to the active session on this day
  const activeSlots = activeSession
    ? SCHEDULE_SLOTS.filter(
        (slot) =>
          slot.dayIndex === dayIndex &&
          slot.subjectCode === activeSession.subject.code &&
          activeSession.intervalIndices.includes(slot.intervalIndex)
      )
    : [];

  const timeRemainingMinutes = activeSession
    ? Math.max(0, activeSession.endMinutes - currentMinutes)
    : null;

  // Next upcoming session
  let nextSession: ClassSession | null = null;
  if (dayIndex >= 0) {
    // Upcoming today
    const upcomingToday = allSessions
      .filter((s) => s.dayIndex === dayIndex && s.startMinutes > currentMinutes)
      .sort((a, b) => a.startMinutes - b.startMinutes);

    if (upcomingToday.length > 0) {
      nextSession = upcomingToday[0];
    } else {
      // Look at subsequent days
      for (let offset = 1; offset <= 6; offset++) {
        const nextDay = (dayIndex + offset) % 6;
        const upcomingDay = allSessions
          .filter((s) => s.dayIndex === nextDay)
          .sort((a, b) => a.startMinutes - b.startMinutes);
        if (upcomingDay.length > 0) {
          nextSession = upcomingDay[0];
          break;
        }
      }
    }
  }

  const hours = Math.floor(currentMinutes / 60);
  const mins = currentMinutes % 60;
  const period = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 === 0 ? 12 : hours % 12;
  const timeDisplay = `${String(displayHours).padStart(2, '0')}:${String(mins).padStart(2, '0')} ${period}`;
  const dayDisplay = dayIndex >= 0 && dayIndex < DAYS.length ? DAYS[dayIndex].name : 'DOMINGO';

  return {
    currentDayIndex: dayIndex,
    currentMinutes,
    activeSession,
    activeIntervalIndex,
    activeSlots,
    timeRemainingMinutes,
    nextSession,
    timeDisplay,
    dayDisplay,
  };
}
