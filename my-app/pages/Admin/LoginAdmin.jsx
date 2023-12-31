import { useState } from 'react'
import React from 'react'
import { Link } from 'react-router-dom'

function LoginAdmin() {
    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const [admin, setAdmin] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault();

        const info = { email, password }

        const res = await fetch('http://localhost:7722/api/login', {
            method: 'POST',
            body: JSON.stringify(info),
            headers: {'Content-Type': 'application/json'},
            credentials: 'include'
        })

        const data = await res.json()

        if(!res.ok){
            setError(data.errors)
            console.log(error)
        }

        if(res.ok){
            setEmail('')
            setPassword('')
            setError(null)
            console.log(data.admin)
            setAdmin(data.admin)
            location.assign('/admin')
        }

    }

  return (
    <div className='max-w-full m-auto py-10 items-center '>
        <form onSubmit={handleSubmit} className='m-auto items-center max-w-md mt-4 shadow-lg bg-heroe rounded-md p-10'>
            <h3 className='text-center font-bold text-lg'>Login</h3>
            <div className='py-4'>
                
                <div className="flex justify-between gap-5 p-2">
                    <label className='text-[10px] uppercase font-bold'>email:</label>
                    <input className='bg-transparent border border-primary px-3 text-sm text-primary font-bold rounded-sm outline-0 ' 
                        type='email' 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
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
            <button className='font-extrabold border-0 flex items-center py-2 my-4 hover:bg-opacity-80 text-white m-auto px-4 rounded-sm transition-all duration-500 bg-primary mx-auto text-sm active:scale-[.8] '>LOGIN</button>
            <p className='text-xs text-center font-bold'>forgot password? <Link className='text-primary' to='/forgot-password'>click here</Link></p>
            {error && <div className='max-w-full border capitalize text-center border-red-700 py-3 px-6 text-red-700 bg-red-200 text-xs'> {error} </div> }
        </form>
    </div>
  )
}

export default LoginAdmin