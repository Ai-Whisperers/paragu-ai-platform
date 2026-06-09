'use client'

import { forwardRef, type InputHTMLAttributes, type TextareaHTMLAttributes, type SelectHTMLAttributes, useId } from 'react'
import { clsx } from 'clsx'

interface BaseFieldProps {
  label?: string
  hint?: string
  error?: string
  required?: boolean
  fullWidth?: boolean
}

type TextFieldProps = BaseFieldProps & Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(function TextField(
  { label, hint, error, required, fullWidth, className, id, ...rest },
  ref,
) {
  const autoId = useId()
  const inputId = id ?? autoId
  return (
    <div className={clsx('flex flex-col gap-1.5', fullWidth && 'w-full')}>
      {label ? (
        <label htmlFor={inputId} className="text-xs font-semibold uppercase tracking-wider text-foreground-muted">
          {label}
          {required ? <span className="text-rose-700 ml-1">*</span> : null}
        </label>
      ) : null}
      <input
        ref={ref}
        id={inputId}
        aria-invalid={!!error}
        aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
        className={clsx(
          'h-10 px-3.5 rounded-lg text-sm',
          'bg-surface-3 text-foreground placeholder:text-foreground-subtle',
          'border border-input focus:border-input-focus',
          'focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-1',
          'transition-colors',
          error && 'border-red-500',
          className,
        )}
        {...rest}
      />
      {error ? (
        <p id={`${inputId}-error`} className="text-xs text-red-600">{error}</p>
      ) : hint ? (
        <p id={`${inputId}-hint`} className="text-xs text-foreground-subtle">{hint}</p>
      ) : null}
    </div>
  )
})

type TextAreaFieldProps = BaseFieldProps & TextareaHTMLAttributes<HTMLTextAreaElement>

export const TextAreaField = forwardRef<HTMLTextAreaElement, TextAreaFieldProps>(function TextAreaField(
  { label, hint, error, required, fullWidth, className, id, rows = 4, ...rest },
  ref,
) {
  const autoId = useId()
  const inputId = id ?? autoId
  return (
    <div className={clsx('flex flex-col gap-1.5', fullWidth && 'w-full')}>
      {label ? (
        <label htmlFor={inputId} className="text-xs font-semibold uppercase tracking-wider text-foreground-muted">
          {label}
          {required ? <span className="text-rose-700 ml-1">*</span> : null}
        </label>
      ) : null}
      <textarea
        ref={ref}
        id={inputId}
        rows={rows}
        aria-invalid={!!error}
        aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
        className={clsx(
          'px-3.5 py-2.5 rounded-lg text-sm',
          'bg-surface-3 text-foreground placeholder:text-foreground-subtle',
          'border border-input focus:border-input-focus',
          'focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-1',
          'transition-colors resize-y',
          error && 'border-red-500',
          className,
        )}
        {...rest}
      />
      {error ? (
        <p id={`${inputId}-error`} className="text-xs text-red-600">{error}</p>
      ) : hint ? (
        <p id={`${inputId}-hint`} className="text-xs text-foreground-subtle">{hint}</p>
      ) : null}
    </div>
  )
})

type SelectFieldProps = BaseFieldProps &
  SelectHTMLAttributes<HTMLSelectElement> & {
    options: ReadonlyArray<{ value: string; label: string }>
    placeholder?: string
  }

export const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps>(function SelectField(
  { label, hint, error, required, fullWidth, options, placeholder, className, id, ...rest },
  ref,
) {
  const autoId = useId()
  const inputId = id ?? autoId
  return (
    <div className={clsx('flex flex-col gap-1.5', fullWidth && 'w-full')}>
      {label ? (
        <label htmlFor={inputId} className="text-xs font-semibold uppercase tracking-wider text-foreground-muted">
          {label}
          {required ? <span className="text-rose-700 ml-1">*</span> : null}
        </label>
      ) : null}
      <select
        ref={ref}
        id={inputId}
        aria-invalid={!!error}
        className={clsx(
          'h-10 px-3 rounded-lg text-sm',
          'bg-surface-3 text-foreground',
          'border border-input focus:border-input-focus',
          'focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-1',
          'transition-colors cursor-pointer',
          error && 'border-red-500',
          className,
        )}
        {...rest}
      >
        {placeholder ? <option value="">{placeholder}</option> : null}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      {error ? (
        <p className="text-xs text-red-600">{error}</p>
      ) : hint ? (
        <p className="text-xs text-foreground-subtle">{hint}</p>
      ) : null}
    </div>
  )
})
