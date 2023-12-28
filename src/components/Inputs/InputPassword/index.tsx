import { useFormContext } from 'react-hook-form'
import { Container } from './styles'
import { useState } from 'react'

interface InputPasswordProps {
  label?: string
  name: string
}

export function InputPassword({ label, name }: InputPasswordProps) {
  const [currentType, setCurrentType] = useState('text')

  const { register } = useFormContext()

  return (
    <Container>
      <Container>
        {label ? <small>{label}</small> : null}
        <input type={currentType} {...register(name)} placeholder="******" />
      </Container>
    </Container>
  )
}
