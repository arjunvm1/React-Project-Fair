import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { Col, Row } from "react-bootstrap";
import Myprojects from "../components/Myprojects";
import Profile from "../components/Profile";

function Dashboard() {

  //create a state to hold the existingUSer data from the sessionstorage
  
  const [username,setUsername] = useState("")

  useEffect(()=>{
    if(sessionStorage.getItem("existingUser")){
      setUsername(JSON.parse(sessionStorage.getItem("existingUser")).username) //stores the value from the existingUser key and store the it in the state as string
    }
  },[])


  return (
    <>
      <Header insideDashboard />
      <Row style={{ marginTop: "100px" }}>
        <Col sm={12} md={8}>
          <h2>
            Welcome <span className="text-warning">{username}</span>{" "}
          </h2>

          {/* Myprojects */}

          <Myprojects />
          
        </Col>

        <Col sm={12} md={4}>
          
          {/* Profile */}

          <Profile />

        </Col>
      </Row>
    </>
  );
}

export default Dashboard;
