import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppSelector } from '@/store';
import { RegNoCheck } from './RegNoCheck';
import { OTPVerification } from './OTPVerification';
import { CreatePassword } from './CreatePassword';
import { Card } from '@/components/ui/Card';

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0
  })
};

export const AuthContainer = () => {
  const { verificationStep } = useAppSelector((state) => state.auth);
  const [direction, setDirection] = React.useState(0);

  React.useEffect(() => {
    // Determine animation direction based on step change
    const steps = ['regNoCheck', 'otpVerification', 'createPassword'];
    const currentIndex = steps.indexOf(verificationStep);
    const prevIndex = steps.indexOf(verificationStep);
    setDirection(currentIndex > prevIndex ? 1 : -1);
  }, [verificationStep]);

  const renderStep = () => {
    switch (verificationStep) {
      case 'regNoCheck':
        return <RegNoCheck />;
      case 'otpVerification':
        return <OTPVerification />;
      case 'createPassword':
        return <CreatePassword />;
      default:
        return <RegNoCheck />;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={verificationStep}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            className="p-8"
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </Card>
    </div>
  );
};