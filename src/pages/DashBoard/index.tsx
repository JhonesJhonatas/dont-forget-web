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
import {
  format,
  getDate,
  getMonth,
  getYear,
  isBefore,
  isFriday,
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
import { AuthContext } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { TaskTr } from '../../components/TaskTr'
import { useSeparateOpenedTasksByStatus } from '../../hooks/tasks/useSeparateOpenedTasksByStatus'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import { OpenedTask, TasksContext } from '../../contexts/TaskContext'

export function DashBoard() {
  const navigate = useNavigate()

  const { authenticated } = useContext(AuthContext)

  useEffect(() => {
    if (!authenticated) {
      navigate('/')
    }
  }, [authenticated, navigate])

  const [tasksForToday, setTasksForToday] = useState<OpenedTask[]>([])
  const [tasksForTomorrow, setTasksForTomorrow] = useState<OpenedTask[]>([])
  const [lateTasks, setLateTasks] = useState<OpenedTask[]>([])
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
    const todayTasks = allOpenedTasks.filter((task) =>
      isToday(parseISO(task.maturity.toString())),
    )

    setTasksForToday(todayTasks)
  }, [allOpenedTasks, todayDate])

  useEffect(() => {
    const tomorrowTasks = allOpenedTasks.filter((task) =>
      isTomorrow(parseISO(task.maturity.toString())),
    )

    setTasksForTomorrow(tomorrowTasks)
  }, [allOpenedTasks])

  useEffect(() => {
    const lateTasks = allOpenedTasks.filter((task) =>
      isBefore(
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
      ),
    )
    setLateTasks(lateTasks)
  }, [allOpenedTasks])

  return (
    <>
      <Container>
        <DashBoardHeader>
          <WelcomeIcon>
            <span>👋</span>
          </WelcomeIcon>
          <TextHeader>
            <WelcomePhrase>Olá, {localStorage.getItem('name')}</WelcomePhrase>
            <span>{messageForToday}</span>
          </TextHeader>
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
          <Notifications>
            <TitleOfBox>
              <span>Tarefas para Hoje:</span>
            </TitleOfBox>
            <ListViewTable>
              {openedTasksIsLoading ? (
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
                {openedTasksIsLoading ? (
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
                {openedTasksIsLoading ? (
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
      <ToastContainer />
    </>
  )
}
