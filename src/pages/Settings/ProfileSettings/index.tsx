import {
  AccountSettings,
  Avatar,
  ButtonsArea,
  Container,
  FieldsArea,
  FlexArea,
  FormTitle,
  Header,
  StyledForm,
  UserInfo,
} from './styles'
import defaultProfilePic from '../../../assets/imgs/defaultProfilePic.svg'
import { InputText } from '../../../components/Inputs/InputText'
import { FormProvider, useForm } from 'react-hook-form'
import { DatePicker } from '../../../components/Inputs/DatePicker'
import { Button } from '../../../components/Button'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback, useContext, useEffect } from 'react'
import { format, formatISO, parseISO } from 'date-fns'
import { pt } from 'date-fns/locale'
import { api } from '../../../lib/axios'
import { TasksContext } from '../../../contexts/TaskContext'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import { useNotify } from '../../../hooks/useNotify'

const accountFormSchema = z.object({
  name: z
    .string()
    .min(6, { message: 'Mínimo de 6 caracteres' })
    .nonempty({ message: 'Campo obrigatório.' }),
  email: z
    .string()
    .email({ message: 'O campo deve ser um email válido' })
    .nonempty({ message: 'Campo obrigatório.' }),
  role: z
    .string()
    .min(3, { message: 'Mínimo de 3 caracteres' })
    .nonempty({ message: 'Campo obrigatório.' }),
  birthDate: z.string().nonempty({ message: 'Campo obrigatório.' }),
})

type AccountFormSchema = z.infer<typeof accountFormSchema>

export function ProfileSettings() {
  const { userData, handleUpdateUserData } = useContext(TasksContext)
  const { notify } = useNotify()

  const methods = useForm<AccountFormSchema>({
    resolver: zodResolver(accountFormSchema),
  })

  const handleResetForm = useCallback(() => {
    methods.setValue('name', userData.name)
    methods.setValue('email', userData.email)
    methods.setValue('role', userData.role)
    if (userData.birthDate) {
      methods.setValue(
        'birthDate',
        format(parseISO(userData.birthDate), 'yyyy-MM-dd', { locale: pt }),
      )
    }
  }, [
    methods,
    userData.birthDate,
    userData.email,
    userData.name,
    userData.role,
  ])

  useEffect(() => {
    handleResetForm()
  }, [handleResetForm])

  const onSubmit = methods.handleSubmit(async (data) => {
    try {
      await api.put('/users/edit-user', {
        name: data.name,
        email: data.email,
        role: data.role,
        birthDate: formatISO(parseISO(data.birthDate)),
      })

      handleUpdateUserData()
      notify({ type: 'sucess', message: 'Alteração realizada com sucesso!' })
    } catch (err) {
      notify({ type: 'error', message: 'Alteração não realizada.' })
    }
  })

  return (
    <Container>
      <Header>
        <Avatar>
          <img src={defaultProfilePic} alt="" />
        </Avatar>
        <UserInfo>
          <span>{userData.name}</span>
          <span>{userData.email}</span>
        </UserInfo>
      </Header>
      <FormProvider {...methods}>
        <AccountSettings>
          <FormTitle>Dados da Conta:</FormTitle>
          <StyledForm onSubmit={onSubmit}>
            <FieldsArea>
              <FlexArea>
                <InputText
                  name="name"
                  label="Nome:"
                  placeholder="Seu Nome"
                  isRequired
                  errorMessage={methods.formState.errors.name?.message}
                />
                <InputText
                  name="email"
                  label="Email:"
                  placeholder="Seu Email"
                  isRequired
                  errorMessage={methods.formState.errors.email?.message}
                />
              </FlexArea>
              <FlexArea>
                <InputText
                  name="role"
                  label="Profissão:"
                  placeholder="Sua Profissão"
                  isRequired
                  errorMessage={methods.formState.errors.role?.message}
                />
                <DatePicker
                  name="birthDate"
                  label="Data de Nascimento:"
                  required
                />
              </FlexArea>
            </FieldsArea>

            <ButtonsArea>
              <Button
                typeColor="cancel"
                type="button"
                onClick={() => handleResetForm()}
              >
                Resetar Formulário
              </Button>
              <Button typeColor="sucess" type="submit">
                Salvar
              </Button>
            </ButtonsArea>
          </StyledForm>
        </AccountSettings>
      </FormProvider>
      <ToastContainer />
    </Container>
  )
}
