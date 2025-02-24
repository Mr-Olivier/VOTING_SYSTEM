import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  UserSquare2, 
  ArrowRight, 
  Info, 
  AlertCircle, 
  ChevronRight,
  CheckCircle2,
  School
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { checkRegNo } from '../authSlice';
import { useAppDispatch, useAppSelector } from '@/store';

// Animation variants
const formVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const floatingIconVariants = {
  initial: { y: 0 },
  float: {
    y: [-10, 0],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut"
    }
  }
};

interface ValidationState {
  isValid: boolean;
  message: string;
}

export const RegNoCheck = () => {
  const [registrationNumber, setRegNo] = useState('');
  const [validation, setValidation] = useState<ValidationState>({ 
    isValid: true, 
    message: '' 
  });
  const [isFocused, setIsFocused] = useState(false);
  const [typingComplete, setTypingComplete] = useState(false);
  
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error } = useAppSelector((state) => state.auth);

  // Validate registration number format
  useEffect(() => {
    const validateRegNo = () => {
      if (!registrationNumber) {
        setValidation({ isValid: true, message: '' });
        return;
      }

      if (!/^\d+$/.test(registrationNumber)) {
        setValidation({ 
          isValid: false, 
          message: 'Registration number should only contain digits' 
        });
        return;
      }

      if (registrationNumber.length !== 9) {
        setValidation({ 
          isValid: false, 
          message: 'Registration number must be exactly 9 digits' 
        });
        return;
      }

      if (!registrationNumber.startsWith('22')) {
        setValidation({ 
          isValid: false, 
          message: 'Registration number should start with 22' 
        });
        return;
      }

      setValidation({ isValid: true, message: 'Valid registration number' });
    };

    validateRegNo();
  }, [registrationNumber]);

  // Handle typing completion
  useEffect(() => {
    if (registrationNumber.length === 9) {
      setTypingComplete(true);
    } else {
      setTypingComplete(false);
    }
  }, [registrationNumber]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (registrationNumber && validation.isValid) {
      try {
        await dispatch(checkRegNo({ registrationNumber })).unwrap();
      } catch (error) {
        // Error handling is managed by the slice
      }
    }
  };

  return (
    <motion.div 
      className="space-y-6"
      initial="hidden"
      animate="visible"
      variants={formVariants}
    >
      {/* Header Section */}
      <div className="text-center space-y-4">
        <motion.div 
          className="inline-block"
          // variants={floatingIconVariants}
          initial="initial"
          animate="float"
        >
          <div className="relative">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary-100 dark:bg-primary-900/50">
              <School className="w-10 h-10 text-primary-600 dark:text-primary-400" />
            </div>
            <AnimatePresence>
              {typingComplete && validation.isValid && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -right-1 -bottom-1"
                >
                  <CheckCircle2 className="w-6 h-6 text-green-500" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
        
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Welcome to UR E-Voting
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Enter your student registration number to get started
          </p>
        </div>
      </div>

      {/* Form Section */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <div className="relative">
            <Input
              label="Registration Number"
              value={registrationNumber}
              onChange={(e) => setRegNo(e.target.value.slice(0, 9))}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="222XXXXXX"
              leftIcon={<UserSquare2 className="w-5 h-5" />}
              error={error || (validation.isValid ? undefined : validation.message)}
              required
              className={`transition-all duration-300 ${
                isFocused ? 'ring-2 ring-primary-500' : ''
              } ${
                typingComplete && validation.isValid 
                  ? 'ring-2 ring-green-500' 
                  : ''
              }`}
            />
            
            <AnimatePresence>
              {typingComplete && validation.isValid && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Validation Message */}
          <AnimatePresence>
            {registrationNumber && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="text-sm"
              >
                {validation.isValid ? (
                  <p className="text-green-600 dark:text-green-400 flex items-center">
                    <CheckCircle2 className="w-4 h-4 mr-1" />
                    {validation.message}
                  </p>
                ) : (
                  <p className="text-red-600 dark:text-red-400 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {validation.message}
                  </p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Submit Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Button
            type="submit"
            fullWidth
            isLoading={loading}
            disabled={!validation.isValid || !typingComplete}
            rightIcon={<ArrowRight className="w-5 h-5" />}
            className="group"
          >
            <span className="relative">
              Verify Registration Number
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform" />
            </span>
          </Button>
        </motion.div>
      </form>

      {/* Login Link */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-center"
      >
        <span className="text-sm text-gray-600 dark:text-gray-400">
          Already have an account?{' '}
        </span>
        <Button
          variant="ghost"
          onClick={() => navigate('/login')}
          className="text-primary-600 hover:text-primary-700 inline-flex items-center"
        >
          Sign in
          <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </motion.div>

      {/* Help Text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center text-sm text-gray-500 dark:text-gray-400"
      >
        <Info className="w-4 h-4 inline-block mr-1" />
        Can't find your registration number?{' '}
        <Button
          variant="link"
          onClick={() => navigate('/contact-admin')}
          className="text-primary-600 hover:text-primary-700"
        >
          Contact Admin
        </Button>
      </motion.div>
    </motion.div>
  );
};