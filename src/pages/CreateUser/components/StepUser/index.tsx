import { CaretRight } from '@phosphor-icons/react'
import { Container, InputElement, SubmitButton } from './styles'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useCallback } from 'react'
import { StepUserDataSchema } from '../..'

interface StepUserProps {
  nextStep: () => void
  setFormData: (params: StepUserDataSchema) => void
}

const userFormSchema = z.object({
  name: z.string().min(6),
  email: z.string().email(),
})

type UserFormSchema = z.infer<typeof userFormSchema>

export function StepUser({ setFormData, nextStep }: StepUserProps) {
  const { register, handleSubmit } = useForm<UserFormSchema>()

  const onSubmit = useCallback(
    ({ email, name }: UserFormSchema) => {
      setFormData({
        email,
        name,
      })
      nextStep()
    },
    [nextStep, setFormData],
  )

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputElement>
          Nome:
          <input
            type="text"
            placeholder="Seu nome"
            {...register('name')}
            required
          />
        </InputElement>
        <InputElement>
          Email:
          <input
            type="email"
            placeholder="seuemail@email.com"
            {...register('email')}
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
