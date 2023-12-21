import { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import {
  CardsArea,
  Container,
  CurrentViewButton,
  Header,
  KanbanArea,
  MainContent,
  StatusHeader,
  TableBody,
  TableHeader,
  TaskTable,
  TasksArea,
  TasksAreaTitle,
  TasksContainer,
  TasksContent,
} from './styles'
import { Circle, Kanban, List } from '@phosphor-icons/react'
import {
  ConcludedTask,
  OpenedTask,
  TasksContext,
} from '../../contexts/TaskContext'
import { useSeparateOpenedTasksByStatus } from '../../hooks/tasks/useSeparateOpenedTasksByStatus'
import { TaskTr } from '../../components/TaskTr'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import { TaskCard } from '../../components/TaskCard'
import { CardViewLoading } from '../../components/CardViewLoading'
import { useParams } from 'react-router-dom'

type CurrentViewSchema = 'list' | 'kanban'

type RouterParams = {
  projectId: string
}

export function TasksByProjects() {
  const [currentView, setCurrentView] = useState<CurrentViewSchema>('list')
  const [filteredToDoTasks, setFilteredToDoTasks] = useState<OpenedTask[]>([])
  const [filteredStandByTasks, setFilteredStandByTasks] = useState<
    OpenedTask[]
  >([])
  const [filteredInProgressTasks, setFilteredInProgressTasks] = useState<
    OpenedTask[]
  >([])
  const [filteredApprovalTasks, setFilteredApprovalTasks] = useState<
    OpenedTask[]
  >([])
  const [filteredPaymentTasks, setFilteredPaymentTasks] = useState<
    OpenedTask[]
  >([])
  const [filteredConcludedTasks, setFilteredConcludedTasks] = useState<
    ConcludedTask[]
  >([])

  const { projectId } = useParams<RouterParams>()

  const { allOpenedTasks, allConcludedTasks, openedTasksIsLoading } =
    useContext(TasksContext)

  const {
    toDoTasks,
    inProgressTasks,
    standByTasks,
    paymentTasks,
    approvalTasks,
  } = useSeparateOpenedTasksByStatus(allOpenedTasks)

  const handleChangeCurreView = useCallback(
    (currentView: CurrentViewSchema) => {
      setCurrentView(currentView)
    },
    [],
  )

  useEffect(() => {
    const filteredTasks = toDoTasks.filter(
      (task) => task.projectId === projectId,
    )
    setFilteredToDoTasks(filteredTasks)
  }, [projectId, toDoTasks])

  useEffect(() => {
    const filteredTasks = standByTasks.filter(
      (task) => task.projectId === projectId,
    )
    setFilteredStandByTasks(filteredTasks)
  }, [projectId, standByTasks])

  useEffect(() => {
    const filteredTasks = inProgressTasks.filter(
      (task) => task.projectId === projectId,
    )
    setFilteredInProgressTasks(filteredTasks)
  }, [inProgressTasks, projectId, toDoTasks])

  useEffect(() => {
    const filteredTasks = approvalTasks.filter(
      (task) => task.projectId === projectId,
    )
    setFilteredApprovalTasks(filteredTasks)
  }, [approvalTasks, projectId, toDoTasks])

  useEffect(() => {
    const filteredTasks = paymentTasks.filter(
      (task) => task.projectId === projectId,
    )
    setFilteredPaymentTasks(filteredTasks)
  }, [paymentTasks, projectId, toDoTasks])

  useEffect(() => {
    const filteredTasks = allConcludedTasks.filter(
      (task) => task.projectId === projectId,
    )
    setFilteredConcludedTasks(filteredTasks)
  }, [allConcludedTasks, projectId, toDoTasks])

  const whatShowInContent = useMemo(() => {
    return {
      list: (
        <TasksContainer>
          <TasksArea $status="toDo">
            <TasksAreaTitle $status="toDo">
              <Circle size={16} weight="fill" />
              <span>Em Aberto</span>
            </TasksAreaTitle>
            <TasksContent>
              {filteredToDoTasks.map((task) => {
                return <TaskTr key={task.id} task={task} />
              })}
            </TasksContent>
          </TasksArea>

          <TasksArea $status="standby">
            <TasksAreaTitle $status="standby">
              <Circle size={16} weight="fill" />
              <span>Stand By</span>
            </TasksAreaTitle>
            <TasksContent>
              {filteredStandByTasks.map((task) => {
                return <TaskTr key={task.id} task={task} />
              })}
            </TasksContent>
          </TasksArea>

          <TasksArea $status="inProgress">
            <TasksAreaTitle $status="inProgress">
              <Circle size={16} weight="fill" />
              <span>Em Andamento</span>
            </TasksAreaTitle>
            <TasksContent>
              {filteredInProgressTasks.map((task) => {
                return <TaskTr key={task.id} task={task} />
              })}
            </TasksContent>
          </TasksArea>

          <TasksArea $status="approval">
            <TasksAreaTitle $status="approval">
              <Circle size={16} weight="fill" />
              <span>Aguardando Aprovação</span>
            </TasksAreaTitle>
            <TasksContent>
              {filteredApprovalTasks.map((task) => {
                return <TaskTr key={task.id} task={task} />
              })}
            </TasksContent>
          </TasksArea>

          <TasksArea $status="payment">
            <TasksAreaTitle $status="payment">
              <Circle size={16} weight="fill" />
              <span>Aguardando Pagamento</span>
            </TasksAreaTitle>
            <TasksContent>
              {filteredPaymentTasks.map((task) => {
                return <TaskTr key={task.id} task={task} />
              })}
            </TasksContent>
          </TasksArea>

          <TasksArea $status="concluded">
            <TasksAreaTitle $status="concluded">
              <Circle size={16} weight="fill" />
              <span>Concluídas</span>
            </TasksAreaTitle>
            <TasksContent>
              {filteredConcludedTasks.map((task) => {
                return <TaskTr key={task.id} task={task} />
              })}
            </TasksContent>
          </TasksArea>
        </TasksContainer>
      ),
      kanban: (
        <KanbanArea>
          <TaskTable>
            <TableHeader>
              <tr>
                <StatusHeader $status="toDo">Em Aberto</StatusHeader>
                <StatusHeader $status="standby">StandBy</StatusHeader>
                <StatusHeader $status="inProgress">Em Andamento</StatusHeader>
                <StatusHeader $status="approval">Aprovação/Pr</StatusHeader>
                <StatusHeader $status="payment">Pagamento</StatusHeader>
                <StatusHeader $status="concluded">Concluído</StatusHeader>
              </tr>
            </TableHeader>

            <TableBody>
              <tr>
                <td>
                  {openedTasksIsLoading ? (
                    <CardViewLoading />
                  ) : (
                    <CardsArea>
                      {filteredToDoTasks.map((task) => {
                        return <TaskCard key={task.id} task={task} />
                      })}
                    </CardsArea>
                  )}
                </td>
                <td>
                  {openedTasksIsLoading ? (
                    <CardViewLoading />
                  ) : (
                    <CardsArea>
                      {filteredStandByTasks.map((task) => {
                        return <TaskCard key={task.id} task={task} />
                      })}
                    </CardsArea>
                  )}
                </td>
                <td>
                  {openedTasksIsLoading ? (
                    <CardViewLoading />
                  ) : (
                    <CardsArea>
                      {filteredInProgressTasks.map((task) => {
                        return <TaskCard key={task.id} task={task} />
                      })}
                    </CardsArea>
                  )}
                </td>
                <td>
                  {openedTasksIsLoading ? (
                    <CardViewLoading />
                  ) : (
                    <CardsArea>
                      {filteredApprovalTasks.map((task) => {
                        return <TaskCard key={task.id} task={task} />
                      })}
                    </CardsArea>
                  )}
                </td>
                <td>
                  {openedTasksIsLoading ? (
                    <CardViewLoading />
                  ) : (
                    <CardsArea>
                      {filteredPaymentTasks.map((task) => {
                        return <TaskCard key={task.id} task={task} />
                      })}
                    </CardsArea>
                  )}
                </td>
                <td>
                  {openedTasksIsLoading ? (
                    <CardViewLoading />
                  ) : (
                    <CardsArea>
                      {filteredConcludedTasks.map((task) => {
                        return <TaskCard key={task.id} task={task} />
                      })}
                    </CardsArea>
                  )}
                </td>
              </tr>
            </TableBody>
          </TaskTable>
        </KanbanArea>
      ),
    }
  }, [
    filteredApprovalTasks,
    filteredConcludedTasks,
    filteredInProgressTasks,
    filteredPaymentTasks,
    filteredStandByTasks,
    filteredToDoTasks,
    openedTasksIsLoading,
  ])

  return (
    <Container>
      <Header>
        <CurrentViewButton $currentView={currentView}>
          <List size={20} onClick={() => handleChangeCurreView('list')} />
          <Kanban size={20} onClick={() => handleChangeCurreView('kanban')} />
        </CurrentViewButton>
      </Header>
      <MainContent>{whatShowInContent[currentView]}</MainContent>
      <ToastContainer />
    </Container>
  )
}
