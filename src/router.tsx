import { Route, Routes } from 'react-router-dom'
import { AllTasks } from './pages/AllTasks'
import { DefaulLayout } from './layouts/DefaultLayout'
import { DashBoard } from './pages/DashBoard'
import { Settings } from './pages/Settings'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<DefaulLayout />}>
        <Route path="/" element={<DashBoard />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/all-tasks" element={<AllTasks />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
    </Routes>
  )
}
