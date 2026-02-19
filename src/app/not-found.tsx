import Link from "next/link";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
      return (
            <div className="flex h-screen w-full flex-col items-center justify-center bg-gray-50 p-4">
                  <AlertCircle className="h-20 w-20 text-red-500 mb-6" />
                  <h1 className="text-4xl font-bold text-gray-900 mb-2">404</h1>
                  <h2 className="text-xl font-semibold text-gray-700 mb-4">Página não encontrada</h2>
                  <p className="text-gray-500 mb-8 text-center max-w-md">
                        A página que você está procurando não existe ou foi movida.
                  </p>
                  <Link
                        href="/dashboard"
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                        Voltar para o Dashboard
                  </Link>
            </div>
      );
}
