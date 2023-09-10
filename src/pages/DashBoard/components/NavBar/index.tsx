import { SignOut } from '@phosphor-icons/react'
import { Container, LogOut, ProfilePic, Title } from './styles'

export function NavBar() {
  return (
    <Container>
      <ProfilePic>
        <img src="https://github.com/jhonesjhonatas.png" alt="myPhoto" />
      </ProfilePic>

      <Title>Dont Forget</Title>

      <LogOut>
        <SignOut />
      </LogOut>
    </Container>
  )
}
