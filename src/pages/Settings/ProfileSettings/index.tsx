import { Avatar, Container, Header, UserInfo } from './styles'
import defaultProfilePic from '../../../assets/imgs/defaultProfilePic.svg'

export function ProfileSettings() {
  const userName = localStorage.getItem('name')
  const userEmail = localStorage.getItem('email')

  return (
    <Container>
      <Header>
        <Avatar>
          <img src={defaultProfilePic} alt="" />
        </Avatar>
        <UserInfo>
          <span>{userName}</span>
          <span>{userEmail}</span>
        </UserInfo>
      </Header>
      <span>ProfileSettings</span>
    </Container>
  )
}
