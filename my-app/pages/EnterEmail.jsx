import { Link } from 'react-router-dom'
import {useState} from 'react'

const EnterEmail = () => {
    const [email, setEmail] = useState('')
    const [error, setError] = useState(null)
    const [message, setMessage] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch('http://localhost:7722/api/forgot-email', {
            method: 'POST',
            body: JSON.stringify({email}),
            headers: {'Content-Type': 'application/json'},
            credentials: 'include'
        })
        const response = await res.json()

        if(!res.ok){
            setError(response.errors)
            setMessage(null)
        }

        if(res.ok){
            setError(null)
            setEmail('')
            setMessage(response.msg)
        }

    }

  return (
    <div className='max-w-full m-auto py-10 items-center '>
        <form onSubmit={handleSubmit} className='m-auto items-center max-w-md mt-4 shadow-lg bg-heroe rounded-md p-10'>
            {message && <div className='max-w-full text-center border border-green-700 py-3 px-6 text-green-700 bg-green-200 text-xs'> {message} </div>}
            <h3 className='text-center font-bold text-lg'>Forgot password</h3>
            <div className='py-4'>
                
                <div className="flex justify-between gap-5 p-2">
                    <label className='text-[10px] uppercase font-bold'>your EMail:</label>
                    <input className='bg-transparent border border-primary px-3 text-sm text-primary font-bold rounded-sm outline-0 ' 
                        type='email' 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                    />
                </div>

            </div>
            <button className='font-extrabold border-0 flex items-center py-2 my-4 hover:bg-opacity-80 text-white m-auto px-4 rounded-sm transition-all duration-500 bg-primary mx-auto text-sm active:scale-[.8] '>SEND CODE</button>
            <p className='text-xs capitalize text-center font-bold'>Back to LOGIN? <Link className='text-primary' to='/login'>click here</Link></p>
            {error && <div className='max-w-full border capitalize text-center border-red-700 py-3 px-6 text-red-700 bg-red-200 text-xs'> {error} </div> }
        </form>
    </div>
  )
}

export default EnterEmail