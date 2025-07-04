export enum ItemStatus {
  Upcoming = 'Upcoming',
  InProgress = 'In Progress',
  Completed = 'Completed',
}

export interface DisplayOptions {
  progressBar: boolean;
  startTime: boolean;
  endTime: boolean;
}

export const timeUnits = ['Years', 'Months', 'Weeks', 'Days', 'Hours', 'Minutes', 'Seconds'] as const;
export type TimeUnit = typeof timeUnits[number];
export type DisplayUnits = { [key in TimeUnit]?: boolean };

export interface CountdownMessages {
  preStart: string;
  starting: string;
  countdown: string;
  completion: string;
  postEnd: string;
}

export interface ProgressBarItemData {
  type: 'time-based';
  id: string;
  title: string;
  startTime: string; // Stored as ISO string (UTC)
  endTime: string;   // Stored as ISO string (UTC)
  timeZone: string;  // IANA timezone name
  displayOptions: DisplayOptions;
  displayUnits: DisplayUnits;
  countdownMessages: CountdownMessages;
  stopWhenCompleted: boolean;
  decimalPlaces: number;
}

export interface AgeItemData {
    type: 'age';
    id: string;
    title: string;
    startTime: string; // Birthday
}

export type ItemData = ProgressBarItemData | AgeItemData;

// Distribute Omit over the union type
export type NewItemData = 
  | (Omit<ProgressBarItemData, 'id'>)
  | (Omit<AgeItemData, 'id'>);

// --- App Settings ---
export enum DateFormatOption {
  LocaleDefault = 'Locale Default',
  YYYYMMDD = 'YYYY-MM-DD',
}

export enum StartOfWeekOption {
  LocaleDefault = 'Locale Default',
  Saturday = 'Saturday',
  Sunday = 'Sunday',
  Monday = 'Monday',
}

export enum WidgetRefreshRateOption {
  FiveSeconds = '5 seconds',
  FifteenSeconds = '15 seconds',
  ThirtySeconds = '30 seconds',
  OneMinute = '1 minute',
  FifteenMinutes = '15 minutes',
  ThirtyMinutes = '30 minutes',
  Hourly = 'Hourly',
  Daily = 'Daily',
}

export enum WidgetTextColorOption {
  Automatic = 'Automatically set from wallpaper',
  White = 'White',
  Black = 'Black',
}

export enum ThemeOption {
  FollowSystem = 'Follow System',
  Day = 'Day',
  Night = 'Night',
  AutoLocationTime = 'Auto (location / time based)',
  AutoBattery = 'Auto Battery (Night mode when saving battery)',
}

export enum ProgressBarStyleOption {
  HorizontalBar = 'Horizontal Bar',
  Hourglass = 'Hourglass',
  Circle = 'Circle',
  Square = 'Square',
  Hexagonal = 'Hexagonal',
  BarChart = 'Bar Chart',
  VennDiagram = 'Venn Diagram',
  Curve = 'Curve',
  DigitalPixelCircle = 'Digital Pixel Circle',
  DigitalPixelSquare = 'Digital Pixel Square',
  IndonesiaFlag = 'Indonesia Flag (Special)',
  PalestineFlag = 'Palestine Flag (Special)',
}

export interface SettingsData {
  dateFormat: DateFormatOption;
  startOfWeek: StartOfWeekOption;
  widgetRefreshRate: WidgetRefreshRateOption;
  widgetTextColor: WidgetTextColorOption;
  theme: ThemeOption;
  progressBarStyle: ProgressBarStyleOption;
  progressBarColor: string;
  progressBarBackgroundColor: string;
  itemTextColor: string;
}
