import { useFormContext } from 'react-hook-form'
import { DatePicker } from '../../../../components/Inputs/DatePicker'
import { InputText } from '../../../../components/Inputs/InputText'
import { StepPersonalData } from './styles'
import { CreateUserFormSchema } from '../..'

function StepPersonData() {
  const {
    formState: { errors },
  } = useFormContext<CreateUserFormSchema>()

  return (
    <StepPersonalData>
      <InputText
        name="role"
        label="Profissão:"
        placeholder="Profissão"
        errorMessage={errors.role?.message}
        isRequired
      />
      <DatePicker name="birthDate" label="Data de Nascimento:" required />
    </StepPersonalData>
  )
}

export { StepPersonData }
