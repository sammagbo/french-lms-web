import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
      return (
            <div
                  className={cn(
                        "animate-pulse rounded-lg bg-gray-200/80",
                        className
                  )}
                  {...props}
            />
      );
}

/* ── CourseCard Skeleton ── */
export function CourseCardSkeleton() {
      return (
            <div className="flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
                  <Skeleton className="aspect-video w-full rounded-none" />
                  <div className="flex flex-1 flex-col p-5 space-y-3">
                        <Skeleton className="h-5 w-3/4" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-2/3" />
                        <div className="mt-auto pt-4 flex items-center justify-between">
                              <div className="space-y-1">
                                    <Skeleton className="h-3 w-16" />
                                    <Skeleton className="h-6 w-20" />
                              </div>
                              <Skeleton className="h-10 w-10 rounded-full" />
                        </div>
                  </div>
            </div>
      );
}

/* ── AssignmentCard Skeleton ── */
export function AssignmentCardSkeleton() {
      return (
            <div className="flex flex-col rounded-xl border border-gray-100 bg-white p-5 shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                        <Skeleton className="h-5 w-2/3" />
                        <Skeleton className="h-5 w-16 rounded-full" />
                  </div>
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-4/5" />
                  <div className="flex items-center gap-3 pt-2">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-4 w-20" />
                  </div>
            </div>
      );
}

/* ── Dashboard Page Skeleton ── */
export function DashboardSkeleton() {
      return (
            <div className="max-w-7xl mx-auto space-y-8">
                  <div className="space-y-3">
                        <Skeleton className="h-10 w-80" />
                        <Skeleton className="h-5 w-96" />
                  </div>
                  <div className="space-y-4">
                        <div className="flex items-center justify-between">
                              <Skeleton className="h-6 w-48" />
                              <Skeleton className="h-1 flex-1 mx-4 rounded-full hidden sm:block" />
                        </div>
                        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                              {[...Array(4)].map((_, i) => (
                                    <CourseCardSkeleton key={i} />
                              ))}
                        </div>
                  </div>
            </div>
      );
}

/* ── Assignments Page Skeleton ── */
export function AssignmentsSkeleton() {
      return (
            <div className="space-y-8 max-w-5xl mx-auto">
                  <div className="space-y-2">
                        <Skeleton className="h-8 w-48" />
                        <Skeleton className="h-5 w-72" />
                  </div>
                  <div className="space-y-4">
                        <div className="flex items-center gap-2">
                              <Skeleton className="h-6 w-28" />
                              <Skeleton className="h-5 w-8 rounded-full" />
                        </div>
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                              {[...Array(3)].map((_, i) => (
                                    <AssignmentCardSkeleton key={i} />
                              ))}
                        </div>
                  </div>
            </div>
      );
}

export { Skeleton };
