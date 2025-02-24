import React from 'react';
import { X } from 'lucide-react';
import classNames from 'classnames';
import { Button } from './Button';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  closeOnOverlayClick?: boolean;
  showCloseButton?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'md',
  closeOnOverlayClick = true,
  showCloseButton = true,
}) => {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-full mx-4',
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity z-40"
        onClick={() => closeOnOverlayClick && onClose()}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <div
            className={classNames(
              'relative bg-white rounded-lg shadow-xl w-full',
              'transform transition-all',
              sizeClasses[size]
            )}
          >
            {/* Header */}
            {(title || showCloseButton) && (
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                {title && (
                  <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                )}
                {showCloseButton && (
                  <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-gray-500 focus:outline-none"
                  >
                    <X className="h-5 w-5" />
                  </button>
                )}
              </div>
            )}

            {/* Content */}
            <div className="p-4">{children}</div>

            {/* Footer */}
            {footer && (
              <div className="flex justify-end gap-3 p-4 border-t border-gray-200 bg-gray-50">
                {footer}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

// Usage example component
export const ModalExample: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Example Modal"
        footer={
          <>
            <Button variant="ghost" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsOpen(false)}>Confirm</Button>
          </>
        }
      >
        <p>This is the modal content.</p>
      </Modal>
    </>
  );
};