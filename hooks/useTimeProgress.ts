
import { useState, useEffect } from 'react';
import { ItemData, ItemStatus, ProgressBarItemData, AgeItemData } from '../types';
import { calculateProgress } from '../utils/time';

interface TimeProgressState {
  progress: number;
  status: ItemStatus;
  timeDetails: {
    remaining: number;
    elapsed: number;
    untilStart: number;
    elapsedSinceEnd: number;
  };
}

export const useTimeProgress = (item: ItemData): TimeProgressState => {
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(Date.now());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const { startTime: startStr, type } = item;
  const endTimeStr = type === 'time-based' ? (item as ProgressBarItemData).endTime : new Date().toISOString();

  const startTime = new Date(startStr).getTime();
  const endTime = new Date(endTimeStr).getTime();

  const getStatus = (): ItemStatus => {
    if (now < startTime) return ItemStatus.Upcoming;
    if (type === 'time-based') {
        const timeBasedItem = item as ProgressBarItemData;
        if (now >= endTime) {
             // If stopWhenCompleted is true, it is just Completed.
             // If false, it's also Completed, but the UI will show time since completion.
            return ItemStatus.Completed;
        }
    }
    return ItemStatus.InProgress;
  };
  
  const status = getStatus();
  
  let progress = 0;
  if (type === 'time-based') {
      const timeBasedItem = item as ProgressBarItemData;
      // If timer shouldn't stop, progress can exceed 100, but we cap it for the bar display.
      const currentProgress = calculateProgress(startTime, endTime, now);
      progress = timeBasedItem.stopWhenCompleted ? Math.min(100, currentProgress) : currentProgress;
  } else if (type === 'age') {
      // For "age", progress can be seen as percentage of the current year completed
      const startOfYear = new Date(new Date(now).getFullYear(), 0, 1).getTime();
      const endOfYear = new Date(new Date(now).getFullYear(), 11, 31, 23, 59, 59).getTime();
      progress = calculateProgress(startOfYear, endOfYear, now);
  }


  return {
    progress,
    status,
    timeDetails: {
      remaining: Math.max(0, endTime - now),
      elapsed: Math.max(0, now - startTime),
      untilStart: Math.max(0, startTime - now),
      elapsedSinceEnd: Math.max(0, now - endTime),
    }
  };
};