import { CaretRight, Eye, EyeClosed } from '@phosphor-icons/react'
import {
  Container,
  InputElement,
  PasswordInputArea,
  SubmitButton,
} from './styles'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { useCallback, useEffect, useState } from 'react'
import { StepSecuritySchema } from '../..'
import { zodResolver } from '@hookform/resolvers/zod'

interface StepSecurityProps {
  nextStep: () => void
  setFormData: (params: StepSecuritySchema) => void
}

const stepSecurityFormData = z.object({
  password: z
    .string()
    .min(6, { message: 'A Senha deve possuir no mínimo 6 caracteres' }),
  confirmPassword: z
    .string()
    .min(6, { message: 'A Senha deve possuir no mínimo 6 caracteres' }),
})

type StepSecurityFormData = z.infer<typeof stepSecurityFormData>

export function StepSecurity({ nextStep, setFormData }: StepSecurityProps) {
  const [passwordMatch, setPasswordMatch] = useState(true)
  const [passwordType, setPasswordType] = useState('password')
  const [confirmPasswordType, setConfirmPasswordType] = useState('password')

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<StepSecurityFormData>({
    resolver: zodResolver(stepSecurityFormData),
  })

  const password = watch('password')
  const confirmPassword = watch('confirmPassword')

  useEffect(() => {
    setPasswordMatch(password === confirmPassword)
  }, [confirmPassword, password, watch])

  const onSubmit = useCallback(
    ({ confirmPassword, password }: StepSecurityFormData) => {
      const passwordMatch = password === confirmPassword

      if (passwordMatch) {
        setFormData({
          password,
        })
        nextStep()
      }
    },
    [nextStep, setFormData],
  )

  const handleToglePasswordView = useCallback((action: string) => {
    if (action === 'hide') {
      setPasswordType('password')
    }
    if (action === 'show') {
      setPasswordType('text')
    }
  }, [])

  const handleTogleConfirmPasswordView = useCallback((action: string) => {
    if (action === 'hide') {
      setConfirmPasswordType('password')
    }
    if (action === 'show') {
      setConfirmPasswordType('text')
    }
  }, [])

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputElement hasError={!!errors.password}>
          Senha:
          <PasswordInputArea>
            <input
              type={passwordType}
              placeholder="******"
              {...register('password')}
              required
            />
            {passwordType === 'password' ? (
              <EyeClosed
                size={20}
                onClick={() => handleToglePasswordView('show')}
              />
            ) : (
              <Eye size={20} onClick={() => handleToglePasswordView('hide')} />
            )}
          </PasswordInputArea>
          {errors.password && <small>{errors.password.message}</small>}
        </InputElement>
        <InputElement hasError={!!errors.confirmPassword || !passwordMatch}>
          Confirmação de Senha:
          <PasswordInputArea>
            <input
              type={confirmPasswordType}
              placeholder="******"
              {...register('confirmPassword')}
              required
            />
            {confirmPasswordType === 'password' ? (
              <EyeClosed
                size={20}
                onClick={() => handleTogleConfirmPasswordView('show')}
              />
            ) : (
              <Eye
                size={20}
                onClick={() => handleTogleConfirmPasswordView('hide')}
              />
            )}
          </PasswordInputArea>
          {errors.confirmPassword && (
            <small>{errors.confirmPassword.message}</small>
          )}
          {!passwordMatch && <small>As senhas não coincidem</small>}
        </InputElement>
        <SubmitButton type="submit">
          Continuar
          <CaretRight />
        </SubmitButton>
      </form>
    </Container>
  )
}
