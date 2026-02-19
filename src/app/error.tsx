"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCcw } from "lucide-react";

export default function Error({
      error,
      reset,
}: {
      error: Error & { digest?: string };
      reset: () => void;
}) {
      useEffect(() => {
            // Log the error to an error reporting service
            console.error(error);
      }, [error]);

      return (
            <div className="flex h-screen w-full flex-col items-center justify-center bg-gray-50 p-4">
                  <div className="bg-white p-8 rounded-lg shadow-lg max-w-md text-center">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                              <AlertTriangle className="h-8 w-8 text-red-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Algo deu errado!</h2>
                        <p className="text-gray-500 mb-6">
                              Encontramos um erro inesperado ao processar sua solicitação.
                        </p>
                        <button
                              onClick={
                                    // Attempt to recover by trying to re-render the segment
                                    () => reset()
                              }
                              className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                        >
                              <RefreshCcw className="w-4 h-4" />
                              Tentar Novamente
                        </button>
                  </div>
            </div>
      );
}
