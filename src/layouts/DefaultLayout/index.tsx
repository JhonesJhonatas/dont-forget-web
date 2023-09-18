import { Outlet } from 'react-router-dom'
import { NavBar } from '../../components/NavBar'
import { Aside, Container, MainContainer } from './styles'

export function DefaulLayout() {
  return (
    <Container>
      <Aside>
        <NavBar />
      </Aside>
      <MainContainer>
        <Outlet />
      </MainContainer>
    </Container>
  )
}
