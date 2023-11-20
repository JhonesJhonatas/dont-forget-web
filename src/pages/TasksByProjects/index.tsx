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
import { useCallback, useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import { useNavigate, useParams } from 'react-router-dom'
import { useSeparateOpenedTasksByStatus } from '../../hooks/tasks/useSeparateOpenedTasksByStatus'
import { ListViewLoading } from '../../components/ListViewLoading'
import { TaskTr } from '../../components/TaskTr'
import { TaskCard } from '../../components/TaskCard'
import { CardViewLoading } from '../../components/CardViewLoading'
import {
  ConcludedTask,
  OpenedTask,
  TasksContext,
} from '../../contexts/TaskContext'

type TogleTaksViewSchema = 'list' | 'kanban'

type RouterParams = {
  projectId: string
}

export function TasksByProjects() {
  const navigate = useNavigate()

  const { authenticated } = useContext(AuthContext)

  useEffect(() => {
    if (!authenticated) {
      navigate('/')
    }
  }, [authenticated, navigate])

  const [currentView, setCurrentView] = useState<TogleTaksViewSchema>('kanban')
  const [filteredOpenedTasks, setFilteredOpenedTasks] = useState<OpenedTask[]>(
    [],
  )
  const [filteredConcludedTasks, setFilteredConcludedTasks] = useState<
    ConcludedTask[]
  >([])

  const { projectId } = useParams<RouterParams>()
  const { allOpenedTasks, allConcludedTasks, openedTasksIsLoading } =
    useContext(TasksContext)

  const capturedProjectId = projectId || ''

  useEffect(() => {
    const filteredTasks = allOpenedTasks.filter(
      (openedTask) => openedTask.projectId === capturedProjectId,
    )

    setFilteredOpenedTasks(filteredTasks)
  }, [allOpenedTasks, capturedProjectId])

  useEffect(() => {
    const filteredTasks = allConcludedTasks.filter(
      (concludedTask) => concludedTask.projectId === capturedProjectId,
    )

    setFilteredConcludedTasks(filteredTasks)
  }, [allConcludedTasks, capturedProjectId])

  const {
    approvalTasks,
    inProgressTasks,
    paymentTasks,
    standByTasks,
    toDoTasks,
  } = useSeparateOpenedTasksByStatus(filteredOpenedTasks)

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
              <TaskListByStatus status="toDo">
                <ListViewTable>
                  <ListViewTableHeader status="toDo">
                    <div></div>
                    <span>Em Aberto</span>
                    <small>({toDoTasks.length})</small>
                  </ListViewTableHeader>
                  {openedTasksIsLoading ? (
                    <ListViewLoading />
                  ) : (
                    <ListViewTableBody>
                      {toDoTasks.map((task) => {
                        return <TaskTr key={task.id} task={task} />
                      })}
                    </ListViewTableBody>
                  )}
                </ListViewTable>
              </TaskListByStatus>

              <TaskListByStatus status="standby">
                <ListViewTable>
                  <ListViewTableHeader status="standby">
                    <div></div>
                    <span>StandBy</span>
                    <small>({standByTasks.length})</small>
                  </ListViewTableHeader>
                  {openedTasksIsLoading ? (
                    <ListViewLoading />
                  ) : (
                    <ListViewTableBody>
                      {standByTasks.map((task) => {
                        return <TaskTr key={task.id} task={task} />
                      })}
                    </ListViewTableBody>
                  )}
                </ListViewTable>
              </TaskListByStatus>

              <TaskListByStatus status="inProgress">
                <ListViewTable>
                  <ListViewTableHeader status="inProgress">
                    <div></div>
                    <span>Em Andamento</span>
                    <small>({inProgressTasks.length})</small>
                  </ListViewTableHeader>
                  {openedTasksIsLoading ? (
                    <ListViewLoading />
                  ) : (
                    <ListViewTableBody>
                      {inProgressTasks.map((task) => {
                        return <TaskTr key={task.id} task={task} />
                      })}
                    </ListViewTableBody>
                  )}
                </ListViewTable>
              </TaskListByStatus>

              <TaskListByStatus status="approval">
                <ListViewTable>
                  <ListViewTableHeader status="approval">
                    <div></div>
                    <span>Aprovação</span>
                    <small>({approvalTasks.length})</small>
                  </ListViewTableHeader>
                  {openedTasksIsLoading ? (
                    <ListViewLoading />
                  ) : (
                    <ListViewTableBody>
                      {approvalTasks.map((task) => {
                        return <TaskTr key={task.id} task={task} />
                      })}
                    </ListViewTableBody>
                  )}
                </ListViewTable>
              </TaskListByStatus>

              <TaskListByStatus status="payment">
                <ListViewTable>
                  <ListViewTableHeader status="payment">
                    <div></div>
                    <span>Pagamento</span>
                    <small>({paymentTasks.length})</small>
                  </ListViewTableHeader>
                  {openedTasksIsLoading ? (
                    <ListViewLoading />
                  ) : (
                    <ListViewTableBody>
                      {paymentTasks.map((task) => {
                        return <TaskTr key={task.id} task={task} />
                      })}
                    </ListViewTableBody>
                  )}
                </ListViewTable>
              </TaskListByStatus>

              <TaskListByStatus status="concluded">
                <ListViewTable>
                  <ListViewTableHeader status="concluded">
                    <div></div>
                    <span>Concluídas</span>
                    <small>({allConcludedTasks.length})</small>
                  </ListViewTableHeader>
                  {openedTasksIsLoading ? (
                    <ListViewLoading />
                  ) : (
                    <ListViewTableBody>
                      {allConcludedTasks.map((task) => {
                        return <TaskTr key={task.id} task={task} />
                      })}
                    </ListViewTableBody>
                  )}
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
                  <StatusHeader status="toDo">Em Aberto</StatusHeader>
                  <StatusHeader status="standby">StandBy</StatusHeader>
                  <StatusHeader status="inProgress">Em Andamento</StatusHeader>
                  <StatusHeader status="approval">Aprovação/Pr</StatusHeader>
                  <StatusHeader status="payment">Pagamento</StatusHeader>
                  <StatusHeader status="concluded">Concluído</StatusHeader>
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
                        {filteredConcludedTasks.map((task) => {
                          return <TaskCard key={task.id} task={task} />
                        })}
                      </CardsArea>
                    )}
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
