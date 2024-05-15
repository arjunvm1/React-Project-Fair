import React, { useContext, useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { BASE_URL } from '../services/baseurl'
import { editProjectAPI } from '../services/allAPI'
import { editProjectResponsecontext } from '../context/ContextShare'

function EditProject({project}) {
  const {editProjectResponse, setEditProjectResponse} = useContext(editProjectResponsecontext)

  const [show, setShow] = useState(false)
  const handleClose = () => {setShow(false)
    setProjectDetails({
      id:project._id, title:project.title, languages:project.languages, github:project.github, website:project.website, overview:project.overview, projectImage:""
    })
   setPreview("")
  }
  const handleShow = () => setShow(true)


  const [projectDetails, setProjectDetails] = useState({
   id:project._id, title:project.title, languages:project.languages, github:project.github, website:project.website, overview:project.overview, projectImage:""
   });
 
 
   console.log(projectDetails);
 
   const [preview,setPreview] = useState("")
 
   useEffect(()=>{
     if(projectDetails.projectImage){
       setPreview(URL.createObjectURL(projectDetails.projectImage))
     }
   },[projectDetails.projectImage])


   const handleUpdate = async () => {
    const {id, title, languages, github, website, overview ,projectImage} = projectDetails
    if(!title || !languages || !github || !website || !overview ){
      alert("please fill all the missing fields...")
    }else{
      const reqBody = new FormData()
      reqBody.append('title',title)
      reqBody.append('languages',languages)
      reqBody.append('github',github)
      reqBody.append('website',website)
      reqBody.append('overview',overview)
      preview ? reqBody.append('projectImage',projectImage) : reqBody.append("projectImage", project.projectImage)

      const token = sessionStorage.getItem("token")

      if(preview) {
        const reqHeader = {
          "Content-Type": "multipart/form-data",
          "Authorization":`Bearer ${token}`
        }
        //api call

        const result = await editProjectAPI(id,reqBody,reqHeader)
        if(result.status === 200) {
          handleClose()
            //pass the response to MyProjects
            setEditProjectResponse(result.data)
        }else{
          console.log(result);
          alert(result.response.data)
        }

        }else{
          const reqHeader = {
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
          }
          //api call
          const result = await editProjectAPI(id,reqBody,reqHeader)
          if(result.status ===200) {
            handleClose()
              //pass the response to MyProjects
            setEditProjectResponse(result.data)

          }else{
            console.log(result);
            alert(result.response.data)
          }
        }
      }
    }
  
   

  return (
   <>
      <button onClick={handleShow} className='btn'><i class='fa-solid fa-pen-to-square'></i></button>

{/* modal */}

    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>EDIT PROJECT DETAILS</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-lg-6">
              <label>
                <input type="file" style={{ display: "none" }} onChange={e=>setProjectDetails({...projectDetails, projectImage: e.target.files[0]})}/>
                <img src={preview ? preview : `${BASE_URL}/uploads/${project.projectImage}`} alt='profilepic'  width={'300px'}  />
              </label>
            </div>

            <div className="col-lg-6">
              <div className="mb-3">
              <input type="text" className="form-control" placeholder="Project Title" value={projectDetails?.title}
              onChange={e=>setProjectDetails({...projectDetails, title:e.target.value})}
                 />
              </div>

              <div className="mb-3">
                <input type="text" className="form-control" placeholder="Languages Used" value={projectDetails?.languages}
                onChange={e=>setProjectDetails({...projectDetails, languages:e.target.value})}
                 />
              </div>

              <div className="mb-3">
                <input type="text" className="form-control" placeholder="Github" value={projectDetails?.github}
                onChange={e=>setProjectDetails({...projectDetails, github:e.target.value})}
                 />
              </div>

              <div className="mb-3">
                <input type="text" className="form-control" placeholder="Website" value={projectDetails?.website}
                onChange={e=>setProjectDetails({...projectDetails, website:e.target.value})}

                />
              </div>

              <div className="mb-3">
                <input type="text" className="form-control" placeholder="Project Overview" value={projectDetails?.overview}
                onChange={e=>setProjectDetails({...projectDetails, overview:e.target.value})}

                />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpdate}>Update</Button>
        </Modal.Footer>
      </Modal>

   </>
  )
}

export default EditProject