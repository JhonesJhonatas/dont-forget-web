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
import { api } from '../../../lib/axios'
import { ToastContainer } from 'react-toastify'
import { useNotify } from '../../../hooks/useNotify'

const formSchema = z.object({
  password: z
    .string()
    .min(6, { message: 'Mínimo de 6 caracteres' })
    .nonempty({ message: 'Campo Obrigatório' }),
  newPassword: z
    .string()
    .min(6, { message: 'Mínimo de 6 caracteres' })
    .nonempty({ message: 'Campo Obrigatório' }),
  confirmNewPassword: z
    .string()
    .min(6, { message: 'Mínimo de 6 caracteres' })
    .nonempty({ message: 'Campo Obrigatório' }),
})

type FormSchema = z.infer<typeof formSchema>

export function SecuritySettings() {
  const methods = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  })
  const { notify } = useNotify()

  const onSubmit = methods.handleSubmit(async (data) => {
    const newPasswordMatch = data.newPassword === data.confirmNewPassword

    if (newPasswordMatch) {
      try {
        await api.put('/users/edit-password', {
          password: data.newPassword,
          oldPassword: data.password,
        })
        notify({ type: 'sucess', message: 'Senha alterada com Sucesso!' })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        notify({
          type: 'error',
          message: err.response.data.message || 'Erro desconhecido',
        })
      }
    }
  })

  return (
    <Container>
      <PasswordArea>
        <FormProvider {...methods}>
          <StyledForm onSubmit={onSubmit}>
            <FormTitle>Alterar senha:</FormTitle>
            <FieldsArea>
              <FlexArea>
                <InputPassword
                  name="password"
                  label="Senha Atual:"
                  isRequired
                  errorMessage={methods.formState.errors.password?.message}
                />
                <InputPassword
                  name="newPassword"
                  label="Nova Senha:"
                  isRequired
                  errorMessage={methods.formState.errors.newPassword?.message}
                />
                <InputPassword
                  name="confirmNewPassword"
                  label="Confirmação de Senha:"
                  isRequired
                  errorMessage={
                    methods.formState.errors.confirmNewPassword?.message
                  }
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
      <ToastContainer />
    </Container>
  )
}
