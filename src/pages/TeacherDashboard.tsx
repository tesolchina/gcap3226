import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { Plus, Trash2, BarChart3, LogOut, RefreshCw } from 'lucide-react';

interface Question {
  id: string;
  page_slug: string;
  question_text: string;
  options: string[];
  is_active: boolean;
  display_order: number;
}

interface ResponseStats {
  questionId: string;
  questionText: string;
  totalResponses: number;
  optionCounts: Record<number, number>;
  options: string[];
}

const TeacherDashboard = () => {
  const navigate = useNavigate();
  const { user, isTeacher, loading: authLoading } = useAuth();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [responseStats, setResponseStats] = useState<ResponseStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [newQuestion, setNewQuestion] = useState({
    page_slug: '',
    question_text: '',
    options: ['', '', '', '']
  });

  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        navigate('/login');
        return;
      }
      if (!isTeacher) {
        toast.error('Access denied. Teacher role required.');
        navigate('/');
        return;
      }
      fetchData();
    }
  }, [user, isTeacher, authLoading, navigate]);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch all questions (including inactive for teachers)
      const { data: questionsData, error: questionsError } = await supabase
        .from('mc_questions')
        .select('*')
        .order('page_slug')
        .order('display_order');

      if (questionsError) throw questionsError;

      const formattedQuestions: Question[] = (questionsData || []).map(q => ({
        id: q.id,
        page_slug: q.page_slug,
        question_text: q.question_text,
        is_active: q.is_active ?? true,
        display_order: q.display_order ?? 0,
        options: Array.isArray(q.options) ? (q.options as string[]) : []
      }));

      setQuestions(formattedQuestions);

      // Fetch response statistics
      await fetchResponseStats(formattedQuestions);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const fetchResponseStats = async (questionsData: Question[]) => {
    const stats: ResponseStats[] = [];

    for (const question of questionsData) {
      const { data: responses } = await supabase
        .from('mc_responses')
        .select('selected_option')
        .eq('question_id', question.id);

      const optionCounts: Record<number, number> = {};
      (responses || []).forEach(r => {
        optionCounts[r.selected_option] = (optionCounts[r.selected_option] || 0) + 1;
      });

      stats.push({
        questionId: question.id,
        questionText: question.question_text,
        totalResponses: responses?.length || 0,
        optionCounts,
        options: question.options
      });
    }

    setResponseStats(stats);
  };

  const handleCreateQuestion = async () => {
    if (!newQuestion.page_slug.trim() || !newQuestion.question_text.trim()) {
      toast.error('Please fill in page slug and question text');
      return;
    }

    const validOptions = newQuestion.options.filter(o => o.trim());
    if (validOptions.length < 2) {
      toast.error('Please provide at least 2 options');
      return;
    }

    try {
      const { error } = await supabase
        .from('mc_questions')
        .insert({
          page_slug: newQuestion.page_slug.trim(),
          question_text: newQuestion.question_text.trim(),
          options: validOptions,
          display_order: questions.length
        });

      if (error) throw error;

      toast.success('Question created!');
      setNewQuestion({ page_slug: '', question_text: '', options: ['', '', '', ''] });
      fetchData();
    } catch (error) {
      console.error('Error creating question:', error);
      toast.error('Failed to create question');
    }
  };

  const handleToggleActive = async (questionId: string, isActive: boolean) => {
    try {
      const { error } = await supabase
        .from('mc_questions')
        .update({ is_active: isActive })
        .eq('id', questionId);

      if (error) throw error;
      
      setQuestions(prev => 
        prev.map(q => q.id === questionId ? { ...q, is_active: isActive } : q)
      );
    } catch (error) {
      console.error('Error updating question:', error);
      toast.error('Failed to update question');
    }
  };

  const handleDeleteQuestion = async (questionId: string) => {
    if (!confirm('Are you sure? This will delete all responses too.')) return;

    try {
      const { error } = await supabase
        .from('mc_questions')
        .delete()
        .eq('id', questionId);

      if (error) throw error;

      toast.success('Question deleted');
      fetchData();
    } catch (error) {
      console.error('Error deleting question:', error);
      toast.error('Failed to delete question');
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Teacher Dashboard</h1>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>

        <Tabs defaultValue="results">
          <TabsList>
            <TabsTrigger value="results">
              <BarChart3 className="h-4 w-4 mr-2" />
              Results
            </TabsTrigger>
            <TabsTrigger value="questions">
              <Plus className="h-4 w-4 mr-2" />
              Manage Questions
            </TabsTrigger>
          </TabsList>

          <TabsContent value="results" className="space-y-4">
            <div className="flex justify-end">
              <Button variant="outline" size="sm" onClick={fetchData}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </div>

            {responseStats.length === 0 ? (
              <Card>
                <CardContent className="py-8 text-center text-muted-foreground">
                  No questions created yet
                </CardContent>
              </Card>
            ) : (
              responseStats.map((stat) => (
                <Card key={stat.questionId}>
                  <CardHeader>
                    <CardTitle className="text-base">{stat.questionText}</CardTitle>
                    <CardDescription>
                      {stat.totalResponses} response{stat.totalResponses !== 1 ? 's' : ''}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {stat.options.map((option, index) => {
                      const count = stat.optionCounts[index] || 0;
                      const percentage = stat.totalResponses > 0 
                        ? Math.round((count / stat.totalResponses) * 100) 
                        : 0;

                      return (
                        <div key={index} className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>{option}</span>
                            <span className="text-muted-foreground">
                              {count} ({percentage}%)
                            </span>
                          </div>
                          <Progress value={percentage} className="h-2" />
                        </div>
                      );
                    })}
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="questions" className="space-y-4">
            {/* Create new question */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Create New Question</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Page Slug (e.g., spring-2026-week-1)</Label>
                  <Input
                    placeholder="spring-2026-week-1"
                    value={newQuestion.page_slug}
                    onChange={(e) => setNewQuestion(prev => ({ ...prev, page_slug: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Question</Label>
                  <Textarea
                    placeholder="What is your question?"
                    value={newQuestion.question_text}
                    onChange={(e) => setNewQuestion(prev => ({ ...prev, question_text: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Options (at least 2)</Label>
                  {newQuestion.options.map((option, index) => (
                    <Input
                      key={index}
                      placeholder={`Option ${index + 1}`}
                      value={option}
                      onChange={(e) => {
                        const newOptions = [...newQuestion.options];
                        newOptions[index] = e.target.value;
                        setNewQuestion(prev => ({ ...prev, options: newOptions }));
                      }}
                    />
                  ))}
                </div>
                <Button onClick={handleCreateQuestion}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Question
                </Button>
              </CardContent>
            </Card>

            {/* Existing questions */}
            {questions.map((question) => (
              <Card key={question.id}>
                <CardHeader className="flex flex-row items-start justify-between space-y-0">
                  <div>
                    <CardTitle className="text-base">{question.question_text}</CardTitle>
                    <CardDescription>Page: {question.page_slug}</CardDescription>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={question.is_active}
                        onCheckedChange={(checked) => handleToggleActive(question.id, checked)}
                      />
                      <span className="text-sm text-muted-foreground">
                        {question.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleDeleteQuestion(question.id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside text-sm text-muted-foreground">
                    {question.options.map((option, index) => (
                      <li key={index}>{option}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TeacherDashboard;
