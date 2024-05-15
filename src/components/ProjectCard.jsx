import React, { useState } from 'react'
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import { Col, Row } from 'react-bootstrap';
import { BASE_URL } from '../services/baseurl';


function ProjectCard({project}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
       {project && <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={project?`${BASE_URL}/uploads/${project?.projectImage}`:null} alt='Project Image' onClick={handleShow} />
      <Card.Body>
        <Card.Title className='text-center'>{project.title}</Card.Title>
      </Card.Body>
    </Card>}


    <Modal size='lg' show={show} onHide={handleClose} >
        <Modal.Header closeButton>
          <Modal.Title>{project.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body >
          <Row>
            <Col md={6}>
              <img style={{height:"200px", width:'250px'}} src={project?`${BASE_URL}/uploads/${project?.projectImage}`:null} alt="cardimg" height={'200px'} width={'240px'} className='img-fluid' />
            </Col>
            <Col md={6}>
              <h2>{project.title}</h2>
              <p>Project Overview: {project.overview}</p>
              <p>Languages used: <span className="fw-bolder">{project.languages}</span> </p>
            </Col>
          </Row>
          <div>
            <a href={project.github} className='me-3 btn text-dark '><i class="fa fa-brands fa-github fa-2x"></i> </a>
            <a href={project.website} className='me-3 btn text-dark '><i class="fa fa-solid fa-link fa-2x"></i> </a>
          </div>
        </Modal.Body>
       
      </Modal>
    </>
  )
}

export default ProjectCard