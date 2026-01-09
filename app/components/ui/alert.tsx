import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils/cn';
import { AlertCircle, CheckCircle2, XCircle, Info, AlertTriangle } from 'lucide-react';

const alertVariants = cva(
  'relative w-full rounded-lg border p-4 [&>svg~*]:hidden [&>svg+div]:translate-y-0 [&>svg]:translate-y-0 [&>svg+div]:translate-x-0',
  {
    variants: {
      variant: {
        default: 'bg-background text-foreground',
        destructive: 'border-destructive/50 bg-destructive/50 text-destructive dark:border-destructive dark:text-destructive',
        warning: 'border-warning/50 bg-warning/50 text-warning',
        success: 'border-success/50 bg-success/50 text-success',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  icon?: React.ReactNode;
  title?: string;
  description?: string;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant, icon, title, description, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="alert"
        className={cn(alertVariants({ variant }), className)}
        {...props}
      >
        {icon && (
          <div className="flex items-start gap-2">
            <div className="flex-shrink-0 pt-0.5">
              {icon}
            </div>
            <div className="flex-1">
              {title && <h5 className="mb-1 font-medium leading-none tracking-tight">{title}</h5>}
              {description && <div className="text-sm opacity-90">{description}</div>}
            </div>
          </div>
        )}
        {!icon && children}
      </div>
    );
  }
);
Alert.displayName = 'Alert';

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5 ref={ref} className={cn('mb-1 font-medium leading-none tracking-tight', className)} {...props} />
));
AlertTitle.displayName = 'AlertTitle';

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('text-sm opacity-90', className)} {...props} />
));
AlertDescription.displayName = 'AlertDescription';

export {
  Alert,
  AlertTitle,
  AlertDescription,
  alertVariants,
};
