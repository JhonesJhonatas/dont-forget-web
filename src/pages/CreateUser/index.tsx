import { useCallback, useEffect, useMemo, useState } from 'react'
import { Header } from './components/Header'
import { BoxLogin, CreateUserContainer } from './styles'
import { StepUser } from './components/StepUser'
import { StepPersonData } from './components/StepPersonData'
import { StepPassword } from './components/StepPassword'
import { StepProject } from './components/StepProject'
import { StepTerms } from './components/StepTerms'
import { FieldErrors, FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Footer } from './components/Footer'
import { api } from '../../lib/axios'
import { useNotify } from '../../hooks/useNotify'
import { isAfter, isBefore, parseISO } from 'date-fns'
import { useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const createUserFormSchema = z.object({
  name: z.string().min(3, { message: 'Mínimo de 3 caracteres.' }),
  email: z.string().email({ message: 'Precisa ser um email válido.' }),
  role: z.string().min(3, { message: 'Mínimo de 3 caracteres.' }),
  birthDate: z
    .string()
    .refine(
      (data) => {
        const dateLimit = new Date('01/01/2008')
        const date = new Date(data)
        return isAfter(dateLimit, date)
      },
      {
        message: 'O usuário deve possuir pelo menos 16 anos.',
      },
    )
    .refine(
      (data) => {
        const dateLimit = new Date('01/01/1923')
        const date = new Date(data)
        return isBefore(dateLimit, date)
      },
      {
        message: 'O usuário deve possuir menos de 101 anos.',
      },
    ),
  password: z.string().min(6, { message: 'Mínimo de 6 caracteres.' }),
  confirmPassword: z.string().min(6, { message: 'Mínimo de 6 caracteres.' }),
  projectName: z.string().min(3, { message: 'Mínimo de 3 caracteres.' }),
  projectDescription: z.string(),
  acceptTemrs: z.boolean(),
})

export type CreateUserFormSchema = z.infer<typeof createUserFormSchema>

function CreateUser() {
  const [currentStep, setCurrentStep] = useState(0)

  const methods = useForm<CreateUserFormSchema>({
    resolver: zodResolver(createUserFormSchema),
  })
  const { notify } = useNotify()
  const navigate = useNavigate()

  const steps = useMemo(() => {
    return [
      <StepUser key={currentStep} />,
      <StepPersonData key={currentStep} />,
      <StepPassword key={currentStep} />,
      <StepProject key={currentStep} />,
      <StepTerms key={currentStep} />,
    ]
  }, [currentStep])

  const numberOfSteps = steps.length - 1

  const translatedFieldNames = useMemo(() => {
    return {
      name: 'Nome',
      email: 'Email',
      role: 'Profissão',
      birthDate: 'Data de Nascimento',
      password: 'Senha',
      confirmPassword: 'Confirmação de Senha',
      projectName: 'Nome do Projeto',
      projectDescription: 'Descrição do Projeto',
      acceptTemrs: 'Termos',
    }
  }, [])

  useEffect(() => {
    const errors: FieldErrors = methods.formState.errors

    if (errors) {
      for (const fieldName in errors) {
        const errorMessage = errors[fieldName]?.message

        if (errorMessage) {
          notify({
            type: 'error',
            message: `Campo: ${
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              (translatedFieldNames as any)[fieldName] || fieldName
            }, Erro: ${errorMessage}`,
          })
        }
      }
    }
  }, [methods.formState.errors, notify, translatedFieldNames])

  const onSubmit = methods.handleSubmit(async (data) => {
    const {
      acceptTemrs,
      birthDate,
      confirmPassword,
      email,
      name,
      password,
      projectDescription,
      projectName,
      role,
    } = data

    const passwordMatch = password === confirmPassword

    if (!passwordMatch) {
      notify({ type: 'error', message: 'Senhas não coincidem.' })
      return
    }

    if (!acceptTemrs) {
      notify({ type: 'error', message: 'É necessário aceitar os termos.' })
      return
    }

    try {
      await api.post('/users/create-user', {
        birthDate: parseISO(birthDate),
        email,
        name,
        password,
        projectDescription,
        projectName,
        projectColor: '#06b6d4',
        role,
      })

      notify({ type: 'sucess', message: 'Usuário cadastrado com sucesso!' })
      localStorage.setItem('emailToLogin', email)
      navigate('/')
    } catch (err) {
      notify({ type: 'error', message: 'Erro Desconhecido!' })
    }
  })

  const handleNextStep = useCallback(() => {
    if (currentStep === numberOfSteps) {
      onSubmit()
      return
    }

    setCurrentStep(() => currentStep + 1)
  }, [currentStep, numberOfSteps, onSubmit])

  const handleBackStep = useCallback(() => {
    setCurrentStep(() => currentStep - 1)
  }, [currentStep])

  const handleNavigateToStep = useCallback((step: number) => {
    setCurrentStep(step)
  }, [])

  const isFirstStep = currentStep === 0

  const isLastStep = currentStep === numberOfSteps

  return (
    <>
      <CreateUserContainer>
        <BoxLogin>
          <FormProvider {...methods}>
            <Header
              currentStep={currentStep}
              handleNavigateToStep={handleNavigateToStep}
            />
            <div>{steps[currentStep]}</div>
            <Footer
              handleNextStep={handleNextStep}
              handleBackStep={handleBackStep}
              isFirstStep={isFirstStep}
              isLastStep={isLastStep}
            />
          </FormProvider>
        </BoxLogin>
      </CreateUserContainer>
      <ToastContainer />
    </>
  )
}

export { CreateUser }
