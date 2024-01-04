import React from 'react'
import { StyledButton } from './styled'

interface ButtonProps {
  typeColor?: 'sucess' | 'error' | 'alert' | 'cancel'
  type?: 'button' | 'submit'
  onClick?: () => void
  children: React.ReactNode
}

const Button = ({ typeColor, children, ...rest }: ButtonProps): JSX.Element => {
  return (
    <StyledButton {...rest} $typeColor={typeColor}>
      {children}
    </StyledButton>
  )
}

export { Button }
