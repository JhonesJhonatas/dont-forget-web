import { Pause, Play } from '@phosphor-icons/react'
import {
  Container,
  IconArea,
  MainContainer,
  TimerDescription,
  TimerLabel,
} from './styles'
import { useCallback, useEffect, useRef, useState } from 'react'

export function Timer() {
  const [currentTime, setCurrentTime] = useState(0)
  const [started, setStarted] = useState(false)

  const intervalRef = useRef<number | null>(null)

  const handleToggleStopWatch = useCallback(() => {
    setStarted((currentState) => !currentState)
  }, [])

  useEffect(() => {
    if (started) {
      intervalRef.current = window.setInterval(() => {
        setCurrentTime((prevSeconds) => prevSeconds + 1)
      }, 1000)
    } else {
      clearInterval(intervalRef.current!)
    }

    return () => clearInterval(intervalRef.current!)
  }, [started])

  const formatTime = useCallback((time: number): string => {
    const hours = Math.floor(time / 3600)
    const minutes = Math.floor((time % 3600) / 60)
    const secs = time % 60
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(
      2,
      '0',
    )}:${String(secs).padStart(2, '0')}`
  }, [])

  return (
    <Container>
      <TimerLabel>Timer:</TimerLabel>
      <MainContainer>
        {started ? (
          <IconArea>
            <Pause onClick={handleToggleStopWatch} />
          </IconArea>
        ) : (
          <IconArea>
            <Play onClick={handleToggleStopWatch} />
          </IconArea>
        )}
        <TimerDescription id="timerDescription" $isStarted={started}>
          <span>{formatTime(currentTime)}</span>
        </TimerDescription>
      </MainContainer>
    </Container>
  )
}
