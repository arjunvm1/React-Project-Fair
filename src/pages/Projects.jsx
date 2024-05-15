import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import ProjectCard from "../components/ProjectCard";
import { Col, Row } from "react-bootstrap";
import { allProjectAPI } from "../services/allAPI";


function Projects() {
const [searchkey, setSearchKey] = useState("")
const [allProjects, setAllProjects] = useState([])

const getAllProjects = async () => {
  if(sessionStorage.getItem('token')){
   const token = sessionStorage.getItem( 'token' )
   const reqHeader= {
    "Content-Type":"application/json",
    "Authorization": `Bearer ${token}`
   }

   const result = await allProjectAPI(searchkey,reqHeader)
   if(result.status === 200){
    setAllProjects(result.data);
   }else{
    console.log(result.response);
   }
  }
}
console.log(allProjects);

useEffect(() =>{ 
  getAllProjects()
}, [searchkey])


  return (
    <>
      <Header />
      <div style={{ marginTop: "100px" }} className="projects">
        <h1 className="text-center mb-5">All Projects</h1>
        <div className="d-flex justify-content-center  w-100">
          <div className="d-flex border w-50 rounded mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search projects By Tech..."
              value={searchkey}
              onChange={e=>setSearchKey(e.target.value)}
            />
            <i
              style={{
                marginLeft: "-30px",
                color: "#182123",
                marginTop: "18px",
              }}
              class="fa-solid fa-magnifying-glass fa-lg"
            ></i>
          </div>
        </div>
      </div>

      <Row>
        {allProjects?.length>0?allProjects?.map(project =>(
           <Col className="d-flex justify-content-center g-4" xl={6}>

          <ProjectCard project={project}/>
          
        </Col>
        )): <p className="text-danger text-center">please login</p>
      }
      </Row>
    </>
  );
}

export default Projects;
