import {
  Avatar,
  ButtonsArea,
  Container,
  FieldsArea,
  FlexArea,
  Header,
  StyledForm,
  UserInfo,
} from './styles'
import defaultProfilePic from '../../../assets/imgs/defaultProfilePic.svg'
import { InputText } from '../../../components/Inputs/InputText'
import { FormProvider, useForm } from 'react-hook-form'
import { DatePicker } from '../../../components/Inputs/DatePicker'
import { Button } from '../../../components/Button'

export function ProfileSettings() {
  const methods = useForm()
  const userName = localStorage.getItem('name')
  const userEmail = localStorage.getItem('email')

  return (
    <Container>
      <Header>
        <Avatar>
          <img src={defaultProfilePic} alt="" />
        </Avatar>
        <UserInfo>
          <span>{userName}</span>
          <span>{userEmail}</span>
        </UserInfo>
      </Header>
      <FormProvider {...methods}>
        <StyledForm>
          <FieldsArea>
            <FlexArea>
              <InputText name="name" label="Nome:" placeholder="Seu Nome" />
              <InputText name="email" label="Email:" placeholder="Seu Email" />
            </FlexArea>
            <FlexArea>
              <InputText
                name="role"
                label="Profissão:"
                placeholder="Sua Profissão"
              />
              <DatePicker name="maturity" label="Data de Nascimento:" />
            </FlexArea>
          </FieldsArea>

          <ButtonsArea>
            <Button value="Resetar Formulário" typeColor="cancel" />
            <Button type="submit" value="Salvar" typeColor="sucess" />
          </ButtonsArea>
        </StyledForm>
      </FormProvider>
    </Container>
  )
}
