import { useLogoutMutation, useMeQuery } from '../generated/graphql'

export const Navigation = () => {
  const { data: onlineUser, loading: isMeLoading } = useMeQuery({ fetchPolicy: 'no-cache'})
  const [logout] = useLogoutMutation()
  
  return ( 
    <div className="nav-container">
      <div className="header">
        <a href="/"><img
          src='/litter.png'
          alt='litter'
          className='logo'
        /> </a>
      </div>
      <div className="link-container">
        <a className="link-item" href="/">Home</a>
        {isMeLoading ? <div className="loading">Loading...</div> : 
        onlineUser ? (
          <>
            <a className="link-item" href={`/profile/${onlineUser.me?.id}`}>Profile</a>
            <a className="link-item" onClick={() => logout()} href="/login">Logout</a>
          </>
        ) : <a className="link-item" href="/login">Login</a>
        }
      </div>
    </div>
  )
}
