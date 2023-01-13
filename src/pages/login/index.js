import { Form, Formik } from 'formik'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import LoginInput from '../../components/inputs/logininput'

import './style.css'

const loginInfo = {
  email: '',
  password: '',
}

const Login = () => {
  const [login, setLogin] = useState(loginInfo)
  const { email, password } = login

  const handleLoginChange = (e) => {
    const { name, value } = e.target
    setLogin({ ...login, [name]: value })
  }

  return (
    <div className="login">
      <div className="login_wrapper">
        <div className="login_wrap">
          <div className="login_1">
            <img src="../../icons/facebook.svg" alt="zeebook" />
            <span>
              Zeebook helps you connect and share with the people in your life
            </span>
          </div>

          <div className="login_2">
            <div className="login_2_wrap">
              <Formik
                enableReinitialize
                initialValues={{
                  email,
                  password,
                }}
              >
                {(formik) => (
                  <Form>
                    <LoginInput
                      type="email"
                      name="email"
                      placeholder={'Email address or phone number'}
                      onChange={handleLoginChange}
                    />
                    <LoginInput
                      type="password"
                      name="password"
                      placeholder={'Password'}
                      onChange={handleLoginChange}
                    />
                    <button type="submit" className="blue_btn">
                      Log In
                    </button>
                  </Form>
                )}
              </Formik>

              <Link to={'/forgot'} className="forgot_password">
                Forgotten password?
              </Link>
              <div className="sign_splitter"></div>
              <button className="blue_btn open_signup">Create Account</button>
            </div>

            <Link to={'/'} className="sign_extra">
              <strong>Create a page</strong>
              &nbsp; for a celebrity, brand or business.
            </Link>
          </div>
        </div>

        <div className="register"></div>
      </div>
    </div>
  )
}

export default Login
