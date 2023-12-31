import { useLocation, Link } from 'react-router-dom'
import {useState} from 'react'

function StudentPortal() {

  const { pathname } = useLocation()

  const [studentId, setStudentId] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [error, setError] = useState(null)

  const formInput = [
    {
      label: 'student id',
      type: 'text',
      value: studentId,
      change: (e) => setStudentId(e.target.value)
    },
    {
      label: 'Email',
      type: 'email',
      value: email,
      change: (e) => setEmail(e.target.value)
    },
    {
      label: 'password',
      type: 'password',
      value: password,
      change: (e) => setPassword(e.target.value)
    },
  ]

  const handleSubmit = async (e) => {
    e.preventDefault();
    const info = { studentId, email, password }

    const res = await fetch('http://localhost:7722/api/student/create', {
      method: 'POST',
      body: JSON.stringify(info),
      headers:{'Content-Type': 'application/json'}
    })

    const response = await res.json()

    if(!res.ok){
      return setError(response.errors)
    }

    if(res.ok){
      setError(null)
      setStaffId('')
      setEmail('')
      setPassword('')
      if(pathname == '/portal/student'){
        location.assign('/portal/student-login')
      }
    }
    
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className='m-auto items-center max-w-md mt-4 shadow-lg bg-heroe rounded-md p-10'>
          <h3 className='text-center font-bold text-lg'>Student Information</h3>
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
          {error && <div className='text-red-900 capitalize text-center text-xs border border-red-900 bg-red-200 py-4 px-8 max-w-full rounded-xs'> {error} </div>}
          <button className='font-extrabold border-0 w-full items-center py-2 my-4 hover:bg-opacity-80 text-white m-auto px-4 rounded-sm transition-all duration-500 bg-primary text-sm active:scale-[.8] '>SUBMIT</button>
          {pathname == '/portal/student' && <p className='text-center font-bold text-xs'>Already Have a Portal? <Link className='text-primary font-extrabold' to='/portal/student-login'>Longin Now</Link> </p>}
      </form>
    </div>
  )
}

export default StudentPortal