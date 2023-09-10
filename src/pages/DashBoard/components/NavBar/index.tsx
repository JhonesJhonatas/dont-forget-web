import { Gear, SignOut } from '@phosphor-icons/react'
import { Container, OptionsWithIcons, ProfilePic, Title } from './styles'

export function NavBar() {
  return (
    <Container>
      <ProfilePic>
        <img src="https://github.com/jhonesjhonatas.png" alt="myPhoto" />
      </ProfilePic>

      <Title>Dont Forget</Title>

      <OptionsWithIcons>
        <Gear />
        <SignOut />
      </OptionsWithIcons>
    </Container>
  )
}
