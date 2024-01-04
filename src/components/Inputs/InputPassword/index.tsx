import { useFormContext } from 'react-hook-form'
import {
  Container,
  ErrorMessage,
  InputArea,
  LabelArea,
  RequiredMessage,
} from './styles'
import { useState } from 'react'
import { Eye, EyeClosed } from '@phosphor-icons/react'

interface InputPasswordProps {
  label?: string
  name: string
  isRequired?: boolean
  errorMessage?: string
}

type CurrentTypeSchema = 'text' | 'password'

export function InputPassword({
  label,
  name,
  isRequired,
  errorMessage,
}: InputPasswordProps) {
  const [currentType, setCurrentType] = useState<CurrentTypeSchema>('password')

  const { register } = useFormContext()

  return (
    <Container>
      <Container>
        <LabelArea>
          <div>
            {label ? <small>{label}</small> : null}
            {isRequired ? <RequiredMessage>*</RequiredMessage> : null}
          </div>
          {errorMessage ? <ErrorMessage>{errorMessage}</ErrorMessage> : null}
        </LabelArea>
        <InputArea>
          <input type={currentType} {...register(name)} placeholder="******" />
          {currentType === 'text' ? (
            <Eye onClick={() => setCurrentType('password')} />
          ) : (
            <EyeClosed onClick={() => setCurrentType('text')} />
          )}
        </InputArea>
      </Container>
    </Container>
  )
}
