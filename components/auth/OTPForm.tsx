'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { ArrowLeft, RefreshCw, Info, Clock, CheckCircle } from 'lucide-react';

interface OTPFormProps {
  email: string;
  onSuccess: () => void;
  onBack: () => void;
}

export function OTPForm({ email, onSuccess, onBack }: OTPFormProps) {
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const { verifyOTP, resendOTP } = useAuth();

  // Countdown timer for resend cooldown
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (resendCooldown > 0) {
      interval = setInterval(() => {
        setResendCooldown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendCooldown]);

  const handleVerify = async () => {
    if (otp.length !== 6) {
      toast.error('Please enter a complete 6-digit code');
      return;
    }

    if (!/^\d{6}$/.test(otp)) {
      toast.error('Please enter only numbers');
      return;
    }

    setIsLoading(true);
    
    try {
      const { error } = await verifyOTP(email, otp);
      
      if (error) {
        if (error.includes('expired') || error.includes('invalid')) {
          toast.error('The verification code has expired or is invalid. Please request a new code.');
          setOtp('');
        } else {
          toast.error(error);
        }
      } else {
        toast.success('Email verified successfully!');
        onSuccess();
      }
    } catch (error) {
      toast.error('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    if (resendCooldown > 0) {
      toast.error(`Please wait ${resendCooldown} seconds before requesting a new code`);
      return;
    }

    setIsResending(true);
    
    try {
      const { error, cooldownSeconds } = await resendOTP(email);
      
      if (error) {
        if (error.includes('rate_limit') || error.includes('rate limit')) {
          const seconds = cooldownSeconds || 60;
          setResendCooldown(seconds);
          toast.error(`Too many requests. Please wait ${seconds} seconds before trying again.`);
        } else {
          toast.error(error);
        }
      } else {
        toast.success('New verification code sent to your email');
        setOtp('');
        setResendCooldown(60); // Set a default cooldown
      }
    } catch (error) {
      toast.error('Failed to resend verification code');
    } finally {
      setIsResending(false);
    }
  };

  // Auto-fill demo code for development
  const fillDemoCode = () => {
    setOtp('123456');
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <p className="text-gray-600">
          We've sent a 6-digit verification code to
        </p>
        <p className="font-semibold">{email}</p>
      </div>

      {/* Email Verification Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-2">
          <Info className="w-5 h-5 text-blue-600 mt-0.5" />
          <div className="text-sm">
            <p className="font-medium text-blue-800">Check Your Email</p>
            <p className="text-blue-700">
              Please check your email for the verification code. It may take a few minutes to arrive.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <Label className="text-center block">Enter verification code</Label>
        <div className="flex justify-center">
          <InputOTP value={otp} onChange={setOtp} maxLength={6}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>
      </div>

      <div className="space-y-3">
        <Button 
          onClick={handleVerify}
          className="w-full" 
          disabled={isLoading || otp.length !== 6}
          size="lg"
        >
          {isLoading ? <LoadingSpinner className="w-4 h-4" /> : 'Verify Email'}
        </Button>

        <div className="flex flex-col space-y-2">
          <Button
            variant="outline"
            onClick={handleResend}
            disabled={isResending || resendCooldown > 0}
            className="w-full"
          >
            {isResending ? (
              <LoadingSpinner className="w-4 h-4" />
            ) : resendCooldown > 0 ? (
              <>
                <Clock className="w-4 h-4 mr-2" />
                Wait {resendCooldown}s
              </>
            ) : (
              <>
                <RefreshCw className="w-4 h-4 mr-2" />
                Resend Code
              </>
            )}
          </Button>

          <Button
            variant="ghost"
            onClick={onBack}
            className="w-full"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Login
          </Button>
        </div>
      </div>

      {/* Help text */}
      <div className="text-xs text-gray-500 text-center">
        <p>Didn't receive the code? Check your spam folder.</p>
      </div>
    </div>
  );
}