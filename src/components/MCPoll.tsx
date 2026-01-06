import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { CheckCircle2 } from 'lucide-react';

interface MCPollProps {
  pageSlug: string;
}

interface Question {
  id: string;
  question_text: string;
  options: string[];
  display_order: number;
}

const getSessionId = () => {
  let sessionId = localStorage.getItem('mc_session_id');
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    localStorage.setItem('mc_session_id', sessionId);
  }
  return sessionId;
};

const MCPoll = ({ pageSlug }: MCPollProps) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [responses, setResponses] = useState<Record<string, number>>({});
  const [submittedQuestions, setSubmittedQuestions] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuestions();
  }, [pageSlug]);

  const fetchQuestions = async () => {
    try {
      const { data: questionsData, error: questionsError } = await supabase
        .from('mc_questions')
        .select('id, question_text, options, display_order')
        .eq('page_slug', pageSlug)
        .eq('is_active', true)
        .order('display_order');

      if (questionsError) throw questionsError;

      const formattedQuestions: Question[] = (questionsData || []).map(q => ({
        id: q.id,
        question_text: q.question_text,
        display_order: q.display_order,
        options: Array.isArray(q.options) ? (q.options as string[]) : []
      }));

      setQuestions(formattedQuestions);
      // Check which questions user already answered
      const sessionId = getSessionId();
      const questionIds = formattedQuestions.map(q => q.id);
      
      if (questionIds.length > 0) {
        const { data: existingResponses } = await supabase
          .from('mc_responses')
          .select('question_id, selected_option')
          .eq('session_id', sessionId)
          .in('question_id', questionIds);

        if (existingResponses) {
          const submitted = new Set(existingResponses.map(r => r.question_id));
          setSubmittedQuestions(submitted);
          
          const existingSelections: Record<string, number> = {};
          existingResponses.forEach(r => {
            existingSelections[r.question_id] = r.selected_option;
          });
          setResponses(existingSelections);
        }
      }
    } catch (error) {
      console.error('Error fetching questions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (questionId: string) => {
    const selectedOption = responses[questionId];
    if (selectedOption === undefined) {
      toast.error('Please select an option');
      return;
    }

    try {
      const sessionId = getSessionId();
      
      const { error } = await supabase
        .from('mc_responses')
        .insert({
          question_id: questionId,
          selected_option: selectedOption,
          session_id: sessionId
        });

      if (error) {
        if (error.code === '23505') {
          toast.error('You have already answered this question');
          setSubmittedQuestions(prev => new Set([...prev, questionId]));
        } else {
          throw error;
        }
        return;
      }

      setSubmittedQuestions(prev => new Set([...prev, questionId]));
      toast.success('Response submitted!');
    } catch (error) {
      console.error('Error submitting response:', error);
      toast.error('Failed to submit response');
    }
  };

  if (loading) {
    return null;
  }

  if (questions.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      {questions.map((question) => (
        <Card key={question.id} className="border-primary/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-medium">
              {question.question_text}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {submittedQuestions.has(question.id) ? (
              <div className="flex items-center gap-2 text-green-600">
                <CheckCircle2 className="h-5 w-5" />
                <span className="text-sm">Response submitted</span>
              </div>
            ) : (
              <div className="space-y-4">
                <RadioGroup
                  value={responses[question.id]?.toString()}
                  onValueChange={(value) => 
                    setResponses(prev => ({ ...prev, [question.id]: parseInt(value) }))
                  }
                >
                  {question.options.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <RadioGroupItem value={index.toString()} id={`${question.id}-${index}`} />
                      <Label htmlFor={`${question.id}-${index}`} className="cursor-pointer">
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
                <Button 
                  onClick={() => handleSubmit(question.id)}
                  size="sm"
                >
                  Submit
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default MCPoll;
