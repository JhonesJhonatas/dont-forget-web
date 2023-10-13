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
import {
  format,
  getDate,
  isBefore,
  isFriday,
  isMonday,
  isPast,
  isSaturday,
  isSunday,
  isThursday,
  isToday,
  isTomorrow,
  isTuesday,
  isWednesday,
  parseISO,
} from 'date-fns'
import { TasksLoading } from './components/TasksLoading'

export function DashBoard() {
  const [tasksForToday, setTasksForToday] = useState<TaskSchema[]>([])
  const [tasksForTomorrow, setTasksForTomorrow] = useState<TaskSchema[]>([])
  const [lateTasks, setLateTasks] = useState<TaskSchema[]>([])
  const [messageForToday, setMessageForToday] = useState('')

  const { allTasksList, tasksIsLoading } = useContext(TaskContext)
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
    const today = new Date()

    if (isSunday(today)) {
      setMessageForToday('Aproveite o seu domingo!')
    }

    if (isMonday(today)) {
      setMessageForToday('Aproveite a sua segunda-feira!')
    }

    if (isTuesday(today)) {
      setMessageForToday('Aproveite a sua terça-feira!')
    }

    if (isWednesday(today)) {
      setMessageForToday('Aproveite a sua quarta-feira!')
    }

    if (isThursday(today)) {
      setMessageForToday('Aproveite a sua quinta-feira!')
    }

    if (isFriday(today)) {
      setMessageForToday('Aproveite a sua sexta-feira!')
    }

    if (isSaturday(today)) {
      setMessageForToday('Aproveite o seu sábado!')
    }
  }, [])

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

  useEffect(() => {
    const lateTasks = allTasksList.filter((task) =>
      isBefore(
        getDate(parseISO(task.maturity.toString())),
        getDate(new Date()),
      ),
    )

    setLateTasks(lateTasks)
  }, [allTasksList])

  return (
    <Container>
      <DashBoardHeader>
        <WelcomeIcon>
          <span>👋</span>
        </WelcomeIcon>
        <TextHeader>
          <WelcomePhrase>Olá, Jhones Jhonatas</WelcomePhrase>
          <span>{messageForToday}</span>
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
        <Notifications>
          <TitleOfBox>
            <span>Tarefas para Hoje:</span>
          </TitleOfBox>
          <ListViewTable>
            {tasksIsLoading ? (
              <TasksLoading />
            ) : (
              <ListViewTableBody>
                {tasksForToday.map((task) => {
                  return <TaskTr key={task.id} task={task} />
                })}
              </ListViewTableBody>
            )}
          </ListViewTable>
        </Notifications>
        <TasksResume>
          <TasksForToday>
            <TitleOfBox>
              <span>Tarefas para amanhã:</span>
            </TitleOfBox>
            <ListViewTable>
              {tasksIsLoading ? (
                <TasksLoading />
              ) : (
                <ListViewTableBody>
                  {tasksForTomorrow.map((task) => {
                    return <TaskTr key={task.id} task={task} />
                  })}
                </ListViewTableBody>
              )}
            </ListViewTable>
          </TasksForToday>
          <TasksForTomorrow>
            <TitleOfBox>
              <span>Tarefas atrasadas:</span>
            </TitleOfBox>
            <ListViewTable>
              {tasksIsLoading ? (
                <TasksLoading />
              ) : (
                <ListViewTableBody>
                  {lateTasks.map((task) => {
                    return <TaskTr key={task.id} task={task} />
                  })}
                </ListViewTableBody>
              )}
            </ListViewTable>
          </TasksForTomorrow>
        </TasksResume>
      </FlexArea>
    </Container>
  )
}
