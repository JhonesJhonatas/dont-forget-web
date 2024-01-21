import hexToRgba from 'hex-to-rgba'
import styled, { css } from 'styled-components'

interface TimerDescriptionProps {
  $isStarted: boolean
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`

export const TimerLabel = styled.span`
  font-size: 0.75rem;
`

export const MainContainer = styled.div`
  background-color: ${(props) => hexToRgba(props.theme.cardBgPrimary, 0.5)};
  padding: 0.25rem;
  border-radius: 60px;

  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    #timerDescription {
      display: flex;
    }
  }
`

export const IconArea = styled.div`
  width: 2rem;
  height: 2rem;
  background-color: ${(props) => props.theme.enphasis};
  border-radius: 60px;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: ${(props) => hexToRgba(props.theme.enphasis, 0.8)};
  }
`

export const TimerDescription = styled.div<TimerDescriptionProps>`
  padding: 0.2rem 1rem 0.2rem 0.1rem;

  ${(props) =>
    props.$isStarted
      ? css`
          display: flex;
        `
      : css`
          display: none;
        `}
`
