import React from 'react';
import { Accordion } from 'react-bootstrap';
import './style.css';

const CustomAccordion = (props) => {

    return (
        <Accordion defaultActiveKey="0">
        <Accordion.Item as={'article'} eventKey="0">
            <Accordion.Header>{props.title}</Accordion.Header>
            <Accordion.Body>
            {props.children}
            </Accordion.Body>
        </Accordion.Item>
        </Accordion>
    );
}

export default CustomAccordion;