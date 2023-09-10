import {
  Calendar,
  CaretLeft,
  CaretRight,
  FadersHorizontal,
  PlusCircle,
} from '@phosphor-icons/react'
import { NavBar } from './components/NavBar'
import { TaskCard } from './components/TaskCard'
import {
  Container,
  DateOptions,
  FiltersArea,
  FiltersContainer,
  HandleOptions,
  InputText,
  LabelWithSelectInput,
  NewTaskButton,
  OptionsContainer,
  Pagination,
  TasksArea,
} from './styles'

export function DashBoard() {
  return (
    <Container>
      <NavBar />

      <HandleOptions>
        <OptionsContainer>
          <DateOptions>
            <Calendar />
            <div>
              <span>Domingo</span>
              <span>00/00/0000</span>
            </div>
          </DateOptions>
          <NewTaskButton>
            Nova Task
            <PlusCircle />
          </NewTaskButton>
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
        <TaskCard />
        <TaskCard />
        <TaskCard />
        <TaskCard />
        <TaskCard />
        <TaskCard />
        <TaskCard />
        <TaskCard />
        <TaskCard />
      </TasksArea>

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
