import { NavLink, Link, Outlet } from 'react-router-dom'
import React from 'react'

const Portal = () => {
  return (
    <div className='p-20'>
        <h2 className='font-bold text-2xl text-center capitalize'>Welcome To Our Portal</h2>
        <p className='text-center text-gray-600 text-xs capitalize'>Kindly Create Your Personal Data here, the information provided here should be kept confidential as the institution will not be responsible for any personal data manipulation</p>

        <div className='one flex max-w-sm m-auto text-center justify-between relative py-10'>
        <span className='text-xs font-bold uppercase text-center items-center'><NavLink className=' p-3 rounded-md border border-primary transition-all duration-500 hover:bg-primary hover:text-white' to='staff'> create Staff portal</NavLink></span>
        <span className='text-xs font-bold uppercase text-center items-center'><NavLink className=' p-3 rounded-md border border-primary transition-all duration-500 hover:bg-primary hover:text-white' to='student'>create Student portal</NavLink></span>
        </div>
        <Outlet />
    </div>
  )
}

export default Portal