'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { User } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error?: string }>;
  signUp: (email: string, password: string, username: string) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
  verifyOTP: (email: string, otp: string) => Promise<{ error?: string }>;
  resendOTP: (email: string) => Promise<{ error?: string; cooldownSeconds?: number }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Production mode - uses real OTP emails
const DEV_MODE = false;

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      try {
        if (DEV_MODE) {
          // In dev mode, check for stored user
          const storedUser = localStorage.getItem('dev_user');
          if (storedUser) {
            setUser(JSON.parse(storedUser));
          }
        } else {
          const { data: { session } } = await supabase.auth.getSession();
          setUser(session?.user ?? null);
        }
      } catch (error) {
        console.error('Error getting session:', error);
        setUser(null);
      }
      setLoading(false);
    };

    getSession();

    if (!DEV_MODE) {
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          setUser(session?.user ?? null);
          setLoading(false);
        }
      );

      return () => subscription?.unsubscribe();
    }
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      if (DEV_MODE) {
        // In development mode, simulate successful login and proceed to OTP
        return {};
      }

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) return { error: error.message };
      
      // Send OTP for additional verification
      const { error: otpError } = await supabase.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: false,
        }
      });
      
      if (otpError) return { error: otpError.message };
      
      return {};
    } catch (error) {
      return { error: 'An unexpected error occurred' };
    }
  };

  const signUp = async (email: string, password: string, username: string) => {
    try {
      if (DEV_MODE) {
        // In development mode, simulate successful signup and proceed to OTP
        return {};
      }

      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username,
          }
        }
      });
      
      if (error) return { error: error.message };
      return {};
    } catch (error) {
      return { error: 'An unexpected error occurred' };
    }
  };

  const signOut = async () => {
    if (DEV_MODE) {
      setUser(null);
      localStorage.removeItem('dev_user');
      return;
    }
    await supabase.auth.signOut();
  };

  const verifyOTP = async (email: string, otp: string) => {
    try {
      if (DEV_MODE) {
        // In development mode, accept any 6-digit code
        if (otp.length === 6 && /^\d{6}$/.test(otp)) {
          const mockUser = {
            id: 'dev-user-' + Date.now(),
            email,
            user_metadata: { username: email.split('@')[0] },
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            aud: 'authenticated',
            role: 'authenticated',
            email_confirmed_at: new Date().toISOString()
          } as User;
          
          setUser(mockUser);
          localStorage.setItem('dev_user', JSON.stringify(mockUser));
          return {};
        } else {
          return { error: 'Please enter a valid 6-digit code' };
        }
      }

      const { error } = await supabase.auth.verifyOtp({
        email,
        token: otp,
        type: 'email',
      });
      
      if (error) {
        // Handle specific OTP errors with better messaging
        if (error.message.includes('expired') || error.message.includes('invalid')) {
          return { error: 'The verification code has expired or is invalid. Please request a new code.' };
        }
        return { error: error.message };
      }
      return {};
    } catch (error) {
      return { error: 'An unexpected error occurred' };
    }
  };

  const resendOTP = async (email: string) => {
    try {
      if (DEV_MODE) {
        // In development mode, simulate successful resend
        return {};
      }

      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: false,
        }
      });
      
      if (error) {
        // Handle rate limiting errors
        if (error.message.includes('rate_limit') || error.message.includes('rate limit')) {
          // Extract seconds from error message if available
          const match = error.message.match(/(\d+)\s*seconds?/);
          const cooldownSeconds = match ? parseInt(match[1]) : 60;
          return { 
            error: `Too many requests. Please wait ${cooldownSeconds} seconds before trying again.`,
            cooldownSeconds 
          };
        }
        return { error: error.message };
      }
      return {};
    } catch (error) {
      return { error: 'An unexpected error occurred' };
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      signIn,
      signUp,
      signOut,
      verifyOTP,
      resendOTP,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}