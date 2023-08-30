import React from 'react'
import { Link } from 'react-router-dom'
function DataComp({datas}) {

  const handleAdmission = () => {

  }

  const handleDelete = () => {
    
  }

  return (
    <div className='max-w-full items-center m-auto'>
        {datas && <div className=' m-auto max-w-md rounded-sm bg-heroe px-4 my-4 py-6 items-center` '>
            {
              datas.map(data => (
                <Link key={data._id} to={'/admin/details/'+data._id}>
                  <div className='bg-gray-400 hover:shadow-md justify-between px-4 flex py-3 rounded-sm my-2 '>
                      <div>
                        <h2 className='text-md p-0 m-0 font-extrabold uppercase '>{data.fname} {data.lname}</h2>
                        <span className='font-bold p-0 m-0 text-heroe capitalize text-xs'>{data.email}</span>
                      </div>
                      <div className="flex my-auto gap-2 right-0 ">
                        <span className='text-xs font-bold'>Approval Pending</span>
                        {/* <button onClick={()=>{console.log('data')}} className='text-xs font-bold text-white uppercase hover:bg-green-900 transition-all duration-300 py-1 px-2 rounded-sm bg-green-500 '>Approve</button>
                        <button className='text-xs font-bold text-white uppercase hover:bg-red-900 transition-all duration-300 py-1 px-2 rounded-sm bg-red-500 ' onClick={handleDelete}>Delete</button> */}
                      </div>
                  </div>
                </Link>
              ))
            }
            {datas.length == 0 && <div className='text-center font-bold'>No Data</div>}
        </div>}
        {!datas && <div className='text-center font-bold'>No Data</div>}
    </div>
  )
}

export default DataComp