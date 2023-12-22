import { useFormContext } from 'react-hook-form'
import { StyledLabel } from './styles'

type OptionsSchema = {
  label: string
  value: string
}

interface SelectProps {
  label?: string
  options: OptionsSchema[]
  name: string
  required?: boolean
}

export function Select({
  label,
  options,
  name,
  required = false,
}: SelectProps) {
  const { register } = useFormContext()

  return (
    <StyledLabel>
      <span>{label || null}</span>
      <select {...register(name)} required={required}>
        {options.map((option) => {
          return (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          )
        })}
      </select>
    </StyledLabel>
  )
}
