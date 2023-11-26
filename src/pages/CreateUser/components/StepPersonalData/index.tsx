import { CaretRight } from '@phosphor-icons/react'
import { Container, InputDate, InputElement, SubmitButton } from './styles'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useCallback } from 'react'
import { StepPersonalDataSchema } from '../..'

interface StepPersonalDataProps {
  nextStep: () => void
  setFormData: (params: StepPersonalDataSchema) => void
}

const personalDataFormSchema = z.object({
  role: z.string().min(6),
  birthDate: z.date(),
})

type PersonalDataFormSchema = z.infer<typeof personalDataFormSchema>

export function StepPersonalData({
  nextStep,
  setFormData,
}: StepPersonalDataProps) {
  const { register, handleSubmit } = useForm<PersonalDataFormSchema>()

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
        <InputElement>
          Profissão:
          <input
            type="text"
            placeholder="Sua Profissão"
            {...register('role')}
            required
          />
        </InputElement>
        <InputElement>
          Data Nascimento:
          <InputDate type="date" {...register('birthDate')} />
        </InputElement>
        <SubmitButton type="submit">
          Continuar
          <CaretRight />
        </SubmitButton>
      </form>
    </Container>
  )
}
