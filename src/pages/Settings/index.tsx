import { useCallback, useMemo, useState } from 'react'
import { Container, MainContainer, Navigation, NavigationItem } from './styles'
import { Shield, User } from '@phosphor-icons/react'
import { ProfileSettings } from './ProfileSettings'
import { SecuritySettings } from './SecuritySettings'

type CurrentNavigationItem = 'profile' | 'security'

export function Settings() {
  const [currentNavigationItem, setCurrentNavigationItem] =
    useState<CurrentNavigationItem>('profile')

  const handleSelectNavigationItem = useCallback(
    (item: CurrentNavigationItem) => {
      setCurrentNavigationItem(item)
    },
    [],
  )

  const whatShowInMainContent = useMemo(() => {
    return {
      profile: <ProfileSettings />,
      security: <SecuritySettings />,
    }
  }, [])

  return (
    <Container>
      <Navigation>
        <NavigationItem
          isActive={currentNavigationItem === 'profile'}
          onClick={() => handleSelectNavigationItem('profile')}
        >
          <User />
          <span>Usuário</span>
        </NavigationItem>
        <NavigationItem
          isActive={currentNavigationItem === 'security'}
          onClick={() => handleSelectNavigationItem('security')}
        >
          <Shield />
          <span>Segurança</span>
        </NavigationItem>
      </Navigation>
      <MainContainer>
        {whatShowInMainContent[currentNavigationItem]}
      </MainContainer>
    </Container>
  )
}
