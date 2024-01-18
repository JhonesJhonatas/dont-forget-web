import { useCallback, useEffect, useState } from 'react'
import { api } from '../../lib/axios'

export interface NotificationsSchema {
  _id: string
  userId: string
  type: 'success' | 'warning' | 'error' | 'common'
  title: string
  description: string
  read: boolean
}

const useNotifications = () => {
  const [notificationsIsLoading, setNotificationsIsLoading] = useState(false)
  const [notifications, setNotifications] = useState<NotificationsSchema[]>([])

  const handleUpdateNotifications = useCallback(() => {
    setNotificationsIsLoading(true)

    api
      .get('/notifications/get-notifications')
      .then((response) => setNotifications(response.data))
      .finally(() => setNotificationsIsLoading(false))
  }, [])

  useEffect(() => {
    handleUpdateNotifications()
  }, [handleUpdateNotifications])

  return {
    notifications,
    handleUpdateNotifications,
    notificationsIsLoading,
  }
}

export { useNotifications }
