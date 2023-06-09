import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import '../css/Navbar.css'

const Navbar = () => {

  const auth = localStorage.getItem('user');
  const navigate = useNavigate();
  const logout=()=>{
    localStorage.clear();
    navigate('/SignUp')
  }

  return (
    <>
    <header className='header'>
    <h1 className="logo"><NavLink to='/'>Meal-Tracker</NavLink></h1>
      { auth ? <ul className="main-nav">
                <li><NavLink className='addmeal-btn1 addtbtn' to='/'>Home</NavLink></li>
                <li><NavLink className='addmeal-btn2' to='/Addmeal'>Add meal</NavLink></li>
                <li><NavLink className='addmeal-btn3' onClick={logout} to='/SignUp'>Logout({JSON.parse(auth).username})</NavLink></li>
              </ul> 
                : 
              <ul className='main-nav'>
               <li><NavLink className='addmeal-btn4' to='/SignUp'>Sign Up</NavLink></li>
               <li><NavLink  className='addmeal-btn5'to='/login'>Login</NavLink></li>
             </ul>
        }
    </header>
    </>
  )
}

export default Navbar;