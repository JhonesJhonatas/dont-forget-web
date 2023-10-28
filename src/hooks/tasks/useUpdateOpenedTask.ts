import { useCallback } from 'react'

export const useUpdateOpenedTask = () => {
  const updateOpenedTask = useCallback(() => {}, [])

  return {
    updateOpenedTask,
  }
}
