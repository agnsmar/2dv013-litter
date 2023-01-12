import React, { lazy, useState, useEffect } from 'react'

const Home = lazy(() => import('./components/home/Home')
  .then(module => ({ default: module.Home })))
const Login = lazy(() => import('./components/login/Login')
  .then(module => ({ default: module.Login })))
const Error500 =  lazy(() => import('./components/error/Error500')
  .then(module => ({ default: module.Error500 })))


export default function App () {
  const [online, setOnline] = useState(false)
  const [serverError, setServerError] = useState(null)

  useEffect(() => {
    let mounted = false
    const authenticate = async () => {

      if (mounted) {

      }
    }
    authenticate()
    return () => {
      mounted = false
    }
  }, [])

  if (serverError) {
    return <Error500 />
  } else if (online) {
    return <Home />
  } else {
    return <Login />
  }
}

