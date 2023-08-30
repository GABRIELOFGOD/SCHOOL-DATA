import React from 'react'
import { useState } from 'react'

function StaffForm() {
  const [fname, setFname] = useState('')
  const [lname, setLname] = useState('')
  const [email, setEmail] = useState('')
  const [dob, setDob] = useState('')
  const [office, setOffice] = useState('')
  const [mobile, setMobile] = useState('')
  const [address, setAddress] = useState('')

  const [error, setError] = useState(null)

    const formInput = [
        {
          label: 'first name',
          type: 'text',
          value: fname,
          change: (e) => setFname(e.target.value),
    
        },
        {
          label: 'last name',
          type: 'text',
          value: lname,
          change: (e) => setLname(e.target.value),
    
        },
        {
          label: 'email',
          type: 'text',
          value: email,
          change: (e) => setEmail(e.target.value),
    
        },
        {
          label: 'Date of Birth',
          type: 'date',
          value: dob,
          change: (e) => setDob(e.target.value),
    
        },
        {
          label: 'Office Applying For',
          type: 'text',
          value: office,
          change: (e) => setOffice(e.target.value),
    
        },
        {
          label: 'Phone Number',
          type: 'number',
          value: mobile,
          change: (e) => setMobile(e.target.value),
    
        },
        {
          label: 'Home Address',
          type: 'text',
          value: address,
          change: (e) => setAddress(e.target.value),
    
        },
    ]

    const handleSubmit = async (e) =>{
      e.preventDefault();

      const info = { 
        fname,
        lname,
        email,
        dob,
        office,
        mobile,
        address
      }
        
      const res = await fetch('http://localhost:7722/api/staff/register', {
      method: 'POST',
      body: JSON.stringify(info),
      headers: {
          'Content-Type': 'application/json'
      }
      })

      const json = await res.json()

      if (!res.ok){
        setError(json.errors)
      }
      if(res.ok){
        setFname('')
        setLname('')
        setEmail('')
        setDob('')
        setOffice('')
        setMobile('')
        setAddress('')
        setError(null)
        console.log(json.staff)
      }

    }


  return (
    <div>
        <form onSubmit={handleSubmit} className='m-auto items-center max-w-md mt-4 shadow-lg bg-heroe rounded-md p-10'>
            <h3 className='text-center font-bold text-lg'>Staff Information</h3>
            <div className='py-4'>
            {
                formInput.map((item, index) => (
                <div key={index} className="flex justify-between gap-5 p-2">
                    <label className='text-[10px] uppercase font-bold'>{item.label}:</label>
                    <input 
                      className='bg-transparent border border-primary px-3 text-sm text-primary font-bold rounded-sm outline-0 '
                      type={item.type} 
                      value={item.value}
                      onChange={e => (item.change(e))}
                    />
                </div>
                ))
            }
            </div>
            <button className='font-extrabold border-0 items-center py-2 my-4 hover:bg-opacity-80 text-white m-auto px-4 rounded-sm transition-all duration-500 bg-primary text-sm active:scale-[.8] '>SUBMIT</button>
            {error && <div className='text-red-900 text-center text-xs border border-red-900 bg-red-200 py-4 px-8 max-w-full rounded-xs'> {error} </div>}
        </form>
    </div>
  )
}

export default StaffForm