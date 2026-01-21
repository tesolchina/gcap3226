import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface StudentSession {
  id: string;
  studentIdLast4: string;
  firstName: string;
  lastNameInitial: string;
  uniqueCode: string;
}

interface StudentContextType {
  session: StudentSession | null;
  loading: boolean;
  login: (studentIdLast4: string, firstName: string, lastNameInitial: string) => Promise<string>;
  logout: () => void;
}

const StudentContext = createContext<StudentContextType>({
  session: null,
  loading: true,
  login: async () => '',
  logout: () => {},
});

export const useStudent = () => useContext(StudentContext);

const generateUniqueCode = (last4: string, firstInitial: string, lastInitial: string): string => {
  const shortId = Math.random().toString(36).substring(2, 6);
  return `${last4}-${firstInitial.toUpperCase()}${lastInitial.toUpperCase()}-${shortId}`;
};

export const StudentProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<StudentSession | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedCode = localStorage.getItem('student_unique_code');
    if (storedCode) {
      loadSession(storedCode);
    } else {
      setLoading(false);
    }
  }, []);

  const loadSession = async (uniqueCode: string) => {
    try {
      const { data, error } = await supabase
        .from('student_sessions')
        .select('*')
        .eq('unique_code', uniqueCode)
        .single();

      if (data && !error) {
        setSession({
          id: data.id,
          studentIdLast4: data.student_id_last4,
          firstName: data.first_name,
          lastNameInitial: data.last_name_initial,
          uniqueCode: data.unique_code,
        });
      } else {
        localStorage.removeItem('student_unique_code');
      }
    } catch (error) {
      console.error('Error loading student session:', error);
      localStorage.removeItem('student_unique_code');
    } finally {
      setLoading(false);
    }
  };

  const login = useCallback(async (
    studentIdLast4: string,
    firstName: string,
    lastNameInitial: string
  ): Promise<string> => {
    const normalizedFirst = firstName.trim();
    const normalizedLast = lastNameInitial.trim().toUpperCase();
    const normalizedLast4 = studentIdLast4.trim();

    // Check if session already exists
    const { data: existing } = await supabase
      .from('student_sessions')
      .select('*')
      .eq('student_id_last4', normalizedLast4)
      .eq('first_name', normalizedFirst)
      .eq('last_name_initial', normalizedLast)
      .single();

    if (existing) {
      setSession({
        id: existing.id,
        studentIdLast4: existing.student_id_last4,
        firstName: existing.first_name,
        lastNameInitial: existing.last_name_initial,
        uniqueCode: existing.unique_code,
      });
      localStorage.setItem('student_unique_code', existing.unique_code);
      return existing.unique_code;
    }

    // Create new session
    const uniqueCode = generateUniqueCode(normalizedLast4, normalizedFirst[0], normalizedLast);
    
    const { data: newSession, error } = await supabase
      .from('student_sessions')
      .insert({
        student_id_last4: normalizedLast4,
        first_name: normalizedFirst,
        last_name_initial: normalizedLast,
        unique_code: uniqueCode,
      })
      .select()
      .single();

    if (error) throw error;

    if (newSession) {
      setSession({
        id: newSession.id,
        studentIdLast4: newSession.student_id_last4,
        firstName: newSession.first_name,
        lastNameInitial: newSession.last_name_initial,
        uniqueCode: newSession.unique_code,
      });
      localStorage.setItem('student_unique_code', newSession.unique_code);
      return newSession.unique_code;
    }

    throw new Error('Failed to create session');
  }, []);

  const logout = useCallback(() => {
    setSession(null);
    localStorage.removeItem('student_unique_code');
  }, []);

  return (
    <StudentContext.Provider value={{ session, loading, login, logout }}>
      {children}
    </StudentContext.Provider>
  );
};
