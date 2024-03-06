import React, { useState, useEffect } from 'react';
import { getAll, post, put, deleteById } from './memdb.js'
import './App.css';
import CustomerList from './CustomerList';
import CustomerAddUpdateForm from './CustomerAddUpdateForm';

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
    const name = event.target.name;
    const value = event.target.value;
      let newFormObject = {...formObject}
        newFormObject[name] = value;
      setFormObject(newFormObject);
  }

  let onCancelClick = function () {
    log("in onCancelClick()");
    setSelectedRow(null); //RD - Added to deselect List item
    setFormObject(blankCustomer);
  }

  let onDeleteClick = function () {
    if(formObject.id >= 0){
      deleteById(formObject.id);
      }
      setFormObject(blankCustomer);
  }

  let onSaveClick = function () {
    if (mode === 'Add') {
      post(formObject);
    }
    if (mode === 'Update') {
      put(formObject.id, formObject);
    }
    setFormObject(blankCustomer);
  }
  
  return (
    <div>
      <CustomerList
        customers={customers}
        selectedRow={selectedRow}
        handleListClick={handleListClick}
      />
      <CustomerAddUpdateForm
        formObject={formObject}
        handleInputChange={handleInputChange}
        onDeleteClick={onDeleteClick}
        onSaveClick={onSaveClick}
        onCancelClick={onCancelClick}
        mode={mode}
      />
    </div>
  );
}

export default App;