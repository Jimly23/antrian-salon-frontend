import React, { useState } from 'react'
import Button from '../components/atoms/Button'
import Cookies from 'js-cookie'
import logo from '../assets/images/logo.png'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../api/userApi'

const Login = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({email: "", password: ""});

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(userData.email == "admin@gmail.com" && userData.password == "admin123") {
      navigate("/admin");
      return;
    }
    
    if(userData.email == "kasir@gmail.com" && userData.password == "kasir123") {
      navigate("/kasir");
      return;
    }

    if(userData.email == "pemilik@gmail.com" && userData.password == "pemilik123") {
      navigate("/pemilik");
      return;
    }

    try {
      if(!userData.email || !userData.password) {alert("Please fill in all the required fields");}
  
      const response = await login(userData);
  
      if(response.status === 'success'){
        const { id } = response.user;
        Cookies.set('authToken', id, { expires: 7, secure: true, sameSite: 'Strict' });
        
        navigate("/");
      } else {
        alert("Email atau password salah");
      }

    } catch (error) {
      console.error('Error during login:', error);
    }
    
    
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 z-50 fixed left-0 right-0 bottom-0 top-0">
      <div className="bg-trnasparent p-8 rounded-lg w-96">
        <h5 className='text-2xl font-bold text-center mb-5 text-green-600'>Login</h5>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Masukan email anda"
              name='email'
              onChange={handleChange}
              value={userData.email}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="appearance-none border w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Masukan password anda"
              name='password'
              onChange={handleChange}
              value={userData.password}
            />
          </div>
          <div className="flex items-center justify-between">
            <Button style={'w-full rounded-none bg-green-600'} type={"submit"} text={"Login"} />
          </div>
        </form>
        <div className='font-medium text-sm mt-2'>Belum punya akun? <span className='underline'><Link to={'/register'}>Daftar</Link></span></div>
      </div>
    </div>
  )
}

export default Login