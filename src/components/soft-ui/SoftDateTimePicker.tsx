import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import {
  Calendar,
  Clock,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronDown,
  X,
  Check,
  RotateCcw,
} from 'lucide-react';

export type DateTimePickerMode = 'date' | 'time' | 'datetime';

export interface SoftDateTimePickerProps {
  /** Mode: 'date' only, 'time' only, or 'datetime' (default: 'datetime') */
  mode?: DateTimePickerMode;
  /** Currently selected Date object */
  value?: Date | null;
  /** Default initial date if uncontrolled */
  defaultValue?: Date | null;
  /** Callback fired when date/time changes */
  onChange?: (date: Date | null, formattedValue: string) => void;
  /** Label displayed above the input trigger */
  label?: string;
  /** Placeholder text for input */
  placeholder?: string;
  /** Error message string */
  error?: string;
  /** Subtitle or helper description */
  helperText?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Read-only state */
  readOnly?: boolean;
  /** Minimum selectable date */
  minDate?: Date;
  /** Maximum selectable date */
  maxDate?: Date;
  /** Whether to use 12-hour AM/PM format (default: true) */
  use12Hours?: boolean;
  /** If true, renders the picker panel inline without a trigger dropdown */
  inline?: boolean;
  /** Minute step size for steppers (default: 5) */
  minuteStep?: number;
  /** Custom wrapper class */
  className?: string;
  /** Custom popover/panel class */
  popupClassName?: string;
}

const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const MONTH_NAMES_SHORT = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const WEEKDAY_NAMES = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

const formatDateTime = (
  date: Date | null,
  mode: DateTimePickerMode = 'datetime',
  use12Hours: boolean = true
): string => {
  if (!date || isNaN(date.getTime())) return '';

  const monthStr = MONTH_NAMES_SHORT[date.getMonth()];
  const day = date.getDate().toString().padStart(2, '0');
  const year = date.getFullYear();

  const hours24 = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');

  let timeStr = '';
  if (use12Hours) {
    const hours12 = (hours24 % 12 || 12).toString().padStart(2, '0');
    const period = hours24 >= 12 ? 'PM' : 'AM';
    timeStr = `${hours12}:${minutes} ${period}`;
  } else {
    timeStr = `${hours24.toString().padStart(2, '0')}:${minutes}`;
  }

  if (mode === 'date') {
    return `${monthStr} ${day}, ${year}`;
  }
  if (mode === 'time') {
    return timeStr;
  }
  return `${monthStr} ${day}, ${year} ${timeStr}`;
};

export const SoftDateTimePicker: React.FC<SoftDateTimePickerProps> = ({
  mode = 'datetime',
  value: controlledValue,
  defaultValue,
  onChange,
  label,
  placeholder,
  error,
  helperText,
  disabled = false,
  readOnly = false,
  minDate,
  maxDate,
  use12Hours = true,
  inline = false,
  minuteStep = 5,
  className = '',
  popupClassName = '',
}) => {
  // Internal selection state
  const [internalValue, setInternalValue] = useState<Date | null>(() => {
    if (controlledValue !== undefined) return controlledValue;
    if (defaultValue !== undefined) return defaultValue;
    return null;
  });

  const selectedDate = controlledValue !== undefined ? controlledValue : internalValue;

  // Active view month and year
  const [viewYear, setViewYear] = useState<number>(() => {
    return (selectedDate || new Date()).getFullYear();
  });
  const [viewMonth, setViewMonth] = useState<number>(() => {
    return (selectedDate || new Date()).getMonth();
  });

  // Popup open/close state (only relevant when inline = false)
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Click outside listener
  useEffect(() => {
    if (inline || !isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, inline]);

  const updateDate = (newDate: Date | null) => {
    if (readOnly || disabled) return;
    if (controlledValue === undefined) {
      setInternalValue(newDate);
    }
    const formatted = formatDateTime(newDate, mode, use12Hours);
    onChange?.(newDate, formatted);
  };

  // Helper for date bounds
  const isDateDisabled = useCallback(
    (d: Date) => {
      if (minDate && d < new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate())) {
        return true;
      }
      if (
        maxDate &&
        d > new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate(), 23, 59, 59)
      ) {
        return true;
      }
      return false;
    },
    [minDate, maxDate]
  );

  // Month navigation
  const handlePrevMonth = () => {
    setViewMonth((prev) => {
      if (prev === 0) {
        setViewYear((y) => y - 1);
        return 11;
      }
      return prev - 1;
    });
  };

  const handleNextMonth = () => {
    setViewMonth((prev) => {
      if (prev === 11) {
        setViewYear((y) => y + 1);
        return 0;
      }
      return prev + 1;
    });
  };

  // Calendar Day Generation
  const calendarDays = useMemo(() => {
    const days: {
      date: Date;
      isCurrentMonth: boolean;
      isToday: boolean;
      isSelected: boolean;
      isDisabled: boolean;
    }[] = [];

    const firstDayIndex = new Date(viewYear, viewMonth, 1).getDay();
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    const daysInPrevMonth = new Date(viewYear, viewMonth, 0).getDate();

    const today = new Date();
    const isSameDay = (d1: Date, d2: Date | null) => {
      if (!d2) return false;
      return (
        d1.getFullYear() === d2.getFullYear() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getDate() === d2.getDate()
      );
    };

    // Previous month padding days
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      const d = new Date(viewYear, viewMonth - 1, daysInPrevMonth - i);
      days.push({
        date: d,
        isCurrentMonth: false,
        isToday: isSameDay(d, today),
        isSelected: isSameDay(d, selectedDate),
        isDisabled: isDateDisabled(d),
      });
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      const d = new Date(viewYear, viewMonth, i);
      days.push({
        date: d,
        isCurrentMonth: true,
        isToday: isSameDay(d, today),
        isSelected: isSameDay(d, selectedDate),
        isDisabled: isDateDisabled(d),
      });
    }

    // Next month padding days to complete 35 or 42 grid
    const remaining = (7 - (days.length % 7)) % 7;
    for (let i = 1; i <= remaining; i++) {
      const d = new Date(viewYear, viewMonth + 1, i);
      days.push({
        date: d,
        isCurrentMonth: false,
        isToday: isSameDay(d, today),
        isSelected: isSameDay(d, selectedDate),
        isDisabled: isDateDisabled(d),
      });
    }

    return days;
  }, [viewYear, viewMonth, selectedDate, isDateDisabled]);

  // Handle Day Click
  const handleSelectDay = (dayDate: Date) => {
    if (isDateDisabled(dayDate) || readOnly || disabled) return;

    let updated: Date;
    if (selectedDate) {
      updated = new Date(
        dayDate.getFullYear(),
        dayDate.getMonth(),
        dayDate.getDate(),
        selectedDate.getHours(),
        selectedDate.getMinutes(),
        selectedDate.getSeconds()
      );
    } else {
      const now = new Date();
      updated = new Date(
        dayDate.getFullYear(),
        dayDate.getMonth(),
        dayDate.getDate(),
        now.getHours(),
        now.getMinutes(),
        0
      );
    }
    updateDate(updated);

    // Auto-close if date-only mode and not inline
    if (mode === 'date' && !inline) {
      setIsOpen(false);
    }
  };

  // Time handling
  const currentHours = selectedDate ? selectedDate.getHours() : new Date().getHours();
  const currentMinutes = selectedDate ? selectedDate.getMinutes() : 0;

  const displayHours = use12Hours ? currentHours % 12 || 12 : currentHours;
  const isPM = currentHours >= 12;

  const handleHoursChange = (delta: number) => {
    let nextHours24 = currentHours + delta;
    if (nextHours24 < 0) nextHours24 = 23;
    if (nextHours24 > 23) nextHours24 = 0;

    const base = selectedDate ? new Date(selectedDate) : new Date();
    base.setHours(nextHours24);
    updateDate(base);
  };

  const handleMinutesChange = (delta: number) => {
    let nextMinutes = currentMinutes + delta;
    if (nextMinutes < 0) nextMinutes = 59;
    if (nextMinutes > 59) nextMinutes = 0;

    const base = selectedDate ? new Date(selectedDate) : new Date();
    base.setMinutes(nextMinutes);
    updateDate(base);
  };

  const handleTogglePeriod = (period: 'AM' | 'PM') => {
    if (!use12Hours) return;
    const base = selectedDate ? new Date(selectedDate) : new Date();
    let h = base.getHours();
    if (period === 'PM' && h < 12) {
      h += 12;
    } else if (period === 'AM' && h >= 12) {
      h -= 12;
    }
    base.setHours(h);
    updateDate(base);
  };

  const handleQuickTime = (hours: number, minutes: number) => {
    const base = selectedDate ? new Date(selectedDate) : new Date();
    base.setHours(hours, minutes, 0);
    updateDate(base);
  };

  const handleSetNow = () => {
    const now = new Date();
    updateDate(now);
    setViewYear(now.getFullYear());
    setViewMonth(now.getMonth());
  };

  const handleClear = () => {
    updateDate(null);
  };

  // Default placeholder text
  const resolvedPlaceholder =
    placeholder ||
    (mode === 'date'
      ? 'Select date...'
      : mode === 'time'
        ? 'Select time...'
        : 'Select date & time...');

  const formattedDisplay = formatDateTime(selectedDate, mode, use12Hours);

  // Picker Panel Content
  const pickerContent = (
    <div
      className={`
        soft-surface soft-raised-lg rounded-2xl p-4 border border-white/20 select-none
        ${inline ? 'w-full max-w-sm' : 'min-w-[280px] sm:min-w-[320px] shadow-2xl'}
        ${popupClassName}
      `}
    >
      {/* 1. DATE CALENDAR SECTION */}
      {(mode === 'date' || mode === 'datetime') && (
        <div className="space-y-3">
          {/* Header Month/Year Selector */}
          <div className="flex items-center justify-between pb-1">
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-sm text-[var(--soft-text)] tracking-tight">
                {MONTH_NAMES[viewMonth]}
              </span>
              <span className="font-mono text-sm font-semibold text-[var(--soft-primary)]">
                {viewYear}
              </span>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handlePrevMonth}
                title="Previous Month"
                className="w-7 h-7 rounded-lg soft-surface soft-raised-xs hover:soft-raised-sm active:soft-pressed-xs flex items-center justify-center text-[var(--soft-text-muted)] hover:text-[var(--soft-text)] cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNextMonth}
                title="Next Month"
                className="w-7 h-7 rounded-lg soft-surface soft-raised-xs hover:soft-raised-sm active:soft-pressed-xs flex items-center justify-center text-[var(--soft-text-muted)] hover:text-[var(--soft-text)] cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Weekday labels */}
          <div className="grid grid-cols-7 gap-1 text-center">
            {WEEKDAY_NAMES.map((name) => (
              <span
                key={name}
                className="text-[11px] font-bold uppercase tracking-wider text-[var(--soft-text-subtle)] py-0.5"
              >
                {name}
              </span>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-1 text-center">
            {calendarDays.map((dayObj, idx) => {
              const dayNum = dayObj.date.getDate();
              return (
                <button
                  key={idx}
                  type="button"
                  disabled={dayObj.isDisabled}
                  onClick={() => handleSelectDay(dayObj.date)}
                  className={`
                    w-8 h-8 mx-auto rounded-xl text-xs font-semibold soft-transition flex items-center justify-center relative cursor-pointer
                    ${
                      dayObj.isSelected
                        ? 'soft-pressed-xs bg-[var(--soft-primary)] text-white font-bold shadow-xs'
                        : dayObj.isToday
                          ? 'soft-raised-xs text-[var(--soft-primary)] font-bold ring-1 ring-[var(--soft-primary)]/40'
                          : dayObj.isCurrentMonth
                            ? 'text-[var(--soft-text)] hover:soft-raised-xs hover:text-[var(--soft-primary)]'
                            : 'text-[var(--soft-text-subtle)]/40 hover:text-[var(--soft-text-muted)]'
                    }
                    ${dayObj.isDisabled ? 'opacity-30 cursor-not-allowed pointer-events-none' : ''}
                  `}
                >
                  <span>{dayNum}</span>
                  {dayObj.isToday && !dayObj.isSelected && (
                    <span className="absolute bottom-1 w-1 h-1 rounded-full bg-[var(--soft-primary)]" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* SEPARATOR (WHEN DATETIME) */}
      {mode === 'datetime' && <div className="my-3 border-t border-[var(--soft-text-subtle)]/15" />}

      {/* 2. TIME SELECTOR SECTION */}
      {(mode === 'time' || mode === 'datetime') && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--soft-text-muted)] flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[var(--soft-primary)]" />
              <span>Time</span>
            </span>

            {/* AM / PM Segmented Control */}
            {use12Hours && (
              <div className="flex items-center gap-1 p-0.5 rounded-lg soft-surface soft-pressed-xs">
                <button
                  type="button"
                  onClick={() => handleTogglePeriod('AM')}
                  className={`
                    px-2 py-0.5 rounded-md text-[11px] font-bold cursor-pointer transition-all
                    ${
                      !isPM
                        ? 'soft-surface soft-raised-xs text-[var(--soft-primary)] font-extrabold'
                        : 'text-[var(--soft-text-muted)] hover:text-[var(--soft-text)]'
                    }
                  `}
                >
                  AM
                </button>
                <button
                  type="button"
                  onClick={() => handleTogglePeriod('PM')}
                  className={`
                    px-2 py-0.5 rounded-md text-[11px] font-bold cursor-pointer transition-all
                    ${
                      isPM
                        ? 'soft-surface soft-raised-xs text-[var(--soft-primary)] font-extrabold'
                        : 'text-[var(--soft-text-muted)] hover:text-[var(--soft-text)]'
                    }
                  `}
                >
                  PM
                </button>
              </div>
            )}
          </div>

          {/* Stepper controls for Hours and Minutes */}
          <div className="flex items-center justify-center gap-3">
            {/* Hours */}
            <div className="flex flex-col items-center">
              <button
                type="button"
                onClick={() => handleHoursChange(1)}
                className="p-1 rounded-md soft-surface soft-raised-xs hover:soft-raised-sm active:soft-pressed-xs text-[var(--soft-text-muted)] hover:text-[var(--soft-primary)] cursor-pointer"
                title="Increase Hours"
              >
                <ChevronUp className="w-3.5 h-3.5" />
              </button>
              <div className="w-12 h-10 my-1 rounded-xl soft-surface soft-pressed-xs flex items-center justify-center font-mono text-base font-bold text-[var(--soft-text)]">
                {displayHours.toString().padStart(2, '0')}
              </div>
              <button
                type="button"
                onClick={() => handleHoursChange(-1)}
                className="p-1 rounded-md soft-surface soft-raised-xs hover:soft-raised-sm active:soft-pressed-xs text-[var(--soft-text-muted)] hover:text-[var(--soft-primary)] cursor-pointer"
                title="Decrease Hours"
              >
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
              <span className="text-[10px] uppercase font-bold text-[var(--soft-text-subtle)] mt-0.5">
                Hours
              </span>
            </div>

            <span className="font-mono text-xl font-bold text-[var(--soft-text-subtle)] pb-4">
              :
            </span>

            {/* Minutes */}
            <div className="flex flex-col items-center">
              <button
                type="button"
                onClick={() => handleMinutesChange(minuteStep)}
                className="p-1 rounded-md soft-surface soft-raised-xs hover:soft-raised-sm active:soft-pressed-xs text-[var(--soft-text-muted)] hover:text-[var(--soft-primary)] cursor-pointer"
                title={`Increase Minutes (+${minuteStep})`}
              >
                <ChevronUp className="w-3.5 h-3.5" />
              </button>
              <div className="w-12 h-10 my-1 rounded-xl soft-surface soft-pressed-xs flex items-center justify-center font-mono text-base font-bold text-[var(--soft-text)]">
                {currentMinutes.toString().padStart(2, '0')}
              </div>
              <button
                type="button"
                onClick={() => handleMinutesChange(-minuteStep)}
                className="p-1 rounded-md soft-surface soft-raised-xs hover:soft-raised-sm active:soft-pressed-xs text-[var(--soft-text-muted)] hover:text-[var(--soft-primary)] cursor-pointer"
                title={`Decrease Minutes (-${minuteStep})`}
              >
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
              <span className="text-[10px] uppercase font-bold text-[var(--soft-text-subtle)] mt-0.5">
                Mins
              </span>
            </div>
          </div>

          {/* Quick preset chips */}
          <div className="flex items-center justify-center gap-1.5 pt-1">
            {[
              { label: '09:00', h: 9, m: 0 },
              { label: '12:00', h: 12, m: 0 },
              { label: '15:00', h: 15, m: 0 },
              { label: '18:00', h: 18, m: 0 },
            ].map((preset) => (
              <button
                key={preset.label}
                type="button"
                onClick={() => handleQuickTime(preset.h, preset.m)}
                className="px-2 py-0.5 rounded-lg text-[10px] font-mono font-semibold soft-surface soft-raised-xs hover:soft-raised-sm active:soft-pressed-xs text-[var(--soft-text-muted)] hover:text-[var(--soft-primary)] cursor-pointer"
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 3. FOOTER ACTIONS */}
      <div className="mt-4 pt-3 border-t border-[var(--soft-text-subtle)]/15 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={handleSetNow}
            className="px-2.5 py-1 rounded-lg text-xs font-semibold soft-surface soft-raised-xs hover:soft-raised-sm active:soft-pressed-xs text-[var(--soft-primary)] flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>{mode === 'time' ? 'Now' : 'Today'}</span>
          </button>

          {selectedDate && (
            <button
              type="button"
              onClick={handleClear}
              className="px-2 py-1 rounded-lg text-xs font-medium text-[var(--soft-text-muted)] hover:text-[var(--soft-danger)] cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>

        {!inline && (
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="px-3 py-1 rounded-lg text-xs font-bold soft-surface soft-pressed-xs text-[var(--soft-primary)] bg-[var(--soft-primary)]/10 hover:bg-[var(--soft-primary)]/15 flex items-center gap-1 cursor-pointer"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Done</span>
          </button>
        )}
      </div>
    </div>
  );

  // If inline mode is requested, simply render the panel directly
  if (inline) {
    return (
      <div className={`space-y-1.5 ${className}`}>
        {label && (
          <label className="block text-xs font-bold uppercase tracking-wider text-[var(--soft-text-muted)] mb-1.5 select-none">
            {label}
          </label>
        )}
        {pickerContent}
        {helperText && !error && (
          <p className="text-xs text-[var(--soft-text-muted)] mt-1">{helperText}</p>
        )}
        {error && <p className="text-xs text-[var(--soft-danger)] font-medium mt-1">{error}</p>}
      </div>
    );
  }

  // Trigger + Floating Dropdown Popover
  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      {label && (
        <label className="block text-xs font-bold uppercase tracking-wider text-[var(--soft-text-muted)] mb-2 select-none">
          {label}
        </label>
      )}

      {/* Input Trigger */}
      <div
        onClick={() => {
          if (!disabled && !readOnly) {
            setIsOpen((prev) => !prev);
          }
        }}
        className={`
          w-full flex items-center justify-between px-4 py-3 rounded-2xl soft-surface soft-pressed-sm cursor-pointer soft-transition
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:ring-1 hover:ring-[var(--soft-primary)]/30'}
          ${isOpen ? 'ring-2 ring-[var(--soft-primary)]/40' : ''}
          ${error ? 'ring-2 ring-[var(--soft-danger)]/50' : ''}
        `}
      >
        <div className="flex items-center gap-3 min-w-0">
          <span className="text-[var(--soft-primary)] shrink-0">
            {mode === 'time' ? <Clock className="w-4 h-4" /> : <Calendar className="w-4 h-4" />}
          </span>

          <span
            className={`text-sm truncate font-medium ${
              formattedDisplay ? 'text-[var(--soft-text)]' : 'text-[var(--soft-text-subtle)]'
            }`}
          >
            {formattedDisplay || resolvedPlaceholder}
          </span>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          {selectedDate && !disabled && !readOnly && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleClear();
              }}
              title="Clear value"
              className="p-1 rounded-md text-[var(--soft-text-muted)] hover:text-[var(--soft-text)] cursor-pointer hover:soft-raised-xs"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}

          <ChevronDown
            className={`w-4 h-4 text-[var(--soft-text-muted)] transition-transform duration-200 ${
              isOpen ? 'rotate-180 text-[var(--soft-primary)]' : ''
            }`}
          />
        </div>
      </div>

      {helperText && !error && (
        <p className="text-xs text-[var(--soft-text-muted)] mt-1.5 pl-1">{helperText}</p>
      )}
      {error && (
        <p className="text-xs text-[var(--soft-danger)] font-medium mt-1.5 pl-1">{error}</p>
      )}

      {/* Floating Dropdown */}
      {isOpen && (
        <div className="absolute left-0 top-full mt-2 z-50 animate-in fade-in zoom-in-95 duration-150">
          {pickerContent}
        </div>
      )}
    </div>
  );
};

export default SoftDateTimePicker;
