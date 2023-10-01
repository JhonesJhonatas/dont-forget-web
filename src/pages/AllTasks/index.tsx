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
  TableBody,
  TableHeader,
  TaskTable,
  TasksArea,
  ViewOptions,
} from './styles'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { TaskContext } from '../../contexts/TasksContext'
import { useCallback, useContext, useState } from 'react'
import { TaskTr } from './components/TaskTr'
import { useGetTasksByStatus } from '../../hooks/useGetTasksByStatus'
import { TaskCard } from './components/TaskCard'

type TogleTaksViewSchema = 'list' | 'kanban'

export function AllTasks() {
  const [currentView, setCurrentView] = useState<TogleTaksViewSchema>('list')
  const { allTasksList } = useContext(TaskContext)

  const openedTasks = useGetTasksByStatus('opened')
  const standByTasks = useGetTasksByStatus('stand_by')
  const inProgressTasks = useGetTasksByStatus('in_progress')
  const approvalTasks = useGetTasksByStatus('approval')
  const paymentTasks = useGetTasksByStatus('payment')
  const concludedTasks = useGetTasksByStatus('concluded')

  const dayOfWeek = format(new Date(), 'EEEE', { locale: ptBR })
  const today = format(new Date(), 'dd/MM/yyyy', { locale: ptBR })

  const handleChangeView = useCallback((view: TogleTaksViewSchema) => {
    setCurrentView(view)
  }, [])

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
                  <th>Em Aberto</th>
                  <th>StandBy</th>
                  <th>Em Andamento</th>
                  <th>Aprovação/Pr</th>
                  <th>Pagamento</th>
                  <th>Concluído</th>
                </tr>
              </TableHeader>

              <TableBody>
                <tr>
                  <td>
                    <CardsArea>
                      {openedTasks.filteredTasks.map((task) => {
                        return <TaskCard key={task.id} task={task} />
                      })}
                    </CardsArea>
                  </td>
                  <td>
                    <CardsArea>
                      {standByTasks.filteredTasks.map((task) => {
                        return <TaskCard key={task.id} task={task} />
                      })}
                    </CardsArea>
                  </td>
                  <td>
                    <CardsArea>
                      {inProgressTasks.filteredTasks.map((task) => {
                        return <TaskCard key={task.id} task={task} />
                      })}
                    </CardsArea>
                  </td>
                  <td>
                    <CardsArea>
                      {approvalTasks.filteredTasks.map((task) => {
                        return <TaskCard key={task.id} task={task} />
                      })}
                    </CardsArea>
                  </td>
                  <td>
                    <CardsArea>
                      {paymentTasks.filteredTasks.map((task) => {
                        return <TaskCard key={task.id} task={task} />
                      })}
                    </CardsArea>
                  </td>
                  <td>
                    <CardsArea>
                      {concludedTasks.filteredTasks.map((task) => {
                        return <TaskCard key={task.id} task={task} />
                      })}
                    </CardsArea>
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
              <ListViewTableBody>
                {allTasksList.map((task) => {
                  return <TaskTr key={task.id} task={task} />
                })}
              </ListViewTableBody>
            </ListViewTable>
          </TasksArea>
        )}
      </MainContainer>
    </Container>
  )
}
