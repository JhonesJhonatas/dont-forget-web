import { useFormContext } from 'react-hook-form'
import { Container } from './styles'

interface InputTextProps {
  name: string
  label?: string
  placeholder?: string
}

export function InputText({ label, name, placeholder }: InputTextProps) {
  const { register } = useFormContext()

  return (
    <Container>
      {label ? <small>{label}</small> : null}
      <input type="text" {...register(name)} placeholder={placeholder || ''} />
    </Container>
  )
}
