import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MeDocument, useLoginMutation, useMeQuery } from '../generated/graphql'
import { Loading } from '../components/Loading'

export const Login = () => {
  const { data, loading } = useMeQuery({ fetchPolicy: 'no-cache' })
  const [login] = useLoginMutation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const result = await login({
      variables: {
        email,
        password
      },
      refetchQueries: [{ query: MeDocument }]
    })
    
    if (result.data?.login?.success) {
      navigate('/')
    } else {
      setError(result.data?.login?.error?.message || 'Something went wrong')
    }
  }

  if (loading) return <Loading/>
  if (data?.me?.id) {
    navigate('/')
  }

  return (
    <>
    {error.length > 1 && <div className="error-container">{error}</div>}
    <div className='login-container'>
      <img
        src='/litter.png'
        alt='litter'
        className='logo'
        onClick={() => navigate('/')}
      />
      <form
        className='login-form'
        onSubmit={handleSubmit}
      >
        <h1>Login</h1>
        <div className='field-holder'>
          <span>{error}</span>
          <input
            type='text'
            id='email'
            className='form-input'
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
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
            onChange={e => setPassword(e.target.value)}
          />
          <label
            className='form-label'
            htmlFor='psw'
          >
            Password
          </label>
        </div>
        <div className='text-container'>
          <button
            type='submit'
            className='submit-button'
          >
            Login
          </button>
          <p className='small'>Don't have an account?</p>
          <p className='small'><Link to='/register'>Register</Link></p>
        </div>
      </form>
    </div>
    </>
  )
}
