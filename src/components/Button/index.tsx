import { ButtonHTMLAttributes } from 'react'
import { StyledButton } from './styled'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  typeColor?: 'sucess' | 'error' | 'alert' | 'cancel'
}

const Button = ({ typeColor, ...rest }: ButtonProps): JSX.Element => {
  return <StyledButton {...rest} $typeColor={typeColor} />
}

export { Button }
