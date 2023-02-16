import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Error500 } from '../pages/Error500'
import { Home } from '../pages/Home'
import { Login } from '../pages/Login'
import { Register } from '../pages/Register'
import { Profile } from '../pages/Profile'
import { Error404 } from '../pages/Error404'

export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route
          path='/'
          element={<Home />}
        />
        <Route
          path='/error-404'
          element={<Error404 />}
        />

        <Route
          path='/error-500'
          element={<Error500 />}
        />
        <Route
          path='/login'
          element={<Login />}
        />
        <Route
          path='/register'
          element={<Register />}
        />
        <Route
          path='/profile/:id'
          element={<Profile />}
        />
      </Routes>
    </Router>
  )
}
