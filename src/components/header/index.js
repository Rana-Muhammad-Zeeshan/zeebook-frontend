import { Link } from 'react-router-dom'
import React from 'react'
import { useSelector } from 'react-redux'

import {
  ArrowDown,
  Friends,
  Gaming,
  HomeActive,
  Logo,
  Market,
  Menu,
  Messenger,
  Notifications,
  Watch,
} from '../../svg'
import { Search } from '../../svg'

import './style.css'

const Header = () => {
  const user = useSelector((state) => ({ ...state.user.value.payload }))

  const color = '#65676b'
  return (
    <header>
      <div className="header_left">
        <Link to={'/'} className="header_logo">
          <div className="circle">
            <Logo />
          </div>
        </Link>

        <div className="search search1">
          <Search color={color} />
          <input
            type="text"
            placeholder="Search Facebook"
            className="hide_input"
          />
        </div>
      </div>

      <div className="header_middle">
        <Link className="middle_icon active">
          <HomeActive />
        </Link>
        <Link className="middle_icon hover1">
          <Friends color={color} />
        </Link>
        <Link className="middle_icon hover1">
          <Watch color={color} />
          <div className="middle_notification">9+</div>
        </Link>
        <Link className="middle_icon hover1">
          <Market color={color} />
        </Link>
        <Link className="middle_icon hover1">
          <Gaming color={color} />
        </Link>
      </div>

      <div className="header_right">
        <Link to="/profile" className="profile_link hover1">
          <img src={user?.picture} alt="user profile" />
          <span>{user?.first_name}</span>
        </Link>

        <div className="circle_icon hover1">
          <Menu />
        </div>
        <div className="circle_icon hover1">
          <Messenger />
        </div>
        <div className="circle_icon hover1">
          <Notifications />
          <div className="right_notification">8</div>
        </div>
        <div className="circle_icon hover1">
          <ArrowDown />
        </div>
      </div>
    </header>
  )
}

export default Header
