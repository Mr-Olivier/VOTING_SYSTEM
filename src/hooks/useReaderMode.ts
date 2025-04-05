// hooks/useReaderMode.ts
import { useState, useCallback } from 'react';

interface ReaderModeOptions {
  fontSize?: string;
  lineHeight?: string;
  fontFamily?: string;
  textAlign?: string;
}

export const useReaderMode = (initialOptions?: ReaderModeOptions) => {
  const [isReaderMode, setIsReaderMode] = useState(false);
  const [options, setOptions] = useState<ReaderModeOptions>({
    fontSize: '1.2rem',
    lineHeight: '1.8',
    fontFamily: 'Georgia, serif',
    textAlign: 'left',
    ...initialOptions
  });

  const enableReaderMode = useCallback(() => {
    document.body.style.setProperty('--reader-font-size', options.fontSize || '1.2rem');
    document.body.style.setProperty('--reader-line-height', options.lineHeight || '1.8');
    document.body.style.setProperty('--reader-font-family', options.fontFamily || 'Georgia, serif');
    document.body.style.setProperty('--reader-text-align', options.textAlign || 'left');
    document.body.classList.add('reader-mode');
    setIsReaderMode(true);
  }, [options]);

  const disableReaderMode = useCallback(() => {
    document.body.classList.remove('reader-mode');
    setIsReaderMode(false);
  }, []);

  const toggleReaderMode = useCallback(() => {
    if (isReaderMode) {
      disableReaderMode();
    } else {
      enableReaderMode();
    }
  }, [isReaderMode, enableReaderMode, disableReaderMode]);

  const updateOptions = useCallback((newOptions: Partial<ReaderModeOptions>) => {
    setOptions(prev => ({ ...prev, ...newOptions }));
    if (isReaderMode) {
      enableReaderMode();
    }
  }, [isReaderMode, enableReaderMode]);

  return {
    isReaderMode,
    toggleReaderMode,
    enableReaderMode,
    disableReaderMode,
    options,
    updateOptions
  };
};
