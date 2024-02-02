import styled, { css } from 'styled-components'

interface PlayPauseButtonProps {
  $isActive: boolean
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  min-width: 8rem;
`

export const TimerLabel = styled.span`
  font-size: 0.75rem;
`

export const MainContainer = styled.div`
  background-color: ${(props) => props.theme.cardBgPrimary};
  padding: 0.35rem;
  border-radius: 6px;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
`

export const PlayPauseButton = styled.div<PlayPauseButtonProps>`
  border: none;
  outline: none;
  border-radius: 9999px;
  padding: 0.35rem;
  cursor: pointer;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  transition: all 0.2s ease-in-out;

  svg {
    color: ${(props) => props.theme.textPrimary};
  }

  ${(props) =>
    props.$isActive
      ? css`
          background-color: ${(props) => props.theme.error};

          &:hover {
            background-color: ${(props) => props.theme.errorHover};
          }
        `
      : css`
          background-color: ${(props) => props.theme.enphasis};

          &:hover {
            background-color: ${(props) => props.theme.enphasisHover};
          }
        `}
`

export const TimerArea = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
`
