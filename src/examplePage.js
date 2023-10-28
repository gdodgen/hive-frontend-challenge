import Dropdown from './dropdown/dropdown';
import React, { useState } from 'react';

export default function ExamplePage(){
  const [selectedSingle, setSelectedSingle] = useState()
  const [selectedMultiple, setSelectedMultiple] = useState([])
  function handleSelectSingle(value){
    setSelectedSingle(value)
  }
  function handleSelectMultiple(array){
    setSelectedMultiple(array)
  }

  return (
    <div>
      <h3>Drop Down Component Example</h3>
      <div className="examplePage">
        <Dropdown 
            style={{marginTop:"10px", marginBottom:"10px"}}
            options = {["Example Option 1", "Example Option 2", "Example Option 3"]}
            onSelect = {handleSelectSingle}
            label = "Single Select Example:"
          ></Dropdown>
          You Selected: {selectedSingle}
          <Dropdown
            style={{marginTop:"10px", marginBottom:"10px"}}
            options = {["Example Option 1", "Example Option 2", "Example Option 3", "Example Option 4", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."]}
            isMultiSelect = {true}
            label = "Multi Select Example:"
            onSelect = {handleSelectMultiple}
            placeholder = "Select Multiple"
            width = {400}
          ></Dropdown>
          You Selected: {selectedMultiple.map((option, i)=> i !== 0 ? <span key={option}>, {option} </span>: <span key={option}>{option}</span>)}
      </div>
      <h3>Props</h3>
      <div className="props-table"> 
        <table>
          <thead>
            <tr>
              <th>Prop</th>
              <th>Description</th>
              <th>Type</th>
              <th>Required</th>
              <th>Default</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>options</td>
              <td>Array of options for the dropdown</td>
              <td>array</td>
              <td>Yes</td>
              <td></td>
            </tr>
            <tr>
              <td>onSelect</td>
              <td>onSelect callback</td>
              <td>function</td>
              <td>Yes</td>
              <td></td>
            </tr>
            <tr>
              <td>isMultiselect</td>
              <td>Used to indicate single or multiple select style dropdown</td>
              <td>boolean</td>
              <td>No</td>
              <td>false</td>
            </tr>
            <tr>
              <td>label</td>
              <td>Label that appears above the dropdown</td>
              <td>string</td>
              <td>No</td>
              <td>none</td>
            </tr>
            <tr>
              <td>placeholder</td>
              <td>Text that appears inside the menu before selecting an option</td>
              <td>string</td>
              <td>No</td>
              <td>"Select"</td>
            </tr>
            <tr>
              <td>width</td>
              <td>Used to set custom width of the drowdown element in pixels</td>
              <td>number</td>
              <td>No</td>
              <td>180</td>
            </tr>
            </tbody>
        </table>
      </div>
    </div>
  );
}
