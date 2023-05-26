/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Operator from './Org.js';
const Argument = () => {
  const [argument, setArguments] = useState([{ value: 'myarg', label: 'myarg', answer: 'false', selected: true }]);
  const [largeMap, setLargeMap] = useState(new Map());

  useEffect(() => {
    setValue();
  }, [argument]);

  const setArgument = (index) => {
    const argumentValue = document.getElementsByClassName('myarg')[index].value;
    const updatedArguments = [...argument];
    const argValue = document.getElementsByClassName('mySelect')[index].value;

    updatedArguments[index] = { value: argumentValue, label: argumentValue, answer: argValue };
    setArguments(updatedArguments);
    setValue();
  };

  const constant = [
    { value: 'false', label: 'false', answer: 'false', selected: true },
    { value: 'true', label: 'true', answer: 'true' },
  ];

  const setValue = () => {
    const argumentMap = new Map();

    argument.forEach((data) => {
      argumentMap.set(data.value, data.answer);
    });

    constant.forEach((data) => {
      argumentMap.set(data.value, data.answer);
    });

    setLargeMap(argumentMap);
  };

  const addArgument = () => {
    const updatedArguments = [...argument];
    updatedArguments.push({});
    setArguments(updatedArguments);
  };

  return (
    <>
      <div style={{ marginTop: '25px', marginLeft: '30px' }}>
        <div id="argContainer">
          {argument.map((data, index) => (
            <div key={index}>
              <input
                type="text"
                value={data.value}
                name="arg"
                className="myarg"
                placeholder="newarg"
                onChange={() => setArgument(index)}
              />
              <select className="mySelect" onChange={() => setArgument(index)}>
                <option value="false">False</option>
                <option value="true">True</option>
              </select>
            </div>
          ))}
        </div>
        <button id="btn" onClick={addArgument}>
          + Add Arg
        </button>
        <br />
        <Operator argument={argument} largeMap={largeMap} constant={constant} />
      </div>
    </>
  );
};

export default Argument;
