import { useFormContext } from 'react-hook-form'
import { Container, ErrorMessage, LabelArea, RequiredMessage } from './styles'

interface InputTextProps {
  name: string
  label?: string
  placeholder?: string
  isRequired?: boolean
  errorMessage?: string
}

export function InputText({
  label,
  name,
  placeholder,
  isRequired,
  errorMessage,
}: InputTextProps) {
  const { register } = useFormContext()

  return (
    <Container>
      <LabelArea>
        <div>
          {label ? <small>{label}</small> : null}
          {isRequired ? <RequiredMessage>*</RequiredMessage> : null}
        </div>
        {errorMessage ? <ErrorMessage>{errorMessage}</ErrorMessage> : null}
      </LabelArea>

      <input
        type="text"
        {...register(name)}
        placeholder={placeholder || ''}
        required={isRequired || false}
      />
    </Container>
  )
}
