"use client"
import { BiLogoFacebook, BiLogoTwitter, BiLogoMailchimp, BiLogoWhatsapp, BiSearch } from 'react-icons/bi'
import React from 'react'

function Footer() {

  const explore = [
    {
      name: 'Our Mission',
      path: '/mission'
    },
    {
      name: 'Our Teachers',
      path: '/teacher'
    },
    {
      name: 'Our Students',
      path: '/student'
    },
    {
      name: 'Our Projects',
      path: '/project'
    }
  ]

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

  const contact = [
    {
      icon: <BiLogoFacebook />,
      name: 'Facebook',
      path: '/'
    },
    {
      icon: <BiLogoTwitter />,
      name: 'Twitter',
      path: '/'
    },
    {
      icon: <BiLogoMailchimp />,
      name: 'Email',
      path: '/'
    },
    {
      icon: <BiLogoWhatsapp />,
      name: 'Whatsapp',
      path: '/'
    },
  ]



  return (
    <footer className='max-w-full mt-6 bg-heroe p-8'>
      <div className="flex space-between ">
        <div className="w-20 items-center">
          <img className=' relative ' src="/images/logo.png" alt="logo" />
          <h4 className='text-xs text-center font-bold'>Gabriel's Full Stack School Project</h4>
        </div>
        <ul className=' gap-3 m-auto text-xs font-900'>
          <h4 className='text-center font-bold pb-4'>Fast Links</h4>
          {
              myNav.map((item, index) => (
                  <li key={index} className='uppercase text-gray-500 text-[8px] hover:text-primary font-extrabold pb-3'>
                    {item.name}
                  </li>
              ))
          }
        </ul>
        <ul className=' gap-3 m-auto text-xs font-900'>
          <h4 className='text-center font-bold pb-4'>Explore</h4>
          {
              explore.map((item, index) => (
                  <li key={index} className='uppercase text-gray-500 text-[8px] hover:text-primary font-extrabold pb-3'>
                    {item.name}
                  </li>
              ))
          }
        </ul>
        <div className='max-w-[10%]'>
          <h4 className='text-center font-bold text-sm pb-4'>Address</h4>
          <p className="text-gray-500 text-[8px]">No 2, God's Street Tanke, Ilorin Kwara State, Nigeria</p>
        </div>
        <ul className=' gap-3 m-auto font-900'>
          <h4 className='text-center text-sm font-bold pb-4'>Explore</h4>
          {
              contact.map((item, index) => (
                  <li key={index} className='uppercase text-[8px] flex gap-2 text-gray-500 hover:text-primary font-extrabold pb-3'>
                    <div className="text-lg text-gray-700"> {item.icon} </div>
                    {item.name}
                  </li>
              ))
          }
        </ul>
      </div>

      <form className="newsletter">
        <input type="text" placeholder='Input Your Email to Subscribe to Our School Newsletter' />
        <button className='search'>
          <BiSearch />
        </button>
      </form>

      <p className='text-center text-xs font-bold text-gray-700'>&copy; PRACTICAL SCHOOL PROJECT {new Date().getFullYear()}</p>
    </footer>
  )
}

export default Footer