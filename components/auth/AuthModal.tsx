'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { LoginForm } from './LoginForm';
import { SignupForm } from './SignupForm';
import { OTPForm } from './OTPForm';
import { Button } from '@/components/ui/button';

interface AuthModalProps {
  mode: 'login' | 'signup';
  isOpen: boolean;
  onClose: () => void;
}

export function AuthModal({ mode: initialMode, isOpen, onClose }: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'signup' | 'otp'>(initialMode);
  const [email, setEmail] = useState('');

  const handleOTPRequired = (userEmail: string) => {
    setEmail(userEmail);
    setMode('otp');
  };

  const handleBackToAuth = () => {
    setMode(initialMode);
  };

  const titles = {
    login: 'Welcome Back',
    signup: 'Create Account',
    otp: 'Verify Your Email'
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            {titles[mode]}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {mode === 'login' && (
            <LoginForm onOTPRequired={handleOTPRequired} />
          )}
          
          {mode === 'signup' && (
            <SignupForm onOTPRequired={handleOTPRequired} />
          )}
          
          {mode === 'otp' && (
            <OTPForm 
              email={email} 
              onSuccess={onClose}
              onBack={handleBackToAuth}
            />
          )}

          {mode !== 'otp' && (
            <div className="text-center text-sm text-gray-600">
              {mode === 'login' ? (
                <>
                  Don't have an account?{' '}
                  <Button 
                    variant="link" 
                    className="p-0 h-auto font-semibold text-primary"
                    onClick={() => setMode('signup')}
                  >
                    Sign up
                  </Button>
                </>
              ) : (
                <>
                  Already have an account?{' '}
                  <Button 
                    variant="link" 
                    className="p-0 h-auto font-semibold text-primary"
                    onClick={() => setMode('login')}
                  >
                    Login
                  </Button>
                </>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}