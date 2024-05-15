import React, { useContext } from 'react'
import { Container, Navbar } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { tokenAuthorizationContext } from '../context/TokenAuth'



function Header({insideDashboard}) {

  const navigate =useNavigate()
  const {isAuthorized,setIsAuthorized} = useContext(tokenAuthorizationContext)
  const handleLogOut = () => {
    //remove details from the sessionstorage
    sessionStorage.removeItem("existingUser")
    sessionStorage.removeItem('token')
    setIsAuthorized(false);
    // navigate to landing page
    navigate('/')
  }
  return (
    <div>
       <Navbar style={{zIndex:'1'}} className="bg-info position-fixed top-0 w-100">
        <Container>
          <Navbar.Brand>
            <Link to ={'/'} style={{textDecoration:'none',color:'white',fontSize:'30px'}}> <i className="fa-solid fa-list-check me-2"></i> </Link>
            Project Fair 
          </Navbar.Brand>
          {
            insideDashboard &&
            <button className="btn btn-danger  align-items-right border" onClick={handleLogOut}>
              Logout
            </button>
          }
        </Container>
      </Navbar>
    </div>
  )
}

export default Header