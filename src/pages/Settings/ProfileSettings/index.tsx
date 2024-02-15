import {
  AccountSettings,
  Avatar,
  ButtonsArea,
  ConfirmatedEmailArea,
  Container,
  ContentArea,
  Description,
  DialogContent,
  DialogOverlay,
  FieldsArea,
  FlexArea,
  FormTitle,
  Header,
  StyledForm,
  StyledInputText,
  UserInfo,
} from './styles'
import defaultProfilePic from '../../../assets/imgs/defaultProfilePic.svg'
import { InputText } from '../../../components/Inputs/InputText'
import { FormProvider, useForm } from 'react-hook-form'
import { DatePicker } from '../../../components/Inputs/DatePicker'
import { Button } from '../../../components/Button'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback, useContext, useEffect, useState } from 'react'
import { format, formatISO, parseISO } from 'date-fns'
import { pt } from 'date-fns/locale'
import { api } from '../../../lib/axios'
import { TasksContext } from '../../../contexts/TaskContext'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import { useNotify } from '../../../hooks/useNotify'
import { useNavigate } from 'react-router-dom'
import * as Dialog from '@radix-ui/react-dialog'
import { AuthContext } from '../../../contexts/AuthContext'
import { CheckCircle } from '@phosphor-icons/react'

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
  const [confirmDeleteModalIsOpen, setConfirmDeleteModalIsOpen] =
    useState(false)
  const [confirmDeleteIsDisabled, setConfirmDeleteIsDisabled] = useState(true)
  const [emailConfirmationInformation, setEmailConfirmationInformation] =
    useState(null)

  const { handleLogOut } = useContext(AuthContext)

  const { userData, handleUpdateUserData } = useContext(TasksContext)
  const { notify } = useNotify()
  const navigate = useNavigate()
  const methods = useForm<AccountFormSchema>({
    resolver: zodResolver(accountFormSchema),
  })
  const { register, watch } = useForm()

  const confirmDeleteTextValue = watch('confirmDeleteText')
  const emailConfirmationCode = watch('emailConfirmationCode')

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

  const handleToggleConfirmDeleteUserModal = useCallback(() => {
    setConfirmDeleteModalIsOpen((prevValue) => !prevValue)
  }, [])

  const handleDeleteUser = useCallback(async () => {
    try {
      await api.delete('users/delete-user')
      handleLogOut()
      navigate('/')
      notify({ type: 'sucess', message: 'Usuário Excluído com sucesso!' })
    } catch (err) {
      notify({ type: 'error', message: 'Não foi possível excluir o usuário.' })
    }
  }, [handleLogOut, navigate, notify])

  useEffect(() => {
    handleResetForm()
  }, [handleResetForm])

  useEffect(() => {
    if (confirmDeleteTextValue === userData.name) {
      setConfirmDeleteIsDisabled(false)
      return
    }
    setConfirmDeleteIsDisabled(true)
  }, [confirmDeleteTextValue, methods, userData.name])

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

  const handleGetEmailConfirmationInformation = useCallback(() => {
    api
      .get('/users/get-email-verification-information')
      .then((response) => setEmailConfirmationInformation(response.data))
  }, [])

  useEffect(() => {
    handleGetEmailConfirmationInformation()
  }, [handleGetEmailConfirmationInformation])

  const handleSentEmailVerification = useCallback(async () => {
    try {
      await api.post('/users/send-email-verification')

      handleGetEmailConfirmationInformation()
    } catch (err) {
      console.log(err)
    }
  }, [handleGetEmailConfirmationInformation])

  const handleSentEmailConfirmationCode = useCallback(async () => {
    try {
      await api.post('/users/send-email-verification-code', {
        code: emailConfirmationCode,
      })

      handleUpdateUserData()
    } catch (err) {
      console.log(err)
    }
  }, [emailConfirmationCode, handleUpdateUserData])

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
      {userData.confirmedEmail ? (
        <ContentArea>
          <FormTitle>Confirmação de email:</FormTitle>
          <ConfirmatedEmailArea>
            <CheckCircle size={36} />
            <span>Email Confirmado!</span>
          </ConfirmatedEmailArea>
        </ContentArea>
      ) : (
        <ContentArea>
          <FormTitle>Confirmação de email:</FormTitle>
          {emailConfirmationInformation ? (
            <>
              <StyledInputText
                placeholder="000 000"
                {...register('emailConfirmationCode')}
              />
              <FlexArea>
                <Button
                  typeColor="cancel"
                  onClick={handleSentEmailConfirmationCode}
                >
                  Solicitar Reenvio
                </Button>
                <Button
                  typeColor="sucess"
                  onClick={handleSentEmailConfirmationCode}
                >
                  Confirmar Email
                </Button>
              </FlexArea>
            </>
          ) : (
            <>
              <Description>
                Solicite o envio do email com o código de confirmação.
              </Description>
              <Button type="button" onClick={handleSentEmailVerification}>
                Solcitar Email
              </Button>
            </>
          )}
        </ContentArea>
      )}
      <ContentArea>
        <FormTitle>Excluir Conta:</FormTitle>
        <Description>
          Esta ação excluirá sua conta e todas as informações relacionadas a ela
          e não pode ser desfeita.
        </Description>
        <Button
          onClick={handleToggleConfirmDeleteUserModal}
          typeColor="error"
          type="button"
        >
          Excluir
        </Button>
        <Dialog.Root
          open={confirmDeleteModalIsOpen}
          onOpenChange={setConfirmDeleteModalIsOpen}
        >
          <Dialog.Portal>
            <DialogOverlay />
            <DialogContent>
              <span>
                Para confirmar a exclusão digite{' '}
                <strong>{userData.name}</strong> no campo abaixo:
              </span>
              <StyledInputText
                {...register('confirmDeleteText')}
                type="text"
                placeholder={userData.name}
              />
              <ButtonsArea>
                <Button
                  typeColor="cancel"
                  type="button"
                  onClick={() => handleToggleConfirmDeleteUserModal()}
                >
                  Cancelar
                </Button>
                <Button
                  typeColor="error"
                  type="button"
                  disabled={confirmDeleteIsDisabled}
                  onClick={handleDeleteUser}
                >
                  Excluir
                </Button>
              </ButtonsArea>
            </DialogContent>
          </Dialog.Portal>
        </Dialog.Root>
      </ContentArea>
      <ToastContainer />
    </Container>
  )
}
