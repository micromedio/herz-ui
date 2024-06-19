/** @jsxImportSource theme-ui */
import React from 'react';

import { InputGroupContext } from './Context';

export interface InputGroupProps {
  children: React.ReactNode;
}

const InputGroup = ({ children }: InputGroupProps) => {
  const totalInputs = React.Children.count(children);

  return (
    <div sx={{ display: 'flex' }}>
      {React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) return null;

        return (
          <InputGroupContext.Provider
            value={{
              index,
              isFirst: index === 0,
              isLast: index === totalInputs - 1,
            }}
          >
            {child}
          </InputGroupContext.Provider>
        );
      })}
    </div>
  );
};

export default InputGroup;
