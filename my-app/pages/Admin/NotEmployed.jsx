import React, { useEffect, useState } from 'react'
import DataComp from '../../components/administration/DataCompPend'
const URL = 'http://localhost:7722/api/not-employed'

function NotEmployed() {
  const [datas, setDatas] = useState([])
  const [error, setError] = useState(null)

  const getData = async () => {
    const res = await fetch(URL, { credentials: 'include' })
    const response = await res.json()
    const datas = response.staffs

    if(!res.ok){
      setError(response.errors)
      location.assign('/login')
    }

    if(res.ok){
      setDatas(datas)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div>
      <DataComp datas={datas} />
    </div>
  )
}

export default NotEmployed