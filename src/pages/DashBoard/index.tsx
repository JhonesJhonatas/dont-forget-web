import { ResumeCard } from './components/ResumeCard'
import {
  CardsArea,
  Container,
  DashBoardHeader,
  FlexArea,
  Notifications,
  TasksResume,
  TextHeader,
  WelcomeIcon,
  WelcomePhrase,
} from './styles'

export function DashBoard() {
  return (
    <Container>
      <DashBoardHeader>
        <WelcomeIcon>
          <span>👋</span>
        </WelcomeIcon>
        <TextHeader>
          <WelcomePhrase>Olá, Jhones Jhonatas</WelcomePhrase>
          <span>Aproveite a sua Segunda-Feira!</span>
        </TextHeader>
      </DashBoardHeader>
      <CardsArea>
        <ResumeCard amount={16} status="opened" />
        <ResumeCard amount={23} status="stand_by" />
        <ResumeCard amount={45} status="in_progress" />
        <ResumeCard amount={13} status="approval" />
        <ResumeCard amount={21} status="payment" />
        <ResumeCard amount={51} status="concluded" />
      </CardsArea>
      <FlexArea>
        <TasksResume></TasksResume>
        <Notifications></Notifications>
      </FlexArea>
    </Container>
  )
}
