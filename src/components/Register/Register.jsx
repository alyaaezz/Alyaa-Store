import React, { useContext } from 'react'
import found from '../../assets/images/register.jpg'
import { useFormik } from 'formik'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup'; 
import { useState } from 'react'; 
import { userContext } from '../../context/userContext';

export default function Register() {

  let { isLogin,setLogin } = useContext(userContext)


  let [apiError , setError] = useState('');

  let navigate = useNavigate();

 async function handleRegister(formData){
    console.log('register' , formData);
  
    
    //call API
    await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup' , formData)
    .then( (response)=>{console.log('response' , response.data);
    if(response.data.message == 'success'){ 
      localStorage.setItem('userToken' , response.data.token)
      setLogin(response.data.token);
      
      navigate('/login') //programmitic routing
    }} )

    .catch( (error)=>{console.log(error.response.data.message)
      setError(error.response.data.message)
    } )
    

  }


    // validation form

 let validationSchema =  Yup.object({
    name: Yup.string().required('name is required').min(3 , 'minlength is 3').max(10 , 'maxlength is 10'),
    email: Yup.string().required('email is required').email('enter valid email'),
    phone: Yup.string().required('phone is required').matches(/^01[1250][0-9]{8}$/ , 'phone is not valid'),
    password: Yup.string().required('password is required').matches(/^[A-Z][a-z0-9]{6,8}$/ , 'password is not valid'),
    rePassword: Yup.string().required('confirm password is required').oneOf([Yup.ref('password')])
  })

 
  let formik = useFormik( {
    initialValues:{
      name:'',    //faten
      email:'',   //faten@gmail.com
      password:'', 
      rePassword:'',
      phone:''
    },

    validationSchema: validationSchema, 

    onSubmit: handleRegister
  } )




  return (
    <>

<section className="bg-light py-3 py-md-5">
  <div className="container">
    <div className="row justify-content-center">
      <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4">
        <div className="card border border-light-subtle rounded-3 shadow-sm">
          <div className="card-body p-3 p-md-4 p-xl-5">
            <div className="text-center mb-3">
              <a href="#!">
                <img src= {found} alt="Logo" width={175} height={57} />
              </a>
            </div>

            <h2 className="fs-6 fw-normal text-center text-secondary mb-4">Enter your details to register</h2>
            
          {apiError?
          <div className='text-danger bg-danger-subtle p-3 rounded-2 mb-3'>{apiError}</div>   
          : null  
          }

            <form onSubmit={formik.handleSubmit} action="#!">
              <div className="row gy-2 overflow-hidden">

                <div className="col-12">
                  <div className="form-floating mb-3">
                    <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" className={`form-control ${formik.touched.name && formik.errors.name? 'is-invalid': null }`} name="name" value={formik.values.name} id="name" placeholder="name" required />
                    <label htmlFor="name" className="form-label"> Name</label>
                    
                  {
                    
                    formik.touched.name && formik.errors.name ? (
                    <div className="text-danger">{formik.errors.name}</div>) : null
                    
                  }

                  
                  </div>
                </div>
                

                <div className="col-12">
                  <div className="form-floating mb-3">
                    <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" className={`form-control ${formik.touched.email && formik.errors.email? 'is-invalid': null }`} name="email" value= {formik.values.email} id="email" placeholder="email" required />
                    <label htmlFor="email" className="form-label">Email</label>
                  
                  {
                    
                    formik.touched.email&& formik.errors.email? (
                    <div className="text-danger">{formik.errors.email}</div>) : null
                    
                  }

                  </div>
                </div>

                <div className="col-12">
                  <div className="form-floating mb-3">
                    <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="password" className={`form-control ${formik.touched.password && formik.errors.password? 'is-invalid': null }`} name="password" value={formik.values.password} id="password" defaultValue placeholder="Password" required />
                    <label htmlFor="password" className="form-label">Password</label>
                  {
                    
                    formik.touched.password&& formik.errors.password? (
                    <div className="text-danger">{formik.errors.password}</div>) : null
                    
                  }

                  </div>
                </div>

                <div className="col-12">
                  <div className="form-floating mb-3">
                    <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="password" className={`form-control ${formik.touched.rePassword && formik.errors.rePassword? 'is-invalid': null }`} name="rePassword" value={formik.values.rePassword} id="rePassword" defaultValue placeholder="rePassword" required />
                    <label htmlFor="rePassword" className="form-label">rePassword</label>
                  {
                    
                    formik.touched.rePassword&& formik.errors.rePassword? (
                    <div className="text-danger">{formik.errors.rePassword}</div>) : null
                    
                  }
                  
                  </div>
                </div>


                <div className="col-12">
                  <div className="form-floating mb-3">
                    <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="tel" className={`form-control ${formik.touched.phone && formik.errors.phone? 'is-invalid': null }`} name="phone" value={formik.values.phone} id="phone" defaultValue placeholder="phone" required />
                    <label htmlFor="phone" className="form-label">Phone</label>
                   {
                    
                    formik.touched.phone&& formik.errors.phone? (
                    <div className="text-danger">{formik.errors.phone}</div>) : null
                    
                  }
                 
                  </div>
                </div>


                <div className="col-12">
                  <div className="d-grid my-3">
                    <button className="btn btn-danger btn-lg" type="submit">Register Now</button>
                  </div>
                </div>
                <div className="col-12">
                  <p className="m-0 text-secondary text-center">Already have an account? <a href="#!" className="link-primary text-decoration-none">Sign in</a></p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>



    </>
  )
}
