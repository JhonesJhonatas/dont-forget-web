import { useCallback, useEffect, useState } from 'react'
import { api } from '../../../lib/axios'

interface StopWatchSchema {
  _id: string
  taskId: string
  startDate: string
  endDate?: string
  isActive: boolean
}

const useStopWatchs = (idTask: string) => {
  const [stopWatchList, setStopWatchList] = useState<StopWatchSchema[]>([])
  const [onlyCompleteStopWatches, setOnlyCompleteStopWatches] = useState<
    StopWatchSchema[]
  >([])
  const [activeStopWatch, setActiveStopWatch] = useState<StopWatchSchema>()

  const handleUpdateStopWatchList = useCallback(async () => {
    try {
      const listOfStopWatchs = await api.get(
        `/tasks/get-stopwatch-by-task-id/${idTask}`,
      )

      setStopWatchList(listOfStopWatchs.data)
    } catch (err) {
      console.log(err)
    }
  }, [idTask])

  useEffect(() => {
    handleUpdateStopWatchList()
  }, [handleUpdateStopWatchList])

  useEffect(() => {
    const activeStopWatch = stopWatchList.find((stopWatch) => {
      return stopWatch.isActive === true
    })

    if (!activeStopWatch) {
      return
    }

    setActiveStopWatch(activeStopWatch)
  }, [stopWatchList])

  useEffect(() => {
    const completeStopWatchesList = stopWatchList.filter(
      (stopWatch) => stopWatch.isActive === false,
    )

    setOnlyCompleteStopWatches(completeStopWatchesList)
  }, [stopWatchList])

  return {
    stopWatchList,
    activeStopWatch,
    handleUpdateStopWatchList,
    onlyCompleteStopWatches,
  }
}

export { useStopWatchs }
