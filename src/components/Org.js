/* eslint-disable no-redeclare */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';

// Default options for the operator select dropdown
const defaultOptions = [
  { value: 'select', label: 'Select', disabled: true },
  { value: 'constant', label: 'Constant', disabled: false },
  { value: 'argument', label: 'Argument', disabled: false },
  { value: 'And', label: 'And', disabled: false },
  { value: 'Or', label: 'Or', disabled: false },
];

// Default select option
const selectOption = {
  select: 'select',
};

const Operator = (props) => {
  const [currentOption, setCurrentOption] = useState(['select']);
  const [selectValue, setSelectValue] = useState([selectOption]);
  const [result, setResult] = useState('undefined');
  const [globalIndex, setGlobalIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState([defaultOptions]);
  const [optionName, setOptionName] = useState(['default']);
  const [addButton, setAddButton] = useState([]);
  const [globalValue, setGlobalValue] = useState('undefined');

  useEffect(() => {
    addResult(globalValue);
    let addOption = [...selectedOption];
    optionName.forEach((data, index) => {
      if (data === 'argument') {
        addOption[index] = props.argument;
      }
    });
    addArgument(addOption);
  }, [props.largeMap, currentOption]);

  const addArgument = (addOption) => {
    setSelectedOption(addOption);
  };

  const addResult = (finalValue) => {
    if (selectValue.length === 1) {
      setResult(props.largeMap.get(finalValue) ? props.largeMap.get(finalValue) : 'undefined');
    } else {
      currentOption.forEach((data, index) => {
        if (data === 'and' || data === 'And') {
          if (props.largeMap.get(currentOption[index + 1]) === 'false') {
            setResult('false');
          } else if (props.largeMap.get(currentOption[index + 1]) === 'true') {
            if (props.largeMap.get(currentOption[index + 2]) === 'true') {
              setResult('true');
            } else {
              setResult('false');
            }
          }
        }
        if (data === 'or' || data === 'Or') {
          if (props.largeMap.get(currentOption[index + 1]) === 'false') {
            if (props.largeMap.get(currentOption[index + 2]) === 'false') {
              setResult('false');
            } else {
              setResult('true');
            }
          } else if (props.largeMap.get(currentOption[index + 1]) === 'true') {
            setResult('true');
          }
        }
      });
    }
  };

  const operatorOptions = [
    { value: 'and', label: 'And', selected: true },
    { value: 'or', label: 'Or' },
  ];

  const operatorOrOptions = [
    { value: 'or', label: 'Or', selected: true },
    { value: 'and', label: 'And' },
  ];

  const addAction = (e, index) => {
    const getSelectValue = document.getElementsByClassName('operator')[index].value;
    let finalValue = getSelectValue;
    finalValue = getSelectValue === 'argument' ? props.argument[0].value : getSelectValue;
    const addCurrentOption = [...currentOption];
    addCurrentOption[index] = finalValue;
    setCurrentOption(addCurrentOption);

    setGlobalValue(finalValue);

    addResult(finalValue);

    if (getSelectValue === 'constant') {
      let addOptionName = [...optionName];
      addOptionName[index] = 'constant';
      setOptionName(addOptionName);

      finalValue = props.constant[0].value;
      setGlobalValue(finalValue);
      const addCurrentOption = [...currentOption];
      addCurrentOption[index] = finalValue;
      setCurrentOption(addCurrentOption);

      let addOption = [...selectedOption];
      addOption[index] = props.constant;
      setSelectedOption(addOption);

      var addSelect = [...selectValue];
      addSelect[index] = selectOption;
      setSelectValue(addSelect);

      addResult(finalValue);
      
    } else if (getSelectValue === 'argument') {
      let addOptionName = [...optionName];
      addOptionName[index] = 'argument';
      setOptionName(addOptionName);

      let addOption = [...selectedOption];
      addOption[index] = props.argument;
      setSelectedOption(addOption);

      var addSelect = [...selectValue];
      addSelect[index] = selectOption;
      setSelectValue(addSelect);

    } else if (getSelectValue === 'And' || getSelectValue === 'Or') {
      var addSelect = [...selectValue];
      addSelect[index] = selectOption;
      addSelect[index + 1] = selectOption;
      addSelect[index + 2] = selectOption;
      setSelectValue(addSelect);

      let addOption = [...selectedOption];
      addOption[index] = getSelectValue === 'And' ? operatorOptions : operatorOrOptions;
      addOption[index + 1] = defaultOptions;
      addOption[index + 2] = defaultOptions;

      let addNewButton = [...addButton];
      addNewButton[index + 1] = '';
      addNewButton[index + 2] = '';

      setAddButton(addNewButton);
      setSelectedOption(addOption);
      setGlobalIndex(index + 2);
    }
  };

  const resetSelect = (index) => {
    let addOptionName = [...optionName];
    addOptionName[index] = 'default';
    setOptionName(addOptionName);

    var addSelect = [...selectValue];
    addSelect[index] = selectOption;
    setSelectValue(addSelect);

    let addOption = [...selectedOption];
    addOption[index] = defaultOptions;
    setSelectedOption(addOption);

    setResult('undefined');
  };

  const addSelect = (index) => {
    const addSelect = [...selectValue];
    addSelect[index] = selectOption;
    setSelectValue(addSelect);
    setGlobalIndex(index);

    let addOption = [...selectedOption];
    addOption[index] = defaultOptions;
    setSelectedOption(addOption);
  };

  return (
    <>
      <div style={{ marginTop: '25px'}}>
        {selectValue.map((selectData, index) => (
          <div key={index}>
            <select
              className="operator"
              value={selectedOption[index] === defaultOptions ? selectData.select : currentOption[index]}
              onChange={(e) => addAction(e, index)}
            >
              {selectedOption[index].map((data, optionIndex) => (
                <option
                  key={optionIndex}
                  value={data.value}
                  answer={data.answer}
                  disabled={data.disabled}
                  selected={data.selected}
                >
                  {data.label}
                </option>
              ))}
            </select>

            <button onClick={() => resetSelect(index)}>x</button>
            <br />
          </div>
        ))}

        {addButton.map((data, index) => (
          <div key={index}>
            {(currentOption[index - 1] === 'And' ||
              currentOption[index - 1] === 'Or' ||
              currentOption[index - 1] === 'or' ||
              currentOption[index - 1] === 'and') && (
                <button onClick={() => addSelect(globalIndex + 1)}>+ Add Operator</button>
              )}
          </div>
        ))}

        <div style={{ marginTop: '10px' }}>Result: {result}</div>
      </div>
    </>
  );
};

export default Operator;