import { Form, Formik } from 'formik'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import axios from 'axios'
import Cookies from 'js-cookie'
import DotLoader from 'react-spinners/DotLoader'
import React, { useEffect, useState } from 'react'

import { saveUserInCookies } from '../../slices/userSlice'
import DateOfBirthSelect from './DateOfBirthSelect'
import GenderSelect from './GenderSelect'
import RegisterInput from '../inputs/registerinput'

const RegisterForm = ({ setVisible }) => {
  const userInfo = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    bYear: new Date().getFullYear(),
    bMonth: new Date().getMonth() + 1,
    bDay: new Date().getDate(),
    gender: '',
  }

  const [user, setUser] = useState(userInfo)
  const [dateOfBirthError, setDateOfBirthError] = useState('')
  const [genderError, setGenderError] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  let navigateTimeout = null

  const {
    first_name,
    last_name,
    email,
    password,
    bYear,
    bMonth,
    bDay,
    gender,
  } = user

  const handleRegisterChange = (e) => {
    const { name, value } = e.target

    setUser({ ...user, [name]: value })
  }

  const getDays = () => {
    return new Date(bYear, bMonth, 0).getDate()
  }

  const yearTemp = new Date().getFullYear()

  const years = Array.from(new Array(108), (val, index) => yearTemp - index)
  const months = Array.from(new Array(12), (val, index) => 1 + index)
  const days = Array.from(new Array(getDays()), (val, index) => 1 + index)

  const registerValidation = Yup.object({
    first_name: Yup.string()
      .required("What's your first name")
      .min(2, 'First name must be between 2 and 16 characters.')
      .max(16, 'First name must be between 2 and 16 characters.')
      .matches(/^[aA-zZ\s]+$/, 'Numbers and special characters not allowed'),
    last_name: Yup.string()
      .required("What's your last name")
      .min(2, 'Last name must be between 2 and 16 characters.')
      .max(16, 'Last name must be between 2 and 16 characters.')
      .matches(/^[aA-zZ\s]+$/, 'Numbers and special characters not allowed'),
    email: Yup.string()
      .required(
        "You'll need this when you log in and if you ever need to reset your password"
      )
      .email('Enter a valid email'),
    password: Yup.string()
      .required(
        'Enter a combination of atleast six numbers, letters and punctuation marks (such as ! and &) '
      )
      .min(6, 'Password must be atleast 6 characters'),
  })

  const registerSubmit = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/register`,
        {
          first_name,
          last_name,
          email,
          password,
          bYear,
          bMonth,
          bDay,
          gender,
        }
      )

      setError('')
      setSuccess(data.message)

      const { message, ...rest } = data

      navigateTimeout = setTimeout(() => {
        dispatch(saveUserInCookies(rest))

        Cookies.set('user', JSON.stringify(rest))

        navigate('/')
      }, 2000)

      // clearTimeout(navigateTimout)
    } catch (error) {
      setLoading(false)
      setSuccess('')
      setError(error.response.data.message)
    }
  }

  useEffect(() => {
    return () => {
      if (navigateTimeout) {
        clearTimeout(navigateTimeout)
      }
    }
  }, [navigateTimeout])

  return (
    <div className="blur">
      <div className="register">
        <div className="register_header">
          <i className="exit_icon" onClick={() => setVisible(false)}></i>
          <span>Sign Up</span>
          <span>Its&apos;s quick and easy</span>
        </div>

        <Formik
          enableReinitialize
          initialValues={{
            first_name,
            last_name,
            email,
            password,
            bYear,
            bMonth,
            bDay,
            gender,
          }}
          validationSchema={registerValidation}
          onSubmit={() => {
            let currentDate = new Date()
            let pickedDate = new Date(bYear, bMonth - 1, bDay)
            let atleast14 = new Date(1970 + 14, 0, 1)
            let noMoreThan70 = new Date(1970 + 70, 0, 1)

            if (currentDate - pickedDate < atleast14) {
              setDateOfBirthError(
                "It look's like you've entered the wrong info. Please make sure that you are atleast 14 years old"
              )
            } else if (currentDate - pickedDate > noMoreThan70) {
              setDateOfBirthError(
                "It look's like you've entered the wrong info. Please make sure that you are atmost 70 years old"
              )
            } else if (gender === '') {
              setDateOfBirthError('')
              setGenderError(
                'Please choose your gender. You can change who can see this later'
              )
            } else {
              setDateOfBirthError('')
              setGenderError('')

              registerSubmit()
            }
          }}
        >
          {(formik) => (
            <Form className="register_form">
              <div className="reg_line">
                <RegisterInput
                  type="text"
                  placeholder="First name"
                  name="first_name"
                  onChange={handleRegisterChange}
                />
                <RegisterInput
                  type="text"
                  placeholder="Surname"
                  name="last_name"
                  onChange={handleRegisterChange}
                />
              </div>

              <div className="reg_line">
                <RegisterInput
                  type="text"
                  placeholder="Mobile number or email"
                  name="email"
                  onChange={handleRegisterChange}
                />
              </div>
              <div className="reg_line">
                <RegisterInput
                  type="password"
                  placeholder="New Password"
                  name="password"
                  onChange={handleRegisterChange}
                />
              </div>
              <div className="reg_col">
                <div className="reg_line_header">
                  Date of birth <i className="info_icon"></i>
                </div>

                <DateOfBirthSelect
                  bDay={bDay}
                  bMonth={bMonth}
                  bYear={bYear}
                  days={days}
                  months={months}
                  years={years}
                  handleRegisterChange={handleRegisterChange}
                  dateOfBirthError={dateOfBirthError}
                />
              </div>

              <div className="reg_col">
                <div className="reg_line_header">
                  Gender <i className="info_icon"></i>
                </div>

                <GenderSelect
                  handleRegisterChange={handleRegisterChange}
                  genderError={genderError}
                />
              </div>

              <div className="reg_infos">
                By clicking Sign Up, you agree to our &nbsp;
                <span>Terms, Data Policy &nbsp;</span>
                and <span>Cookie Policy.</span> You may recieve SMS
                notifications from us and can opt out at any time.
              </div>

              <div className="reg_btn_wrapper">
                <button className="blue_btn open_signup">Sign Up</button>
              </div>
              <DotLoader
                color="#1876f2"
                loading={loading}
                size={30}
                aria-label="Loading Spinner"
                data-testid="loader"
              />

              {error && <div className="error_text">{error}</div>}
              {success && <div className="success_text">{success}</div>}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default RegisterForm
