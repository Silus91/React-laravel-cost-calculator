import React, { useEffect } from "react";
import M from "materialize-css";

const Collapsible = (props) => {
  useEffect(() => {
    M.AutoInit();
  }, []);

  return (
    <div>
      <ul className='collapsible'>
        <li>
          <div className='collapsible-header'>
            <i className='material-icons'>{props.icon}</i>
            {props.title}
          </div>
          <div className='collapsible-body'>
            <div className=''>{props.children}</div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Collapsible;
