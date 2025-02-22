// components/AccessibilityControls.tsx
import { Book, Mic, Volume2, BookOpen, VolumeX, Pause, Play } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Popover, Transition } from '@headlessui/react';
import { useVoiceOver } from '@/hooks/useVoiceOver';
import { useReaderMode } from '@/hooks/useReaderMode';

interface AccessibilityControlsProps {
  className?: string;
}

export const AccessibilityControls = ({ className }: AccessibilityControlsProps) => {
  const {
    speak,
    pause,
    resume,
    stop,
    isReading,
    isPaused,
    voices,
    currentVoice,
    setVoice
  } = useVoiceOver();

  const {
    isReaderMode,
    toggleReaderMode,
    options,
    updateOptions
  } = useReaderMode();

  // Function to read current page content
  const readPage = () => {
    const content = document.querySelector('main')?.textContent;
    if (content) {
      speak(content);
    }
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Reader Mode Toggle */}
      <Button
        variant="ghost"
        size="sm"
        onClick={toggleReaderMode}
        className={`relative ${isReaderMode ? 'text-primary-500' : ''}`}
      >
        {isReaderMode ? (
          <Book className="h-5 w-5" />
        ) : (
          <BookOpen className="h-5 w-5" />
        )}
        <span className="sr-only">
          {isReaderMode ? 'Disable' : 'Enable'} reader mode
        </span>
      </Button>

      {/* Voice Over Controls */}
      <Popover className="relative">
        <Popover.Button as={Button} variant="ghost" size="sm">
          {isReading ? (
            isPaused ? (
              <Pause className="h-5 w-5" />
            ) : (
              <Volume2 className="h-5 w-5 text-primary-500" />
            )
          ) : (
            <Mic className="h-5 w-5" />
          )}
        </Popover.Button>

        <Transition
          enter="transition duration-100 ease-out"
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-75 ease-out"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0"
        >
          <Popover.Panel className="absolute right-0 z-50 mt-2 w-72 rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 p-4">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                  Voice Selection
                </h3>
                <select
                  className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm"
                  value={currentVoice?.name}
                  onChange={(e) => {
                    const voice = voices.find(v => v.name === e.target.value);
                    if (voice) setVoice(voice);
                  }}
                >
                  {voices.map(voice => (
                    <option key={voice.name} value={voice.name}>
                      {voice.name} ({voice.lang})
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex space-x-2">
                {isReading ? (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={isPaused ? resume : pause}
                      className="flex-1"
                    >
                      {isPaused ? (
                        <Play className="h-4 w-4 mr-1" />
                      ) : (
                        <Pause className="h-4 w-4 mr-1" />
                      )}
                      {isPaused ? 'Resume' : 'Pause'}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={stop}
                      className="flex-1"
                    >
                      <VolumeX className="h-4 w-4 mr-1" />
                      Stop
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={readPage}
                    className="flex-1"
                  >
                    <Volume2 className="h-4 w-4 mr-1" />
                    Read Page
                  </Button>
                )}
              </div>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
    </div>
  );
};