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
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-xl">
                  <div>
                        <label className="block text-sm font-medium mb-1">Título do Curso</label>
                        <input {...register("title")} disabled={createCourseMutation.isPending} className="w-full p-2 border rounded disabled:opacity-50" placeholder="Ex: Francês Avançado" />
                        {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
                  </div>

                  <div>
                        <label className="block text-sm font-medium mb-1">Slug (URL amigável)</label>
                        <input {...register("slug")} disabled={createCourseMutation.isPending} className="w-full p-2 border rounded disabled:opacity-50" placeholder="Ex: frances-avancado" />
                        {errors.slug && <p className="text-red-500 text-sm">{errors.slug.message}</p>}
                  </div>

                  <div>
                        <label className="block text-sm font-medium mb-1">Descrição</label>
                        <textarea {...register("description")} disabled={createCourseMutation.isPending} className="w-full p-2 border rounded disabled:opacity-50" rows={3} />
                  </div>

                  <div>
                        <label className="block text-sm font-medium mb-1">Preço (R$)</label>
                        <input type="number" step="0.01" {...register("price")} disabled={createCourseMutation.isPending} className="w-full p-2 border rounded disabled:opacity-50" />
                        {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
                  </div>

                  <button
                        type="submit"
                        disabled={createCourseMutation.isPending}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
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
            <div className="space-y-4 max-w-xl">
                  <h3 className="text-lg font-semibold">Adicionar Módulo</h3>
                  <form onSubmit={handleSubmit((data) => createModuleMutation.mutate(data))} className="space-y-4 p-4 border rounded bg-gray-50">
                        <div>
                              <label className="block text-sm font-medium mb-1">Título do Módulo</label>
                              <input {...register("title")} disabled={createModuleMutation.isPending} className="w-full p-2 border rounded disabled:opacity-50" placeholder="Ex: Módulo 1 - Introdução" />
                        </div>
                        <div>
                              <label className="block text-sm font-medium mb-1">Descrição (Opcional)</label>
                              <input {...register("description")} disabled={createModuleMutation.isPending} className="w-full p-2 border rounded disabled:opacity-50" />
                        </div>
                        <button type="submit" disabled={createModuleMutation.isPending} className="bg-green-600 text-white px-3 py-1.5 rounded text-sm hover:bg-green-700 disabled:opacity-50">
                              {createModuleMutation.isPending ? "Salvando..." : "Adicionar Módulo"}
                        </button>
                  </form>

                  <div className="flex justify-end">
                        <button onClick={() => onNext("")} className="text-blue-600 underline text-sm">Próximo Passo: Aulas &rarr;</button>
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
            <div className="space-y-4 max-w-xl">
                  <h3 className="text-lg font-semibold">Adicionar Aulas</h3>

                  {course?.modules.length === 0 ? (
                        <div className="p-4 bg-yellow-50 text-yellow-800 rounded">
                              Nenhum módulo encontrado. Volte ao passo anterior para criar módulos.
                        </div>
                  ) : (
                        <form onSubmit={handleSubmit((data) => createLessonMutation.mutate(data))} className="space-y-4 p-4 border rounded bg-gray-50">
                              <div>
                                    <label className="block text-sm font-medium mb-1">Selecione o Módulo</label>
                                    <select {...register("moduleId")} className="w-full p-2 border rounded">
                                          <option value="">Selecione...</option>
                                          {course?.modules.map(module => (
                                                <option key={module.id} value={module.id}>{module.title}</option>
                                          ))}
                                    </select>
                              </div>
                              <div>
                                    <label className="block text-sm font-medium mb-1">Título da Aula</label>
                                    <input {...register("title")} disabled={createLessonMutation.isPending} className="w-full p-2 border rounded disabled:opacity-50" placeholder="Ex: Aula 1 - Olá Mundo" />
                              </div>
                              <div>
                                    <label className="block text-sm font-medium mb-1">URL do Vídeo (YouTube)</label>
                                    <input {...register("videoUrl")} disabled={createLessonMutation.isPending} className="w-full p-2 border rounded disabled:opacity-50" placeholder="https://..." />
                              </div>
                              <div>
                                    <label className="block text-sm font-medium mb-1">Conteúdo (Texto)</label>
                                    <textarea {...register("content")} disabled={createLessonMutation.isPending} className="w-full p-2 border rounded disabled:opacity-50" rows={3} />
                              </div>
                              <button type="submit" disabled={createLessonMutation.isPending} className="bg-purple-600 text-white px-3 py-1.5 rounded text-sm hover:bg-purple-700 disabled:opacity-50 flex items-center gap-2 justify-center w-full">
                                    {createLessonMutation.isPending && <Loader2 className="animate-spin w-4 h-4" />}
                                    {createLessonMutation.isPending ? "Salvando..." : "Criar Aula"}
                              </button>
                        </form>
                  )}

                  <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded">
                        <h4 className="font-semibold text-green-800 flex items-center gap-2"><CheckCircle className="w-5 h-5" /> Curso Criado!</h4>
                        <p className="text-green-700 text-sm mt-1">Você pode gerenciar este curso no painel principal ou adicionar mais aulas aqui.</p>
                        <button onClick={() => window.location.href = '/teacher/courses'} className="mt-2 text-sm text-green-800 underline">Ir para Meus Cursos</button>
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
                  <h1 className="text-2xl font-bold mb-6">Criar Novo Curso</h1>

                  {/* Steps Indicator */}
                  <div className="flex items-center gap-4 mb-8 text-sm">
                        <div className={cn("px-3 py-1 rounded-full", step >= 1 ? "bg-blue-100 text-blue-700 font-medium" : "text-gray-400")}>1. Detalhes</div>
                        <div className="h-px bg-gray-300 w-8"></div>
                        <div className={cn("px-3 py-1 rounded-full", step >= 2 ? "bg-blue-100 text-blue-700 font-medium" : "text-gray-400")}>2. Módulos</div>
                        <div className="h-px bg-gray-300 w-8"></div>
                        <div className={cn("px-3 py-1 rounded-full", step >= 3 ? "bg-blue-100 text-blue-700 font-medium" : "text-gray-400")}>3. Aulas</div>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-sm border">
                        {step === 1 && <Step1CourseDetails onNext={handleCourseCreated} />}
                        {step === 2 && courseId && <Step2Modules courseId={courseId} onNext={handleModuleStep} />}
                        {step === 3 && courseId && <Step3Lessons courseId={courseId} />}
                  </div>
            </div>
      );
}
