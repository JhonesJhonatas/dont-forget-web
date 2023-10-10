import {
  ArrowsDownUp,
  FadersHorizontal,
  Kanban,
  List,
} from '@phosphor-icons/react'

import {
  CardsArea,
  Container,
  Divider,
  FiltersArea,
  FiltersContainer,
  FlexArea,
  HandleOptions,
  IconView,
  InputText,
  LabelWithSelectInput,
  ListViewTable,
  ListViewTableBody,
  ListViewTableHeader,
  MainContainer,
  StatusHeader,
  TableBody,
  TableHeader,
  TaskListByStatus,
  TaskTable,
  TasksArea,
  TasksContainer,
  TasksListArea,
  ViewOptions,
} from './styles'
import { TaskContext } from '../../contexts/TasksContext'
import { useCallback, useContext, useState } from 'react'
import { TaskTr } from './components/TaskTr'
import { TaskCard } from './components/TaskCard'
import { useSeparateTasksById } from '../../hooks/useSeparateTasksByStatus'

type TogleTaksViewSchema = 'list' | 'kanban'

export function AllTasks() {
  const [currentView, setCurrentView] = useState<TogleTaksViewSchema>('list')
  const { allTasksList } = useContext(TaskContext)
  const {
    openedTasks,
    standByTasks,
    inProgressTasks,
    approvalTasks,
    paymentTasks,
    concludedTasks,
  } = useSeparateTasksById({ tasks: allTasksList })

  const handleChangeView = useCallback((view: TogleTaksViewSchema) => {
    setCurrentView(view)
  }, [])

  return (
    <Container>
      <MainContainer>
        <HandleOptions>
          <FiltersContainer>
            <FiltersArea>
              <section>
                <div>
                  <FadersHorizontal />
                  <span>Filtros:</span>
                </div>
                <div>
                  <LabelWithSelectInput>
                    Prioridade:
                    <select>
                      <option>Todas</option>
                      <option>Normal</option>
                      <option>Importante</option>
                      <option>Urgente</option>
                    </select>
                  </LabelWithSelectInput>
                  <p>|</p>
                  <LabelWithSelectInput>
                    Status:
                    <select>
                      <option>Todas</option>
                      <option>Normal</option>
                      <option>Importante</option>
                      <option>Urgente</option>
                    </select>
                  </LabelWithSelectInput>
                </div>
              </section>
              <Divider></Divider>
              <section>
                <div>
                  <ArrowsDownUp />
                  <span>Ordenar por:</span>
                </div>
                <div>
                  <LabelWithSelectInput>
                    Prioridade:
                    <select>
                      <option>Todas</option>
                      <option>Normal</option>
                      <option>Importante</option>
                      <option>Urgente</option>
                    </select>
                  </LabelWithSelectInput>
                  <p>|</p>
                  <LabelWithSelectInput>
                    Status:
                    <select>
                      <option>Todas</option>
                      <option>Normal</option>
                      <option>Importante</option>
                      <option>Urgente</option>
                    </select>
                  </LabelWithSelectInput>
                </div>
              </section>
            </FiltersArea>
            <FlexArea>
              <ViewOptions>
                <IconView isCurrentView={currentView === 'list'}>
                  <List size={32} onClick={() => handleChangeView('list')} />
                </IconView>
                <IconView isCurrentView={currentView === 'kanban'}>
                  <Kanban
                    size={32}
                    onClick={() => handleChangeView('kanban')}
                  />
                </IconView>
              </ViewOptions>
              <InputText type="text" placeholder="Pesquisar" />
            </FlexArea>
          </FiltersContainer>
        </HandleOptions>

        {currentView === 'list' && (
          <TasksContainer>
            <TasksListArea>
              <TaskListByStatus status="opened">
                <ListViewTable>
                  <ListViewTableHeader status="opened">
                    <div></div>
                    <span>Em Aberto</span>
                    <small>({openedTasks.length})</small>
                  </ListViewTableHeader>
                  <ListViewTableBody>
                    {openedTasks.map((task) => {
                      return <TaskTr key={task.id} task={task} />
                    })}
                  </ListViewTableBody>
                </ListViewTable>
              </TaskListByStatus>

              <TaskListByStatus status="stand_by">
                <ListViewTable>
                  <ListViewTableHeader status="stand_by">
                    <div></div>
                    <span>StandyBy</span>
                    <small>({standByTasks.length})</small>
                  </ListViewTableHeader>
                  <ListViewTableBody>
                    {standByTasks.map((task) => {
                      return <TaskTr key={task.id} task={task} />
                    })}
                  </ListViewTableBody>
                </ListViewTable>
              </TaskListByStatus>

              <TaskListByStatus status="in_progress">
                <ListViewTable>
                  <ListViewTableHeader status="in_progress">
                    <div></div>
                    <span>Em Andamento</span>
                    <small>({inProgressTasks.length})</small>
                  </ListViewTableHeader>
                  <ListViewTableBody>
                    {inProgressTasks.map((task) => {
                      return <TaskTr key={task.id} task={task} />
                    })}
                  </ListViewTableBody>
                </ListViewTable>
              </TaskListByStatus>

              <TaskListByStatus status="approval">
                <ListViewTable>
                  <ListViewTableHeader status="approval">
                    <div></div>
                    <span>Aprovação</span>
                    <small>({approvalTasks.length})</small>
                  </ListViewTableHeader>
                  <ListViewTableBody>
                    {approvalTasks.map((task) => {
                      return <TaskTr key={task.id} task={task} />
                    })}
                  </ListViewTableBody>
                </ListViewTable>
              </TaskListByStatus>

              <TaskListByStatus status="payment">
                <ListViewTable>
                  <ListViewTableHeader status="payment">
                    <div></div>
                    <span>Pagamento</span>
                    <small>({paymentTasks.length})</small>
                  </ListViewTableHeader>
                  <ListViewTableBody>
                    {paymentTasks.map((task) => {
                      return <TaskTr key={task.id} task={task} />
                    })}
                  </ListViewTableBody>
                </ListViewTable>
              </TaskListByStatus>

              <TaskListByStatus status="concluded">
                <ListViewTable>
                  <ListViewTableHeader status="concluded">
                    <div></div>
                    <span>Concluídas</span>
                    <small>({concludedTasks.length})</small>
                  </ListViewTableHeader>
                  <ListViewTableBody>
                    {concludedTasks.map((task) => {
                      return <TaskTr key={task.id} task={task} />
                    })}
                  </ListViewTableBody>
                </ListViewTable>
              </TaskListByStatus>
            </TasksListArea>
          </TasksContainer>
        )}

        {currentView === 'kanban' && (
          <TasksArea>
            <TaskTable>
              <TableHeader>
                <tr>
                  <StatusHeader status="opened">Em Aberto</StatusHeader>
                  <StatusHeader status="stand_by">StandBy</StatusHeader>
                  <StatusHeader status="in_progress">Em Andamento</StatusHeader>
                  <StatusHeader status="approval">Aprovação/Pr</StatusHeader>
                  <StatusHeader status="payment">Pagamento</StatusHeader>
                  <StatusHeader status="concluded">Concluído</StatusHeader>
                </tr>
              </TableHeader>

              <TableBody>
                <tr>
                  <td>
                    <CardsArea>
                      {openedTasks.map((task) => {
                        return <TaskCard key={task.id} task={task} />
                      })}
                    </CardsArea>
                  </td>
                  <td>
                    <CardsArea>
                      {standByTasks.map((task) => {
                        return <TaskCard key={task.id} task={task} />
                      })}
                    </CardsArea>
                  </td>
                  <td>
                    <CardsArea>
                      {inProgressTasks.map((task) => {
                        return <TaskCard key={task.id} task={task} />
                      })}
                    </CardsArea>
                  </td>
                  <td>
                    <CardsArea>
                      {approvalTasks.map((task) => {
                        return <TaskCard key={task.id} task={task} />
                      })}
                    </CardsArea>
                  </td>
                  <td>
                    <CardsArea>
                      {paymentTasks.map((task) => {
                        return <TaskCard key={task.id} task={task} />
                      })}
                    </CardsArea>
                  </td>
                  <td>
                    <CardsArea>
                      {concludedTasks.map((task) => {
                        return <TaskCard key={task.id} task={task} />
                      })}
                    </CardsArea>
                  </td>
                </tr>
              </TableBody>
            </TaskTable>
          </TasksArea>
        )}
      </MainContainer>
    </Container>
  )
}
