import Link from 'next/link'
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import actionCreators from '../State/index'
function Navbar(){
  const dispatch = useDispatch();
  const router = useRouter();
  const handleLogout = () => {
     dispatch(actionCreators.changeuser(""))
    dispatch(actionCreators.alert({type:"success",message:"Logged Out Successfully"}))

      router.push('/login')
  };
  let user = useSelector(state => state.user)
  
  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <span className="text-white text-xl font-semibold">Taskmate</span>
        </div>

        <div className="flex space-x-4 text-white font-bold">
          <Link href="/">Home</Link>
          {user ? (
            <>
              <Link href="/task">Create Task</Link>

              <p className="cursor-pointer" onClick={handleLogout}>
                Logout
              </p>
            </>
          ) : (
            <>
              <Link href="/signup">Signup</Link>
              <Link href="/login">Login</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
