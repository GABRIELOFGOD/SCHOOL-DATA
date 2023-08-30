import React from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'

function GetStudents() {
  return (
    <div className=' m-auto items-center py-3 px-6'>
        <div className="fourly relative text-right px-2 text-xs">
          <NavLink className='hover:text-primary relative text-xs px-2 font-extrabold capitalize' to=''>Students</NavLink>
          <NavLink className='hover:text-primary relative text-xs px-2 font-extrabold capitalize' to='not-admitted'>Not Admitted Students</NavLink>
        </div>
        <Outlet />
        
    </div>
  )
}

export default GetStudents