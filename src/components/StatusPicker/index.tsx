import { CaretDown, CaretUp, Circle } from '@phosphor-icons/react'
import {
  ChoosedField,
  Container,
  ListOfOptions,
  OptionsField,
  SelectorControllers,
  SelectorField,
} from './styles'
import { useCallback, useEffect, useState } from 'react'

export interface StatusSchema {
  id: string
  title: string
  value: string
  color: string
}

interface StatusPickerProps {
  handleSelectStatus: ({ color, id, title, value }: StatusSchema) => void
}

const statusList: StatusSchema[] = [
  {
    id: '11111',
    title: 'Em Aberto',
    value: 'toDo',
    color: '#94a3b8',
  },
  {
    id: '222222',
    title: 'StandBy',
    value: 'standby',
    color: '#eab308',
  },
  {
    id: '333333',
    title: 'Em Andamento',
    value: 'inProgress',
    color: '#3b82f6',
  },
  {
    id: '444444',
    title: 'Aprovação',
    value: 'approval',
    color: '#f97316',
  },
  {
    id: '555555',
    title: 'Pagamento',
    value: 'payment',
    color: '#f43f5e',
  },
]

export function StatusPicker({ handleSelectStatus }: StatusPickerProps) {
  const [togleOptions, setTogleOptions] = useState(false)
  const [choosedOption, setChoosedOption] = useState<StatusSchema>()

  useEffect(() => {
    setChoosedOption(statusList[0])
    handleSelectStatus(statusList[0])
  }, [handleSelectStatus])

  const handleTogleOptions = () => {
    setTogleOptions(!togleOptions)
  }

  const handleChoseOption = useCallback(
    ({ color, id, title, value }: StatusSchema) => {
      setChoosedOption({ color, id, title, value })
      handleSelectStatus({ color, id, title, value })
    },
    [handleSelectStatus],
  )

  return (
    <Container>
      <SelectorField onClick={() => handleTogleOptions()}>
        <ChoosedField>
          <Circle weight="fill" color={choosedOption?.color} />
          <span>{choosedOption?.title}</span>
        </ChoosedField>
        <SelectorControllers>
          {togleOptions ? <CaretUp /> : <CaretDown />}
        </SelectorControllers>
      </SelectorField>

      <OptionsField $isOpen={togleOptions}>
        <ListOfOptions>
          {statusList.map((status) => {
            return (
              <li
                key={status.id}
                onClick={() => {
                  handleChoseOption(status)
                  handleTogleOptions()
                }}
              >
                <Circle weight="fill" color={status.color} />
                <span>{status.title}</span>
              </li>
            )
          })}
        </ListOfOptions>
      </OptionsField>
    </Container>
  )
}
