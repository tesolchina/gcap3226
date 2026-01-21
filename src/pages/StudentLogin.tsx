import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useStudent } from '@/contexts/StudentContext';
import { toast } from 'sonner';
import { Copy, Check, GraduationCap } from 'lucide-react';
import { z } from 'zod';

const studentLoginSchema = z.object({
  studentIdLast4: z.string().length(4, 'Must be exactly 4 digits').regex(/^\d{4}$/, 'Must be 4 digits'),
  firstName: z.string().min(1, 'First name is required').max(50, 'First name too long'),
  lastNameInitial: z.string().length(1, 'Must be single letter').regex(/^[A-Za-z]$/, 'Must be a letter'),
});

const StudentLogin = () => {
  const navigate = useNavigate();
  const { session, login, logout } = useStudent();
  const [studentIdLast4, setStudentIdLast4] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastNameInitial, setLastNameInitial] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const validation = studentLoginSchema.safeParse({
      studentIdLast4,
      firstName,
      lastNameInitial,
    });

    if (!validation.success) {
      const fieldErrors: Record<string, string> = {};
      validation.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);
    try {
      const code = await login(studentIdLast4, firstName, lastNameInitial);
      toast.success('Session created! Your unique code: ' + code);
    } catch (error: any) {
      console.error('Login error:', error);
      toast.error(error.message || 'Failed to create session');
    } finally {
      setLoading(false);
    }
  };

  const handleCopyCode = () => {
    if (session?.uniqueCode) {
      navigator.clipboard.writeText(session.uniqueCode);
      setCopied(true);
      toast.success('Code copied to clipboard');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    setStudentIdLast4('');
    setFirstName('');
    setLastNameInitial('');
  };

  if (session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
        <Card className="w-full max-w-sm border-0 shadow-lg">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-2">
              <GraduationCap className="w-6 h-6 text-primary" />
            </div>
            <CardTitle className="text-xl font-semibold tracking-tight">
              Welcome, {session.firstName}!
            </CardTitle>
            <CardDescription className="text-muted-foreground text-sm">
              Your unique student code
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4 space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <code className="text-lg font-mono font-bold text-primary">
                  {session.uniqueCode}
                </code>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleCopyCode}
                  className="h-8 w-8"
                >
                  {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            <p className="text-xs text-muted-foreground text-center">
              Use this code to identify yourself in project groups and activities.
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => navigate('/spring-2026')}
              >
                Go to Course
              </Button>
              <Button
                variant="ghost"
                className="flex-1"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <Card className="w-full max-w-sm border-0 shadow-lg">
        <CardHeader className="text-center pb-2">
          <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-2">
            <GraduationCap className="w-6 h-6 text-primary" />
          </div>
          <CardTitle className="text-xl font-semibold tracking-tight">
            Student Login
          </CardTitle>
          <CardDescription className="text-muted-foreground text-sm">
            Enter your details to get your unique code
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-4">
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="studentId">Last 4 Digits of Student ID</Label>
              <Input
                id="studentId"
                type="text"
                placeholder="1234"
                maxLength={4}
                value={studentIdLast4}
                onChange={(e) => setStudentIdLast4(e.target.value.replace(/\D/g, ''))}
                disabled={loading}
                className={errors.studentIdLast4 ? 'border-destructive' : ''}
              />
              {errors.studentIdLast4 && (
                <p className="text-xs text-destructive">{errors.studentIdLast4}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                type="text"
                placeholder="John"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                disabled={loading}
                className={errors.firstName ? 'border-destructive' : ''}
              />
              {errors.firstName && (
                <p className="text-xs text-destructive">{errors.firstName}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastNameInitial">Last Name Initial</Label>
              <Input
                id="lastNameInitial"
                type="text"
                placeholder="D"
                maxLength={1}
                value={lastNameInitial}
                onChange={(e) => setLastNameInitial(e.target.value.replace(/[^A-Za-z]/g, ''))}
                disabled={loading}
                className={errors.lastNameInitial ? 'border-destructive' : ''}
              />
              {errors.lastNameInitial && (
                <p className="text-xs text-destructive">{errors.lastNameInitial}</p>
              )}
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Creating...' : 'Get My Code'}
            </Button>
          </form>
          <div className="mt-4 text-center">
            <Button
              variant="link"
              className="text-sm text-muted-foreground"
              onClick={() => navigate('/login')}
            >
              Teacher Login →
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentLogin;
