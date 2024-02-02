import hexToRgba from 'hex-to-rgba'
import styled, { css } from 'styled-components'

interface PlayPauseButtonProps {
  $isActive: boolean
}

interface DropDownContentProps {
  $isOpen: boolean
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

export const DropDownTrigger = styled.div`
  cursor: pointer;
`

export const DropDownContent = styled.div<DropDownContentProps>`
  background-color: ${(props) => props.theme.cardBgPrimary};
  box-shadow: 5px 5px 10px ${(props) => hexToRgba(props.theme.background, 0.4)};
  width: 16rem;
  margin-top: 4rem;
  border-radius: 6px;
  padding: 0.75rem;
  font-size: 0.75rem;

  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  ${(props) =>
    props.$isOpen
      ? css`
          display: flex;
          position: absolute;
          z-index: 1;
        `
      : css`
          display: none;
        `}
`

export const CycleArea = styled.div`
  width: 100%;
  background-color: ${(props) => hexToRgba(props.theme.borderCard, 0.4)};
  padding: 0.25rem 0.5rem;
  border-radius: 6px;

  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const FlexArea = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`

export const DeleteStopWatchButton = styled.div`
  cursor: pointer;
  color: ${(props) => props.theme.textPrimary};
  background-color: ${(props) => props.theme.error};
  padding: 0.25rem;
  border-radius: 6px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: ${(props) => props.theme.errorHover};
  }
`
