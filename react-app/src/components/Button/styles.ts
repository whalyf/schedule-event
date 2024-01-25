import styled, { css } from 'styled-components';

interface IButtonProps {
  $variant: 'primary' | 'secondary' | 'link';
}

const primary = css`
  background-color: #283dae;
  color: #fff;
`;
const secondary = css`
  border: 1px solid #283dae;
  color: #283dae;
`;
const link = css`
  background-color: transparent;
  text-decoration: underline;
  font-style: italic;
  font-size: 0.75rem;
  height: unset;
`;

const variants = {
  primary,
  secondary,
  link,
};

const buttonStyles = css`
  border: none;
  border-radius: 16px;
  height: 3rem;
  font-size: 1rem;
  font-weight: 600;
`;

export const WrapperButton = styled.button<IButtonProps>`
  ${buttonStyles}
  ${(props) => variants[props.$variant]}

  color: #fff;
  width: 100%;
  > button {
    width: 100%;
  }
  &:hover {
    cursor: pointer;
  }
`;
