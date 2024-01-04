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
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const formSchema = z.object({
  password: z.string().nonempty(),
  newPassword: z.string().nonempty(),
  confirmNewPassword: z.string().nonempty(),
})

type FormSchema = z.infer<typeof formSchema>

export function SecuritySettings() {
  const methods = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  })

  return (
    <Container>
      <PasswordArea>
        <FormProvider {...methods}>
          <StyledForm>
            <FormTitle>Alterar senha:</FormTitle>
            <FieldsArea>
              <FlexArea>
                <InputPassword
                  name="password"
                  label="Senha Atual:"
                  isRequired
                />
                <InputPassword name="password" label="Nova Senha:" isRequired />
                <InputPassword
                  name="password"
                  label="Confirmação de Senha:"
                  isRequired
                />
              </FlexArea>
            </FieldsArea>
            <ButtonsArea>
              <Button typeColor="cancel" type="button">
                Limpar Formulário
              </Button>
              <Button type="submit" typeColor="sucess">
                Salvar Nova Senha
              </Button>
            </ButtonsArea>
          </StyledForm>
        </FormProvider>
      </PasswordArea>
    </Container>
  )
}
