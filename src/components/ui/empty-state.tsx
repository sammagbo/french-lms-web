import { ReactNode } from "react";

interface EmptyStateProps {
      icon: ReactNode;
      title: string;
      description: string;
      action?: ReactNode;
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
      return (
            <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50/50 p-12 sm:p-16 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-400 mb-5">
                        {icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1.5">
                        {title}
                  </h3>
                  <p className="text-sm text-gray-500 max-w-sm leading-relaxed">
                        {description}
                  </p>
                  {action && <div className="mt-6">{action}</div>}
            </div>
      );
}
