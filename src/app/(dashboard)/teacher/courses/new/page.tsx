"use client";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Loader2, Plus, Trash, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { teacherService } from "@/services/teacher.service";
import { academyService } from "@/services/academy.service";

// --- Schemas ---
const courseSchema = z.object({
      title: z.string().min(1, "Título é obrigatório"),
      slug: z.string().min(1, "Slug é obrigatório"),
      description: z.string().optional(),
      price: z.coerce.number().min(0, "Preço deve ser maior ou igual a 0"),
      isPublished: z.boolean().default(false),
});

const moduleSchema = z.object({
      title: z.string().min(1, "Título do módulo é obrigatório"),
      description: z.string().optional(),
});

const lessonSchema = z.object({
      title: z.string().min(1, "Título da aula é obrigatório"),
      videoUrl: z.string().url("URL do vídeo inválida").optional().or(z.literal("")),
      content: z.string().optional(),
});

type CourseForm = z.infer<typeof courseSchema>;
type ModuleForm = z.infer<typeof moduleSchema>;
type LessonForm = z.infer<typeof lessonSchema>;

// --- Components ---

function Step1CourseDetails({ onNext }: { onNext: (courseId: string) => void }) {
      const { register, handleSubmit, formState: { errors } } = useForm<CourseForm>({
            resolver: zodResolver(courseSchema) as any,
            defaultValues: {
                  price: 0,
                  isPublished: false,
            }
      });

      const createCourseMutation = useMutation({
            mutationFn: teacherService.createCourse,
            onSuccess: (data) => {
                  onNext(data.id);
            },
            onError: (error) => {
                  alert("Erro ao criar curso: " + error);
            }
      });

      const onSubmit = (data: CourseForm) => {
            createCourseMutation.mutate(data);
      };

      return (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-xl">
                  <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Título do Curso</label>
                        <input {...register("title")} disabled={createCourseMutation.isPending} className="w-full p-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-900 placeholder:text-gray-400 disabled:opacity-50 disabled:bg-gray-100 shadow-sm" placeholder="Ex: Francês Avançado" />
                        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
                  </div>

                  <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Slug (URL amigável)</label>
                        <input {...register("slug")} disabled={createCourseMutation.isPending} className="w-full p-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-900 placeholder:text-gray-400 disabled:opacity-50 disabled:bg-gray-100 shadow-sm" placeholder="Ex: frances-avancado" />
                        {errors.slug && <p className="text-red-500 text-sm mt-1">{errors.slug.message}</p>}
                  </div>

                  <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Descrição</label>
                        <textarea {...register("description")} disabled={createCourseMutation.isPending} className="w-full p-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-900 placeholder:text-gray-400 disabled:opacity-50 disabled:bg-gray-100 shadow-sm resize-none" rows={4} placeholder="O que os alunos vão aprender neste curso?" />
                  </div>

                  <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Preço (R$)</label>
                        <input type="number" step="0.01" {...register("price")} disabled={createCourseMutation.isPending} className="w-full p-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-900 placeholder:text-gray-400 disabled:opacity-50 disabled:bg-gray-100 shadow-sm" placeholder="0.00" />
                        {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>}
                  </div>

                  <button
                        type="submit"
                        disabled={createCourseMutation.isPending}
                        className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-medium hover:from-blue-700 hover:to-indigo-700 shadow-md hover:shadow-lg transition-all disabled:opacity-50 flex items-center gap-2 w-full justify-center sm:w-auto"
                  >
                        {createCourseMutation.isPending && <Loader2 className="animate-spin w-4 h-4" />}
                        Salvar e Continuar
                  </button>
            </form>
      );
}

function Step2Modules({ courseId, onNext }: { courseId: string, onNext: (moduleId: string) => void }) {
      const { register, handleSubmit, reset } = useForm<ModuleForm>({
            resolver: zodResolver(moduleSchema)
      });

      const createModuleMutation = useMutation({
            mutationFn: (data: ModuleForm) => teacherService.createModule(courseId, data),
            onSuccess: (data) => {
                  alert("Módulo criado!");
                  reset();
                  onNext(data.id); // For simplicity, just passing the last created module ID or allowing to continue
            },
            onError: (e) => alert("Erro: " + e)
      });

      return (
            <div className="space-y-6 max-w-xl">
                  <h3 className="text-xl font-bold text-gray-800">Adicionar Módulo</h3>
                  <form onSubmit={handleSubmit((data) => createModuleMutation.mutate(data))} className="space-y-5 p-6 border border-gray-200 rounded-2xl bg-white/50 backdrop-blur-sm shadow-sm">
                        <div>
                              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Título do Módulo</label>
                              <input {...register("title")} disabled={createModuleMutation.isPending} className="w-full p-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-900 placeholder:text-gray-400 disabled:opacity-50 disabled:bg-gray-100 shadow-sm" placeholder="Ex: Módulo 1 - Introdução" />
                        </div>
                        <div>
                              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Descrição (Opcional)</label>
                              <input {...register("description")} disabled={createModuleMutation.isPending} className="w-full p-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-900 placeholder:text-gray-400 disabled:opacity-50 disabled:bg-gray-100 shadow-sm" placeholder="Breve descrição do módulo..." />
                        </div>
                        <button type="submit" disabled={createModuleMutation.isPending} className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-5 py-2.5 rounded-xl font-medium shadow-md hover:shadow-lg hover:from-green-700 hover:to-emerald-700 transition-all disabled:opacity-50 flex items-center justify-center w-full gap-2">
                              {createModuleMutation.isPending && <Loader2 className="animate-spin w-4 h-4" />}
                              {createModuleMutation.isPending ? "Salvando..." : "Adicionar Módulo"}
                        </button>
                  </form>

                  <div className="flex justify-end pt-2">
                        <button onClick={() => onNext("")} className="text-indigo-600 hover:text-indigo-800 font-medium transition-colors flex items-center gap-1">Próximo Passo: Aulas &rarr;</button>
                  </div>
            </div>
      );
}

function Step3Lessons({ courseId }: { courseId: string }) {
      const { register, handleSubmit, reset } = useForm<LessonForm & { moduleId: string }>({
            resolver: zodResolver(lessonSchema.extend({ moduleId: z.string().min(1, "Selecione um módulo") }))
      });

      // Fetch course details to get the list of modules
      const { data: course, isLoading, refetch } = useQuery({
            queryKey: ['course', courseId],
            queryFn: () => academyService.getCourseById(courseId)
      });

      const createLessonMutation = useMutation({
            mutationFn: (data: LessonForm & { moduleId: string }) => teacherService.createLesson(data.moduleId, data),
            onSuccess: () => {
                  alert("Aula criada com sucesso!");
                  reset();
                  refetch(); // Refresh list to show new lesson count if we were displaying it
            },
            onError: (e) => alert("Erro ao criar aula: " + e)
      });

      if (isLoading) return <p className="text-gray-500">Carregando módulos...</p>;

      return (
            <div className="space-y-6 max-w-xl">
                  <h3 className="text-xl font-bold text-gray-800">Adicionar Aulas</h3>

                  {course?.modules.length === 0 ? (
                        <div className="p-4 bg-yellow-50 text-yellow-800 rounded-xl border border-yellow-200 flex flex-col items-center justify-center text-center">
                              <span className="text-4xl mb-2">🚧</span>
                              <p className="font-medium">Nenhum módulo encontrado.</p>
                              <p className="text-sm mt-1 opacity-80">Volte ao passo anterior para criar pelo menos um módulo antes de adicionar aulas.</p>
                        </div>
                  ) : (
                        <form onSubmit={handleSubmit((data) => createLessonMutation.mutate(data))} className="space-y-5 p-6 border border-gray-200 rounded-2xl bg-white/50 backdrop-blur-sm shadow-sm">
                              <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Selecione o Módulo</label>
                                    <select {...register("moduleId")} className="w-full p-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all text-gray-900 shadow-sm outline-none">
                                          <option value="">Selecione...</option>
                                          {course?.modules.map(module => (
                                                <option key={module.id} value={module.id}>{module.title}</option>
                                          ))}
                                    </select>
                              </div>
                              <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Título da Aula</label>
                                    <input {...register("title")} disabled={createLessonMutation.isPending} className="w-full p-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all text-gray-900 placeholder:text-gray-400 disabled:opacity-50 disabled:bg-gray-100 shadow-sm" placeholder="Ex: Aula 1 - Olá Mundo" />
                              </div>
                              <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">URL do Vídeo (YouTube)</label>
                                    <input {...register("videoUrl")} disabled={createLessonMutation.isPending} className="w-full p-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all text-gray-900 placeholder:text-gray-400 disabled:opacity-50 disabled:bg-gray-100 shadow-sm" placeholder="https://..." />
                              </div>
                              <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Conteúdo (Texto)</label>
                                    <textarea {...register("content")} disabled={createLessonMutation.isPending} className="w-full p-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all text-gray-900 placeholder:text-gray-400 disabled:opacity-50 disabled:bg-gray-100 shadow-sm resize-none" rows={4} placeholder="Material complementar da aula..." />
                              </div>
                              <button type="submit" disabled={createLessonMutation.isPending} className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-5 py-3 rounded-xl font-medium shadow-md hover:shadow-lg hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50 flex items-center justify-center w-full gap-2 mt-2">
                                    {createLessonMutation.isPending && <Loader2 className="animate-spin w-4 h-4" />}
                                    {createLessonMutation.isPending ? "Salvando..." : "Criar Aula"}
                              </button>
                        </form>
                  )}

                  <div className="mt-8 p-6 bg-emerald-50 border border-emerald-200 rounded-2xl shadow-sm text-center">
                        <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
                        <h4 className="font-bold text-xl text-emerald-800 mb-1">Curso Criado!</h4>
                        <p className="text-emerald-700 text-sm mb-4">Você pode adicionar mais aulas agora ou ir para o gestor oficial do curso.</p>
                        <button onClick={() => window.location.href = '/teacher/courses'} className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-xl font-medium transition-colors shadow-sm">Gestor de Cursos</button>
                  </div>
            </div>
      );
}

export default function CourseBuilderPage() {
      const [step, setStep] = useState(1);
      const [courseId, setCourseId] = useState<string | null>(null);

      const handleCourseCreated = (id: string) => {
            setCourseId(id);
            setStep(2);
      };

      const handleModuleStep = () => {
            setStep(3);
      };

      return (
            <div className="p-8 max-w-4xl mx-auto">
                  <div className="mb-8">
                        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Criar Novo Curso</h1>
                        <p className="text-gray-500 mt-2">Configure os detalhes, adicione módulos e publique suas aulas impressionantes.</p>
                  </div>

                  {/* Steps Indicator */}
                  <div className="flex items-center gap-2 mb-10 w-full max-w-xl">
                        <div className={cn("flex-1 text-center py-2.5 rounded-xl font-semibold text-sm transition-all duration-300", step >= 1 ? "bg-blue-600 text-white shadow-md shadow-blue-500/20" : "bg-gray-100 text-gray-400")}>1. Detalhes</div>
                        <div className={cn("h-1 w-6 rounded-full transition-colors duration-300", step >= 2 ? "bg-blue-600" : "bg-gray-200")}></div>
                        <div className={cn("flex-1 text-center py-2.5 rounded-xl font-semibold text-sm transition-all duration-300", step >= 2 ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20" : "bg-gray-100 text-gray-400")}>2. Módulos</div>
                        <div className={cn("h-1 w-6 rounded-full transition-colors duration-300", step >= 3 ? "bg-indigo-600" : "bg-gray-200")}></div>
                        <div className={cn("flex-1 text-center py-2.5 rounded-xl font-semibold text-sm transition-all duration-300", step >= 3 ? "bg-purple-600 text-white shadow-md shadow-purple-500/20" : "bg-gray-100 text-gray-400")}>3. Aulas</div>
                  </div>

                  <div className="glass p-8 md:p-10 rounded-3xl relative overflow-hidden">
                        {/* Decorative background blur inside the glass container */}
                        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl pointer-events-none"></div>
                        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-indigo-400/10 rounded-full blur-3xl pointer-events-none"></div>

                        <div className="relative z-10 w-full">
                              {step === 1 && <Step1CourseDetails onNext={handleCourseCreated} />}
                              {step === 2 && courseId && <Step2Modules courseId={courseId} onNext={handleModuleStep} />}
                              {step === 3 && courseId && <Step3Lessons courseId={courseId} />}
                        </div>
                  </div>
            </div>
      );
}
