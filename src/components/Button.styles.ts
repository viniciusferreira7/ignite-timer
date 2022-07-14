import styled, { css } from 'styled-components';

export type  ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success' ;

interface ButtonContainerProps {
  variant: ButtonVariant,
}

const buttonVariants = {
  primary: 'purple',
  secondary: 'blue',
  danger: 'red',
  success:'green'
}

export const ButtonContainer = styled.button<ButtonContainerProps>`
  width:200px;
  height: 50px;

  ${({variant}) => css`
    background-color: ${buttonVariants[variant]}
  `}
`