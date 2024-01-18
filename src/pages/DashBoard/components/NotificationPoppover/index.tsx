import { BellSlash } from '@phosphor-icons/react'
import * as Poppover from '@radix-ui/react-popover'
import { NoNotificationsMessage, PoppoverContent } from './styles'
import { useMemo } from 'react'
import { NotificationBox } from './NotificationBox'
import { NotificationsSchema } from '../../../../hooks/notifications/useNotifications'

interface NotificationPoppoverProps {
  notifications: NotificationsSchema[]
  handleUpdateNotifications: () => void
}

export function NotificationPoppover({
  notifications,
  handleUpdateNotifications,
}: NotificationPoppoverProps) {
  const whatShowInContent = useMemo(() => {
    if (notifications.length > 0) {
      return (
        <PoppoverContent>
          {notifications.map((notification) => {
            return (
              <NotificationBox
                key={notification._id}
                notification={notification}
                handleUpdateNotifications={handleUpdateNotifications}
              />
            )
          })}
        </PoppoverContent>
      )
    }
    return (
      <NoNotificationsMessage>
        <BellSlash size={40} />
        <span>Você não possui nenhuma notificação.</span>
      </NoNotificationsMessage>
    )
  }, [handleUpdateNotifications, notifications])

  return <Poppover.Portal>{whatShowInContent}</Poppover.Portal>
}
