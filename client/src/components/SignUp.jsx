import React, { useState, useEffect } from 'react';
import { adduser } from '../api/api';
import { useNavigate } from 'react-router-dom';

import '../css/signup.css'

const SignUp = () => {
    
    const[form,setForm] = useState('');


    const navigate = useNavigate();


    const onValueChange=(e)=>{
        console.log(e.target.name,e.target.value);
        setForm({
            ...form,
            [e.target.name]:e.target.value
        })
    }

    const addRegisterData= async(e) => {
        e.preventDefault();
        await adduser(form);
        console.log(form);
        navigate('/');
    }

    useEffect(()=>{
        const auth = localStorage.getItem('user');
        if(auth)
        {
          navigate('/');
        }
      },[])



  return (
    <div className='main_div'>
      <div className='box'>
      <h1>Register</h1>
        <form onSubmit={addRegisterData}>
          <div className="input-box">
          <label htmlFor="username">Username</label>
            <input className='inputBox' name='username' type="text" placeholder='Enter UserName' onChange={onValueChange} required autoComplete='off'/>
          </div>
          
          <div className="input-box">
            <label htmlFor="email">Email</label>
            <input className='inputBox' type="text" name='email' placeholder='Enter Email' onChange={onValueChange} required autoComplete='off'/>
            
          </div>
          <div className='input-box'>
          <label htmlFor="password">Password</label>
          <input className='inputBox' type="password" name='password' placeholder='Enter Password' onChange={onValueChange} required autoComplete='off'/>
          </div>
          <div>
            <input type='submit' value="Sign Up" id='btn1' className='btnInput'/>
          </div>
          <div>
          <input type="submit" value="Login" id='btn2' onClick={()=>navigate
                ('/login')} className='btnInput'/>
          </div>

        </form>
      </div>
 

    </div>
  )
}

export default SignUp;