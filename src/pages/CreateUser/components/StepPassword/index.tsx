import { useFormContext } from 'react-hook-form'
import { StepPasswordContainer } from './styles'
import { CreateUserFormSchema } from '../..'
import { InputPassword } from '../../../../components/Inputs/InputPassword'
import { useMemo } from 'react'

type PasswordMatchType = 'true' | 'false'

function StepPassword() {
  const {
    watch,
    formState: { errors },
  } = useFormContext<CreateUserFormSchema>()

  const password = watch('password')
  const confirmPassword = watch('confirmPassword')

  const passwordMatch = password === confirmPassword
  const formattedPasswordMatch = passwordMatch.toString()

  const passwordMatchMessage = useMemo(() => {
    return {
      true: '',
      false: 'Senhas não coincidem.',
    }
  }, [])

  return (
    <StepPasswordContainer>
      <InputPassword
        name="password"
        label="Senha:"
        errorMessage={
          errors.password?.message ||
          passwordMatchMessage[formattedPasswordMatch as PasswordMatchType]
        }
        isRequired
      />
      <InputPassword
        name="confirmPassword"
        label="Confirmação de Senha:"
        errorMessage={errors.confirmPassword?.message}
        isRequired
      />
    </StepPasswordContainer>
  )
}

export { StepPassword }
