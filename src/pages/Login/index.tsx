import {
  Container,
  FooterInputs,
  FooterLink,
  HandleArea,
  ImgArea,
  InputElement,
  SubmitButton,
  LogoArea,
} from './styles'
import taskModel from '../../assets/imgs/taskModel.svg'
import { CaretRight } from '@phosphor-icons/react'
import { useForm } from 'react-hook-form'
import { useCallback, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import dontForgetWhiteLogo from '../../assets/imgs/dontForget-white.svg'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNotify } from '../../hooks/useNotify'
import { AuthContext } from '../../contexts/AuthContext'

const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

type LoginFormSchema = z.infer<typeof loginFormSchema>

export function Login() {
  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
  } = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
  })
  const navigate = useNavigate()
  const { notify } = useNotify()
  const { handleLogIn, authenticated } = useContext(AuthContext)

  useEffect(() => {
    if (authenticated) {
      navigate('/dashboard')
    }
  }, [authenticated, navigate])

  const onSubmit = useCallback(
    async ({ email, password }: LoginFormSchema) => {
      const isAuthenticated = await handleLogIn({ email, password })

      if (isAuthenticated) {
        navigate('/dashboard')
      }

      if (!isAuthenticated) {
        notify({
          type: 'error',
          message: 'Usuário ou senha incorretos',
        })
      }
    },
    [handleLogIn, navigate, notify],
  )

  const handleNavigateToCreateUserPage = useCallback(() => {
    navigate('/create-user')
  }, [navigate])

  return (
    <>
      <Container>
        <HandleArea>
          <LogoArea>
            <img src={dontForgetWhiteLogo} alt="" />
          </LogoArea>

          <form onSubmit={handleSubmit(onSubmit)}>
            <InputElement>
              Email:
              <input
                type="email"
                placeholder="seuemail@email.com"
                {...register('email')}
                required
              />
            </InputElement>
            <InputElement>
              Senha:
              <input
                type="password"
                placeholder="**********"
                {...register('password')}
                required
              />
            </InputElement>

            <SubmitButton type="submit" disabled={isSubmitting}>
              Entrar
              <CaretRight />
            </SubmitButton>
          </form>
          <FooterInputs>
            <FooterLink onClick={handleNavigateToCreateUserPage}>
              Criar Conta
            </FooterLink>
          </FooterInputs>
        </HandleArea>
        <ImgArea>
          <span>Você no controle das suas tarefas!</span>
          <img src={taskModel} alt="tasksModel" />
        </ImgArea>
      </Container>
      <ToastContainer />
    </>
  )
}
