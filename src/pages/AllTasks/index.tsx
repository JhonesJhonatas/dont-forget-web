import {
  ArrowsDownUp,
  CalendarBlank,
  FadersHorizontal,
} from '@phosphor-icons/react'
import { TaskCard } from './components/TaskCard'
import {
  Container,
  DateOptions,
  FiltersArea,
  FiltersContainer,
  HandleOptions,
  InputText,
  LabelWithSelectInput,
  MainContainer,
  OptionsContainer,
  TasksArea,
} from './styles'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { SkeletonLoading } from './components/SkeletonLoading'
import { TaskContext } from '../../contexts/TasksContext'
import { useContext } from 'react'

export function AllTasks() {
  const { allTasksList, tasksIsLoading } = useContext(TaskContext)

  const dayOfWeek = format(new Date(), 'EEEE', { locale: ptBR })
  const today = format(new Date(), 'dd/MM/yyyy', { locale: ptBR })

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
            <InputText type="text" placeholder="Pesquisar" />
          </FiltersContainer>
        </HandleOptions>

        {tasksIsLoading ? (
          <SkeletonLoading />
        ) : (
          <TasksArea>
            {allTasksList.map((task) => {
              return (
                <TaskCard
                  key={task.id}
                  id={task.id}
                  maturity={task.maturity}
                  priority={task.priority}
                  status={task.status}
                  title={task.title}
                  description={task.description}
                />
              )
            })}
          </TasksArea>
        )}
      </MainContainer>
    </Container>
  )
}
