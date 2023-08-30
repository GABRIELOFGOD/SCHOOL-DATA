import { BiArrowBack } from 'react-icons/bi'
import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
const URL = 'http://localhost:7722/api/students/'
const delStaffUrl = 'http://localhost:7722/api/staffs/'

function Details() {
    const [result, setResult] = useState( null )
    const [staffResult, setStaffResult] = useState( null )
    const [response, setResponse] = useState(null)
    const [error, setError] = useState(null)
    const { id } = useParams()

    // ======== Fetching For Students ========= //
    const getDetail = async () => {
        const details = await fetch('http://localhost:7722/api/students/'+id)
        const res = await details.json()
        const result = res.result
        setResult(result)
    }

    // ======== Fetching For Staffs ========= //
    const getStaffsDetail = async () => {
        const details = await fetch('http://localhost:7722/api/staffs/'+id)
        const res = await details.json()
        const staffResult = res.result
        setStaffResult(staffResult)
    }

    useEffect(() => {
        getDetail()
    }, [])

    useEffect(() => {
        getStaffsDetail()
    }, [])
    // ========= Deleting Accounts ============ //
    const studentHandleDelete = async () => {
        alert('Are You Sure You Want to Delete This Student Account')
        const res = await fetch(URL+id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const response = await res.json()

        if(!res.ok){
            return setError(response.errors)
        }

        if(res.ok){
            setResponse(response.msg)
            location.assign('/admin/all-students')
        }
    }

    const handleStaffDelete = async () => {
        alert('Are You Sure You want to Delete This Staff Account?')
        const res = await fetch(delStaffUrl+id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const response = await res.json()

        if(!res.ok){
            return setError(response.errors)
        }

        if(res.ok){
            setResponse(response.msg)
            location.assign('/admin/all-staffs')
        }
    }

    // ========== Account Suspention =========== //
    const studentHandleSuspend = async () => {
        alert('Are You Sure You want to Suspend This Student?')
        const res = await fetch(URL+id, {
            method: 'PUT',
            body: JSON.stringify({ admitted:false }),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const response = await res.json()

        if(!res.ok){
            return setError(response.errors)
        }

        if(res.ok){
            setResponse(response.msg, 'This Student As Been Suspended')
            location.assign('/admin/details/'+id)
        }
    }

    const handleStaffSuspend = async () => {
        const res = await fetch(delStaffUrl+id, {
            method: 'PUT',
            body: JSON.stringify({ employed:false }),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const response = await res.json()

        if(!res.ok){
            return setError(response.errors)
        }

        if(res.ok){
            setResponse(response.msg, 'This Staff Has Been Suspended')
            location.assign('/admin/details/'+id)
        }
    }

    const studentHandleApprove = async () => {
        alert('Approve Student Admission?')
        const res = await fetch(URL+id, {
            method: 'PUT',
            body: JSON.stringify({ admitted:true }),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const response = await res.json()

        if(!res.ok){
            return setError(response.errors)
        }

        if(res.ok){
            setError(null)
            setResponse(response.msg, 'Student Admitted Successfully')
            location.assign('/admin/details/'+id)
        }
    }

    const handleStaffApprove = async () => {
        const res = await fetch(delStaffUrl+id, {
            method: 'PUT',
            body: JSON.stringify({ employed: true }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const response = await res.json()

        if(!res.ok){
            return setError(response.errors)
        }

        if(res.ok){
            setError(null)
            setResponse(response.msg)
            location.assign('/admin/details/'+id)
        }
    }
    

  return (
    <div className='max-w-full my-4 mx-auto items-center'>
        {error && <div className='text-red-900 capitalize text-center text-xs border border-red-900 bg-red-200 py-4 px-8 max-w-full rounded-xs'> {error} </div>}
        <Link className='flex bg-gray-400 rounded-sm font-bold text-sm p-2 border m-auto ml-6 max-w-[70px]' to='..'> <BiArrowBack /> Back</Link>
        {result && <div className="m-auto text-sm rounded-sm px-8 max-w-lg font-bold capitalize text-center py-16 bg-gray-100">
            <div>
                <h2 className='text-2xl mb-2'>{result.fname} {result.lname} </h2>
                <p className='text-gray-500 text-xs mb-2'>{result.email}</p>
            </div>
            {result.admitted == true && <div className='flex my-4 justify-between'>
                {/* <button onClick={studentHandleEdit} className='text-xs font-bold text-white uppercase hover:bg-green-900 transition-all duration-300 py-1 px-2 rounded-sm bg-green-500 '>edit</button> */}
                <button onClick={studentHandleSuspend} className='text-xs font-bold text-white uppercase hover:bg-yellow-900 transition-all duration-300 py-1 px-2 rounded-sm bg-yellow-500 '>suspend</button>
                <button onClick={studentHandleDelete} className='text-xs font-bold text-white uppercase hover:bg-red-900 transition-all duration-300 py-1 px-2 rounded-sm bg-red-500 '>Delete</button>
            </div>}
            {result.admitted == false && <div className='flex my-4 justify-between'>
                {/* <button className='text-xs font-bold text-white uppercase hover:bg-green-900 transition-all duration-300 py-1 px-2 rounded-sm bg-green-500 '>edit</button> */}
                <button onClick={studentHandleApprove} className='text-xs font-bold text-white uppercase hover:bg-yellow-900 transition-all duration-300 py-1 px-2 rounded-sm bg-yellow-500 '>Approve admission</button>
                <button onClick={studentHandleDelete} className='text-xs font-bold text-white uppercase hover:bg-red-900 transition-all duration-300 py-1 px-2 rounded-sm bg-red-500 '>Delete</button>
            </div>}
            <hr />
            <div className='text-left px-4'>
                <div className=' my-4 '>
                    <span className='flex justify-between'>date of birth: <div>{result.dob}</div></span> <br />
                    <span className='flex justify-between'>class: <div>{result.stuClass}</div> </span>
                </div>
                <div className=' my-4 '>
                    <span className='flex justify-between'>student id: <div>{result.studentId}</div></span> <br />
                    <span className='flex justify-between'>phone number: <div> {result.mobile} </div></span>
                </div>
                <span className='flex justify-between'>Address: <div>{result.address}</div></span>
                <div className=' my-4 '>
                    <span className='flex justify-between'>Parent: <div>{result.parent}</div></span> <br />
                    <span className='flex justify-between'>Parent Phone: <div>{result.parentPhone}</div></span>
                </div>
                <span className='flex justify-between'>Parent Occupation: <div>{result.parentOcc}</div></span>
            </div>
            {response && alert(response) }
        </div> }

        {staffResult && <div className="m-auto text-sm rounded-sm px-8 max-w-lg font-bold capitalize text-center py-16 bg-gray-100">
            <div>
                <h2 className='text-2xl mb-2'>{staffResult.fname} {staffResult.lname} </h2>
                <p className='text-gray-500 text-xs mb-2'>{staffResult.email}</p>
            </div>
            {staffResult.employed == true && <div className='flex my-4 justify-between'>
                {/* <button className='text-xs font-bold text-white uppercase hover:bg-green-900 transition-all duration-300 py-1 px-2 rounded-sm bg-green-500 '>edit</button> */}
                <button onClick={handleStaffSuspend} className='text-xs font-bold text-white uppercase hover:bg-yellow-900 transition-all duration-300 py-1 px-2 rounded-sm bg-yellow-500 '>suspend</button>
                <button onClick={handleStaffDelete} className='text-xs font-bold text-white uppercase hover:bg-red-900 transition-all duration-300 py-1 px-2 rounded-sm bg-red-500 '>Delete</button>
            </div>}
            {staffResult.employed == false && <div className='flex my-4 justify-between'>
                {/* <button className='text-xs font-bold text-white uppercase hover:bg-green-900 transition-all duration-300 py-1 px-2 rounded-sm bg-green-500 '>edit</button> */}
                <button onClick={handleStaffApprove} className='text-xs font-bold text-white uppercase hover:bg-yellow-900 transition-all duration-300 py-1 px-2 rounded-sm bg-yellow-500 '>Approve employment</button>
                <button onClick={handleStaffDelete} className='text-xs font-bold text-white uppercase hover:bg-red-900 transition-all duration-300 py-1 px-2 rounded-sm bg-red-500 '>Delete</button>
            </div>}
            <hr />
            <div className='text-left px-4'>
                <div className=' my-4 '>
                    <span className=' flex justify-between'>date of birth: <div>{staffResult.dob}</div></span> <br /> 
                    <span className=' flex justify-between'>office: <div>{staffResult.office}</div> </span>
                </div>
                <div className=' my-4'>
                    <span className=' flex justify-between'>staff id: <div>{staffResult.staffId}</div></span> <br /> 
                    <span className=' flex justify-between'>phone number: <div>{staffResult.mobile}</div></span>
                </div>
                <span className='flex justify-between'>Address: <div>{staffResult.address}</div></span>
                {response && alert(response) }
                {/* <div className='flex my-4 justify-between'>
                    <span>Parent: {result.parent}</span>
                    <span>Parent Phone: {result.parentPhone}</span>
                </div>
                <span>Parent Occupation: {result.parentOcc}</span> */}
            </div>
        </div> }
    </div>
  )
}

export default Details