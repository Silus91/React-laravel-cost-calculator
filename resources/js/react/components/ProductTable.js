import React, { useState } from "react";
import TextInput from "./TextInput";
import Divider from "./Divider";
import './list.css';

const ProductTable = (props) => {

  const [state, setState] = useState({
    usedWeight: 0,
    totalCost: 0,
    totalWeight: 0,
  });

  const handleChange = (event) => {
    const eventTargetValue = parseFloat(event.target.value);
    const sumTotalCost = totalValue(eventTargetValue);
    const sumTotalWeight = totalWeight(eventTargetValue);

    setState({
      ...state,
      usedWeight: event.target.value,
      totalCost: (state.totalCost = sumTotalCost),
      totalWeight: (state.totalWeight = sumTotalWeight),
    });
  };

  const sumUpTotal = (array) => {
    array.reduce((prev, next) => {
      return parseFloat(prev + next);
    }); 
  }

  const totalValue = (eventTargetValue) => {
    const arr = props.product.components.map((component) => {
      if (component.id === props.product.components[0].id) {
        return eventTargetValue * component.ingredientRatio;
      } else {
        return (
          component.productRatio * eventTargetValue * component.ingredientRatio
        );
      }
    });
    sumUpTotal(arr);
  };

  const totalWeight = (eventTargetValue) => {
    const arr = props.product.components.map((component) => {
      if (component.id === props.product.components[0].id) {
        return eventTargetValue;
      } else {
        return component.productRatio * eventTargetValue;
      }
    });
    sumUpTotal(arr);
  };

  const renderRatio = (product, component) => {
    if (component.id === product.components[0].id) {
      return (
        <form>
          <TextInput
            type='number'
            name='usedWeight'
            className='validate'
            onChange={handleChange}
            htmlFor='usedWeight'
            label='Used Weight'
          />
        </form>
      );
    } else {
      const usedComponentWeight = component.productRatio * state.usedWeight;
      return parseFloat(usedComponentWeight).toFixed(2);
    }
  };

  const tableTitle = ["Name", "Weight", "Used Weight"];

  return (
    <li key={props.product.id}>
      <div className='collapsible-header'>{props.product.productName}</div>
      <div className='collapsible-body bodyPadding'>
        <div className=''>
          <h3>{props.product.productName}</h3>
          <table className='striped'>
            <thead>
              <tr>
                {tableTitle.map((title) => {
                  return <td key={title}>{title}</td>;
                })}
              </tr>
            </thead>
            <tbody>
              {props.product.components.map((component) => {
                return (
                  <tr key={component.id}>
                    <td>{component.ingredientName}</td>
                    <td>{component.componentWeight}</td>
                    <td>{renderRatio(props.product, component)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className='divider'></div>
          <div>Total Cost:<p className='red-text'>{parseFloat(state.totalCost).toFixed(2)}</p></div>
          <div>Total Weight:<p className='red-text'>{parseFloat(state.totalWeight).toFixed(2)}</p></div>
        </div>
        <div>
          <Divider
            totalWeight={state.totalWeight}
            totalCost={state.totalCost}
          />
        </div>
      </div>
    </li>
  );
};

export default ProductTable;