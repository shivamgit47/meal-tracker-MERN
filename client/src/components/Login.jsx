import React, { useState, useEffect} from 'react';
import { userlogin } from '../api/api';
import { useNavigate } from 'react-router-dom';
import '../css/signup.css'

const Login = () => {
    
    const[form,setForm] = useState('');


    const navigate = useNavigate();


    const onValueChange=(e)=>{
        console.log(e.target.name,e.target.value);
        setForm({
            ...form,
            [e.target.name]:e.target.value
        })
    }

    const addLoginData= async(e) => {
        e.preventDefault();
        const res=await userlogin(form);
        console.log(form);
        console.log(res.data.user);
        navigate('/');
    }

    useEffect(()=>{
        const auth = localStorage.getItem('user');
        if(auth)
        {
          navigate('/');
        }
      })

    

  return (
    <div className='main-div'>
      <div className='box'>
      <h1>Login Page</h1>
        <form onSubmit={addLoginData}>
          <div className="input-box">
            <input className='inputBox' type="text" name='email' placeholder='Enter Email' onChange={onValueChange} required autoComplete='off'/>
          <label htmlFor="email">Email</label>

          </div>
          <div className="input-box">
          <input className='inputBox' type="password" name='password' placeholder='Enter Password' onChange={onValueChange} required autoComplete='off'/>
          <label htmlFor="password">Password</label>

          </div>
          <div>
            <input type='submit' id='btn3' value="Login" />
          </div>
        </form>
      </div>


            
    </div>
  )
}

export default Login;