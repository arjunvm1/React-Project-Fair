import React, { useState } from 'react'
import { Collapse } from 'react-bootstrap';



function Profile() {
  const [open, setOpen] = useState(false);
  return (
    <div className='card shadow p-5 mt-5 me-2'>
      <div className="d-flex justify-content-between">
        <h1>Profile</h1>
        <button  onClick={() => setOpen(!open)} className="btn btn-outline-info"><i class="fa-solid fa-angle-down"></i></button>
      </div>
      <Collapse  in={open}>
      <div className="row justify-content-center mt-3">
        {/*upload  User Image */}

        <label>

          <input type="file" style={{display:'none'}} />
          <img src="https://media.istockphoto.com/id/1971510140/vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile.jpg?s=612x612&w=0&k=20&c=OY8z4DbkrPrv7r-kXQDjFZYAPDj1q5rlhrIeyrrM_yw=" height={'200px'} width={'200px'} className='rounded circle' alt="" />
          
        </label>
          <div className="mt-3">
            <input type="text" className='form-control' placeholder='Github' />
            <br />
            <input type="text" className='form-control' placeholder='LinkedIn' />

          </div>

          <div className="mt-3 text-align-center d-grid">
            <button className="btn btn-warning d-grid">Update</button>
          </div>
      </div>
      </Collapse>
      
    </div>
  )
}

export default Profile