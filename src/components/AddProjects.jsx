import React, { useContext, useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { addProjectAPI } from '../services/allAPI';
import { addProjectResponseContext } from '../context/ContextShare';

function AddProjects() {
  const {addProjectResponse, setAddProjectResponse} = useContext(addProjectResponseContext)

  const [token,setToken] = useState("")

  const [projectDetails,setProjectDetails] = useState({
    title:"",languages:"",github:"", website: "",overview:"",projectImage:""
  })

  const [preview,setPreview] = useState("")


  useEffect(() =>{
    if(projectDetails.projectImage){
      setPreview(URL.createObjectURL(projectDetails.projectImage))
    }
  },[projectDetails.projectImage])

  // console.log(projectDetails);

  useEffect(() =>{
    if(sessionStorage.getItem("token")){
      setToken(sessionStorage.getItem("token"))
    }else{
      setToken("")
    }
  },[])

  const handleAdd = async (e) =>{
    e.preventDefault()
    const {title,languages,github,website,overview,projectImage} = projectDetails;

    if(!title || !languages || !github || !website || !overview || !projectImage){
      toast.error("please fill all missing fields...")
    }else{
      const reqBody = new FormData()
      reqBody.append('title',title)
      reqBody.append('languages',languages)
      reqBody.append('github',github)
      reqBody.append('website',website)
      reqBody.append('overview',overview)
      reqBody.append('projectImage',projectImage)

     if(token){
      const reqHeader = {
        "Content-Type": "multipart/form-data",
        "Authorization":`Bearer ${token}`
      }
      const result = await addProjectAPI(reqBody,reqHeader)
      if(result.status === 200){
        console.log(result.data);
        handleClose()
        // toast.success("Project added successfully!")
        setAddProjectResponse(result.data)
      }else{
        console.log(result);
        console.log(result.response.data);
     }

      }

    }
  }

    const [show, setShow] = useState(false);

    const handleClose = () => {
      setShow(false);
      setPreview("")
      setProjectDetails({
        title:"",languages:"",github:"",overview:"",projectImage:""
      })
    }
    const handleShow = () => setShow(true);
  return (
    <div>
              <Button variant="primary" onClick={handleShow}>
        Add Projects
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size='lg'
      >
        <Modal.Header closeButton>
          <Modal.Title>Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">


            <div className="col-md-6">
            <label>
            <input type="file" style={{display:'none'}}
             onChange={e =>setProjectDetails({...projectDetails,projectImage:e.target.files[0]})} />
            <img src={preview?preview:"https://www.russorizio.com/wp-content/uploads/2016/07/ef3-placeholder-image-300x203.jpg"}  width={'300px'}  alt="" />
            </label>
            </div>


            <div className="col-md-6">
                <div className="mb-3">
                    <input type="text" className='form-control' placeholder="Project title" value={projectDetails.title} 
                    onChange={e=>setProjectDetails ({...projectDetails,title: e.target.value}) }/>
                </div>
                <div className="mb-3">
                <input type="text" className='form-control' placeholder="Languages used" value={projectDetails.languages} 
                onChange={e=>setProjectDetails ({...projectDetails,languages: e.target.value})}/>
                </div>
                <div className="mb-3">
                <input type="text" className='form-control' placeholder="Github Link" value={projectDetails.github} 
                onChange={e=>setProjectDetails ({...projectDetails,github: e.target.value})}/>
                </div>
                <div className="mb-3">
                <input type="text" className='form-control' placeholder="Website Link" value={projectDetails.website} 
                onChange={e=>setProjectDetails ({...projectDetails,website: e.target.value})}/>
                </div>
                <div className="mb-3">
                <input type="text" className='form-control' placeholder="Project Overview" value={projectDetails.overview} 
                onChange={e=>setProjectDetails ({...projectDetails,overview: e.target.value})}/>
                </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button onClick={handleAdd} variant="primary">Add</Button>
        </Modal.Footer>
      </Modal>
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

export default AddProjects