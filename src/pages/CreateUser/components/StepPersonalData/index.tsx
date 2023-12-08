import { CaretRight } from '@phosphor-icons/react'
import { Container, InputDate, InputElement, SubmitButton } from './styles'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useCallback } from 'react'
import { StepPersonalDataSchema } from '../..'
import { zodResolver } from '@hookform/resolvers/zod'

interface StepPersonalDataProps {
  nextStep: () => void
  setFormData: (params: StepPersonalDataSchema) => void
}

const personalDataFormSchema = z.object({
  role: z
    .string()
    .min(6, { message: 'A profissão deve possuir no mínimo 6 caracteres' }),
  birthDate: z.string(),
})

type PersonalDataFormSchema = z.infer<typeof personalDataFormSchema>

export function StepPersonalData({
  nextStep,
  setFormData,
}: StepPersonalDataProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PersonalDataFormSchema>({
    resolver: zodResolver(personalDataFormSchema),
  })

  const onSubmit = useCallback(
    ({ role, birthDate }: PersonalDataFormSchema) => {
      setFormData({
        role,
        birthDate,
      })
      nextStep()
    },
    [nextStep, setFormData],
  )

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputElement hasError={!!errors.role}>
          Profissão:
          <input
            type="text"
            placeholder="Sua Profissão"
            {...register('role')}
            required
          />
          {errors.role && <small>{errors.role.message}</small>}
        </InputElement>
        <InputElement>
          Data Nascimento:
          <InputDate type="date" {...register('birthDate')} required />
        </InputElement>
        <SubmitButton type="submit">
          Continuar
          <CaretRight />
        </SubmitButton>
      </form>
    </Container>
  )
}
