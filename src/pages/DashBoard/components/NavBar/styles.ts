import styled from 'styled-components'

export const Container = styled.nav`
  padding: 1rem 0 0;

  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const ProfilePic = styled.div`
  img {
    max-width: 2.5rem;
    max-height: 2.5rem;
    border-radius: 100px;
    cursor: pointer;
  }
`

export const Title = styled.span`
  font-size: 1.5rem;
  font-weight: bold;
`

export const OptionsWithIcons = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;

  svg {
    width: 1.75rem;
    height: 1.75rem;
    cursor: pointer;
  }
`
