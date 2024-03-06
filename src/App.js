import React, { useState, useEffect } from 'react';
import { getAll, post, put, deleteById } from './memdb.js'
import './App.css';

function log(message){console.log(message);}

export function App(params) {
  let blankCustomer = { "id": -1, "name": "", "email": "", "password": "" };
  //let formObject = customers[0];
  const [customers, setCustomers] = useState([]);
  const [formObject, setFormObject] = useState(blankCustomer);
  const [selectedRow, setSelectedRow] = useState(null); // RD - Step 9 - Bold List Item - Added state for selected row
  
  let mode = (formObject.id >= 0) ? 'Update' : 'Add';
  useEffect(() => { getCustomers() }, []);


  const getCustomers =  function(){
    log("in getCustomers()");
    setCustomers(getAll());
  }

  const handleListClick = function(item){
    log("in handleListClick()");
    //RD - Extra Credit - Deselect List Item
    if (item.id === formObject.id) {
      setFormObject(blankCustomer);
      setSelectedRow(null);
    } else {
      setFormObject(item);
      setSelectedRow(item.id);
    }
    //setFormObject(item);
    //setSelectedRow(item.id); // RD - -Step 9 - Bold List Item - Set the selected row ID
  }  

  const handleInputChange = function (event) {
    log("in handleInputChange()");
  }

  let onCancelClick = function () {
    log("in onCancelClick()");
    setSelectedRow(null); //RD - Added to deselect List item
    setFormObject(blankCustomer);
  }

  let onDeleteClick = function () {
    log("in onDeleteClick()");
  }

  let onSaveClick = function () {
    log("in onSaveClick()");
  }

  return (
    <div>
      <div className="boxed" >
        <h4>Customer List</h4>
        <table id="customer-list">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Pass</th>
            </tr>
          </thead>
          <tbody>
            {customers.map(
              (item, index) => {
                return (<tr key={item.id} 
                  className={selectedRow === item.id ? 'selected' : ''} // RD - Step 9 - Bold List Item - Add 'selected' class if row is selected
                onClick={()=>handleListClick(item)} 
                >
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.password}</td>
                </tr>);
              }
            )}
          </tbody>
        </table>
    </div>
    <div className="boxed">
      <div>
        <h4>{mode}</h4>
      </div>
      <form >
        <table id="customer-add-update" >
          <tbody>
            <tr>
              <td className={'label'} >Name:</td>
              <td><input
                type="text"
                name="name"
                value={formObject.name}
                placeholder="Customer Name"
                required /></td>
            </tr>
            <tr>
              <td className={'label'} >Email:</td>
              <td><input
                type="email"
                name="email"
                value={formObject.email}
                placeholder="name@company.com" /></td>
            </tr>
            <tr>
              <td className={'label'} >Pass:</td>
              <td><input
                type="text"
                name="password"
                value={formObject.password}
                placeholder="password" /></td>
            </tr>
            <tr className="button-bar">
              <td colSpan="2">
                <input type="button" value="Delete" onClick={onDeleteClick} />
                <input type="button" value="Save" onClick={onSaveClick} />
                <input type="button" value="Cancel" onClick={onCancelClick} />
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
    </div>
  );
}

export default App;
