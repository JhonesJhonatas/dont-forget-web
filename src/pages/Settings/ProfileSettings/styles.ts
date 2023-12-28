import styled from 'styled-components'

export const Container = styled.div`
  padding: 2rem;

  display: flex;
  flex-direction: column;
  gap: 1rem;
`

export const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`

export const Avatar = styled.div`
  img {
    max-width: 10rem;
    max-height: 10rem;
  }
`

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex-direction: 0.5rem;

  span:first-child {
    font-size: 1.5rem;
    font-weight: bold;
  }
`
