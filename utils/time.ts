import { DisplayUnits } from '../types';

export const calculateProgress = (startTime: number, endTime: number, now: number) => {
  if (now < startTime) return 0;
  if (now > endTime) return 100;

  const total = endTime - startTime;
  const elapsed = now - startTime;
  
  return (elapsed / total) * 100;
};

const pluralize = (count: number, noun: string): string => `${Math.floor(count)} ${noun}${count !== 1 ? 's' : ''}`;

export const formatDuration = (ms: number, units: DisplayUnits): string => {
  if (ms <= 0) ms = 0;

  let totalSeconds = Math.floor(ms / 1000);
  const parts = [];

  // Note: Year and month calculations are approximations for duration formatting.
  const secondsInDay = 86400;
  const secondsInYear = secondsInDay * 365.2425;
  const secondsInMonth = secondsInDay * 30.436875;
  const secondsInWeek = secondsInDay * 7;

  if (units.Years) {
    const years = Math.floor(totalSeconds / secondsInYear);
    if (years > 0) {
      parts.push(pluralize(years, 'year'));
      totalSeconds -= years * secondsInYear;
    }
  }

  if (units.Months) {
    const months = Math.floor(totalSeconds / secondsInMonth);
    if (months > 0) {
      parts.push(pluralize(months, 'month'));
      totalSeconds -= months * secondsInMonth;
    }
  }

  if (units.Weeks) {
    const weeks = Math.floor(totalSeconds / secondsInWeek);
    if (weeks > 0) {
      parts.push(pluralize(weeks, 'week'));
      totalSeconds -= weeks * secondsInWeek;
    }
  }

  if (units.Days) {
    const days = Math.floor(totalSeconds / secondsInDay);
    if (days > 0) {
      parts.push(pluralize(days, 'day'));
      totalSeconds -= days * secondsInDay;
    }
  }

  if (units.Hours) {
    const hours = Math.floor(totalSeconds / 3600);
    if (hours > 0) {
      parts.push(pluralize(hours, 'hour'));
      totalSeconds -= hours * 3600;
    }
  }

  if (units.Minutes) {
    const minutes = Math.floor(totalSeconds / 60);
    if (minutes > 0) {
      parts.push(pluralize(minutes, 'minute'));
      totalSeconds -= minutes * 60;
    }
  }
  
  const finalSeconds = totalSeconds;
  if (units.Seconds) {
    if (finalSeconds > 0 || parts.length === 0) {
      parts.push(pluralize(finalSeconds, 'second'));
    }
  }

  if (parts.length === 0) return '0 seconds';
  
  if (parts.length > 1) {
    const last = parts.pop();
    return `${parts.join(', ')}, and ${last}`;
  }

  return parts[0];
};

export const formatAge = (ms: number): string => {
    if (ms < 0) ms = 0;

    const date = new Date(0);
    date.setUTCMilliseconds(ms);

    const years = date.getUTCFullYear() - 1970;
    const months = date.getUTCMonth();
    const d = date.getUTCDate() - 1;
    const h = date.getUTCHours();
    const m = date.getUTCMinutes();
    
    const parts = [
        pluralize(years, 'year'),
        pluralize(months, 'month'),
        pluralize(d, 'day'),
        pluralize(h, 'hour'),
        pluralize(m, 'minute'),
    ];

    return parts.join(', ');
};