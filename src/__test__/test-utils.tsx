import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

const RouterDomProvider = ({ children }: { children: React.ReactNode }) => {
  return <MemoryRouter>{children}</MemoryRouter>;
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: RouterDomProvider, ...options });

export * from '@testing-library/react';
export { customRender as render };
