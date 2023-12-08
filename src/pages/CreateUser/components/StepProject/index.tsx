import { CheckCircle } from '@phosphor-icons/react'
import { StepProjectDataSchema } from '../..'
import { Container, InputElement, SubmitButton } from './styles'
import { useCallback, useEffect } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

interface StepProjectProps {
  onSubmit: (params: StepProjectDataSchema) => void
}

const stepProjectFormSchema = z.object({
  projectName: z
    .string()
    .min(3, { message: 'O nome do projeto deve possuir ao menos 3 digitos.' }),
  projectColor: z.string(),
  projectDescription: z.string(),
})

type StepProjectFormSchema = z.infer<typeof stepProjectFormSchema>

export function StepProject({ onSubmit }: StepProjectProps) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<StepProjectFormSchema>({
    resolver: zodResolver(stepProjectFormSchema),
  })

  const handleCreateUser = useCallback(
    ({
      projectColor,
      projectDescription,
      projectName,
    }: StepProjectFormSchema) => {
      onSubmit({ projectName, projectColor, projectDescription })
    },
    [onSubmit],
  )

  useEffect(() => {
    setValue('projectColor', '#06b6d4')
  }, [setValue])

  return (
    <Container>
      <form onSubmit={handleSubmit(handleCreateUser)}>
        <InputElement hasError={!!errors.projectName}>
          Nome do Projeto ou Cliente:
          <input
            type="text"
            placeholder="Tarefas de Casa"
            {...register('projectName')}
            required
          />
          {errors.projectName && <small>{errors.projectName.message}</small>}
        </InputElement>
        <InputElement>
          Descrição:
          <textarea
            rows={15}
            placeholder="Descrição do projeto"
            {...register('projectDescription')}
          />
        </InputElement>
        <SubmitButton type="submit">
          Finalizar Cadastro
          <CheckCircle />
        </SubmitButton>
      </form>
    </Container>
  )
}
