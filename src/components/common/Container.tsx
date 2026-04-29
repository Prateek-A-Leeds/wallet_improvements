import type { ReactNode } from 'react';

type ContainerProps = {
  children: ReactNode;
};

function Container({ children }: ContainerProps) {
  return <div className="mx-auto w-full max-w-6xl px-4">{children}</div>;
}

export default Container;
