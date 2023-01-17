import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Error500 } from '../pages/Error500'
import { Home } from '../pages/Home'
import { Login } from '../pages/Login'

export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/error-500" element={<Error500 />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  )
}