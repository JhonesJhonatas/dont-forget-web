import { StyledButton } from './styled'

interface ButtonProps {
  value: string
  typeColor?: 'sucess' | 'error' | 'alert' | 'cancel'
  type?: 'button' | 'submit'
}

export function Button({ value, typeColor, type = 'button' }: ButtonProps) {
  return (
    <StyledButton type={type} typeColor={typeColor}>
      {value}
    </StyledButton>
  )
}
