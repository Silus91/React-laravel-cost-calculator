import React from "react";
import './Collapsible.css';

const Collapsible = (props) => {

  return (
    <div>
      <ul className='collapsible'>
        <li>
          <div className={`collapsible-header ${props.headClassName}`}>
            <h4>{props.title}</h4>
          </div>
          <div className={`collapsible-body ${props.bodyClassName}`}>
            <div>{props.children}</div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Collapsible;
