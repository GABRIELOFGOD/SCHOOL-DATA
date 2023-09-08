import {useState, useEffect} from 'react'
import { Link, useParams } from 'react-router-dom'

const ForgotPassword = () => {
    const [password, setPassword] = useState('')
    const [userEmail, setEmail] = useState(null)
    const [userName, setName] = useState(null)
    const [confirmPassword, setConfirm] = useState('')
    const [error, setError] = useState(null)
    const [message, setMessage] = useState(null)

    const { email, token } = useParams()

    const handleGet = async () => {
        const res = await fetch(`http://localhost:7722/api/forgot-password/${email}/${token}`)
        const response = await res.json()
        if(!res.ok){
            alert(response.errors)
            location.assign('/login')
        }
        if(res.ok){
            setMessage(response.msg)
            setEmail(response.email)
            setName(response.name)
        }
    }

    useEffect(() => {
        handleGet()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(password !== confirmPassword){
            return (setError('Password not match, try again'), setConfirm(''))
        }

        const res = await fetch(`http://localhost:7722/api/forgot-password/${email}/${token}`, {
            method: 'PUT',
            body: JSON.stringify({password, userEmail}),
            headers: {'Content-Type': 'application/json'},
            credentials: 'include'
        })

        const response = await res.json()

        if(!res.ok){
            setError(response.errors)
            setMessage(null)
        }

        if(error === 'Something Went Wrong'){
            location.assign('/login')
        }

        if(res.ok){
            setPassword('')
            setConfirm('')
            setError(null)
            alert(response.msg)
            location.assign('/login')
        }
    }

  return (
    <div className='max-w-full m-auto py-10 items-center '>
        <form onSubmit={handleSubmit} className='m-auto items-center max-w-md mt-4 shadow-lg bg-heroe rounded-md p-10'>
            {/* {userEmail && <p className='text-center font-bold text-xs capitalize'>welcome {userEmail} </p>} */}
            {message && <div className='max-w-full text-center capitalize border border-green-700 py-3 px-6 text-green-700 bg-green-200 text-xs'> welcome {userName} {message} </div>}
            <h3 className='text-center font-bold text-lg'>Create New Password</h3>
            <div className='py-4'>
                
                <div className="flex justify-between gap-5 p-2">
                    <label className='text-[10px] uppercase font-bold'>Password:</label>
                    <input className='bg-transparent border border-primary px-3 text-sm text-primary font-bold rounded-sm outline-0 ' 
                        type='password' 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                </div>
                <div className="flex justify-between gap-5 p-2">
                    <label className='text-[10px] uppercase font-bold'>confirm Password:</label>
                    <input className='bg-transparent border border-primary px-3 text-sm text-primary font-bold rounded-sm outline-0 ' 
                        type='password' 
                        value={confirmPassword} 
                        onChange={(e) => setConfirm(e.target.value)}
                    />
                </div>
            </div>
            <button className='font-extrabold border-0 flex items-center py-2 my-4 hover:bg-opacity-80 text-white m-auto px-4 rounded-sm transition-all duration-500 bg-primary mx-auto text-sm active:scale-[.8] '>LOGIN</button>
            {/* <p className='text-xs text-center font-bold'>forgot password? <Link className='text-primary' to='forgot-password'>click here</Link></p> */}
            {error && <div className='max-w-full border capitalize text-center border-red-700 py-3 px-6 text-red-700 bg-red-200 text-xs'> {error} </div> }
        </form>
    </div>
  )
}

export default ForgotPassword