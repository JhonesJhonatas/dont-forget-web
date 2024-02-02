import { CaretDown, Play, Stop } from '@phosphor-icons/react'
import {
  Container,
  MainContainer,
  PlayPauseButton,
  TimerArea,
  TimerLabel,
} from './styles'
import { useCallback, useEffect, useState } from 'react'
import { differenceInSeconds, parseISO } from 'date-fns'
import { api } from '../../lib/axios'
import { Task } from '../EditTaskModal'
import { useStopWatchs } from './hooks/useStopWatchs'

interface TimerProps {
  task: Task
}

export function Timer({ task }: TimerProps) {
  const [sopWatchIsActive, setStopWatchIsActive] = useState(false)
  const [secondsPassed, setSecondsPassed] = useState(0)

  const { activeStopWatch, stopWatchList, handleUpdateStopWatchList } =
    useStopWatchs(task.id)

  useEffect(() => {
    if (activeStopWatch) {
      setStopWatchIsActive(true)
    }
  }, [activeStopWatch])

  useEffect(() => {
    if (!stopWatchList) return

    const onlyCompleteStopWatches = stopWatchList.filter(
      (stopWatch) => stopWatch.isActive === false,
    )

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
  }, [stopWatchList])

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

      handleUpdateStopWatchList()
    } catch (err) {
      console.log(err)
    }
  }, [handleUpdateStopWatchList, task.id])

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
    } catch (err) {
      console.log(err)
    }
  }, [
    activeStopWatch?._id,
    activeStopWatch?.startDate,
    activeStopWatch?.taskId,
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
        <CaretDown />
      </MainContainer>
    </Container>
  )
}
