/**
 * (C) 2024, HCL, Apache-2.0 License
 * A simple web component to display a top bar message
 */
import React from 'react';
import './DemoMessage.css';

const DemoMessage = ({ msg }) => {
  return (
    <div id="message" className="message">
      {msg}
    </div>
  );
};

export default DemoMessage;
