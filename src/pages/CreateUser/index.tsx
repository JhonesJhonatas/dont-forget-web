import { CaretLeft, CaretRight } from '@phosphor-icons/react'
import {
  BackToLogin,
  BoxBanner,
  Container,
  CreateUserBox,
  FlexArea,
  FormArea,
  Header,
  InputElement,
  SubmitButton,
  Title,
} from './styles'
import createUserBanner from '../../assets/imgs/Banner Create User.png'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useNotify } from '../../hooks/useNotify'
import { useCreateUser } from '../../hooks/user/useCreateUser'

const createUserFormSchema = z.object({
  name: z.string(),
  email: z
    .string()
    .email({ message: 'Este campo precisa ser um email válido.' }),
  role: z.string(),
  password: z.string(),
  passwordConfirmation: z.string(),
})

type CreateUserFormSchema = z.infer<typeof createUserFormSchema>

export function CreateUser() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<CreateUserFormSchema>({
    resolver: zodResolver(createUserFormSchema),
  })
  const { createNewUser } = useCreateUser()
  const navigate = useNavigate()
  const { notify } = useNotify()

  const onSubmit = useCallback(
    async ({
      email,
      name,
      password,
      passwordConfirmation,
      role,
    }: CreateUserFormSchema) => {
      if (password !== passwordConfirmation) {
        notify({ type: 'error', message: 'Senhas não coincidem' })
      }

      if (password === passwordConfirmation) {
        const userCreated = await createNewUser({
          email,
          name,
          password,
          role,
        })

        if (userCreated) {
          notify({ type: 'sucess', message: 'Usuário Cadastrado com sucesso' })
          localStorage.setItem('emailToLogin', email)
          navigate('/')
        } else {
          notify({ type: 'error', message: 'Email já cadastrado' })
        }
      }
    },
    [createNewUser, navigate, notify],
  )

  const handleBackToLoginPage = useCallback(() => {
    navigate('/')
  }, [navigate])

  return (
    <>
      <Container>
        <CreateUserBox>
          <BoxBanner>
            <img src={createUserBanner} alt="" />
          </BoxBanner>
          <FormArea>
            <Header>
              <Title>
                Criar <strong>Conta</strong>
              </Title>
              <BackToLogin onClick={handleBackToLoginPage}>
                <CaretLeft />
                <span>Voltar para a página de login</span>
              </BackToLogin>
            </Header>
            <FormArea>
              <form onSubmit={handleSubmit(onSubmit)}>
                <InputElement>
                  Nome:
                  <input
                    type="text"
                    placeholder="Seu nome"
                    {...register('name')}
                    required
                  />
                </InputElement>
                <InputElement>
                  Email:
                  <input
                    type="email"
                    placeholder="seuemail@email.com"
                    {...register('email')}
                    required
                  />
                  {errors.email && (
                    <small>Este campo precisa ser um email válido</small>
                  )}
                </InputElement>
                <InputElement>
                  Profissão:
                  <input
                    type="text"
                    placeholder="Desenvolvedor"
                    {...register('role')}
                    required
                  />
                </InputElement>
                <FlexArea>
                  <InputElement>
                    Senha:
                    <input
                      type="password"
                      placeholder="**********"
                      {...register('password')}
                      required
                    />
                  </InputElement>
                  <InputElement>
                    Confirmação de Senha:
                    <input
                      type="password"
                      placeholder="**********"
                      {...register('passwordConfirmation')}
                      required
                    />
                  </InputElement>
                </FlexArea>
                <SubmitButton type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Cadastrando...' : 'Cadastrar'}
                  <CaretRight />
                </SubmitButton>
              </form>
            </FormArea>
          </FormArea>
        </CreateUserBox>
      </Container>
      <ToastContainer />
    </>
  )
}
