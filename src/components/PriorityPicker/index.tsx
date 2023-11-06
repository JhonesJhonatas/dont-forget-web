import { CaretDown, CaretUp, Flag } from '@phosphor-icons/react'
import {
  ChoosedField,
  Container,
  ListOfOptions,
  OptionsField,
  SelectorControllers,
  SelectorField,
} from './styles'
import { useCallback, useEffect, useState } from 'react'

export interface PrioritySchema {
  id: string
  title: string
  value: string
  color: string
}

interface PriorityPickerProps {
  handleSelectPriority: ({ color, id, title, value }: PrioritySchema) => void
  initialPriority?: string
}

const priorityList: PrioritySchema[] = [
  {
    id: '111111',
    title: 'Baixa',
    value: 'low',
    color: '#22C55E',
  },
  {
    id: '2222222',
    title: 'Normal',
    value: 'normal',
    color: '#3B82F6',
  },
  {
    id: '3333333',
    title: 'Alta',
    value: 'high',
    color: '#F97316',
  },
  {
    id: '4444444',
    title: 'Urgente',
    value: 'urgent',
    color: '#dc2626',
  },
]

export function PriorityPicker({
  handleSelectPriority,
  initialPriority,
}: PriorityPickerProps) {
  const [togleOptions, setTogleOptions] = useState(false)
  const [choosedOption, setChoosedOption] = useState<PrioritySchema>()

  useEffect(() => {
    if (initialPriority) {
      const formattedPriority = priorityList.find(
        (priority) => priority.value === initialPriority,
      ) as PrioritySchema

      setChoosedOption(formattedPriority)
      handleSelectPriority(formattedPriority)
    } else {
      setChoosedOption(priorityList[0])
      handleSelectPriority(priorityList[0])
    }
  }, [handleSelectPriority, initialPriority])

  const handleTogleOptions = () => {
    setTogleOptions(!togleOptions)
  }

  const handleChoseOption = useCallback(
    ({ color, id, title, value }: PrioritySchema) => {
      setChoosedOption({ color, id, title, value })
      handleSelectPriority({ color, id, title, value })
    },
    [handleSelectPriority],
  )

  return (
    <Container>
      <SelectorField onClick={() => handleTogleOptions()}>
        <ChoosedField>
          <Flag weight="fill" color={choosedOption?.color} />
          <span>{choosedOption?.title}</span>
        </ChoosedField>
        <SelectorControllers>
          {togleOptions ? <CaretUp /> : <CaretDown />}
        </SelectorControllers>
      </SelectorField>

      <OptionsField $isOpen={togleOptions}>
        <ListOfOptions>
          {priorityList.map((priority) => {
            return (
              <li
                key={priority.id}
                onClick={() => {
                  handleTogleOptions()
                  handleChoseOption(priority)
                }}
              >
                <Flag weight="fill" color={priority.color} />
                <span>{priority.title}</span>
              </li>
            )
          })}
        </ListOfOptions>
      </OptionsField>
    </Container>
  )
}
