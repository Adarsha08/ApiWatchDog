'use client'
import React from 'react'

const NavBar = () => {
  return (
    <div className=" h-12 flex justify-between font-serif items-center border-b-violet-900  border-b">
        <div>
            <h1 className='ml-6 font-bold text-cyan-600 text-2xl font-serif'>+Api WatchDog</h1>
        </div>
        <div className=' mr-6 flex gap-6'>
            <p className='text-cyan-600'> Welcome,Adarsha</p>
            <button className='cursor-pointer text-red-800'>Logout</button>
        </div>
    </div>
  )
}

export default NavBar