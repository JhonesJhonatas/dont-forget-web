import {
  CardsArea,
  Container,
  DashBoardHeader,
  EmptyTasksMessage,
  FlexArea,
  InitialInfo,
  ListViewTable,
  ListViewTableBody,
  NotificationsArea,
  NotificationsCount,
  TasksArea,
  TextHeader,
  TitleOfBox,
  WelcomeIcon,
  WelcomePhrase,
} from './styles'
import { useContext, useEffect, useMemo, useState } from 'react'
import {
  format,
  getDate,
  getMonth,
  getYear,
  isBefore,
  isFriday,
  isFuture,
  isMonday,
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
import { TaskTr } from '../../components/TaskTr'
import { useSeparateOpenedTasksByStatus } from '../../hooks/tasks/useSeparateOpenedTasksByStatus'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import { OpenedTask, TasksContext } from '../../contexts/TaskContext'
import { ResumeCard } from '../../components/ResumeCard'
import emptyImage from '../../assets/imgs/emptyTasksVector.svg'
import { Bell } from '@phosphor-icons/react'
import * as Poppover from '@radix-ui/react-popover'
import { NotificationPoppover } from './components/NotificationPoppover'
import { useNotifications } from '../../hooks/notifications/useNotifications'

export function DashBoard() {
  const [tasksForToday, setTasksForToday] = useState<OpenedTask[]>([])
  const [tasksForTomorrow, setTasksForTomorrow] = useState<OpenedTask[]>([])
  const [lateTasks, setLateTasks] = useState<OpenedTask[]>([])
  const [futureTasks, setFutureTasks] = useState<OpenedTask[]>([])
  const [messageForToday, setMessageForToday] = useState('')

  const { allOpenedTasks, openedTasksIsLoading, allConcludedTasks } =
    useContext(TasksContext)

  const {
    approvalTasks,
    inProgressTasks,
    paymentTasks,
    standByTasks,
    toDoTasks,
  } = useSeparateOpenedTasksByStatus(allOpenedTasks)
  const { notifications, handleUpdateNotifications } = useNotifications()

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
    const todayTasks = allOpenedTasks.filter((task) => {
      if (task.maturity) {
        return isToday(parseISO(task.maturity.toString()))
      }
      return false
    })

    setTasksForToday(todayTasks)
  }, [allOpenedTasks, todayDate])

  useEffect(() => {
    const tomorrowTasks = allOpenedTasks.filter((task) => {
      if (task.maturity) {
        return isTomorrow(parseISO(task.maturity.toString()))
      }
      return false
    })

    setTasksForTomorrow(tomorrowTasks)
  }, [allOpenedTasks])

  useEffect(() => {
    const futureTasks = allOpenedTasks.filter((task) => {
      if (task.maturity) {
        return isFuture(
          new Date(
            getYear(parseISO(task.maturity.toString())),
            getMonth(parseISO(task.maturity.toString())),
            getDate(parseISO(task.maturity.toString())) - 1,
          ),
        )
      }
      return false
    })

    setFutureTasks(futureTasks)
  }, [allOpenedTasks])

  useEffect(() => {
    const lateTasks = allOpenedTasks.filter((task) => {
      if (task.maturity) {
        return isBefore(
          new Date(
            getYear(new Date(task.maturity)),
            getMonth(new Date(task.maturity)),
            getDate(new Date(task.maturity)),
          ),
          new Date(
            getYear(new Date()),
            getMonth(new Date()),
            getDate(new Date()),
          ),
        )
      }
      return false
    })
    setLateTasks(lateTasks)
  }, [allOpenedTasks])

  const whatShowInTodayTasks = useMemo(() => {
    if (openedTasksIsLoading) {
      return <TasksLoading />
    }

    if (tasksForToday.length === 0) {
      return (
        <EmptyTasksMessage>
          <img src={emptyImage} alt="Você não possui tarefas neste quadro" />{' '}
          <span>Você ainda não possui tarefas para hoje!</span>
        </EmptyTasksMessage>
      )
    }

    if (tasksForToday.length > 0) {
      return (
        <ListViewTableBody>
          {tasksForToday.map((task) => {
            return <TaskTr key={task.id} task={task} />
          })}
        </ListViewTableBody>
      )
    }
  }, [openedTasksIsLoading, tasksForToday])

  const whatShowInTomorrowTasks = useMemo(() => {
    if (openedTasksIsLoading) {
      return <TasksLoading />
    }

    if (tasksForTomorrow.length === 0) {
      return (
        <EmptyTasksMessage>
          <img src={emptyImage} alt="Você não possui tarefas neste quadro" />{' '}
          <span>Você ainda não possui tarefas para amanhã!</span>
        </EmptyTasksMessage>
      )
    }

    if (tasksForTomorrow.length > 0) {
      return (
        <ListViewTableBody>
          {tasksForTomorrow.map((task) => {
            return <TaskTr key={task.id} task={task} />
          })}
        </ListViewTableBody>
      )
    }
  }, [openedTasksIsLoading, tasksForTomorrow])

  const whatShowInLateTasks = useMemo(() => {
    if (openedTasksIsLoading) {
      return <TasksLoading />
    }

    if (lateTasks.length === 0) {
      return (
        <EmptyTasksMessage>
          <img src={emptyImage} alt="Você não possui tarefas neste quadro" />{' '}
          <span>Você não possui tarefas atrasadas!</span>
        </EmptyTasksMessage>
      )
    }

    if (lateTasks.length > 0) {
      return (
        <ListViewTableBody>
          {lateTasks.map((task) => {
            return <TaskTr key={task.id} task={task} />
          })}
        </ListViewTableBody>
      )
    }
  }, [lateTasks, openedTasksIsLoading])

  const whatShowInFutureTasks = useMemo(() => {
    if (openedTasksIsLoading) {
      return <TasksLoading />
    }

    if (futureTasks.length === 0) {
      return (
        <EmptyTasksMessage>
          <img src={emptyImage} alt="Você não possui tarefas neste quadro" />{' '}
          <span>Você não possui tarefas futuras!</span>
        </EmptyTasksMessage>
      )
    }

    if (futureTasks.length > 0) {
      return (
        <ListViewTableBody>
          {futureTasks.map((task) => {
            return <TaskTr key={task.id} task={task} />
          })}
        </ListViewTableBody>
      )
    }
  }, [futureTasks, openedTasksIsLoading])

  return (
    <>
      <Container>
        <DashBoardHeader>
          <InitialInfo>
            <WelcomeIcon>
              <span>👋</span>
            </WelcomeIcon>
            <TextHeader>
              <WelcomePhrase>Olá, {localStorage.getItem('name')}</WelcomePhrase>
              <span>{messageForToday}</span>
            </TextHeader>
          </InitialInfo>
          <Poppover.Root>
            <Poppover.Trigger asChild>
              <NotificationsArea>
                <Bell alt="Notifícações" size={24} />
                {notifications.length > 0 && (
                  <NotificationsCount>
                    <span>{notifications.length}</span>
                  </NotificationsCount>
                )}
              </NotificationsArea>
            </Poppover.Trigger>
            <NotificationPoppover
              handleUpdateNotifications={handleUpdateNotifications}
              notifications={notifications}
            />
          </Poppover.Root>
        </DashBoardHeader>
        <CardsArea>
          <ResumeCard amount={toDoTasks.length} status="opened" />
          <ResumeCard amount={standByTasks.length} status="stand_by" />
          <ResumeCard amount={inProgressTasks.length} status="in_progress" />
          <ResumeCard amount={approvalTasks.length} status="approval" />
          <ResumeCard amount={paymentTasks.length} status="payment" />
          <ResumeCard amount={allConcludedTasks.length} status="concluded" />
        </CardsArea>
        <FlexArea>
          <TasksArea>
            <TitleOfBox>
              <span>Tarefas para Hoje:</span>
            </TitleOfBox>
            <ListViewTable>{whatShowInTodayTasks}</ListViewTable>
          </TasksArea>
          <TasksArea>
            <TitleOfBox>
              <span>Tarefas para Amanhã:</span>
            </TitleOfBox>
            <ListViewTable>{whatShowInTomorrowTasks}</ListViewTable>
          </TasksArea>
          <TasksArea>
            <TitleOfBox>
              <span>Tarefas atrasadas:</span>
            </TitleOfBox>
            <ListViewTable>{whatShowInLateTasks}</ListViewTable>
          </TasksArea>
          <TasksArea>
            <TitleOfBox>
              <span>Tarefas futuras:</span>
            </TitleOfBox>
            <ListViewTable>{whatShowInFutureTasks}</ListViewTable>
          </TasksArea>
        </FlexArea>
      </Container>
      <ToastContainer />
    </>
  )
}
