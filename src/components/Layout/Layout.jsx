import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar/Navbar' // عدلي المسار حسب مكان الـ Navbar عندك
import Footer from '../Footer/Footer'

export default function Layout() {
  return (
    <>
      <Navbar />
      
      {/* الـ Outlet هنا هو اللي هيعرض صفحة الـ Home لوحدها، أو Products لوحدها وهكذا */}
      <div className="container my-5">
        <Outlet /> 
      </div>

      <Footer />
    </>
  )
}
