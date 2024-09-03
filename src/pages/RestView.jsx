import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import ListGroup from 'react-bootstrap/ListGroup';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Collapse from 'react-bootstrap/Collapse';
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
function RestView() {
     // useParam() hook is used to get a parameter passed in URL 
    const {id} = useParams()
   
    console.log("parameter data");
    console.log(id);
    
    
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    //collapse
    const [open, setOpen] = useState(false);
    const allRestaurant = useSelector((state) => state.restaurantSlice.allRestaurant.restaurants);
    const selectedRestaurant = allRestaurant.find(item=>item.id==id)
    console.log(selectedRestaurant);
    
    return <>

        <Row className="mt-5 mb-5">
            <Col md={1}> </Col>
            <Col md={3}><img src={selectedRestaurant?.photograph} width='100%' height='100%' className="rounded mt-3" /></Col>
            <Col md={7} className="px-5">
                <hr />
                <h4 className="text-center">Restaurant <span className="text-warning">Details</span></h4>
                <hr />
                <ListGroup>
                    <ListGroup.Item><h5 className="text-center p-2">{selectedRestaurant?.name}</h5></ListGroup.Item>
                    <ListGroup.Item>Neighbourhood:{selectedRestaurant?.neighborhood}</ListGroup.Item>
                    <ListGroup.Item>Address:{selectedRestaurant?.address}</ListGroup.Item>
                    <ListGroup.Item>Cuisine Type:{selectedRestaurant?.cuisine_type}</ListGroup.Item>
                    <ListGroup.Item className="text-center p-3 mb-2">


                        <button className="btn btn-warning" onClick={handleShow}>Operating Hours</button>
                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Operating Hours</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <ListGroup>
                                    <ListGroup.Item>Monday</ListGroup.Item>
                                    <ListGroup.Item>Tuesday</ListGroup.Item>
                                    <ListGroup.Item>Wednesday</ListGroup.Item>
                                    <ListGroup.Item>Thursday</ListGroup.Item>
                                    <ListGroup.Item>Friday</ListGroup.Item>
                                    <ListGroup.Item>Saturday</ListGroup.Item>
                                    <ListGroup.Item>Sunday</ListGroup.Item>
                                </ListGroup>
                            </Modal.Body>

                        </Modal>
                        <button className="btn btn-warning ms-3" onClick={() => setOpen(!open)}>Click Here to See Reviews</button>

                    </ListGroup.Item>
                </ListGroup>
            </Col>
        </Row>
        <Row>
            <Col md={4}></Col>
            <Col md={7}>
                <Collapse in={open}>
                    <div>
                       
                        {
                            selectedRestaurant?.reviews?.length > 0 ?
                            selectedRestaurant.reviews.map((item)=>(
                                <div>
                                     <hr />
                                     <div className="mt-2">
                            <h6>Name And Date:{item.name}-{item.date}</h6>
                            <p>Rating{item.rating}</p>
                            <p>Description{item.comments}</p>
                        </div>
                                </div>
                                
                            ) ):
                            <p>No review </p>
                        }
                       
                    </div>
                </Collapse>
            </Col>
        </Row>


    </>;
}

export default RestView;
