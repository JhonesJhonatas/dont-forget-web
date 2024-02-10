import { Calendar, CaretLeft, CaretRight } from '@phosphor-icons/react'
import {
  CardsArea,
  ControllersArea,
  DayColumn,
  DayWeekTitle,
  DaysColumns,
  PageTitle,
  WeekContainer,
  WeekHeader,
  WeekSelector,
} from './styles'
import { TaskCard } from '../../components/TaskCard'
import { useContext } from 'react'
import { TasksContext } from '../../contexts/TaskContext'

export function MyWeek() {
  const {
    handlePreviousWeek,
    handleCurrentWeek,
    handleNextWeek,
    tasksOfWeek,
    handleUpdateTasksOfWeek,
  } = useContext(TasksContext)

  return (
    <WeekContainer>
      <WeekHeader>
        <PageTitle>
          <Calendar size={24} />
          <span>Minha Semana</span>
        </PageTitle>
        <ControllersArea>
          <WeekSelector>
            <CaretLeft onClick={handlePreviousWeek} />
            <span onClick={handleCurrentWeek}>Semana Atual</span>
            <CaretRight onClick={handleNextWeek} />
          </WeekSelector>
        </ControllersArea>
      </WeekHeader>
      <DaysColumns>
        <DayColumn>
          <DayWeekTitle>
            <span>Segunda-Feira</span>
          </DayWeekTitle>
          <CardsArea>
            {tasksOfWeek.monday.map((task) => {
              return (
                <TaskCard
                  handleUpdateTasksOfWeek={handleUpdateTasksOfWeek}
                  key={task.id}
                  task={task}
                />
              )
            })}
          </CardsArea>
        </DayColumn>
        <DayColumn>
          <DayWeekTitle>
            <span>Terça-Feira</span>
          </DayWeekTitle>
          <CardsArea>
            {tasksOfWeek.tuesday.map((task) => {
              return (
                <TaskCard
                  handleUpdateTasksOfWeek={handleUpdateTasksOfWeek}
                  key={task.id}
                  task={task}
                />
              )
            })}
          </CardsArea>
        </DayColumn>
        <DayColumn>
          <DayWeekTitle>
            <span>Quarta-Feira</span>
          </DayWeekTitle>
          <CardsArea>
            {tasksOfWeek.wednesday.map((task) => {
              return (
                <TaskCard
                  handleUpdateTasksOfWeek={handleUpdateTasksOfWeek}
                  key={task.id}
                  task={task}
                />
              )
            })}
          </CardsArea>
        </DayColumn>
        <DayColumn>
          <DayWeekTitle>
            <span>Quinta-Feira</span>
          </DayWeekTitle>
          <CardsArea>
            {tasksOfWeek.thursday.map((task) => {
              return (
                <TaskCard
                  handleUpdateTasksOfWeek={handleUpdateTasksOfWeek}
                  key={task.id}
                  task={task}
                />
              )
            })}
          </CardsArea>
        </DayColumn>
        <DayColumn>
          <DayWeekTitle>
            <span>Sexta-Feira</span>
          </DayWeekTitle>
          <CardsArea>
            {tasksOfWeek.friday.map((task) => {
              return (
                <TaskCard
                  handleUpdateTasksOfWeek={handleUpdateTasksOfWeek}
                  key={task.id}
                  task={task}
                />
              )
            })}
          </CardsArea>
        </DayColumn>
        <DayColumn>
          <DayWeekTitle>
            <span>Sábado</span>
          </DayWeekTitle>
          <CardsArea>
            {tasksOfWeek.saturday.map((task) => {
              return (
                <TaskCard
                  handleUpdateTasksOfWeek={handleUpdateTasksOfWeek}
                  key={task.id}
                  task={task}
                />
              )
            })}
          </CardsArea>
        </DayColumn>
        <DayColumn>
          <DayWeekTitle>
            <span>Domingo</span>
          </DayWeekTitle>
          <CardsArea>
            {tasksOfWeek.sunday.map((task) => {
              return (
                <TaskCard
                  handleUpdateTasksOfWeek={handleUpdateTasksOfWeek}
                  key={task.id}
                  task={task}
                />
              )
            })}
          </CardsArea>
        </DayColumn>
      </DaysColumns>
    </WeekContainer>
  )
}
