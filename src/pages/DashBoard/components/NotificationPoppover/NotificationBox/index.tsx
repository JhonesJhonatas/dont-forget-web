import { Checks } from '@phosphor-icons/react'
import { Container, Content, ReadButton, Title } from './styles'
import { NotificationsSchema } from '../../../../../hooks/user/useNotifications'
import { useCallback } from 'react'
import { useNotify } from '../../../../../hooks/useNotify'
import { api } from '../../../../../lib/axios'

interface NotificationBoxProps {
  notification: NotificationsSchema
  handleUpdateNotifications: () => void
}

export function NotificationBox({
  notification,
  handleUpdateNotifications,
}: NotificationBoxProps) {
  const { notify } = useNotify()

  const handleDeleteNotification = useCallback(async () => {
    try {
      await api.delete(`/notifications/delete-notification/${notification._id}`)
      handleUpdateNotifications()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      notify({ type: 'error', message: err.message })
    }
  }, [handleUpdateNotifications, notification._id, notify])

  return (
    <Container $type={notification.type}>
      <Content>
        <Title>{notification.title}</Title>
        <span>{notification.description}</span>
      </Content>
      <ReadButton onClick={handleDeleteNotification}>
        <Checks size={22} alt="Marcar como lida" />
      </ReadButton>
    </Container>
  )
}
