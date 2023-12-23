import { useFormContext } from 'react-hook-form'
import { Container } from './styles'

interface DatePickerProps {
  label?: string
  name: string
  required?: boolean
  disabled?: boolean
}

export function DatePicker({
  label,
  name,
  required = false,
  disabled,
}: DatePickerProps) {
  const { register } = useFormContext()

  return (
    <Container>
      {label ? <span>{label}</span> : null}
      <input
        type="date"
        {...register(name)}
        required={required}
        disabled={disabled}
      />
    </Container>
  )
}
