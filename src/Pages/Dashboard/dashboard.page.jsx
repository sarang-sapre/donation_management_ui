import React from "react";
import "../Dashboard/dashboard.css";
import TaskCard from "../../Component/Card/card.component";
import Items from "../Dashboard/data.json";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

function Dashboard() {

    return(
        <div className="main">
        <Row xs={1} md={4} className="g-4">
       {

        Items.map((e) => (
            <Col>
            <TaskCard {...e} />
            </Col>
        ))
       }
    </Row>
       </div>
)}

export default Dashboard