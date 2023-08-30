import { Outlet, NavLink } from 'react-router-dom'
import React from 'react'

function GetStaffs() {
  return (
    <div className=' m-auto items-center py-3 px-6'>
        <div className="fourly relative text-right px-2 text-xs">
          <NavLink className='hover:text-primary relative text-xs px-2 font-extrabold capitalize' to=''>All Staffs</NavLink>
          <NavLink className='hover:text-primary relative text-xs px-2 font-extrabold capitalize' to='not-employed'>Not Employed Staffs</NavLink>
        </div>
        <Outlet />
        
    </div>
  )
}

export default GetStaffs