import { useFormContext } from 'react-hook-form'
import { CreateUserFormSchema } from '../..'
import { InputText } from '../../../../components/Inputs/InputText'
import { StepProjectContainer } from './styles'

function StepProject() {
  const {
    formState: { errors },
  } = useFormContext<CreateUserFormSchema>()

  return (
    <StepProjectContainer>
      <InputText
        name="projectName"
        label="Nome do Projeto:"
        placeholder="Pessoal"
        errorMessage={errors.projectName?.message}
        isRequired
      />
      <InputText
        name="projectDescription"
        label="Desrição do Projeto (opicional)"
        placeholder="Desrição do Projeto"
        errorMessage={errors.projectDescription?.message}
      />
    </StepProjectContainer>
  )
}

export { StepProject }
