import React, { useContext } from 'react'
import found from '../../assets/images/logoooo.png'
import { NavLink, useNavigate } from 'react-router-dom'
import { userContext } from '../../context/userContext';
import { cartContext } from '../../context/cartContext'; 
import styles from './Navbar.module.css'; // 👈 السطر ده اللي كان ناقصك عشان الـ CSS يشتغل!

export default function Navbar() {
   let navigate = useNavigate();
   let { isLogin, setLogin } = useContext(userContext); 
   let { cartCount } = useContext(cartContext); 

   function logOut() {
    localStorage.removeItem('userToken');
    if (setLogin) setLogin(null); 
    navigate('/login');
   }

  return (
    <>
       {/* شيلنا كلاس bg-dark-subtle وضفنا كلاس الـ CSS المخصص بتاعنا */}
      

       <nav className={`navbar navbar-expand-lg d-flex justify-content-between align-items-center px-4 py-2 shadow-sm ${styles.customNav}`}>
         <div className='logo d-flex align-items-center'>
            <NavLink to={'/'}>
              <img src={found} alt="logo" width={80} />
            </NavLink>

            {isLogin && (
              <ul className='list-unstyled d-flex mb-0 align-items-center ms-3'>
                <li><NavLink to={'/'} className='text-decoration-none p-2'>Home</NavLink></li>
                <li><NavLink to={'products'} className='text-decoration-none p-2'>Products</NavLink></li>
                <li><NavLink to={'brands'} className='text-decoration-none p-2'>Brands</NavLink></li>
                
                {/* أيقونة السلة مع العداد الشرطي */}
                <li>
                  <NavLink to={'carts'} className='text-decoration-none p-2 position-relative d-flex align-items-center'>
                    <span className="me-1">Carts</span>
                    <i className="fa-solid fa-cart-shopping fs-5"></i>
                    
                 {cartCount > 0 && (
  <span 
    className="position-absolute top-0 start-100 translate-middle badge rounded-pill border border-light shadow-sm d-flex align-items-center justify-content-center" 
    style={{ 
      color: '#ffffff !important', 
      backgroundColor: '#dc3545 !important', 
      width: '18px', 
      height: '18px', 
      fontSize: '11px',
      fontWeight: 'bold'
    }}
  >
    {cartCount}
  </span>
)}
                  </NavLink>
                </li>
              </ul>
            )}
         </div>

        <div className='social'>
            <ul className='list-unstyled d-flex mb-0 align-items-center'>
               {!isLogin ? (
                <>
                  <li><NavLink to={'register'} className='text-decoration-none p-2'>Register</NavLink></li>
                  <li><NavLink to={'login'} className='text-decoration-none p-2'>Login</NavLink></li>
                </> 
               ) : (
                <li>
                  <span onClick={logOut} className='text-decoration-none p-2' style={{cursor:'pointer'}}>
                    LogOut
                  </span>
                </li>
               )}
              
              <li className="ms-3 d-none d-lg-block">
                <i className='fab fa-facebook px-1 cursor-pointer'></i>
                <i className='fab fa-youtube px-1 cursor-pointer'></i>
                <i className='fab fa-instagram px-1 cursor-pointer'></i>
              </li>
            </ul>
        </div>
       </nav>
    </>
  )
}