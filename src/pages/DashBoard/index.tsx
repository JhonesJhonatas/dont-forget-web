import { TaskSchema } from '../../hooks/useGetTasks'
import { TaskTr } from '../AllTasks/components/TaskTr'
import { ResumeCard } from './components/ResumeCard'
import {
  CardsArea,
  Container,
  DashBoardHeader,
  FlexArea,
  ListViewTable,
  ListViewTableBody,
  ListViewTableHeader,
  Notifications,
  TasksForToday,
  TasksForTomorrow,
  TasksResume,
  TextHeader,
  TitleOfBox,
  WelcomeIcon,
  WelcomePhrase,
} from './styles'

const fakeTask: TaskSchema = {
  id: '9a92b59e-aea8-41c1-a83e-054c8f0311b0',
  createdAt: new Date('2023-10-05T19:40:01.000Z'),
  maturity: new Date('2023-10-05T19:40:01.000Z'),
  completedAt: new Date('2023-10-05T19:40:01.000Z'),
  title: 'Task 1',
  status: 'opened',
  priority: 'normal',
  description: '',
  userId: '4cfd03a1-addf-4941-a488-a5f1d2ca6fbe',
}

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
        <TasksResume>
          <TasksForToday>
            <TitleOfBox>
              <span>Tarefas para hoje:</span>
            </TitleOfBox>
            <ListViewTable>
              <ListViewTableHeader>
                <tr>
                  <th>Título</th>
                  <th>Status</th>
                  <th>Deadline</th>
                  <th>Prioridade</th>
                </tr>
              </ListViewTableHeader>
              <ListViewTableBody>
                <TaskTr task={fakeTask} />
                <TaskTr task={fakeTask} />
                <TaskTr task={fakeTask} />
                <TaskTr task={fakeTask} />
                <TaskTr task={fakeTask} />
                <TaskTr task={fakeTask} />
              </ListViewTableBody>
            </ListViewTable>
          </TasksForToday>
          <TasksForTomorrow>
            <TitleOfBox>
              <span>Tarefas para amanhã:</span>
            </TitleOfBox>
            <ListViewTable>
              <ListViewTableHeader>
                <tr>
                  <th>Título</th>
                  <th>Status</th>
                  <th>Deadline</th>
                  <th>Prioridade</th>
                </tr>
              </ListViewTableHeader>
              <ListViewTableBody>
                <TaskTr task={fakeTask} />
                <TaskTr task={fakeTask} />
                <TaskTr task={fakeTask} />
                <TaskTr task={fakeTask} />
                <TaskTr task={fakeTask} />
                <TaskTr task={fakeTask} />
              </ListViewTableBody>
            </ListViewTable>
          </TasksForTomorrow>
        </TasksResume>
        <Notifications>
          <TitleOfBox>
            <span>Notificações:</span>
          </TitleOfBox>
        </Notifications>
      </FlexArea>
    </Container>
  )
}
