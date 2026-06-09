import React from 'react'
import { useFormik } from 'formik'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup'; 
import { useState , useContext } from 'react'; 
import { userContext } from '../../context/userContext';

export default function Login() {

    let { isLogin,setLogin } = useContext(userContext)

  let [apiError , setError] = useState('');

  let navigate = useNavigate();

 async function handleLogin(formData){
    console.log('Login' , formData);

    
    //call API
    await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin' , formData)
    .then( (response)=>{console.log('response' , response);
    if(response.data.message == 'success'){     
      localStorage.setItem('userToken' , response.data.token)
      setLogin(response.data.token);
      navigate('/') //programmitic routing
    }} )

    .catch( (error)=>{console.log(error.response.data.message)
      setError(error.response.data.message)
    } )
    

  }


    // validation form

 let validationSchema =  Yup.object({
    email: Yup.string().required('email is required').email('enter valid email'),
    password: Yup.string().required('password is required').matches(/^[A-Z][a-z0-9]{6,8}$/ , 'password is not valid'),
  })

 
  let formik = useFormik( {
    initialValues:{
      email:'',   
      password:'', 
    },

    validationSchema: validationSchema, 

    onSubmit: handleLogin
  } )




  return (
    <>

<section className="bg-light py-3 py-md-5">
  <div className="container">
    <div className="row justify-content-center">
      <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4">
        <div className="card border border-light-subtle rounded-3 shadow-sm">
          <div className="card-body p-3 p-md-4 p-xl-5">

            <h2 className="fs-12 fw-bold text-center text-danger mb-4">Login Now</h2>
            
          {apiError?
          <div className='text-danger bg-danger-subtle p-3 rounded-2 mb-3'>{apiError}</div>   
          : null  
          }

            <form onSubmit={formik.handleSubmit} action="#!">
              <div className="row gy-2 overflow-hidden">

                

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
                  <div className="d-grid my-3">
                    <button className="btn btn-danger btn-lg" type="submit">Login Now</button>
                  </div>
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
