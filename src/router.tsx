import { Route, Routes } from 'react-router-dom'
import { DashBoard } from './pages/DashBoard'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<DashBoard />} />
    </Routes>
  )
}
