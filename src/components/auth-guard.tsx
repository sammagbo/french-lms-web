"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { authService } from "@/services/auth.service";
import { Loader2 } from "lucide-react";

interface AuthGuardProps {
      children: React.ReactNode;
      allowedRoles?: string[];
}

export function AuthGuard({ children, allowedRoles }: AuthGuardProps) {
      const router = useRouter();
      const pathname = usePathname();
      const [isAuthorized, setIsAuthorized] = useState(false);

      const { data: user, isLoading, isError } = useQuery({
            queryKey: ['me'],
            queryFn: authService.getProfile,
            retry: false,
      });

      useEffect(() => {
            const token = localStorage.getItem('token');

            if (!token) {
                  router.push('/login');
                  return;
            }

            if (isError) {
                  localStorage.removeItem('token');
                  router.push('/login');
                  return;
            }

            if (user) {
                  if (allowedRoles && !allowedRoles.includes(user.role)) {
                        // User role not allowed
                        // Redirect based on role or to dashboard logic
                        if (user.role === 'STUDENT') {
                              router.push('/dashboard');
                        } else if (user.role === 'TEACHER') {
                              // Teacher trying to access admin? or just fallback to dashboard
                              router.push('/dashboard');
                        }
                        // If already on dashboard and still rejected (e.g. Teacher viewing Student page?), avoid infinite loop
                        // For now, redirect to dashboard is safe.
                  } else {
                        setIsAuthorized(true);
                  }
            }
      }, [user, isLoading, isError, router, allowedRoles, pathname]);

      if (isLoading || !isAuthorized) {
            // Show spinner while checking
            return (
                  <div className="flex h-screen w-full items-center justify-center bg-gray-50">
                        <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
                  </div>
            );
      }

      return <>{children}</>;
}
