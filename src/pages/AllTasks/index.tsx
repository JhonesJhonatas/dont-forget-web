import {
  ArrowsDownUp,
  CalendarBlank,
  FadersHorizontal,
  Kanban,
  List,
} from '@phosphor-icons/react'

import {
  CardsArea,
  Container,
  DateOptions,
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
  OptionsContainer,
  StatusHeader,
  TableBody,
  TableHeader,
  TaskTable,
  TasksArea,
  ViewOptions,
} from './styles'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { TaskContext } from '../../contexts/TasksContext'
import { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { TaskTr } from './components/TaskTr'
import { TaskCard } from './components/TaskCard'
import { TaskSchema } from '../../hooks/useGetTasks'
import { SkeletonLoading } from './components/SkeletonLoading'
import { ListLoading } from './components/ListLoading'

type TogleTaksViewSchema = 'list' | 'kanban'

export function AllTasks() {
  const [currentView, setCurrentView] = useState<TogleTaksViewSchema>('list')
  const [openedTasks, setOpenedTasks] = useState<TaskSchema[]>([])
  const [inProgressTasks, setInProgressTasks] = useState<TaskSchema[]>([])
  const [standByTasks, setStandByTasks] = useState<TaskSchema[]>([])
  const [approvalTasks, setApprovalTasks] = useState<TaskSchema[]>([])
  const [paymentTasks, setPaymentTasks] = useState<TaskSchema[]>([])
  const [concludedTasks, setConcludedTasks] = useState<TaskSchema[]>([])
  const { allTasksList, tasksIsLoading } = useContext(TaskContext)

  useEffect(() => {
    const filteredTasks = allTasksList.filter(
      (task) => task.status === 'opened',
    )

    setOpenedTasks(filteredTasks)
  }, [allTasksList])

  const openedListOrLoading = useMemo(() => {
    if (tasksIsLoading) {
      return <SkeletonLoading />
    } else {
      return openedTasks.map((task) => {
        return <TaskCard key={task.id} task={task} />
      })
    }
  }, [openedTasks, tasksIsLoading])

  useEffect(() => {
    const filteredTasks = allTasksList.filter(
      (task) => task.status === 'stand_by',
    )

    setStandByTasks(filteredTasks)
  }, [allTasksList])

  const standByListOrLoading = useMemo(() => {
    if (tasksIsLoading) {
      return <SkeletonLoading />
    } else {
      return standByTasks.map((task) => {
        return <TaskCard key={task.id} task={task} />
      })
    }
  }, [standByTasks, tasksIsLoading])

  useEffect(() => {
    const filteredTasks = allTasksList.filter(
      (task) => task.status === 'in_progress',
    )

    setInProgressTasks(filteredTasks)
  }, [allTasksList])

  const inProgressListOrLoading = useMemo(() => {
    if (tasksIsLoading) {
      return <SkeletonLoading />
    } else {
      return inProgressTasks.map((task) => {
        return <TaskCard key={task.id} task={task} />
      })
    }
  }, [inProgressTasks, tasksIsLoading])

  useEffect(() => {
    const filteredTasks = allTasksList.filter(
      (task) => task.status === 'approval',
    )

    setApprovalTasks(filteredTasks)
  }, [allTasksList])

  const approvalListOrLoading = useMemo(() => {
    if (tasksIsLoading) {
      return <SkeletonLoading />
    } else {
      return approvalTasks.map((task) => {
        return <TaskCard key={task.id} task={task} />
      })
    }
  }, [approvalTasks, tasksIsLoading])

  useEffect(() => {
    const filteredTasks = allTasksList.filter(
      (task) => task.status === 'payment',
    )

    setPaymentTasks(filteredTasks)
  }, [allTasksList])

  const paymentListOrLoading = useMemo(() => {
    if (tasksIsLoading) {
      return <SkeletonLoading />
    } else {
      return paymentTasks.map((task) => {
        return <TaskCard key={task.id} task={task} />
      })
    }
  }, [paymentTasks, tasksIsLoading])

  useEffect(() => {
    const filteredTasks = allTasksList.filter(
      (task) => task.status === 'concluded',
    )

    setConcludedTasks(filteredTasks)
  }, [allTasksList])

  const concludedListOrLoading = useMemo(() => {
    if (tasksIsLoading) {
      return <SkeletonLoading />
    } else {
      return concludedTasks.map((task) => {
        return <TaskCard key={task.id} task={task} />
      })
    }
  }, [concludedTasks, tasksIsLoading])

  const dayOfWeek = format(new Date(), 'EEEE', { locale: ptBR })
  const today = format(new Date(), 'dd/MM/yyyy', { locale: ptBR })

  const handleChangeView = useCallback((view: TogleTaksViewSchema) => {
    setCurrentView(view)
  }, [])

  const taskListOrLoad = useMemo(() => {
    if (tasksIsLoading) {
      return <ListLoading />
    } else {
      return allTasksList.map((task) => {
        return <TaskTr key={task.id} task={task} />
      })
    }
  }, [allTasksList, tasksIsLoading])

  return (
    <Container>
      <MainContainer>
        <HandleOptions>
          <OptionsContainer>
            <DateOptions>
              <CalendarBlank />
              <div>
                <span>{dayOfWeek}</span>
                <span>{today}</span>
              </div>
            </DateOptions>
          </OptionsContainer>

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
                    <CardsArea>{openedListOrLoading}</CardsArea>
                  </td>
                  <td>
                    <CardsArea>{standByListOrLoading}</CardsArea>
                  </td>
                  <td>
                    <CardsArea>{inProgressListOrLoading}</CardsArea>
                  </td>
                  <td>
                    <CardsArea>{approvalListOrLoading}</CardsArea>
                  </td>
                  <td>
                    <CardsArea>{paymentListOrLoading}</CardsArea>
                  </td>
                  <td>
                    <CardsArea>{concludedListOrLoading}</CardsArea>
                  </td>
                </tr>
              </TableBody>
            </TaskTable>
          </TasksArea>
        )}

        {currentView === 'list' && (
          <TasksArea>
            <ListViewTable>
              <ListViewTableHeader>
                <tr>
                  <th>Título</th>
                  <th>Status</th>
                  <th>Deadline</th>
                  <th>Prioridade</th>
                </tr>
              </ListViewTableHeader>
              <ListViewTableBody>{taskListOrLoad}</ListViewTableBody>
            </ListViewTable>
          </TasksArea>
        )}
      </MainContainer>
    </Container>
  )
}
