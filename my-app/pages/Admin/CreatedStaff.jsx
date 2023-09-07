import React, { useState, useEffect } from 'react'
import DataComp from '../../components/administration/DataComp'

const CreatedStaff = () => {
    const [students, setStudents] = useState(null)
    const [error, setError] = useState(null)

    const staffPortal = async () => {
        const res = await fetch('http://localhost:7722/api/created-staff', { credentials: 'include' })
        const response = await res.json()
        if(res.ok){
            setStudents(response.staff)
        }

        if(!res.ok){
            setError(response.errors)
        }
    }

    useEffect(() => {
        staffPortal()
    }, [])

  return (
    <div>
        <DataComp students={students} />
    </div>
  )
}

export default CreatedStaff