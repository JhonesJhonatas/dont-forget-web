import { useState } from 'react'
import { Container, Navigation, NavigationItem } from './styles'
import { User } from '@phosphor-icons/react'

type CurrentNavigationItem = 'profile'

export function Settings() {
  const [currentNavigationItem, setCurrentNavigationItem] =
    useState<CurrentNavigationItem>('profile')

  return (
    <Container>
      <Navigation>
        <NavigationItem isActive={currentNavigationItem === 'profile'}>
          <User />
          <span>Usuário</span>
        </NavigationItem>
      </Navigation>
    </Container>
  )
}
