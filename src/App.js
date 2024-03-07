import React, { useState, useEffect } from 'react';
import { getAll, post, put, deleteById } from './restdb.js'
import './App.css';
import CustomerList from './CustomerList';
import CustomerAddUpdateForm from './CustomerAddUpdateForm';

function log(message) {
  console.log(message);
}

export function App(params) {
  let blankCustomer = { "id": -1, "name": "", "email": "", "password": "" };
  let items = []; // RD - Array to store items

  const [customers, setCustomers] = useState([]); // RD - State variable for customers
  const [formObject, setFormObject] = useState(blankCustomer); // RD - State variable for the form data
  const [selectedRow, setSelectedRow] = useState(null); // RD - State variable for the selected row
  const [mode, setMode] = useState('Add'); // RD - State variable for the mode (Add or Update)

const nameValidationRegex = /^[a-zA-Z\s]+$/; //RD - Googled Syntax
const emailValidationRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,6}\b/gm; //RD - Googled and then got expression from Ron
const commonPasswordRegex = /^(?=.*[a-zA-Z])(?=.*\d).{6,}$/; //RD - Googled Syntax

  useEffect(() => {
    getCustomers(); // RD - Fetch customers when the formObject state changes
  }, [formObject]);

  const getCustomers = async () => {
    log("in getCustomers()");
    // RD - Per Lab Directions. Call getAll function and pass the setCustomers function to update the customer's state
    await getAll(setCustomers);
  }

  const getNextId = () => {
    let maxid = 0;
    for (let customer of customers) {
      maxid = Math.max(maxid, customer.id); // RD - Iterate over the customers array to find the highest ID
    }
    return maxid + 1; // RD - Return the next ID
  };

  const handleListClick = (item) => {
    log("in handleListClick()");
    if (mode === 'Update' && selectedRow === item.id) {
      setSelectedRow(null); // RD - Deselect the customer
      setMode('Add'); // RD - Set the mode to 'Add'
      setFormObject(blankCustomer); //RD - Clear out the form fields
      return; 
    }
    // RD - Else Select the item and update
    setFormObject(item);
    setSelectedRow(item.id);
    setMode('Update');
  };

  const handleInputChange = (event) => {
    log("in handleInputChange()");
    const name = event.target.name;
    const value = event.target.value;
    //RD - Get the value of input
    let newFormObject = { ...formObject } // RD - Create a new object to make a copy of the formObject state
    newFormObject[name] = value; // RD -  Update the property in the newFormObject
    setFormObject(newFormObject); //RD - set state
  }

  const onCancelClick = () => {
    log("in onCancelClick()");
    setSelectedRow(null);
    setFormObject(blankCustomer);
    setMode('Add'); // RD - Set the mode state to 'Add'
  }

  const onDeleteClick = async () => {
    if (mode === 'Add') {
      alert("Please select a customer to delete."); // Display message if mode is add and no employee is selected
      return;
    }

    if (formObject.id >= 0 || formObject.id === -1) { // RD - Added this to be able to delete the record that had an ID of -1
      await deleteById(formObject.id); // RD - Call the deleteById function to delete the customer
      getCustomers(); // RD - get customers
    }
    setFormObject(blankCustomer);
    setMode('Add');
  }

  const onSaveClick = async () => {
  
    // RD - Check if any of the required fields are blank
  if (!formObject.name || !formObject.email || !formObject.password) {
     alert("In order to add a customer, please enter information into all the fields.");
      return; // RD - Exit the function without adding the record
  }

    // RD - Validate name format
  if (!nameValidationRegex.test(formObject.name)) {
    alert("Please enter a valid name with letters and spaces only.");
    return;
  }

  // RD - Validate email format
  if (!emailValidationRegex.test(formObject.email)) {
    alert("Please enter a valid email address");
    return;
  }


//RD - Password validation
if (!commonPasswordRegex.test(formObject.password)) {
  alert("Password must contain: One Letter, One Number, and be a minimum of 6 characters in length")
  return;
}

    if (mode === 'Add') { //RD - If the mode is 'Add'

    // RD - Check if the same customer already exists in the customers array
   const existingCustomer = customers.find(customer => customer.name === formObject.name && customer.email === formObject.email);
   if (existingCustomer) {
     alert("A customer with the same name and email already exists.");
     return;
   }
      const newCustomer = { ...formObject }; // RD - Create a new object to make a copy of the formObject state
      newCustomer.id = getNextId(); // RD - Set the ID
      await post(newCustomer);
      getCustomers();
    }
    if (mode === 'Update') { //RD - If the mode is 'Update'
      
       // RD - Check if any field has changed
       const NoChangeCustomer = customers.find(customer => customer.name === formObject.name && customer.email === formObject.email && customer.password === formObject.password);
       if (NoChangeCustomer) {
         alert("Please make a change to one of the fields before updating");
         return;
      }

      await put(formObject.id, formObject); // RD - Call the put function to update the customer
      getCustomers(); // RD - Fetch the updated list of customers
    }
    setFormObject(blankCustomer);
    setMode('Add');
    setSelectedRow(null); // RD - Deselect the customer after updating
  };

  return ( //RD - pass below information as prop
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