import { FormProvider, useForm } from 'react-hook-form'
import { InputPassword } from '../../../components/Inputs/InputPassword'
import {
  ButtonsArea,
  Container,
  FieldsArea,
  FlexArea,
  FormTitle,
  PasswordArea,
  StyledForm,
} from './styles'
import { Button } from '../../../components/Button'

export function SecuritySettings() {
  const methods = useForm()

  return (
    <Container>
      <PasswordArea>
        <FormProvider {...methods}>
          <StyledForm>
            <FormTitle>Trocar a Senha:</FormTitle>
            <FieldsArea>
              <FlexArea>
                <InputPassword name="password" label="Senha Atual:" />
                <InputPassword name="password" label="Nova Senha:" />
                <InputPassword name="password" label="Confirmação de Senha:" />
              </FlexArea>
            </FieldsArea>
            <ButtonsArea>
              <Button value="Limpar Formulário" typeColor="cancel" />
              <Button
                type="submit"
                value="Salvar Nova Senha"
                typeColor="sucess"
              />
            </ButtonsArea>
          </StyledForm>
        </FormProvider>
      </PasswordArea>
    </Container>
  )
}
