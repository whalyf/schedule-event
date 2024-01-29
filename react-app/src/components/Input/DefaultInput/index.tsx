import { ForwardRefRenderFunction, ReactNode, forwardRef } from 'react';
import { WrapperInput } from './style';

interface IInputProps {
  placeholder?: string;
  inputType?: string;
  icon?: ReactNode;
}
const InputBase: ForwardRefRenderFunction<HTMLInputElement, IInputProps> = (
  { icon, placeholder = '', inputType = 'text', ...rest },
  ref,
) => {
  return (
    <WrapperInput>
      {icon}
      <input placeholder={placeholder} type={inputType} ref={ref} {...rest} />
    </WrapperInput>
  );
};

export const Input = forwardRef(InputBase);
