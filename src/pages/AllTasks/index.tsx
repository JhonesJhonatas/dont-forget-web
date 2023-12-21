import { useCallback, useContext, useMemo, useState } from 'react'
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
import { TasksContext } from '../../contexts/TaskContext'
import { useSeparateOpenedTasksByStatus } from '../../hooks/tasks/useSeparateOpenedTasksByStatus'
import { TaskTr } from '../../components/TaskTr'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import { TaskCard } from '../../components/TaskCard'
import { CardViewLoading } from '../../components/CardViewLoading'

type CurrentViewSchema = 'list' | 'kanban'

export function AllTasks() {
  const [currentView, setCurrentView] = useState<CurrentViewSchema>('list')

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
                      {toDoTasks.map((task) => {
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
                      {standByTasks.map((task) => {
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
                      {inProgressTasks.map((task) => {
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
                      {approvalTasks.map((task) => {
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
                      {paymentTasks.map((task) => {
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
                      {allConcludedTasks.map((task) => {
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
    allConcludedTasks,
    approvalTasks,
    inProgressTasks,
    openedTasksIsLoading,
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
