import {
  Calendar,
  CaretLeft,
  CaretRight,
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
  Pagination,
  TasksArea,
} from './styles'
import { useGetTasks } from '../../hooks/useGetTasks'

export function AllTasks() {
  const { allTasks } = useGetTasks()

  return (
    <Container>
      <MainContainer>
        <HandleOptions>
          <OptionsContainer>
            <DateOptions>
              <Calendar />
              <div>
                <span>Domingo</span>
                <span>00/00/0000</span>
              </div>
            </DateOptions>
          </OptionsContainer>

          <FiltersContainer>
            <FiltersArea>
              <div>
                <FadersHorizontal />
                <span>Filtros:</span>
              </div>
              <div>
                <LabelWithSelectInput>
                  Prioridade
                  <select>
                    <option>Todas</option>
                    <option>Normal</option>
                    <option>Importante</option>
                    <option>Urgente</option>
                  </select>
                </LabelWithSelectInput>
              </div>
            </FiltersArea>
            <InputText type="text" placeholder="Pesquisar" />
          </FiltersContainer>
        </HandleOptions>

        <TasksArea>
          {allTasks.map((task) => {
            return (
              <TaskCard
                key={task.id}
                maturity={task.maturity}
                priority={task.priority}
                status={task.status}
                title={task.title}
              />
            )
          })}
        </TasksArea>
      </MainContainer>

      <Pagination>
        <button>
          <CaretLeft />
        </button>
        <button>1</button>
        <button>2</button>
        <button>3</button>
        <button>4</button>
        <button>
          <CaretRight />
        </button>
      </Pagination>
    </Container>
  )
}
