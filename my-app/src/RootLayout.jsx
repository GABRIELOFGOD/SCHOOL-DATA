import Header from '../components/header/header'
import Footer from '../components/footer/footer'
import React from 'react'
import { Outlet } from 'react-router-dom'

function RootLayout() {
  return (
    <div>
        <Header />

        <main>
            <Outlet />
        </main>

        <Footer />
    </div>
  )
}

export default RootLayout