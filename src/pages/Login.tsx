import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { z } from 'zod';
import { Clock, CheckCircle, XCircle, GraduationCap } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
  fullName: z.string().min(2, 'Full name is required'),
  sectionNumbers: z.string().min(1, 'At least one section is required'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

type RegistrationStatus = 'pending' | 'approved' | 'rejected' | null;

const Login = () => {
  const navigate = useNavigate();
  const { user, isTeacher } = useAuth();
  const [activeTab, setActiveTab] = useState('login');
  
  // Login state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [registrationStatus, setRegistrationStatus] = useState<RegistrationStatus>(null);
  
  // Register state
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [regFullName, setRegFullName] = useState('');
  const [regSections, setRegSections] = useState('');
  const [regLoading, setRegLoading] = useState(false);
  const [regErrors, setRegErrors] = useState<Record<string, string>>({});
  const [loginErrors, setLoginErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (user && isTeacher) {
      navigate('/teacher-dashboard');
    }
  }, [user, isTeacher, navigate]);

  const checkRegistrationStatus = async (userId: string): Promise<RegistrationStatus> => {
    const { data } = await supabase
      .from('teacher_registrations')
      .select('status')
      .eq('user_id', userId)
      .single();
    
    return data?.status as RegistrationStatus || null;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginErrors({});
    setRegistrationStatus(null);
    
    const validation = loginSchema.safeParse({ email, password });
    if (!validation.success) {
      const fieldErrors: Record<string, string> = {};
      validation.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setLoginErrors(fieldErrors);
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) throw error;
      
      if (data.user) {
        // Check if already a teacher
        const { data: roleData } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', data.user.id)
          .eq('role', 'teacher')
          .single();

        if (roleData) {
          toast.success('Logged in successfully');
          navigate('/teacher-dashboard');
        } else {
          // Check registration status
          const status = await checkRegistrationStatus(data.user.id);
          setRegistrationStatus(status);
          
          if (status === 'pending') {
            toast.info('Your registration is pending approval');
          } else if (status === 'rejected') {
            toast.error('Your registration was not approved');
          } else {
            toast.error('No teacher registration found');
          }
        }
      }
    } catch (error: any) {
      console.error('Login error:', error);
      toast.error(error.message || 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegErrors({});

    const validation = registerSchema.safeParse({
      email: regEmail,
      password: regPassword,
      confirmPassword: regConfirmPassword,
      fullName: regFullName,
      sectionNumbers: regSections,
    });

    if (!validation.success) {
      const fieldErrors: Record<string, string> = {};
      validation.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setRegErrors(fieldErrors);
      return;
    }

    setRegLoading(true);
    try {
      // Create auth account
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: regEmail.trim(),
        password: regPassword,
      });

      if (authError) throw authError;

      if (authData.user) {
        // Create teacher registration
        const sections = regSections.split(',').map(s => s.trim()).filter(Boolean);
        
        const { error: regError } = await supabase
          .from('teacher_registrations')
          .insert({
            user_id: authData.user.id,
            email: regEmail.trim(),
            full_name: regFullName.trim(),
            section_numbers: sections,
            status: 'pending',
          });

        if (regError) throw regError;

        toast.success('Registration submitted! Please wait for admin approval.');
        setActiveTab('login');
        setEmail(regEmail);
        setRegEmail('');
        setRegPassword('');
        setRegConfirmPassword('');
        setRegFullName('');
        setRegSections('');
      }
    } catch (error: any) {
      console.error('Registration error:', error);
      toast.error(error.message || 'Failed to register');
    } finally {
      setRegLoading(false);
    }
  };

  const renderStatusMessage = () => {
    if (registrationStatus === 'pending') {
      return (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start gap-3">
          <Clock className="h-5 w-5 text-yellow-600 mt-0.5" />
          <div>
            <p className="font-medium text-yellow-800">Pending Approval</p>
            <p className="text-sm text-yellow-700">Your registration is being reviewed by an administrator.</p>
          </div>
        </div>
      );
    }
    if (registrationStatus === 'rejected') {
      return (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
          <XCircle className="h-5 w-5 text-red-600 mt-0.5" />
          <div>
            <p className="font-medium text-red-800">Registration Not Approved</p>
            <p className="text-sm text-red-700">Please contact the administrator for more information.</p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <Card className="w-full max-w-md border-0 shadow-lg">
        <CardHeader className="text-center pb-2">
          <CardTitle className="text-xl font-semibold tracking-tight">
            Teacher Portal
          </CardTitle>
          <CardDescription className="text-muted-foreground text-sm">
            Sign in or register for teacher access
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-4">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="login">Sign In</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="space-y-4">
              {renderStatusMessage()}
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="teacher@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                    className={loginErrors.email ? 'border-destructive' : ''}
                  />
                  {loginErrors.email && (
                    <p className="text-xs text-destructive">{loginErrors.email}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                    className={loginErrors.password ? 'border-destructive' : ''}
                  />
                  {loginErrors.password && (
                    <p className="text-xs text-destructive">{loginErrors.password}</p>
                  )}
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'Signing in...' : 'Sign In'}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="register" className="space-y-4">
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="regFullName">Full Name</Label>
                  <Input
                    id="regFullName"
                    type="text"
                    placeholder="Dr. Jane Smith"
                    value={regFullName}
                    onChange={(e) => setRegFullName(e.target.value)}
                    disabled={regLoading}
                    className={regErrors.fullName ? 'border-destructive' : ''}
                  />
                  {regErrors.fullName && (
                    <p className="text-xs text-destructive">{regErrors.fullName}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="regEmail">Email</Label>
                  <Input
                    id="regEmail"
                    type="email"
                    placeholder="teacher@example.com"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    disabled={regLoading}
                    className={regErrors.email ? 'border-destructive' : ''}
                  />
                  {regErrors.email && (
                    <p className="text-xs text-destructive">{regErrors.email}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="regPassword">Password</Label>
                  <Input
                    id="regPassword"
                    type="password"
                    placeholder="••••••••"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    disabled={regLoading}
                    className={regErrors.password ? 'border-destructive' : ''}
                  />
                  {regErrors.password && (
                    <p className="text-xs text-destructive">{regErrors.password}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="regConfirmPassword">Confirm Password</Label>
                  <Input
                    id="regConfirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={regConfirmPassword}
                    onChange={(e) => setRegConfirmPassword(e.target.value)}
                    disabled={regLoading}
                    className={regErrors.confirmPassword ? 'border-destructive' : ''}
                  />
                  {regErrors.confirmPassword && (
                    <p className="text-xs text-destructive">{regErrors.confirmPassword}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="regSections">Section Numbers</Label>
                  <Input
                    id="regSections"
                    type="text"
                    placeholder="01, 02, 03"
                    value={regSections}
                    onChange={(e) => setRegSections(e.target.value)}
                    disabled={regLoading}
                    className={regErrors.sectionNumbers ? 'border-destructive' : ''}
                  />
                  <p className="text-xs text-muted-foreground">Comma-separated section numbers you teach</p>
                  {regErrors.sectionNumbers && (
                    <p className="text-xs text-destructive">{regErrors.sectionNumbers}</p>
                  )}
                </div>
                <Button type="submit" className="w-full" disabled={regLoading}>
                  {regLoading ? 'Submitting...' : 'Submit Registration'}
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <div className="mt-4 text-center">
            <Button
              variant="link"
              className="text-sm text-muted-foreground"
              onClick={() => navigate('/student-login')}
            >
              <GraduationCap className="w-4 h-4 mr-1" />
              Student Login →
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
