import React, { useContext, useEffect, useState } from "react"
import AddProjects from "./AddProjects"
import { deleteProjectAPI, userprojectAPI } from "../services/allAPI"
import { addProjectResponseContext, editProjectResponsecontext } from "../context/ContextShare"
import { Alert } from "react-bootstrap"
import EditProject from "./EditProject"


function Myprojects() {
  //define the function for user added projects

  //set a state for storing user projects
  const [userProjects, setUserProjects] = useState([])
  const { addProjectResponse, setAddProjectResponse } = useContext(addProjectResponseContext)
  const { editProjectResponse, setEditProjectResponse } = useContext(editProjectResponsecontext)


  console.log(userProjects);
  //define the getUserProject function
  const getUserProjects = async () => {
    if (sessionStorage.getItem("token")) {
      const token = sessionStorage.getItem("token")
      const reqHeader = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      }
      const result = await userprojectAPI(reqHeader) //api call
      if (result.status === 200) {
        setUserProjects(result.data)
        console.log(result.data);
      } else {
        console.log(result)
        console.log(result.response.data)
      }
    }
  }

  useEffect(() => {
    getUserProjects()
  }, [addProjectResponse, editProjectResponse])

  const handleDelete = async (id) => {
    const token = sessionStorage.getItem("token")
    const reqHeader = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    }
    const result = await deleteProjectAPI(id, reqHeader)
    if (result.status === 200) {
      //page reload
      getUserProjects()
    } else {
      alert(result.data.message)
    }
  }

  return (
    <div className="card shadow p-3 mt-3">
      <div className="d-flex">
        <h1>My Projects</h1>
        <div className="ms-auto">
          <AddProjects />
        </div>
      </div>

      {/* alert */}
      {addProjectResponse.title ? (
        <Alert className="bg-success text-warning" dismissible>
          {" "}
          <span className="text-light fw-bolder"> {addProjectResponse.title} </span>Added successfully{" "}
        </Alert>
      ) : null}

      <div className="mt-4">
        {/* collection of projects */}
        {userProjects?.length > 0 ? 
          userProjects.map(project => (
            <div className="border d-flex align-items-center rounded p-2">
              <h5>{project.title}</h5>
              <div className="icons ms-auto">
                <EditProject project={project} />
                <a href={`${project.github}`} target="_blank" className="btn">
                  <i class="fa-brands fa-github"></i>
                </a>
                <button className="btn" onClick={() => handleDelete(project._id)}>
                  <i class="fa-solid fa-trash"></i>
                </button>
              </div>
            </div>
          ))
         : 
          <p className="text-danger fw-bolder fs-5">No Projects Uploaded Yet !</p>
        }
      </div>
    </div>
  )
}

export default Myprojects
