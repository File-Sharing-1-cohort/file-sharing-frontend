import * as React from 'react';
import * as ProgressPrimitive from '@radix-ui/react-progress';
import { cn } from '@/shared/lib/utils';

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => {
  const [isCompleted, setIsCompleted] = React.useState(false);

  React.useEffect(() => {
    if (value === 100) {
      setIsCompleted(true);
    }
  }, [value]);

  return (
    <div className="relative w-full">
      <ProgressPrimitive.Root
        ref={ref}
        className={cn(
          'relative h-10 w-full overflow-hidden rounded-full bg-secondary',
          className,
        )}
        {...props}
      >
        <ProgressPrimitive.Indicator
          className="w-full flex-1 transition-all"
          style={{
            height: '80px',
            transform: `translateX(-${100 - (value || 0)}%)`,
            background:
              'linear-gradient(268.07deg, #116ACC -3.08%, #7BB3F1 103.27%)',
            boxShadow: '0px 3px 12px 0px #116ACC26',
          }}
        />
        <span className="absolute inset-0 flex items-center justify-center text-[24px] font-[500] text-white">
          {isCompleted
            ? 'Your data package was uploaded successfully'
            : `${value || 0}%`}
        </span>
      </ProgressPrimitive.Root>
    </div>
  );
});

Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
