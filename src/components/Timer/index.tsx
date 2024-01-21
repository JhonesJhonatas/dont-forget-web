import { Pause, Play } from '@phosphor-icons/react'
import {
  Container,
  IconArea,
  MainContainer,
  TimerDescription,
  TimerLabel,
} from './styles'
import { useCallback, useState } from 'react'

export function Timer() {
  const [currentTime, setCurrentTime] = useState(0)
  const [started, setStarted] = useState(false)

  const handleToggleTimer = useCallback(() => {
    if (!started) {
      setStarted(true)
      setInterval(() => {
        setCurrentTime(() => currentTime + 1)
      }, 1000)
    }

    if (started) {
      setStarted(false)
    }
  }, [currentTime, started])

  return (
    <Container>
      <TimerLabel>Timer:</TimerLabel>
      <MainContainer>
        {started ? (
          <IconArea onClick={handleToggleTimer}>
            <Pause />
          </IconArea>
        ) : (
          <IconArea onClick={handleToggleTimer}>
            <Play />
          </IconArea>
        )}
        <TimerDescription id="timerDescription" $isStarted={started}>
          <span>{currentTime}</span>
        </TimerDescription>
      </MainContainer>
    </Container>
  )
}
