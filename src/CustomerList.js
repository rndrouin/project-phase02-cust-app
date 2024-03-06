import React from 'react';

function CustomerList({customers, selectedRow, handleListClick}) {
    return (
    <div className="boxed" >
    <h4>Customer List</h4>
    <table id="customer-list">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Password</th>
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
    );
  }

  export default CustomerList;