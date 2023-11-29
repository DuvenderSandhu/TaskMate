import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import actionCreators from '../State/index'

function Signup(){
  const router = useRouter();
  const dispatch = useDispatch();
  const [signupUsername, setSignupUsername] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  let data={
    username:signupUsername,
    password:signupPassword
  }
  const handleSignup = async (e) => {
    e.preventDefault();
    let res= await fetch('https://taskmate.moviesmovies.repl.co/api/signup',{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    })
    let finaldata=await res.json()
    if(finaldata.success){
      dispatch(actionCreators.alert({type:"success",message:finaldata.success}))
      router.push('/login')
    }
    else{
      dispatch(actionCreators.alert({type:"alert",message:finaldata.alert}))

    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full sm:w-96">
        <h2 className="text-3xl font-semibold mb-4">Sign Up</h2>

        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <label htmlFor="signupUsername" className="block text-sm font-semibold text-gray-600">
              Username
            </label>
            <input
              type="text"
              id="signupUsername"
              name="signupUsername"
              value={signupUsername}
              onChange={(e) => setSignupUsername(e.target.value)}
              className="w-full p-2 border rounded mt-1"
              placeholder="Enter your username"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="signupPassword" className="block text-sm font-semibold text-gray-600">
              Password
            </label>
            <input
              type="password"
              id="signupPassword"
              name="signupPassword"
              value={signupPassword}
              onChange={(e) => setSignupPassword(e.target.value)}
              className="w-full p-2 border rounded mt-1"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-green-500 text-white p-2 rounded w-full hover:bg-green-600"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  )
}

export default Signup