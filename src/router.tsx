import { Route, Routes } from 'react-router-dom'
import { AllTasks } from './pages/AllTasks'
import { DefaulLayout } from './layouts/DefaultLayout'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<DefaulLayout />}>
        <Route path="/all-tasks" element={<AllTasks />} />
      </Route>
    </Routes>
  )
}
