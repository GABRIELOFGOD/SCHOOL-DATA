import { useState, useEffect } from 'react'
import DataComp from '../../components/administration/DataComp'
const URL = 'http://localhost:7722/api/all-staffs'

function Employed() {
    const [students, setStaffs] = useState([])
    const [error, setError] = useState(null)

    const getStaffs = async () => {
        const res = await fetch(URL, { credentials: 'include' })
        const response = await res.json()
        const students = response.staffs

        if(!res.ok){
          setError(response.errors)
          location.assign('/login')
        }

        if(res.ok){
          setStaffs(students)
        }
    }

    useEffect(()=> {
        getStaffs()
    }, [])

  return (
    <div>
      <DataComp students={students} />
    </div>
  )
}

export default Employed