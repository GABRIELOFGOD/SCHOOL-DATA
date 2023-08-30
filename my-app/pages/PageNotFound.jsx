import React from 'react'
import { Link } from 'react-router-dom'

function PageNotFound() {
  return (
    <div className='max-w-full mx-auto items-center my-12'>
        <h1 className='text-4xl text-center font-extrabold my-4'>404</h1>
        <p className='text-sm font-bold text-center '>This Page Does Not Exists Or Has Been Permanently Removed</p>
        <p className='text-sm font-bold text-center '>Go Back to <Link className='text-extrabold text-primary' to='/'>Home Page</Link></p>
    </div>
  )
}

export default PageNotFound