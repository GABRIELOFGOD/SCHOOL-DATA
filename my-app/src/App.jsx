import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from '../pages/Home'
import Getstarted from '../pages/Getstarted'
import './App.css'
import RootLayout from './RootLayOut'
import StaffForm from '../pages/form-data/StaffForm'
import StudentForm from '../pages/form-data/studentForm'
import PageNotFound from '../pages/PageNotFound'

// ======= The Admin Imports ====== //
import AdminPannel from '../pages/Admin/AdminPannel'
import AdminHome from '../pages/Admin/AdminHome'
import GetStudents from '../pages/Admin/GetStudents'
import GetStaffs from '../pages/Admin/GetStaffs'
// import FindStudent from '../pages/Admin/FindStudent'
// import FindStaff from '../pages/Admin/FindStaff'
import LoginAdmin from '../pages/Admin/LoginAdmin'
import RegisterAdmin from '../pages/Admin/RegisterAdmin'
import NotEmployed from '../pages/Admin/NotEmployed'
import NotAdmitted from '../pages/Admin/NotAdmitted'
import Admitted from '../pages/Admin/Admitted'
import Employed from '../pages/Admin/Employed'
import Details from '../pages/Details'
import StaffPortal from '../pages/form-data/StaffPortal'
import StudentPortal from '../pages/form-data/StudentPortal'

// ======= Importing Loaders ========= //
import staffLoader from '../pages/Admin/GetStaffs'


const router = createBrowserRouter ([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: '',
        element: <Home />
      },
      {
        path: 'get-started',
        element: <Getstarted />,
        children: [
          {
            path: 'staff',
            element: <StaffForm />
          },
          {
            path: 'student',
            element: <StudentForm />
          }
        ]
      },
      {
        path: 'register',
        element: <RegisterAdmin />
      },
      {
        path: 'login',
        element: <LoginAdmin />
      },
      {
        path:'*',
        element: <PageNotFound />
      }
    ],
  },
  {
    path: '/admin',
    element: <AdminPannel />,
    children: [
      {
        path: 'all-students',
        element: <GetStudents />,
        children: [
          {
            path: '',
            element: <Admitted />
          },
          {
            path: 'not-admitted',
            element: <NotAdmitted />
          },
        ]
      },
      {
        path: 'register/student',
        element: <StudentForm />
      },
      {
        path: 'register/staff',
        element: <StaffForm />
      },
      {
        path: 'create/staff',
        element: <StaffPortal />
      },
      {
        path: 'create/student',
        element: <StudentPortal />
      },
      {
        path: 'all-staffs',
        element: <GetStaffs />,
        children: [
          {
            path: '',
            element: <Employed />
          },
          {
            path: 'not-employed',
            element: <NotEmployed />
          },
        ]
      },
      {
        path: 'details/:id',
        element: <Details />
      },
    ]
  },
])

export default function App() {
  return (
      <RouterProvider router={router} />
  )
}

