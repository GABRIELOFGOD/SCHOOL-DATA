import React, { useEffect, useState } from 'react'
import DataComp from '../../components/administration/DataComp'
const URL = 'http://localhost:7722/api/all-students'
function Admitted() {

  const [students, setStudents] = useState([])

  const getStudents = async () => {
    const res = await fetch(URL)
    const response = await res.json()
    const students = response.students
    setStudents(students)
  }

  useEffect(() => {
    getStudents()
  }, [])

  return (
    <div>
      <DataComp students={students} />
    </div>
  )
}

export default Admitted