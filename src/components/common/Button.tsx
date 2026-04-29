import type { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};

function Button({ children, className = '', ...props }: ButtonProps) {
  return (
    <button
      className={`rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
