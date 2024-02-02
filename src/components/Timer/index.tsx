import {
  Calendar,
  CaretDown,
  Clock,
  Play,
  Stop,
  Trash,
} from '@phosphor-icons/react'
import {
  Container,
  CycleArea,
  DeleteStopWatchButton,
  DropDownContent,
  DropDownTrigger,
  FlexArea,
  MainContainer,
  PlayPauseButton,
  TimerArea,
  TimerLabel,
} from './styles'
import { useCallback, useEffect, useState } from 'react'
import { differenceInSeconds, format, parseISO } from 'date-fns'
import { api } from '../../lib/axios'
import { Task } from '../EditTaskModal'
import { useStopWatchs } from './hooks/useStopWatchs'

interface TimerProps {
  task: Task
  handleUpdateTaskStatus: (status: string) => void
}

export function Timer({ task, handleUpdateTaskStatus }: TimerProps) {
  const [sopWatchIsActive, setStopWatchIsActive] = useState(false)
  const [secondsPassed, setSecondsPassed] = useState(0)
  const [dropDownIsOpen, setDropDownIsOpen] = useState(false)

  const {
    activeStopWatch,
    stopWatchList,
    handleUpdateStopWatchList,
    onlyCompleteStopWatches,
  } = useStopWatchs(task.id)

  useEffect(() => {
    if (activeStopWatch) {
      setStopWatchIsActive(true)
    }
  }, [activeStopWatch])

  useEffect(() => {
    if (!stopWatchList) return

    let totalSecondsSpent = 0

    onlyCompleteStopWatches.forEach((stopWatch) => {
      const secondsPassed = differenceInSeconds(
        parseISO(stopWatch.endDate || ''),
        parseISO(stopWatch.startDate),
      )

      totalSecondsSpent = totalSecondsSpent + secondsPassed
    })

    const activeStopWatch = stopWatchList.find((stopWatch) => {
      return stopWatch.isActive === true
    })

    if (activeStopWatch) {
      const currentStopWatchSeconds = differenceInSeconds(
        new Date(),
        parseISO(activeStopWatch?.startDate),
      )

      totalSecondsSpent = totalSecondsSpent + currentStopWatchSeconds
    }

    setSecondsPassed(totalSecondsSpent)
  }, [onlyCompleteStopWatches, stopWatchList])

  useEffect(() => {
    if (sopWatchIsActive) {
      const intervall = setInterval(() => {
        setSecondsPassed(() => secondsPassed + 1)
      }, 1000)

      return () => clearInterval(intervall)
    }
  }, [secondsPassed, sopWatchIsActive])

  const handleStartStopWatch = useCallback(async () => {
    const startedDate = new Date()
    setStopWatchIsActive(true)

    try {
      await api.post('tasks/start-stopwatch', {
        taskId: task.id,
        startDate: startedDate,
        isActive: true,
      })

      if (task.status === 'toDo') {
        console.log('Rodar')
        await api.put('tasks/edit-task-by-id', {
          ...task,
          status: 'inProgress',
        })

        handleUpdateTaskStatus('inProgress')
      }

      handleUpdateStopWatchList()
    } catch (err) {
      console.log(err)
    }
  }, [handleUpdateStopWatchList, handleUpdateTaskStatus, task])

  const handleStopStopWatch = useCallback(async () => {
    setStopWatchIsActive(false)

    const endDate = new Date()

    try {
      await api.post('/tasks/stop-stopwatch', {
        id: activeStopWatch?._id,
        taskId: activeStopWatch?.taskId,
        startDate: activeStopWatch?.startDate,
        endDate,
        isActive: false,
      })

      handleUpdateStopWatchList()
    } catch (err) {
      console.log(err)
    }
  }, [
    activeStopWatch?._id,
    activeStopWatch?.startDate,
    activeStopWatch?.taskId,
    handleUpdateStopWatchList,
  ])

  const formatSeconds = useCallback((seconds: number) => {
    const hour = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const reestSeconds = seconds % 60

    const hourFormat = `${String(hour).padStart(2, '0')}:${String(
      minutes,
    ).padStart(2, '0')}:${String(reestSeconds).padStart(2, '0')}`

    return hourFormat
  }, [])

  const toggleDrowDown = useCallback(() => {
    setDropDownIsOpen((prevValue) => !prevValue)
  }, [])

  const handleDeleteStopWatchCycle = useCallback(
    async (id: string) => {
      try {
        await api.delete(`/tasks/delete-stopwatch/${id}`)

        handleUpdateStopWatchList()
      } catch (err) {
        console.log(err)
      }
    },
    [handleUpdateStopWatchList],
  )

  return (
    <Container>
      <TimerLabel>Timer:</TimerLabel>
      <MainContainer>
        <TimerArea>
          <PlayPauseButton $isActive={sopWatchIsActive}>
            {sopWatchIsActive ? (
              <Stop weight="fill" onClick={handleStopStopWatch} />
            ) : (
              <Play type="button" onClick={handleStartStopWatch} />
            )}
          </PlayPauseButton>
          <span>{formatSeconds(secondsPassed)}</span>
        </TimerArea>
        <DropDownTrigger onClick={toggleDrowDown}>
          <CaretDown />
        </DropDownTrigger>
      </MainContainer>
      <DropDownContent $isOpen={dropDownIsOpen}>
        {onlyCompleteStopWatches.length > 0 ? (
          onlyCompleteStopWatches.map((stopWatch) => {
            const spentTime = differenceInSeconds(
              parseISO(stopWatch.endDate as string),
              parseISO(stopWatch.startDate),
            )
            return (
              <CycleArea key={stopWatch._id}>
                <FlexArea>
                  <Calendar />
                  <strong>
                    {format(parseISO(stopWatch.startDate), 'dd/MM/yyyy')}
                  </strong>
                </FlexArea>
                <FlexArea>
                  <Clock />
                  <strong>{formatSeconds(spentTime)}</strong>
                </FlexArea>
                <DeleteStopWatchButton
                  onClick={() => handleDeleteStopWatchCycle(stopWatch._id)}
                >
                  <Trash />
                </DeleteStopWatchButton>
              </CycleArea>
            )
          })
        ) : (
          <span>Sem Registros Anteriores</span>
        )}
      </DropDownContent>
    </Container>
  )
}
