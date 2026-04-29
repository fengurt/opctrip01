import { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/_core/hooks/useAuth';
import { cn } from '@/lib/utils';

interface EditableTextProps {
  value: string;
  onSave: (newValue: string) => Promise<void>;
  className?: string;
  as?: 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div';
  multiline?: boolean;
  placeholder?: string;
}

export function EditableText({
  value,
  onSave,
  className,
  as: Component = 'span',
  multiline = false,
  placeholder = '点击编辑 / Click to edit',
}: EditableTextProps) {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';
  
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);
  const [isSaving, setIsSaving] = useState(false);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  useEffect(() => {
    setEditValue(value);
  }, [value]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleDoubleClick = () => {
    if (isAdmin) {
      setIsEditing(true);
    }
  };

  const handleSave = async () => {
    if (editValue === value) {
      setIsEditing(false);
      return;
    }
    
    setIsSaving(true);
    try {
      await onSave(editValue);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to save:', error);
      setEditValue(value); // Revert on error
    } finally {
      setIsSaving(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !multiline) {
      e.preventDefault();
      handleSave();
    }
    if (e.key === 'Escape') {
      setEditValue(value);
      setIsEditing(false);
    }
  };

  const handleBlur = () => {
    handleSave();
  };

  if (isEditing) {
    const inputClassName = cn(
      'bg-yellow-100/90 text-black px-2 py-1 rounded border-2 border-yellow-400 focus:outline-none focus:border-yellow-500 w-full',
      className
    );

    if (multiline) {
      return (
        <textarea
          ref={inputRef as React.RefObject<HTMLTextAreaElement>}
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          disabled={isSaving}
          className={cn(inputClassName, 'min-h-[100px] resize-y')}
          placeholder={placeholder}
        />
      );
    }

    return (
      <input
        ref={inputRef as React.RefObject<HTMLInputElement>}
        type="text"
        value={editValue}
        onChange={(e) => setEditValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        disabled={isSaving}
        className={inputClassName}
        placeholder={placeholder}
      />
    );
  }

  return (
    <Component
      onDoubleClick={handleDoubleClick}
      className={cn(
        className,
        isAdmin && 'cursor-pointer hover:bg-yellow-400/20 hover:outline hover:outline-2 hover:outline-yellow-400/50 hover:outline-dashed transition-all rounded'
      )}
      title={isAdmin ? '双击编辑 / Double-click to edit' : undefined}
    >
      {value || (isAdmin ? placeholder : '')}
    </Component>
  );
}
