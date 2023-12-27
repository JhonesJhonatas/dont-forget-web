import hexToRgba from 'hex-to-rgba'
import styled, { css } from 'styled-components'

interface NavigationItemProps {
  isActive: boolean
}

export const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${(props) => hexToRgba(props.theme.cardBgSecondary, 0.6)};
  border-radius: 6px;
  padding: 2rem;
  overflow: hidden;
`

export const Navigation = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem;

  border-bottom: 1px solid ${(props) => props.theme.cardBgPrimary};
`

export const NavigationItem = styled.div<NavigationItemProps>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem;

  cursor: pointer;

  ${(props) =>
    props.isActive
      ? css`
          border-bottom: 2px solid ${(props) => props.theme.enphasis};
        `
      : null}
`
