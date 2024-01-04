import { useFormContext } from 'react-hook-form'
import { Container, LabelArea, RequiredMessage } from './styles'

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
      <LabelArea>
        {label ? <small>{label}</small> : null}
        {required ? <RequiredMessage>*</RequiredMessage> : null}
      </LabelArea>
      <input
        type="date"
        {...register(name)}
        required={required}
        disabled={disabled}
      />
    </Container>
  )
}
