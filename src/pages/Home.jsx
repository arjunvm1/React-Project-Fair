import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import titleimg from '../Assets/header.gif'
import ProjectCard from "../components/ProjectCard";
import { Link } from "react-router-dom";
import { homeProjectAPI } from "../services/allAPI";


function Home() {
    const [homeprojects,setHomeProjects] = useState([])  // Array of project objects to hold the projects fetched from API
    const [loggedin,setLoggedin] = useState(false)

    const getHomeProjects = async () => {
        const result = await homeProjectAPI()
        if(result.status === 200){
            setHomeProjects(result.data)
        }else{
            console.log(result);
            console.log(result.response);
        }
    }
    console.log(homeprojects);

    useEffect(()=>{
        if(sessionStorage.getItem("token")){
            setLoggedin(true)
        }else{
            setLoggedin(false)
        }

        //api call
        getHomeProjects()
    },[])

  return (
    <>
      <div className="container-fluid rounded bg-info ">
        <Row className="align-items-center p-5">
            <Col sm={12} md={6}>
                <h1 className="fw-bolder text-light"> <i className="fa-solid fa-list-check me-2"></i>Project-Fair </h1>
                <p className="align-items-justify">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi, tempora voluptas! Veritatis doloremque saepe deleniti inventore id nesciunt ad possimus.</p>

               {
               loggedin?
                <Link to={'/dashboard'} className="btn btn-warning"> Manage Your Projects <i class="fa-solid fa-right-long fa-beat ms-2"></i> </Link>:
                <Link to={'/login'} className="btn btn-warning"> Start to explore  <i class="fa-solid fa-right-long fa-beat ms-2"></i> </Link>
                }

            </Col>


            <Col sm={12} md={6}>
                <img  className="img-fluid" src={titleimg} alt="" />
            </Col>
        </Row>
        </div>

        <div  className="all-projects mt-5">
            <h1 className="text-center">Explore Your Projects</h1>
           <marquee scrollAmount={25}>
                <Row>
                    { homeprojects?.length>0?homeprojects.map(projects =>(

                    <Col sm={12} md={6} lg={4}>
    
                        <ProjectCard project = {projects} />
    
                    </Col>
                    )) : null
                    }
                </Row>
           </marquee>
            <div className="text-center"> <Link to={'/projects'}>View More Projects</Link> </div>
        </div>

      
    </>
  );
}

export default Home;
