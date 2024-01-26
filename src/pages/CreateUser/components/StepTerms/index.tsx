import { useFormContext } from 'react-hook-form'
import { StepTermsContainer, TextContent } from './styles'
import { LabelInput } from '../../styles'

function StepTerms() {
  const { register } = useFormContext()
  return (
    <StepTermsContainer>
      <TextContent>
        <p>Atividade de Conta</p>
        <span>
          Estou ciente de que a minha conta poderá ser apagada caso deixe
          inativa por mais de 2 meses.
        </span>
      </TextContent>

      <LabelInput>
        <input type="checkbox" {...register('acceptTemrs')} />
        Aceitar Termos
      </LabelInput>
    </StepTermsContainer>
  )
}

export { StepTerms }
