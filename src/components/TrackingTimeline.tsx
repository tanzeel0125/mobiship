import { CheckCircle2, Circle } from 'lucide-react';
import type { TrackingStep } from '@/store/useAppStore';

interface Props {
  steps: TrackingStep[];
}

const TrackingTimeline = ({ steps }: Props) => (
  <div className="space-y-0">
    {steps.map((step, i) => (
      <div key={i} className="flex gap-3">
        <div className="flex flex-col items-center">
          {step.completed ? (
            <CheckCircle2 size={20} className="text-success shrink-0" />
          ) : step.current ? (
            <Circle size={20} className="text-accent shrink-0 fill-accent/20" />
          ) : (
            <Circle size={20} className="text-muted-foreground/40 shrink-0" />
          )}
          {i < steps.length - 1 && (
            <div className={`w-0.5 flex-1 min-h-[32px] ${step.completed ? 'bg-success' : 'bg-border'}`} />
          )}
        </div>
        <div className="pb-6">
          <p className={`text-sm font-semibold ${step.completed ? 'text-foreground' : 'text-muted-foreground'}`}>
            {step.status}
          </p>
          <p className="text-xs text-muted-foreground">{step.location}</p>
          <p className="text-xs text-muted-foreground">{step.timestamp}</p>
        </div>
      </div>
    ))}
  </div>
);

export default TrackingTimeline;
