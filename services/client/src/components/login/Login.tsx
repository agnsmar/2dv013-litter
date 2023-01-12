import React from 'react'

export const Login: React.FC = () => (
    <div className='login-container'>
        <img src='/litter.png' alt='litter' className='logo'/>
        <form className='login-form'>
            <h1>Login</h1>
            <div className='field-holder'>
                <input type='text' id='email' className='form-input' required/>
                <label className='form-label' htmlFor='email'>Email address</label>
            </div>
            <div className='field-holder'>
                <input type='password' id='psw' className='form-input' required/>
                <label className='form-label' htmlFor='psw'>Password</label>
            </div>
            <div className='text-container'>
                <button type='submit' className='submit-button'>Login</button>
                <p className="small">
                    Don't have an account?
                    <a href="#" className="register">Register</a>
                </p>
            </div>

        </form>
    </div>
)

export default Login