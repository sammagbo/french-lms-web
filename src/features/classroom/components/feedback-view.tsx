import { StudentActivity, SubmissionStatus } from '@/services/classroom.service';
import { CheckCircle2, MessageSquare, Play, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FeedbackViewProps {
      submission: StudentActivity;
}

export function FeedbackView({ submission }: FeedbackViewProps) {
      const { grade, feedback, status } = submission;

      // Only show if graded or has feedback
      if (status !== SubmissionStatus.GRADED && !feedback) {
            return null;
      }

      return (
            <div className="rounded-lg border border-green-200 bg-green-50 overflow-hidden">
                  <div className="px-6 py-4 border-b border-green-200 flex justify-between items-center bg-green-100/50">
                        <div className="flex items-center gap-2 text-green-800">
                              <CheckCircle2 className="h-5 w-5" />
                              <h3 className="font-semibold">Correção do Professor</h3>
                        </div>
                        {grade !== null && (
                              <div className="flex items-center gap-1 bg-white px-3 py-1 rounded-full shadow-sm border border-green-100">
                                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                                    <span className="font-bold text-green-900">{grade}/10</span>
                              </div>
                        )}
                  </div>

                  <div className="p-6 space-y-4">
                        {feedback && (
                              <div className="flex gap-3">
                                    <MessageSquare className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                                    <div className="text-gray-700 text-sm whitespace-pre-wrap">
                                          {feedback}
                                    </div>
                              </div>
                        )}

                        {/* Audio Player Logic - Assuming feedback might contain audio URL or we add a specific field later. 
            For now, let's mock/check a hypothetical field or assume it's part of the object if extended.
            Since the interface currently has `feedback: string | null`, and the prompt mentions `audioFeedbackUrl`,
            let's assume we might need to extend the type or check if it's passed differently.
            
            However, based on the prompt "Se houver audioFeedbackUrl (do professor)", let's add it to the interface locally or cast it for now to follow instructions.
        */}
                        {(submission as any).audioFeedbackUrl && (
                              <div className="mt-4 bg-white p-3 rounded-md border border-green-200 shadow-sm">
                                    <p className="text-xs font-medium text-green-800 mb-2 flex items-center gap-2">
                                          <Play className="h-3 w-3" /> Áudio da Correção
                                    </p>
                                    <audio controls className="w-full h-8" src={(submission as any).audioFeedbackUrl} />
                              </div>
                        )}
                  </div>
            </div>
      );
}
