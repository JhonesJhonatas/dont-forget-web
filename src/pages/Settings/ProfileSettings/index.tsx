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
import { useContext, useEffect } from 'react'
import { format, formatISO, parseISO } from 'date-fns'
import { pt } from 'date-fns/locale'
import { api } from '../../../lib/axios'
import { TasksContext } from '../../../contexts/TaskContext'

const accountFormSchema = z.object({
  name: z.string().nonempty(),
  email: z.string().email().nonempty(),
  role: z.string(),
  birthDate: z.string(),
})

type AccountFormSchema = z.infer<typeof accountFormSchema>

export function ProfileSettings() {
  const { userData, handleUpdateUserData } = useContext(TasksContext)

  const methods = useForm<AccountFormSchema>({
    resolver: zodResolver(accountFormSchema),
  })

  useEffect(() => {
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

  const onSubmit = methods.handleSubmit(async (data) => {
    try {
      await api.put('/users/edit-user', {
        name: data.name,
        email: data.email,
        role: data.role,
        birthDate: formatISO(parseISO(data.birthDate)),
      })
      handleUpdateUserData()
    } catch (err) {
      console.log(err)
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
                <InputText name="name" label="Nome:" placeholder="Seu Nome" />
                <InputText
                  name="email"
                  label="Email:"
                  placeholder="Seu Email"
                />
              </FlexArea>
              <FlexArea>
                <InputText
                  name="role"
                  label="Profissão:"
                  placeholder="Sua Profissão"
                />
                <DatePicker name="birthDate" label="Data de Nascimento:" />
              </FlexArea>
            </FieldsArea>

            <ButtonsArea>
              <Button
                value="Resetar Formulário"
                type="button"
                typeColor="cancel"
              />
              <Button type="submit" value="Salvar" typeColor="sucess" />
            </ButtonsArea>
          </StyledForm>
        </AccountSettings>
      </FormProvider>
    </Container>
  )
}
