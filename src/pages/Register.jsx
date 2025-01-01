import React, { useState } from 'react'
import Button from '../components/atoms/Button'
import logo from '../assets/images/logo.png'
import { register } from '../api/userApi'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({username: "", email: "", telepon: "", password: "", confirmPassword: ""});

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!userData.username || !userData.email || !userData.telepon || !userData.password || !userData.confirmPassword) {
      alert("Please fill in all the required fields");
    }

    if(userData.password !== userData.confirmPassword) {
      alert("Passwords do not match");
    }

    const response = await register(userData);
    console.log(response)
    if(response.status === 'success'){
      alert('Berhasil Register')
      navigate("/login");
    } else {
      alert("Registrasi gagal");
    }
    
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 z-50 fixed left-0 right-0 bottom-0 top-0">
      <div className="p-8 rounded-lg w-96">
        <h5 className='text-2xl font-bold text-center mb-5 text-green-600'>Register</h5>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Username
            </label>
            <input
              className="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Username"
              name="username"
              onChange={handleChange}
              value={userData.username}
            />
          </div>
          <div className="mb-3">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Email
            </label>
            <input
              className="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={userData.email}
            />
          </div>
          <div className="mb-3">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Telepon
            </label>
            <input
              className="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="number"
              placeholder="Telepon"
              name="telepon"
              onChange={handleChange}
              value={userData.telepon}
            />
          </div>
          <div className="mb-1">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Password
            </label>
            <input
              className="appearance-none border w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              type="password"
              placeholder="Masukan password"
              name="password"
              onChange={handleChange}
              value={userData.password}
            />
          </div>
          <div className="mb-8">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Confirm Password
            </label>
            <input
              className="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="password"
              placeholder="Konfirmasi password"
              name="confirmPassword"
              onChange={handleChange}
              value={userData.confirmPassword}
            />
          </div>
          <div className="flex items-center justify-between">
            <Button style={'w-full rounded-none bg-green-600'} type={"submit"} text={"Register"} />
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register