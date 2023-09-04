import React from 'react'
import { NavLink, Outlet, Link } from 'react-router-dom'

function Getstarted() {
  return (
    <div className='p-20 '>
      <h2 className='font-bold text-2xl text-center capitalize'>Welcome To the get started page</h2>
      <p className='text-center text-gray-600 text-xs capitalize'>in this page you can apply for a staff role in our humble school and you will be notify if you're considered for employment. students can also apply for admission directly from our website here and the considered students will be notify through email or Direct messages.</p>

     <div className='one flex max-w-sm m-auto text-center justify-between relative py-10'>
      <span className='text-xs font-bold uppercase text-center items-center'><NavLink className=' p-3 rounded-md border border-primary transition-all duration-500 hover:bg-primary hover:text-white' to='staff'>Staff Application</NavLink></span>
      <span className='text-xs font-bold uppercase text-center items-center'><NavLink className=' p-3 rounded-md border border-primary transition-all duration-500 hover:bg-primary hover:text-white' to='student'>Student Application</NavLink></span>
     </div>
      <Outlet />
      <p className='text-center capitalize font-bold text-xs '>Already Employed or Admitted? <Link className='text-primary font-extrabold' to='/portal'>Go create a portal</Link></p>
    </div>
  )
}

export default Getstarted