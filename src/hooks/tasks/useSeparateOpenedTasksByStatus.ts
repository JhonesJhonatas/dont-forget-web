import { useEffect, useState } from 'react'
import { OpenedTask } from './useGetAllOpenedTasks'

export const useSeparateOpenedTasksByStatus = (tasks: OpenedTask[]) => {
  const [toDoTasks, setToDoTasks] = useState<OpenedTask[]>([])
  const [standByTasks, setStandByTasks] = useState<OpenedTask[]>([])
  const [inProgressTasks, setInProgressTasks] = useState<OpenedTask[]>([])
  const [approvalTasks, setApprovalTasks] = useState<OpenedTask[]>([])
  const [paymentTasks, setPaymentTasks] = useState<OpenedTask[]>([])
  const [concludedTasks, setConcludedTasks] = useState<OpenedTask[]>([])

  useEffect(() => {
    const filteredTasks = tasks.filter((task) => task.status === 'toDo')

    setToDoTasks(filteredTasks)
  }, [tasks])

  useEffect(() => {
    const filteredTasks = tasks.filter((task) => task.status === 'standby')

    setStandByTasks(filteredTasks)
  }, [tasks])

  useEffect(() => {
    const filteredTasks = tasks.filter((task) => task.status === 'inProgress')

    setInProgressTasks(filteredTasks)
  }, [tasks])

  useEffect(() => {
    const filteredTasks = tasks.filter((task) => task.status === 'approval')

    setApprovalTasks(filteredTasks)
  }, [tasks])

  useEffect(() => {
    const filteredTasks = tasks.filter((task) => task.status === 'payment')

    setPaymentTasks(filteredTasks)
  }, [tasks])

  useEffect(() => {
    const filteredTasks = tasks.filter((task) => task.status === 'concluded')

    setConcludedTasks(filteredTasks)
  }, [tasks])

  return {
    toDoTasks,
    standByTasks,
    inProgressTasks,
    approvalTasks,
    paymentTasks,
    concludedTasks,
  }
}
