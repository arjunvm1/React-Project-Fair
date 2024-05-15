import React, { useContext, useState } from 'react'
import { Form } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { loginAPI, registerAPI } from '../services/allAPI';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { tokenAuthorizationContext } from '../context/TokenAuth';




function Auth({register}) {
  const {isAuthorized,setIsAuthorized} = useContext(tokenAuthorizationContext)
  const navigate = useNavigate()
  const [userData,setUserdata] = useState({username:"",email:"",password:""})
  console.log(userData);

  const isRegisterForm = register?true:false

  //register
  const handleRegister = async (e)=>{
    e.preventDefault()
    const {username,email,password} = userData

    if(!username ||!email || !password){
      toast.error("please fill the missing fields")
    }else{
      const result = await registerAPI(userData)
      console.log(result);
      if(result.status==200){
        console.log(result);
        toast.success(`${result.data.username} registered successfully`)
        setUserdata({username:"",email:"",password:""})
        navigate('/login')
      }else{
        toast.error(result.response.data)
      }
    }
  }


  const handleLogin = async (e) =>{
    e.preventDefault()
    const {email,password} = userData

    if(!email || !password){
      toast.error("please fill the missing fields")
    }else{
      const result = await loginAPI(userData)
      console.log(result);
      if(result.status==200){
        console.log(result);
        // toast.success(`${result.data.username} registered successfully`)
        sessionStorage.setItem("existingUser",JSON.stringify(result.data.existingUser))
        sessionStorage.setItem("token",result.data.token)
        setIsAuthorized(true)
        setUserdata({
          email:"",password:""
        })
        navigate('/')
      }else{
        toast.error(result.response.data)
        console.log(result);
      }
    }
  }





  return (
    <div style={{width:'100',height:'100vh', marginTop:'100px'}} className='d-flex justify-content-center '>
      <div className="container w-75 ">
        <Link to={'/'} style={{textDecoration:'none',color:'blue'}}><i class="fa-solid fa-arrow-left"></i>Back To Home</Link> 
        
        <div className="card shadow p-5 bg-info">
          <div className="row align-items-center ">
            <div className="col-lg-6">
              <img src="https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-83.jpg?size=626&ext=jpg&ga=GA1.1.109004980.1701787441&semt=sph" className='rounded start w-100' alt="" />
            </div>
            <div className="col-lg-6">
              <div className="d-flex align-items-center flex-column">
                <h1 className="fw-bolder text-light mt-2"><i class="fa-brands fa-stack-overflow"></i> Project Fair</h1>
                <h5 className="fw-bolder mt-4 pb-3 text-align">
                  {
                    isRegisterForm?'SignUp to your account':'SignIn to your Account'
                  }
                </h5>
                  <Form className='text-light w-100'>
                  {
                    isRegisterForm &&
                     <Form.Group className="mb-3" controlId="formBasicEmail">
                     
                     <Form.Control type="email" placeholder="Enter username" value={userData.username} onChange={e=>setUserdata({...userData,username:e.target.value})}/>
                     
                   </Form.Group>
             
                  }
                     <Form.Group className="mb-3" controlId="formBasicEmail">
                     
                     <Form.Control type="email" placeholder="Enter Email"  value={userData.email} onChange={e=>setUserdata({...userData,email:e.target.value})}/>
                     
                   </Form.Group>

                   <Form.Group className="mb-3" controlId="formBasicEmail">
                     
                     <Form.Control type="email" placeholder="Enter Password"  value={userData.password} onChange={e=>setUserdata({...userData,password:e.target.value})}/>
                     
                   </Form.Group>

                   {
                    isRegisterForm?
                    <div>
                      <div className="button btn btn-warning mb-2" onClick={handleRegister}>
                        Register
                      </div>
                      <p>Already Have An Account? Click Here To <Link to={'/login'} style={{textDecoration:'none',color:'blue'}}>Login</Link> </p>
                    </div>:
                    <div>
                    <div className="button btn btn-success mb-2" onClick={handleLogin}>
                      Login
                    </div>
                    <p>Dont't Have An Account? Click Here To <Link to={'/register'} style={{textDecoration:'none',color:'red'}}>Register</Link> </p>
                  </div>

                   }



                  </Form>




              </div>
            </div>
          </div>
        </div>
      </div>
      
    <ToastContainer
     position="top-center"
     autoClose={3000}
     hideProgressBar={true}
     newestOnTop={false}
     closeOnClick
     rtl={false}
     pauseOnFocusLoss
     draggable
     pauseOnHover
     theme="light"
     />
    </div>
  )
}

export default Auth