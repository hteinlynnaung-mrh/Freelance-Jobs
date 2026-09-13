import React from 'react';
import { ActivityIndicator, Pressable, Text, type PressableProps } from 'react-native';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends Omit<PressableProps, 'style'> {
  label: string;
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  icon?: React.ReactNode;
  className?: string;
}

const variantClasses: Record<Variant, string> = {
  primary: 'bg-indigo-600 active:bg-indigo-700',
  secondary: 'bg-slate-100 active:bg-slate-200 dark:bg-slate-700 dark:active:bg-slate-600',
  ghost: 'bg-transparent active:bg-slate-100 dark:active:bg-slate-800',
  danger: 'bg-red-600 active:bg-red-700',
};

const labelClasses: Record<Variant, string> = {
  primary: 'text-white font-semibold',
  secondary: 'text-slate-800 dark:text-slate-100 font-semibold',
  ghost: 'text-slate-600 dark:text-slate-300 font-medium',
  danger: 'text-white font-semibold',
};

const sizeClasses: Record<Size, string> = {
  sm: 'px-3 py-2 rounded-lg',
  md: 'px-4 py-3 rounded-xl',
  lg: 'px-6 py-4 rounded-xl',
};

const textSizeClasses: Record<Size, string> = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
};

export function Button({ label, variant = 'primary', size = 'md', loading, icon, disabled, className, ...rest }: ButtonProps) {
  const isDisabled = disabled || loading;
  return (
    <Pressable
      className={`flex-row items-center justify-center gap-2 ${variantClasses[variant]} ${sizeClasses[size]} ${isDisabled ? 'opacity-50' : ''} ${className ?? ''}`}
      disabled={isDisabled}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator size="small" color={variant === 'secondary' || variant === 'ghost' ? '#64748b' : '#fff'} />
      ) : icon}
      <Text className={`${labelClasses[variant]} ${textSizeClasses[size]}`}>{label}</Text>
    </Pressable>
  );
}
