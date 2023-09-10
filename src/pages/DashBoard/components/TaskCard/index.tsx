import { Calendar, Circle, Flag } from '@phosphor-icons/react'
import {
  CardElements,
  CardHeader,
  CardTitle,
  Container,
  Maturity,
  Priority,
  Status,
} from './styles'

export function TaskCard() {
  return (
    <Container>
      <CardHeader>
        <CardTitle>Cancelar conta do Bradesco</CardTitle>
        <Status>
          <Circle weight="fill" />
          <span>Em Aberto</span>
        </Status>
      </CardHeader>
      <CardElements>
        <Priority>
          <Flag weight="fill" />
          <span>Prioridade</span>
        </Priority>
        <Maturity>
          <Calendar />
          <span>00/00/0000</span>
        </Maturity>
      </CardElements>
    </Container>
  )
}
