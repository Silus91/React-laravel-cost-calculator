import React from "react";

const ComponentList = ({ components }) => {
  return (
    <div className='card-content'>
      <table className='centered'>
        <thead>
          <tr>
            <th>Component Name</th>
            <th>Component Cost</th>
          </tr>
        </thead>
        <tbody>
          {components.map((component) => {
            const { id, ingredientName, componentCost } = component;
            return (
              <tr key={id}>
                <td className='flow-text'>{ingredientName}</td>
                <td className='flow-text'>
                  {parseFloat(componentCost).toFixed(2)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ComponentList;
