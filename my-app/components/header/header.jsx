import React from 'react'
import { Link, NavLink } from 'react-router-dom'


function Header() {
    
    // const router = useRouter();

    const myNav = [
        {
            name: 'home',
            path: '/'
        },
        {
            name: 'about',
            path: '/about'
        },
        {
            name: 'vision',
            path: '/vision'
        },
        {
            name: 'contact',
            path: '/contact'
        },
        {
            name: 'proficiency',
            path: '/proficiency'
        }
    ]

  return (
    <div className=' flex justify-between shadow-sm max-w-full bg-heroe top-0 z-50 sticky py-3 px-12'>
        <div className=" logo w-[50px] "><img className='w-full' src="/images/logo.png" alt="logo" /></div>
        <ul className='two gap-3 flex m-auto text-xs font-900 relative'>
                {
                    myNav.map((item, index) => (
                        <li key={index} className={`afterClass transition-all duration-500 uppercase relative text-[10px] hover:text-primary font-extrabold`}>
                            <NavLink to={item.path} >{item.name}</NavLink>
                        </li>
                    ))
                }
        </ul>
        <button className='font-extrabold hover:bg-opacity-80 border-0 text-white px-4 rounded-sm bg-primary text-sm active:scale-[.8] transition-all duration-500 '><Link to='/get-started'>Get Started</Link> </button>
    </div>
  )
}

export default Header