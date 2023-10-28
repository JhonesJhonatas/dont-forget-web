import { useCallback } from 'react'
import { toast } from 'react-toastify'

interface NotifyParams {
  type: 'sucess' | 'error'
  message: string
}

export const useNotify = () => {
  const notify = useCallback(({ message, type }: NotifyParams) => {
    if (type === 'sucess') {
      toast.success(message)
    }
    if (type === 'error') {
      toast.error(message)
    }
  }, [])

  return {
    notify,
  }
}
