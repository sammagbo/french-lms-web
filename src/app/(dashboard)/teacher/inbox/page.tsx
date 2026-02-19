"use client";

import { GradingInbox } from "@/features/classroom/components/grading-inbox";

export default function TeacherInboxPage() {
      return (
            <div className="p-8 max-w-6xl mx-auto">
                  <div className="mb-8">
                        <h1 className="text-2xl font-bold text-gray-900">Caixa de Entrada</h1>
                        <p className="text-gray-500">Gerencie e corrija as atividades enviadas pelos alunos.</p>
                  </div>

                  <GradingInbox />
            </div>
      );
}
