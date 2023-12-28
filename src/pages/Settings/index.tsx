import { useCallback, useMemo, useState } from 'react'
import { Container, MainContainer, Navigation, NavigationItem } from './styles'
import { User } from '@phosphor-icons/react'
import { ProfileSettings } from './ProfileSettings'

type CurrentNavigationItem = 'profile'

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
      </Navigation>
      <MainContainer>
        {whatShowInMainContent[currentNavigationItem]}
      </MainContainer>
    </Container>
  )
}
