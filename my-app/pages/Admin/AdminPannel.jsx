import React from 'react'
import AdminControl from '../../components/administration/AdminControl'
import { Link, Outlet } from 'react-router-dom'
import Footer from '../../components/footer/footer'

function AdminPannel() {

  const panel = [
    {
        name: 'students',
        path: 'all-students'
    },
    {
        name: 'staffs',
        path: 'all-staffs'
    },
    {
        name: 'register staff',
        path: 'register/staff'
    },
    {
        name: 'register student',
        path: 'register/student'
    },
    {
        name: 'staff portal',
        path: 'create/staff'
    },
    {
        name: 'student portal',
        path: 'create/student'
    },

]


  return (
    <div className=''>
        <div className="flex justify-between shadow-sm max-w-full bg-heroe top-0 z-50 sticky py-3 px-12">
            <div className=" logo w-[50px] "><Link to='/'><img className='w-full' src="/images/logo.png" alt="logo" /></Link></div>
            <h2 className='text-2xl font-extrabold capitalize m-auto'>Welcome To The Administrative Panel</h2>
            <span className='items-center m-auto rounded-sm text-xs text-white font-bold py-2 px-4 bg-primary'><Link to='/logout'>Logout</Link></span>
        </div>
        <div className="">
            <AdminControl panel={panel} />
            <div className='items-center m-auto'>
                <div className='m-auto text-center items-center py-6 px-4'>
                    <div className='pb-6'>
                        <h2 className='text-center text-2xl font-extrabold capitalize'>Welcome Admin Lagbaja For Now</h2>
                        <h4 className='text-md text-center text-heroe font-bold'>Use The Top Navigating Bar To Explore This Panel.</h4>
                    </div>
                    {/* <p className='text-center text-sm pb-3'>Presently, We Have so so Number Of <span className='text-primary font-bold'>students</span></p>
                    <p className='text-center text-sm pb-3'>Presently, We Have so so Number Of <span className='text-primary font-bold'>staffs</span></p> */}
                </div>
                <Outlet />
            </div>
        </div>
        <Footer />
    </div>
  )
}

export default AdminPannel