'use client'

import { forwardRef, useState } from 'react'

type NeonInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  onSubmit?: () => void
  buttonLabel?: string
}

const NeonInput = forwardRef<HTMLInputElement, NeonInputProps>(
  ({ onSubmit, buttonLabel = 'GUESS', className = '', ...props }, ref) => {
    const [focused, setFocused] = useState(false)

    return (
      <div
        className="flex items-center gap-2 w-full rounded-xl overflow-hidden transition-all duration-300"
        style={{
          border: `1px solid ${focused ? 'rgba(0,170,255,0.7)' : 'rgba(0,170,255,0.2)'}`,
          boxShadow: focused ? '0 0 20px rgba(0,170,255,0.25), 0 0 40px rgba(0,170,255,0.1)' : 'none',
          background: 'rgba(0,170,255,0.05)',
        }}
      >
        <input
          ref={ref}
          {...props}
          onFocus={(e) => {
            setFocused(true)
            props.onFocus?.(e)
          }}
          onBlur={(e) => {
            setFocused(false)
            props.onBlur?.(e)
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') onSubmit?.()
            props.onKeyDown?.(e)
          }}
          className={`flex-1 bg-transparent px-4 py-3 text-foreground placeholder-muted-foreground outline-none text-sm font-medium ${className}`}
        />
        {onSubmit && (
          <button
            onClick={onSubmit}
            type="button"
            className="px-5 py-3 font-bold text-xs tracking-widest uppercase transition-all duration-200"
            style={{
              fontFamily: 'var(--font-display)',
              background: 'rgba(0,170,255,0.15)',
              borderLeft: '1px solid rgba(0,170,255,0.2)',
              color: '#00aaff',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(0,170,255,0.3)'
              e.currentTarget.style.boxShadow = '0 0 10px rgba(0,170,255,0.3)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(0,170,255,0.15)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            {buttonLabel}
          </button>
        )}
      </div>
    )
  }
)

NeonInput.displayName = 'NeonInput'
export default NeonInput
