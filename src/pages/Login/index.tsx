import {
  Container,
  FooterInputs,
  FooterLink,
  HandleArea,
  ImgArea,
  InputElement,
  SubmitButton,
  TextLogo,
} from './styles'
import taskModel from '../../assets/imgs/taskModel.svg'
import { CaretRight } from '@phosphor-icons/react'
import { useForm } from 'react-hook-form'
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

export function Login() {
  const { handleSubmit } = useForm()
  const navigate = useNavigate()

  const onSubmit = useCallback(() => {
    navigate('/dashboard')
  }, [navigate])

  return (
    <Container>
      <HandleArea>
        <TextLogo>
          <span>
            dont<strong>Forget</strong>
          </span>
        </TextLogo>

        <form onSubmit={handleSubmit(onSubmit)}>
          <InputElement>
            Email:
            <input type="text" placeholder="seuemail@email.com" />
          </InputElement>
          <InputElement>
            Senha:
            <input type="password" placeholder="**********" />
          </InputElement>

          <SubmitButton type="submit">
            Entrar
            <CaretRight />
          </SubmitButton>
        </form>
        <FooterInputs>
          <FooterLink>Criar Conta</FooterLink>
          <span>|</span>
          <FooterLink>Esqueci minha senha</FooterLink>
        </FooterInputs>
      </HandleArea>
      <ImgArea>
        <span>Você no controle das suas tarefas!</span>
        <img src={taskModel} alt="tasksModel" />
      </ImgArea>
    </Container>
  )
}
