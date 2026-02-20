"use client";

import { GradingInbox } from "@/features/classroom/components/grading-inbox";

export default function TeacherInboxPage() {
      return (
            <div className="p-8 max-w-6xl mx-auto">
                  <div className="mb-10">
                        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Caixa de Entrada</h1>
                        <p className="text-slate-500 mt-2 text-lg">Gerencie e corrija as atividades enviadas pelos alunos.</p>
                  </div>

                  <GradingInbox />
            </div>
      );
}
