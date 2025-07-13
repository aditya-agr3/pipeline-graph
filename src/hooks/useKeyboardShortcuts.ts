import { useEffect } from 'react';

interface KeyboardShortcutsProps {
  onDelete: () => void;
  onAddNode: () => void;
}

export const useKeyboardShortcuts = ({ onDelete, onAddNode }: KeyboardShortcutsProps) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Don't trigger shortcuts if user is typing in an input
      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement ||
        event.target instanceof HTMLSelectElement ||
        (event.target as HTMLElement)?.isContentEditable
      ) {
        return;
      }

      switch (event.key) {
        case 'Delete':
        case 'Backspace':
          event.preventDefault();
          onDelete();
          break;
        case 'n':
          if (event.ctrlKey || event.metaKey) {
            event.preventDefault();
            onAddNode();
          }
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onDelete, onAddNode]);
};