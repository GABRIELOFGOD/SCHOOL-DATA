import { useState, useEffect } from "react"
import DataComp from "../../components/administration/DataCompPend"
const URL = 'http://localhost:7722/api/not-admitted'

function NotAdmitted(){
    const [datas, setDatas] = useState([])

    const getData = async () => {
      const res = await fetch(URL)
      const response = await res.json()
      const datas = response.students
      setDatas(datas)
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

export default NotAdmitted