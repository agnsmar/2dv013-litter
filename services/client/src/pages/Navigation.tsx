import { useNavigate } from 'react-router'
import { useLogoutMutation, useMeQuery } from '../generated/graphql'
import { Loading } from '../components/Loading'
import { useContext } from 'react'
import { ClientContext } from '../main'
import { Link } from 'react-router-dom'

export const Navigation = () => {
  const client = useContext(ClientContext)
  const navigate = useNavigate()
  const { data: onlineUser, loading: isMeLoading } = useMeQuery({ fetchPolicy: 'no-cache' })
  const [logout] = useLogoutMutation()

  const handleLogout = async () => {
    await logout()
    await client.resetStore()
    navigate('/login')
  }

  return (
    <div className='nav-container'>
      <div className='header'>
        <Link to='/'>
          <img
            src='/litter.png'
            alt='litter'
            className='logo'
          />{' '}
        </Link>
      </div>
      <div className='link-container'>
        <Link
          className='link-item'
          to='/'
        >
          Home
        </Link>
        {isMeLoading ? <Loading/> : onlineUser?.me ? (
          <>
            <Link
              className='link-item'
              to={`/profile/${onlineUser.me?.id}`}
            >
              Profile
            </Link>
            <span
              className='link-item'
              onClick={handleLogout}
            >
              Logout
            </span>
          </>
        ) : (
          <Link
            className='link-item'
            to='/login'
          >
            Login
          </Link>
        )}
      </div>
    </div>
  )
}
