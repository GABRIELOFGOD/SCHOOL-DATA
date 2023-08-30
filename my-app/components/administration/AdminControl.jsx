import React from 'react'
import { Link, NavLink } from 'react-router-dom'

function AdminControl({panel}) {

  return (
    <div className=' shadow-sm bg-heroe flex max-w-full m-auto items-center justify-between min-h-full py-0 px-8 '>
        <div>
            <ul className='three flex m-auto items-center text-center relative'>
                {
                    panel.map((item, index)=>(
                        <li className='py-3' key={index}>
                            <NavLink className='text-[10px] font-bold uppercase py-0 my-0 mx-auto px-6 transition-all duration-300 rounded-sm ' to={item.path}> {item.name} </NavLink>
                        </li>
                    ))
                }
            </ul>
        </div>
    </div>
  )
}

export default AdminControl