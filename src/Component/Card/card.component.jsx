import React from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ReportImage from '../../Pages/Dashboard/images/report.png';
import DonateImage from '../../Pages/Dashboard/images/donate.png';
import UsageImage from '../../Pages/Dashboard/images/usage.png';
import ItemImage from '../../Pages/Dashboard/images/item.png';

function TaskCard(props) {

  return (
    
    <Card border="secondary" style={{ width: '15rem' }} >
       <Card.Img variant="top" src={props.title === 'रिपोर्ट'? ReportImage : props.title === 'देणगी' ? DonateImage : props.title === 'खर्च' ? UsageImage:ItemImage} />
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text>
          {props.text}
        </Card.Text>
        <Button variant="primary" href={props.path}>{props.title}</Button>
      </Card.Body>
    </Card>
  );
}

export default TaskCard;