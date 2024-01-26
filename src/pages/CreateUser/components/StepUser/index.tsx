import { useFormContext } from 'react-hook-form'
import { InputText } from '../../../../components/Inputs/InputText'
import { StepUserContainer } from './styles'
import { CreateUserFormSchema } from '../..'

function StepUser() {
  const {
    formState: { errors },
  } = useFormContext<CreateUserFormSchema>()

  return (
    <StepUserContainer>
      <InputText
        name="name"
        label="Nome:"
        placeholder="Nome"
        errorMessage={errors.name?.message}
        isRequired
      />
      <InputText
        name="email"
        label="Email:"
        placeholder="seuemail@email.com"
        errorMessage={errors.email?.message}
        isRequired
      />
    </StepUserContainer>
  )
}

export { StepUser }
