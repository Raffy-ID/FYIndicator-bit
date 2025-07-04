import React from 'react';
import { ItemData, ItemStatus, ProgressBarItemData, SettingsData, DateFormatOption, ProgressBarStyleOption } from '../types';
import { useTimeProgress } from '../hooks/useTimeProgress';
import { formatDuration, formatAge } from '../utils/time';

// Progress Bar Style Components
import HorizontalProgressBar from './HorizontalProgressBar';
import CircularProgressBar from './CircularProgressBar';
import IndonesiaFlagProgressBar from './progress-styles/IndonesiaFlagProgressBar';
import PalestineFlagProgressBar from './progress-styles/PalestineFlagProgressBar';


interface ProgressBarItemProps {
  item: ItemData;
  settings: SettingsData;
}

const formatDate = (date: Date, format: DateFormatOption, options: Intl.DateTimeFormatOptions) => {
    if (format === DateFormatOption.YYYYMMDD) {
        const year = date.toLocaleString('default', { year: 'numeric', timeZone: options.timeZone });
        const month = date.toLocaleString('default', { month: '2-digit', timeZone: options.timeZone });
        const day = date.toLocaleString('default', { day: '2-digit', timeZone: options.timeZone });
        return `${year}-${month}-${day}`;
    }
    // Locale Default
    return date.toLocaleDateString(undefined, { ...options, year: 'numeric', month: '2-digit', day: '2-digit' });
};

const ProgressBarItem: React.FC<ProgressBarItemProps> = ({ item, settings }) => {
  const { progress, status, timeDetails } = useTimeProgress(item);
  const { dateFormat, progressBarStyle, progressBarColor, progressBarBackgroundColor, itemTextColor } = settings;

  const renderProgressBar = () => {
      const props = {
          progress,
          status,
          color: progressBarColor,
          backgroundColor: progressBarBackgroundColor,
          textColor: itemTextColor,
      };

      switch (progressBarStyle) {
        case ProgressBarStyleOption.Circle:
          return <div className="flex justify-center my-4"><CircularProgressBar {...props} /></div>;
        case ProgressBarStyleOption.IndonesiaFlag:
          return <div className="my-2"><IndonesiaFlagProgressBar progress={progress} /></div>;
        case ProgressBarStyleOption.PalestineFlag:
          return <div className="my-2"><PalestineFlagProgressBar progress={progress} /></div>;
        // All other unimplemented styles fall back to the default horizontal bar.
        case ProgressBarStyleOption.HorizontalBar:
        case ProgressBarStyleOption.Hourglass:
        case ProgressBarStyleOption.Square:
        case ProgressBarStyleOption.Hexagonal:
        case ProgressBarStyleOption.BarChart:
        case ProgressBarStyleOption.VennDiagram:
        case ProgressBarStyleOption.Curve:
        case ProgressBarStyleOption.DigitalPixelCircle:
        case ProgressBarStyleOption.DigitalPixelSquare:
        default:
          return <div className="my-2"><HorizontalProgressBar {...props} /></div>;
      }
  };

  const renderTimeBasedDetails = () => {
    const timeBasedItem = item as ProgressBarItemData;
    const start = new Date(timeBasedItem.startTime);
    const end = new Date(timeBasedItem.endTime);
    
    const timeOptions: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true, timeZone: timeBasedItem.timeZone };
    const dateOptions: Intl.DateTimeFormatOptions = { timeZone: timeBasedItem.timeZone };
    
    const textColorStyle = { color: itemTextColor };
    const secondaryTextColorStyle = { color: document.documentElement.classList.contains('dark') ? '#94a3b8' : '#64748b' }; // slate-400 / slate-500


    const renderStatusText = () => {
        const { countdownMessages, displayUnits, stopWhenCompleted } = timeBasedItem;
        
        if (status === ItemStatus.Upcoming) {
            return `${countdownMessages.preStart} ${formatDuration(timeDetails.untilStart, displayUnits)}`;
        }
        if (status === ItemStatus.InProgress) {
            return `${countdownMessages.countdown} ${formatDuration(timeDetails.remaining, displayUnits)}`;
        }
        if (status === ItemStatus.Completed) {
            if (!stopWhenCompleted && timeDetails.elapsedSinceEnd > 0) {
                return `${countdownMessages.postEnd} ${formatDuration(timeDetails.elapsedSinceEnd, displayUnits)}`;
            }
            return countdownMessages.completion;
        }
        return null;
    };

    return (
        <>
            <div className="flex justify-between items-center mb-1">
                <h2 className="text-xl font-semibold" style={textColorStyle}>{timeBasedItem.title}</h2>
                {timeBasedItem.displayOptions.progressBar && ![ProgressBarStyleOption.Circle, ProgressBarStyleOption.HorizontalBar].includes(progressBarStyle) && (
                   <span className="text-lg font-medium" style={textColorStyle}>
                        {progress.toFixed(timeBasedItem.decimalPlaces)}%
                   </span>
                )}
            </div>
            {timeBasedItem.displayOptions.progressBar && renderProgressBar()}
            <div className="flex justify-between text-sm" style={secondaryTextColorStyle}>
                {timeBasedItem.displayOptions.startTime ? (
                  <div className="text-left">
                      <div>Start Time:</div>
                      <div>{formatDate(start, dateFormat, dateOptions)}</div>
                      <div>{start.toLocaleTimeString(undefined, timeOptions)}</div>
                  </div>
                ) : <div></div>}
                {timeBasedItem.type === 'time-based' && timeBasedItem.displayOptions.endTime ? (
                    <div className="text-right">
                        <div>End Time:</div>
                        <div>{formatDate(end, dateFormat, dateOptions)}</div>
                        <div>{end.toLocaleTimeString(undefined, timeOptions)}</div>
                    </div>
                ): <div></div>}
            </div>
            <div className="text-center mt-2" style={textColorStyle}>
                {renderStatusText()}
            </div>
        </>
    );
  };

  const renderAgeDetails = () => {
      const textColorStyle = { color: itemTextColor };
      const secondaryTextColorStyle = { color: document.documentElement.classList.contains('dark') ? '#94a3b8' : '#64748b' };
      return (
        <div className="text-center">
            <h2 className="text-xl font-semibold mb-2" style={textColorStyle}>{item.title}</h2>
            <p className="text-md" style={secondaryTextColorStyle}>{formatAge(timeDetails.elapsed)}</p>
        </div>
      );
  }

  return (
    <div className="bg-white p-4 shadow-lg rounded-lg mb-4 border border-gray-200 dark:bg-slate-800 dark:border-slate-700">
      {item.type === 'time-based' ? renderTimeBasedDetails() : renderAgeDetails()}
    </div>
  );
};

export default ProgressBarItem;
