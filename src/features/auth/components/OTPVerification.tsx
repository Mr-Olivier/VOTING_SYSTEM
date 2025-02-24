// src/features/auth/components/OTPVerification.tsx
import React, { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import { Shield, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { verifyOTP, checkRegNo} from '../authSlice';

const OTP_LENGTH = 6;

export const OTPVerification = () => {
  const [otp, setOtp] = useState<string[]>(new Array(OTP_LENGTH).fill(''));
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [resendTimer, setResendTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);

  const dispatch = useAppDispatch();
  const { loading, error, verificationStep } = useAppSelector((state) => state.auth);
  const registrationNumber = useAppSelector((state) => state.auth.registrationNumber); // Add registrationNumber to your auth state

  useEffect(() => {
    // Start resend timer
    let interval: NodeJS.Timeout;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  const handleChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input if value is entered
    if (value && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
      setActiveIndex(index + 1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace') {
      if (!otp[index] && index > 0) {
        // Move to previous input on backspace if current input is empty
        const newOtp = [...otp];
        newOtp[index - 1] = '';
        setOtp(newOtp);
        inputRefs.current[index - 1]?.focus();
        setActiveIndex(index - 1);
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
      setActiveIndex(index - 1);
    } else if (e.key === 'ArrowRight' && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
      setActiveIndex(index + 1);
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, OTP_LENGTH);
    const newOtp = [...otp];
    pastedData.split('').forEach((char, index) => {
      if (index < OTP_LENGTH) newOtp[index] = char;
    });
    setOtp(newOtp);
    if (pastedData.length) {
      inputRefs.current[Math.min(pastedData.length - 1, OTP_LENGTH - 1)]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpString = otp.join('');
    if (otpString.length === OTP_LENGTH && registrationNumber) {
      try {
        await dispatch(verifyOTP({ registrationNumber, otp: otpString })).unwrap();
      } catch (error) {
        // Error handling is managed by the slice
      }
    }
  };

  const handleResendOTP = async () => {
    if (canResend && registrationNumber) {
      try {
        await dispatch(checkRegNo({ registrationNumber })).unwrap();
        setResendTimer(30);
        setCanResend(false);
        setOtp(new Array(OTP_LENGTH).fill(''));
        setActiveIndex(0);
        inputRefs.current[0]?.focus();
      } catch (error) {
        // Error handling is managed by the slice
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 dark:bg-primary-900/50 mb-4">
          <Shield className="w-8 h-8 text-primary-600 dark:text-primary-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Verify Your Account
        </h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Enter the verification code sent to your student email
        </p>
      </div>

      {/* OTP Input Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex justify-center space-x-3">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e.target.value.replace(/[^0-9]/g, ''), index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={handlePaste}
              className={`w-12 h-14 text-center text-xl font-semibold border-2 rounded-lg
                ${error ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'}
                ${activeIndex === index ? 'border-primary-500 dark:border-primary-400' : ''}
                focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
                bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                transition-all duration-200`}
            />
          ))}
        </div>

        {error && (
          <p className="text-center text-sm text-red-600 dark:text-red-500">
            {error}
          </p>
        )}

        <Button
          type="submit"
          fullWidth
          isLoading={loading}
          disabled={otp.some((digit) => !digit)}
        >
          Verify Code
        </Button>
      </form>

      {/* Resend Section */}
      <div className="text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Didn't receive the code?{' '}
          {canResend ? (
            <Button
              type="button"
              variant="ghost"
              onClick={handleResendOTP}
              className="text-primary-600 hover:text-primary-700"
              leftIcon={<RefreshCw className="w-4 h-4" />}
            >
              Resend Code
            </Button>
          ) : (
            <span>
              Resend in <span className="font-medium">{resendTimer}s</span>
            </span>
          )}
        </p>
      </div>
    </div>
  );
};