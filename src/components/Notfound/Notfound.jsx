import React from 'react'

export default function Notfound() {
  return (
    <div className="container vh-100 d-flex flex-column justify-content-center align-items-center text-center">
      {/* استخدمت رابط صورة جاهز عشان م يطلعلكيش خطأ في المسار */}
      <img 
        src="https://admiral.digital/wp-content/uploads/2023/08/404_page-not-found.png" 
        className="w-50 mb-4" 
        alt="Not Found" 
      />
      <h1 className="display-1 fw-bold text-success">404</h1>
      <h2 className="fw-bold mb-3">Page Not Found</h2>
      <p className="text-secondary mb-4">
        Oops! We couldn't find the page you're looking for.
      </p>
    </div>
  )
}