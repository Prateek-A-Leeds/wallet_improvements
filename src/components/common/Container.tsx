import type { HTMLAttributes, ReactNode } from 'react';

type ContainerProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

function Container({ children, className = '', ...props }: ContainerProps) {
  return (
    <div
      className={`mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export default Container;
