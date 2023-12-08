import { CaretRight } from '@phosphor-icons/react'
import { Container, InputElement, SubmitButton } from './styles'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useCallback } from 'react'
import { StepUserDataSchema } from '../..'
import { zodResolver } from '@hookform/resolvers/zod'

interface StepUserProps {
  nextStep: () => void
  setFormData: (params: StepUserDataSchema) => void
}

const userFormSchema = z.object({
  name: z
    .string()
    .min(6, { message: 'O Nome deve possuir no mínimo 6 caracteres' }),
  email: z.string().email({ message: 'O campo deve ser um email válido' }),
})

type UserFormSchema = z.infer<typeof userFormSchema>

export function StepUser({ setFormData, nextStep }: StepUserProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormSchema>({
    resolver: zodResolver(userFormSchema),
  })

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
        <InputElement hasError={!!errors.name}>
          Nome:
          <input
            type="text"
            placeholder="Seu nome"
            {...register('name')}
            required
          />
          {errors.name && <small>{errors.name.message}</small>}
        </InputElement>
        <InputElement hasError={!!errors.email}>
          Email:
          <input
            type="email"
            placeholder="seuemail@email.com"
            {...register('email')}
            required
          />
          {errors.name && <small>{errors.email?.message}</small>}
        </InputElement>
        <SubmitButton type="submit">
          Continuar
          <CaretRight />
        </SubmitButton>
      </form>
    </Container>
  )
}
