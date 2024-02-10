import hexToRgba from 'hex-to-rgba'
import styled, { css } from 'styled-components'

interface PriorityProps {
  $level: string
}

interface StatusProps {
  $status: string
}

interface DropDownBoxProps {
  $isOpen: boolean
}

export const Container = styled.div`
  width: 100%;
  min-height: 6.5rem;
  background-color: ${(props) => props.theme.cardBgSecondary};
  border: 1px solid ${(props) => props.theme.borderCard};
  border-radius: 6px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  &:hover {
    background-color: ${(props) => hexToRgba(props.theme.cardBgPrimary, 0.5)};
  }
`

export const ProjectInformations = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.2rem;

  span {
    font-size: 0.75rem;
    color: ${(props) => props.theme.textSecondary};

    display: flex;
    align-items: center;
    gap: 0.2rem;
  }

  svg {
    color: ${(props) => props.theme.textSecondary};

    transition: all 0.2s ease-in-out;

    &:hover {
      color: ${(props) => props.theme.textPrimary};
    }
  }
`

export const CardHeader = styled.header`
  display: flex;
  align-items: start;
  justify-content: space-between;
`

export const CardTitle = styled.span`
  font-size: 0.85rem;
  font-weight: 300;
  width: 100%;
  text-overflow: ellipsis;
`

export const CardElements = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`

export const Status = styled.div<StatusProps>`
  padding: 0.2rem;
  border-radius: 999px;
  background-color: ${(props) => props.theme.cardBgPrimary};
  display: flex;
  align-items: center;
  gap: 0.35rem;

  svg {
    ${(props) =>
      props.$status === 'toDo' &&
      css`
        color: ${props.theme.opened};
      `}

    ${(props) =>
      props.$status === 'standby' &&
      css`
        color: ${props.theme.stand_by};
      `}

      ${(props) =>
      props.$status === 'inProgress' &&
      css`
        color: ${props.theme.in_progress};
      `}

      ${(props) =>
      props.$status === 'approval' &&
      css`
        color: ${props.theme.approval};
      `}

      ${(props) =>
      props.$status === 'payment' &&
      css`
        color: ${props.theme.payment};
      `}

      ${(props) =>
      props.$status === 'concluded' &&
      css`
        color: ${props.theme.concluded};
      `}
  }
`

export const Priority = styled.div<PriorityProps>`
  padding: 0.2rem;
  border-radius: 999px;
  background-color: ${(props) => props.theme.cardBgPrimary};
  display: flex;
  align-items: center;
  gap: 0.35rem;

  svg {
    color: ${(props) => props.theme.textSecondary};
  }

  ${(props) =>
    props.$level === 'low' &&
    css`
      svg {
        color: ${props.theme.sucess};
      }
    `}

  ${(props) =>
    props.$level === 'normal' &&
    css`
      svg {
        color: ${props.theme.enphasis};
      }
    `}

  ${(props) =>
    props.$level === 'high' &&
    css`
      svg {
        color: ${props.theme.danger};
      }
    `}

    ${(props) =>
    props.$level === 'urgent' &&
    css`
      svg {
        color: ${props.theme.error};
      }
    `}
`

export const Maturity = styled.div`
  background-color: ${(props) => props.theme.cardBgPrimary};
  width: fit-content;
  padding: 0.2rem 0.75rem;
  border-radius: 6px;

  display: flex;
  align-items: center;
  gap: 0.35rem;

  svg {
    color: ${(props) => props.theme.danger};
  }

  span {
    font-size: 0.55rem;
  }
`

export const CustomDropDown = styled.div<DropDownBoxProps>`
  background-color: ${(props) => props.theme.cardBgPrimary};
  border: 1px solid ${(props) => props.theme.borderCard};
  box-shadow: 2px 2px 4px 2px rgba(0, 0, 0, 0.2);
  display: none;
  position: absolute;
  padding: 0.35rem;
  margin-top: 1.5rem;
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

interface PriorityOptionProps {
  $priority: string
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
