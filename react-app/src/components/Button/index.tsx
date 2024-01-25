import { forwardRef } from 'react';
import { WrapperButton } from './styles';

interface IButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  text: string;
  $variant?: 'primary' | 'secondary' | 'link';
  icon?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, IButtonProps>(
  (
    {
      $variant = 'primary',
      type = 'button',
      className,
      icon,
      text = '',
      ...rest
    },
    ref,
  ) => {
    return (
      <WrapperButton
        $variant={$variant}
        type={type}
        className={className}
        ref={ref}
        {...rest}
      >
        {text}
        {icon}
      </WrapperButton>
    );
  },
);

Button.displayName = 'Button';
