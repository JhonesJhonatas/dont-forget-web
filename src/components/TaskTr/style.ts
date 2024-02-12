import hexToRgba from 'hex-to-rgba'
import styled, { css } from 'styled-components'

interface StatusContainerProps {
  $status: string
}

interface PriorityContainer {
  $priority: string
}

export const TaskItem = styled.div`
  width: 100%;
  min-height: fit-content;
  background-color: ${(props) => props.theme.cardBgSecondary};
  border: 1px solid ${(props) => props.theme.borderCard};
  border-radius: 6px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  display: flex;
  gap: 0.75rem;

  &:hover {
    background-color: ${(props) => hexToRgba(props.theme.cardBgPrimary, 0.5)};
  }
`

export const DescriptionContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  gap: 0.5rem;
`

export const StatusContainer = styled.div<StatusContainerProps>`
  width: fit-content;
  padding: 0.5rem;
  border-radius: 6px;
  font-size: 0.65rem;
  background-color: ${(props) => props.theme.cardBgPrimary};

  display: flex;
  align-items: center;
  gap: 0.25rem;

  ${(props) =>
    props.$status === 'toDo' &&
    css`
      div {
        width: 0.75rem;
        height: 0.75rem;
        border-radius: 60px;
        background-color: ${(props) => props.theme.opened};
      }
    `}

  ${(props) =>
    props.$status === 'standby' &&
    css`
      div {
        width: 0.75rem;
        height: 0.75rem;
        border-radius: 60px;
        background-color: ${(props) => props.theme.stand_by};
      }
    `}

    ${(props) =>
    props.$status === 'inProgress' &&
    css`
      div {
        width: 0.75rem;
        height: 0.75rem;
        border-radius: 60px;
        background-color: ${(props) => props.theme.in_progress};
      }
    `}

    ${(props) =>
    props.$status === 'approval' &&
    css`
      div {
        width: 0.75rem;
        height: 0.75rem;
        border-radius: 60px;
        background-color: ${(props) => props.theme.approval};
      }
    `}

    ${(props) =>
    props.$status === 'payment' &&
    css`
      div {
        width: 0.75rem;
        height: 0.75rem;
        border-radius: 60px;
        background-color: ${(props) => props.theme.payment};
      }
    `}

    ${(props) =>
    props.$status === 'concluded' &&
    css`
      div {
        width: 0.75rem;
        height: 0.75rem;
        border-radius: 60px;
        background-color: ${(props) => props.theme.concluded};
      }
    `}
`

export const MaturityContainer = styled.div`
  width: fit-content;
  padding: 0.5rem;
  border-radius: 6px;
  font-size: 0.65rem;
  background-color: ${(props) => props.theme.cardBgPrimary};

  display: flex;
  align-items: center;
  gap: 0.25rem;

  svg {
    width: 1rem;
    height: 1rem;
    color: ${(props) => props.theme.danger};
  }
`

export const PriorityContainer = styled.div<PriorityContainer>`
  width: fit-content;
  padding: 0.5rem;
  border-radius: 6px;
  font-size: 0.65rem;
  background-color: ${(props) => props.theme.cardBgPrimary};

  display: flex;
  align-items: center;
  gap: 0.25rem;

  svg {
    width: 1rem;
    height: 1rem;
    ${(props) =>
      props.$priority === 'low' &&
      css`
        color: ${(props) => props.theme.sucess};
      `}

    ${(props) =>
      props.$priority === 'normal' &&
      css`
        color: ${(props) => props.theme.enphasis};
      `}

    ${(props) =>
      props.$priority === 'high' &&
      css`
        color: ${(props) => props.theme.danger};
      `}

      ${(props) =>
      props.$priority === 'urgent' &&
      css`
        color: ${(props) => props.theme.error};
      `}
  }
`

interface DropDownBoxProps {
  $isOpen: boolean
}

export const CustomDropDown = styled.div<DropDownBoxProps>`
  background-color: ${(props) => props.theme.cardBgPrimary};
  border: 1px solid ${(props) => props.theme.borderCard};
  box-shadow: 2px 2px 4px 2px rgba(0, 0, 0, 0.2);
  display: none;
  position: absolute;
  padding: 0.35rem;
  margin-top: 0.25rem;
  border-radius: 6px;

  flex-direction: column;
  gap: 0.35rem;

  ${(props) =>
    props.$isOpen &&
    css`
      display: flex;
    `}
`

interface StatusOptionProps {
  $status: string
  $isActive: boolean
}

export const StatusOption = styled.div<StatusOptionProps>`
  font-size: 0.65rem;
  background-color: ${(props) => hexToRgba(props.theme.borderCard, 0.3)};
  border-radius: 6px;
  padding: 0 0.25rem;

  display: flex;
  align-items: center;
  gap: 0.25rem;

  transition: all 0.2s ease-in-out;

  svg {
    ${(props) =>
      props.$status === 'toDo' &&
      css`
        color: ${(props) => props.theme.opened};
      `}

    ${(props) =>
      props.$status === 'standby' &&
      css`
        color: ${(props) => props.theme.stand_by};
      `}

    ${(props) =>
      props.$status === 'inProgress' &&
      css`
        color: ${(props) => props.theme.in_progress};
      `}

      ${(props) =>
      props.$status === 'approval' &&
      css`
        color: ${(props) => props.theme.approval};
      `}

    ${(props) =>
      props.$status === 'payment' &&
      css`
        color: ${(props) => props.theme.payment};
      `}

      ${(props) =>
      props.$status === 'concluded' &&
      css`
        color: ${(props) => props.theme.concluded};
      `}
  }

  ${(props) =>
    props.$isActive
      ? css`
          background-color: ${(props) => props.theme.enphasis};
        `
      : css`
          &:hover {
            background-color: ${(props) =>
              hexToRgba(props.theme.borderCard, 0.8)};
          }
        `}
`

interface PriorityOptionProps {
  $priority: string
  $isActive: boolean
}

export const PriorityOption = styled.div<PriorityOptionProps>`
  font-size: 0.65rem;
  background-color: ${(props) => hexToRgba(props.theme.borderCard, 0.2)};
  border-radius: 6px;
  padding: 0 0.25rem;

  display: flex;
  align-items: center;
  gap: 0.25rem;

  transition: all 0.2s ease-in-out;

  svg {
    ${(props) =>
      props.$priority === 'low' &&
      css`
        color: ${(props) => props.theme.sucess};
      `}

    ${(props) =>
      props.$priority === 'normal' &&
      css`
        color: ${(props) => props.theme.enphasis};
      `}

    ${(props) =>
      props.$priority === 'high' &&
      css`
        color: ${(props) => props.theme.danger};
      `}

      ${(props) =>
      props.$priority === 'urgent' &&
      css`
        color: ${(props) => props.theme.error};
      `}
  }

  ${(props) =>
    props.$isActive
      ? css`
          background-color: ${(props) => props.theme.enphasis};
        `
      : css`
          &:hover {
            background-color: ${(props) =>
              hexToRgba(props.theme.borderCard, 0.8)};
          }
        `}
`
