import { useCallback } from 'react'

export const useCreateTask = () => {
  const createNewTaks = useCallback(() => {
    console.log('Hello')
  }, [])

  return {
    createNewTaks,
  }
}
