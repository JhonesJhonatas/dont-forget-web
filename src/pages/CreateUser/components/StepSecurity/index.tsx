import { CaretRight } from '@phosphor-icons/react'
import { Container, InputElement, SubmitButton } from './styles'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { useCallback } from 'react'
import { StepSecuritySchema } from '../..'

interface StepSecurityProps {
  nextStep: () => void
  setFormData: (params: StepSecuritySchema) => void
}

const stepSecurityFormData = z.object({
  password: z.string().min(6),
  confirmPassword: z.string().min(6),
})

type StepSecurityFormData = z.infer<typeof stepSecurityFormData>

export function StepSecurity({ nextStep, setFormData }: StepSecurityProps) {
  const { register, handleSubmit } = useForm<StepSecurityFormData>()

  const onSubmit = useCallback(
    ({ confirmPassword, password }: StepSecurityFormData) => {
      const passwordMatch = password === confirmPassword

      if (passwordMatch) {
        setFormData({
          password,
        })
        nextStep()
      }
    },
    [nextStep, setFormData],
  )

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputElement>
          Senha:
          <input
            type="password"
            placeholder="******"
            {...register('password')}
            required
          />
        </InputElement>
        <InputElement>
          Confirmação de Senha:
          <input
            type="password"
            placeholder="******"
            {...register('confirmPassword')}
            required
          />
        </InputElement>
        <SubmitButton type="submit">
          Continuar
          <CaretRight />
        </SubmitButton>
      </form>
    </Container>
  )
}
