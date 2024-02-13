import { useCallback, useContext, useMemo, useState } from 'react'
import {
  CardsArea,
  Column,
  Container,
  CurrentViewButton,
  Header,
  KanbanArea,
  KanbanColumns,
  MainContent,
  StatusTitle,
  TasksArea,
  TasksAreaTitle,
  TasksContainer,
  TasksContent,
} from './styles'
import { Circle, Kanban, List } from '@phosphor-icons/react'
import { TasksContext } from '../../contexts/TaskContext'
import { useSeparateOpenedTasksByStatus } from '../../hooks/tasks/useSeparateOpenedTasksByStatus'
import { TaskTr } from '../../components/TaskTr'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import { TaskCard } from '../../components/TaskCard'

type CurrentViewSchema = 'list' | 'kanban'

export function AllTasks() {
  const [currentView, setCurrentView] = useState<CurrentViewSchema>('list')

  const { allOpenedTasks, allConcludedTasks } = useContext(TasksContext)

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
              {toDoTasks.map((task) => {
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
              {standByTasks.map((task) => {
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
              {inProgressTasks.map((task) => {
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
              {approvalTasks.map((task) => {
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
              {paymentTasks.map((task) => {
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
              {allConcludedTasks.map((task) => {
                return <TaskTr key={task.id} task={task} />
              })}
            </TasksContent>
          </TasksArea>
        </TasksContainer>
      ),
      kanban: (
        <KanbanArea>
          <KanbanColumns>
            <Column>
              <StatusTitle $status="toDo">
                <span>Em Aberto</span>
              </StatusTitle>
              <CardsArea>
                {toDoTasks.map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </CardsArea>
            </Column>
            <Column>
              <StatusTitle $status="standby">
                <span>StandBy</span>
              </StatusTitle>
              <CardsArea>
                {standByTasks.map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </CardsArea>
            </Column>
            <Column>
              <StatusTitle $status="inProgress">
                <span>Em Andamento</span>
              </StatusTitle>
              <CardsArea>
                {inProgressTasks.map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </CardsArea>
            </Column>
            <Column>
              <StatusTitle $status="approval">
                <span>Aprovação</span>
              </StatusTitle>
              <CardsArea>
                {approvalTasks.map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </CardsArea>
            </Column>
            <Column>
              <StatusTitle $status="payment">
                <span>Pagamento</span>
              </StatusTitle>
              <CardsArea>
                {paymentTasks.map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </CardsArea>
            </Column>
            <Column>
              <StatusTitle $status="concluded">
                <span>Concluído</span>
              </StatusTitle>
              <CardsArea>
                {allConcludedTasks.map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </CardsArea>
            </Column>
          </KanbanColumns>
        </KanbanArea>
      ),
    }
  }, [
    allConcludedTasks,
    approvalTasks,
    inProgressTasks,
    paymentTasks,
    standByTasks,
    toDoTasks,
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
