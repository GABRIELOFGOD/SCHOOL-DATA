import React, { useEffect, useState } from 'react'
import DataComp from '../../components/administration/DataComp'
const URL = 'http://localhost:7722/api/all-students'
function Admitted() {

  const [students, setStudents] = useState([])
  const [error, setError] = useState(null)

  const getStudents = async () => {
    const res = await fetch(URL, {credentials: 'include'})
    const response = await res.json()
    const students = response.students
    
    if(!res.ok){
      setError(response.errors)
      location.assign('/login')
    }

    if(res.ok){
      setStudents(response.students)
    }
  }

  useEffect(() => {
    getStudents()
  }, [])

  return (
    <div>
      {/* <div className='absolute w-full left-0 top-0 h-full items-center content-center bg-black opacity-70 '>
        <div className='m-auto bg-white rounded-md p-20'>
          <h1>error!</h1>
          <p>{error}</p>
        </div>
      </div> */}
      <DataComp students={students} />
    </div>
  )
}

export default Admitted