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
import { useContext, useEffect, useState } from 'react'
import { TaskContext } from '../../contexts/TasksContext'
import { useSeparateTasksById } from '../../hooks/useSeparateTasksByStatus'
import { format, isToday, isTomorrow, parseISO } from 'date-fns'

export function DashBoard() {
  const [tasksForToday, setTasksForToday] = useState<TaskSchema[]>([])
  const [tasksForTomorrow, setTasksForTomorrow] = useState<TaskSchema[]>([])

  const { allTasksList } = useContext(TaskContext)
  const {
    openedTasks,
    standByTasks,
    inProgressTasks,
    approvalTasks,
    paymentTasks,
    concludedTasks,
  } = useSeparateTasksById({ tasks: allTasksList })

  const todayDate = format(new Date(), 'dd/MM/yyyy')

  useEffect(() => {
    const todayTasks = allTasksList.filter((task) =>
      isToday(parseISO(task.maturity.toString())),
    )

    setTasksForToday(todayTasks)
  }, [allTasksList, todayDate])

  useEffect(() => {
    const tomorrowTasks = allTasksList.filter((task) =>
      isTomorrow(parseISO(task.maturity.toString())),
    )

    setTasksForTomorrow(tomorrowTasks)
  }, [allTasksList])

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
        <ResumeCard amount={openedTasks.length} status="opened" />
        <ResumeCard amount={standByTasks.length} status="stand_by" />
        <ResumeCard amount={inProgressTasks.length} status="in_progress" />
        <ResumeCard amount={approvalTasks.length} status="approval" />
        <ResumeCard amount={paymentTasks.length} status="payment" />
        <ResumeCard amount={concludedTasks.length} status="concluded" />
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
                {tasksForToday.map((task) => {
                  return <TaskTr key={task.id} task={task} />
                })}
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
                {tasksForTomorrow.map((task) => {
                  return <TaskTr key={task.id} task={task} />
                })}
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
