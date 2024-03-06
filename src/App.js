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
  let items = []; // Add items array

  const [customers, setCustomers] = useState([]);
  const [formObject, setFormObject] = useState(blankCustomer);
  const [selectedRow, setSelectedRow] = useState(null);
  const [mode, setMode] = useState('Add');

  useEffect(() => {
    getCustomers();
  }, [formObject]);

  const getCustomers = async () => {
    log("in getCustomers()");
    await getAll(setCustomers);
  }

  const getNextId = () => {
    let maxid = 0;
    for (let customer of customers) {
      maxid = Math.max(maxid, customer.id);
    }
    return maxid + 1;
  };

  const handleListClick = (item) => {
    log("in handleListClick()");
    setFormObject(item);
    setSelectedRow(item.id);
    setMode('Update');
  }

  const handleInputChange = (event) => {
    log("in handleInputChange()");
    const name = event.target.name;
    const value = event.target.value;
    let newFormObject = { ...formObject }
    newFormObject[name] = value;
    setFormObject(newFormObject);
  }

  const onCancelClick = () => {
    log("in onCancelClick()");
    setSelectedRow(null);
    setFormObject(blankCustomer);
    setMode('Add');
  }

  const onDeleteClick = async () => {
    if (formObject.id >= 0 || formObject.id === -1) {
      await deleteById(formObject.id);
      getCustomers();
    }
    setFormObject(blankCustomer);
    setMode('Add');
  }

  const onSaveClick = async () => {
    if (mode === 'Add') {
      const newCustomer = { ...formObject };
      newCustomer.id = getNextId();
      await post(newCustomer);
      getCustomers();
    }
    if (mode === 'Update') {
      await put(formObject.id, formObject);
      getCustomers();
    }
    setFormObject(blankCustomer);
    setMode('Add');
    setSelectedRow(null); // Deselect the customer after updating
  };

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