import React from 'react';
import { SunMedium, Droplets, Wind, MapPin } from 'lucide-react';
import { SoftIconBox } from './SoftIconBox';

export interface SoftWeatherWidgetProps {
  temperature?: number;
  unit?: 'C' | 'F';
  condition?: string;
  location?: string;
  humidity?: number;
  windSpeed?: string;
  className?: string;
}

export const SoftWeatherWidget: React.FC<SoftWeatherWidgetProps> = ({
  temperature = 24,
  unit = 'C',
  condition = 'Partly Sunny',
  location = 'San Francisco, CA',
  humidity = 62,
  windSpeed = '12 km/h',
  className = '',
}) => {
  return (
    <div className={`w-full ${className}`}>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        {/* Left Side: Weather Main Info */}
        <div className="flex items-center gap-5">
          {/* Weather Icon Box */}
          <SoftIconBox
            variant="raised"
            shape="rounded"
            size="lg"
            className="w-16 h-16 rounded-[22px] text-[var(--soft-primary)]"
          >
            <SunMedium className="w-8 h-8 stroke-[2.2] animate-[spin_20s_linear_infinite]" />
          </SoftIconBox>

          {/* Temperature & Condition */}
          <div>
            <div className="flex items-start">
              <span className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[var(--soft-text)]">
                {temperature}
              </span>
              <span className="text-2xl font-bold text-[var(--soft-text)] ml-0.5 mt-1">
                °{unit}
              </span>
            </div>
            <p className="text-sm font-medium text-[var(--soft-text-muted)] mt-0.5">{condition}</p>
            <div className="flex items-center gap-1 mt-1 text-xs text-[var(--soft-text-subtle)]">
              <MapPin className="w-3.5 h-3.5 stroke-[2]" />
              <span>{location}</span>
            </div>
          </div>
        </div>

        {/* Right Side: Humidity & Wind Stats */}
        <div className="flex flex-col gap-3 min-w-[170px]">
          {/* Humidity Stat Box */}
          <div className="flex items-center gap-3 px-4 py-2.5 rounded-2xl soft-surface soft-pressed-xs">
            <Droplets className="w-4 h-4 text-[var(--soft-primary)] shrink-0 stroke-[2.2]" />
            <div className="flex flex-col">
              <span className="text-[10px] font-semibold text-[var(--soft-text-muted)] tracking-wider uppercase">
                Humidity
              </span>
              <span className="text-sm font-extrabold text-[var(--soft-text)]">{humidity}%</span>
            </div>
          </div>

          {/* Wind Stat Box */}
          <div className="flex items-center gap-3 px-4 py-2.5 rounded-2xl soft-surface soft-pressed-xs">
            <Wind className="w-4 h-4 text-[var(--soft-primary)] shrink-0 stroke-[2.2]" />
            <div className="flex flex-col">
              <span className="text-[10px] font-semibold text-[var(--soft-text-muted)] tracking-wider uppercase">
                Wind
              </span>
              <span className="text-sm font-extrabold text-[var(--soft-text)]">{windSpeed}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
