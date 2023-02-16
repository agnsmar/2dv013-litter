import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MeDocument, useRegisterMutation, useMeQuery } from '../generated/graphql'
import { Loading } from '../components/Loading'

export const Register = () => {
  const { data, loading } = useMeQuery({ fetchPolicy: 'no-cache' })
  const [register] = useRegisterMutation()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confPassword, setConfPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (password !== confPassword) {
      setError('Password needs to match')
    } else {
      const result = await register({
        variables: {
          username,
          email,
          password
        },
        refetchQueries: [{ query: MeDocument }]
      })

      if (result.data?.register?.success) {
        navigate('/login')
      } else {
        setError(result.data?.register?.error?.message || 'Something went wrong')
      }
    }
  }

  if (loading) return <Loading/>
  if (data?.me?.id) {
    navigate('/')
  } 

  return (
    <>
    {error.length > 1 && <div className="error-container">{error}</div>}
    <div className='register-container'>
      <img
        src='/litter.png'
        alt='litter'
        className='logo'
        onClick={() => navigate('/')}
      />
      <form
        className='register-form'
        onSubmit={handleSubmit}
      >
        <h1>Register new user</h1>
        <div className='field-holder'>
          <input
            type='text'
            id='username'
            className='form-input'
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label
            className='form-label'
            htmlFor='username'
          >
            Username
          </label>
        </div>
        <div className='field-holder'>
          <input
            type='text'
            id='email'
            className='form-input'
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label
            className='form-label'
            htmlFor='email'
          >
            Email address
          </label>
        </div>
        <div className='field-holder'>
          <input
            type='password'
            id='psw'
            className='form-input'
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label
            className='form-label'
            htmlFor='psw'
          >
            Password
          </label>
        </div>
        <div className='field-holder'>
          <input
            type='password'
            id='psw'
            className='form-input'
            required
            value={confPassword}
            onChange={(e) => setConfPassword(e.target.value)}
          />
          <label
            className='form-label'
            htmlFor='psw'
          >
            Confirm password
          </label>
        </div>
        <div className='text-container'>
          <button
            type='submit'
            className='submit-button'
          >
            register
          </button>
          <p className='small'>Already have an account?</p>
          <p>
            <Link to='/login'>Login</Link>
          </p>
        </div>
      </form>
    </div>
    </>
  )
}
