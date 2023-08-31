import React from 'react'
import { useState } from 'react'

function RegisterAdmin() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [mobile, setMobile] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const [admin, setAdmin] = useState(null)

    const handleSubmit = async (e) =>{
        e.preventDefault();

        const info = { name, email, mobile, password }
        
        const res = await fetch('http://localhost:7722/api/register', {
            method: 'POST',
            body: JSON.stringify(info),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })

        const data = await res.json()

        if (!res.ok){
            setError(data.errors)
        }

        if (res.ok) {
            setName('')
            setEmail('')
            setMobile('')
            setPassword('')
            setError(null)
            setAdmin(data.admin)
            console.log(data.admin)
        }

    }

  return (
    <div className='max-w-full m-auto py-10 items-center '>
        <form onSubmit={handleSubmit} className='m-auto items-center max-w-md mt-4 shadow-lg bg-heroe rounded-md p-10'>
            {admin && <div className='max-w-full text-center border border-green-700 py-3 px-6 text-green-700 bg-green-200 text-xs'> Welcome {admin.name} </div>}
            <h3 className='text-center font-bold text-lg'>Create An Admin</h3>
            <div className='py-4'>
                <div className="flex justify-between gap-5 p-2">
                    <label className='text-[10px] uppercase font-bold'>name:</label>
                    <input className='bg-transparent border border-primary px-3 text-sm text-primary font-bold rounded-sm outline-0 ' 
                        type='text' 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                    />
                </div>
                <div className="flex justify-between gap-5 p-2">
                    <label className='text-[10px] uppercase font-bold'>email:</label>
                    <input className='bg-transparent border border-primary px-3 text-sm text-primary font-bold rounded-sm outline-0 ' 
                        type='email' 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="flex justify-between gap-5 p-2">
                    <label className='text-[10px] uppercase font-bold'>Phone:</label>
                    <input className='bg-transparent border border-primary px-3 text-sm text-primary font-bold rounded-sm outline-0 ' 
                        type='number' 
                        value={mobile} 
                        onChange={(e) => setMobile(e.target.value)}
                    />
                </div>
                <div className="flex justify-between gap-5 p-2">
                    <label className='text-[10px] uppercase font-bold'>Password:</label>
                    <input className='bg-transparent border border-primary px-3 text-sm text-primary font-bold rounded-sm outline-0 ' 
                        type='password' 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                </div>
            </div>
            <button className='font-extrabold border-0 flex items-center py-2 my-4 hover:bg-opacity-80 text-white m-auto px-4 rounded-sm transition-all duration-500 bg-primary text-sm active:scale-[.8] '>SUBMIT</button>
            {error && <div className='max-w-full border border-red-700 py-3 px-6 text-center text-red-700 bg-red-200 text-xs'> {error} </div> }
        </form>
    </div>
  )
}

export default RegisterAdmin