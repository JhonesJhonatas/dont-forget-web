import hexToRgba from 'hex-to-rgba'
import styled, { css } from 'styled-components'

interface ContainerProps {
  $type: 'success' | 'warning' | 'error' | 'common'
}

export const Container = styled.div<ContainerProps>`
  max-width: 30rem;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  justify-content: space-between;
  padding: 0.75rem;
  border-radius: 6px;
  border: 2px solid ${(props) => props.theme.borderCard};
  background-color: ${(props) => hexToRgba(props.theme.borderCard, 0.1)};

  transition: all 0.2s ease-in-out;

  ${(props) =>
    props.$type === 'success' &&
    css`
      border: 2px solid ${props.theme.sucess};
      background-color: ${(props) => hexToRgba(props.theme.sucess, 0.1)};
    `}

  ${(props) =>
    props.$type === 'warning' &&
    css`
      border: 2px solid ${props.theme.danger};
      background-color: ${(props) => hexToRgba(props.theme.danger, 0.1)};
    `}

    ${(props) =>
    props.$type === 'error' &&
    css`
      border: 2px solid ${props.theme.error};
      background-color: ${(props) => hexToRgba(props.theme.error, 0.1)};
    `}
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: start;
`

export const Title = styled.p`
  font-size: 1rem;
  font-weight: bold;
  line-height: 19px;
`

export const ReadButton = styled.div`
  cursor: pointer;

  transition: all 0.2s ease-in-out;

  &:hover {
    transform: scale(1.1);
    color: ${(props) => props.theme.sucess};
  }
`
