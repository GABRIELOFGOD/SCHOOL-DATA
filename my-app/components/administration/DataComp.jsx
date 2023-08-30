import {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'

function DataComp({students}) {


  return (
    <div className='max-w-full items-center m-auto'>
        {students && <div className=' m-auto max-w-md rounded-sm bg-heroe px-4 my-4 py-6 items-center` '>
          {
            students.map(student => (
              <Link key={student._id} to={'/admin/details/'+student._id} >
                <div className='bg-gray-400 px-4 py-3 rounded-sm my-2 hover:shadow-md '>
                    <h2 className='text-md font-extrabold uppercase '>{student.fname} {student.lname}</h2>
                    <div className="flex justify-between">
                      <p className='text-[10px] text-gray-300 font-bold'>{student.email}</p>
                      <span className='font-bold kltext-heroe capitalize text-xs'>Success</span>
                    </div>
                </div>
              </Link>
            ))
          }
        {students.length == 0 && <div className='text-center font-bold'>No Data</div>}
        </div>
        }
        {!students && <div className='text-center font-bold'>No Data</div>}
    </div>
  )
}

export default DataComp