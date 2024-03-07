import React from 'react'
import './App.css';

function CustomerAddUpdateForm({
    formObject,
    handleInputChange,
    onDeleteClick,
    onSaveClick,
    onCancelClick,
    mode,
  }) {
    return (
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
                onChange={(e) => handleInputChange(e)}
                value={formObject.name}
                placeholder="Customer Name"
                required /></td>
            </tr>
            <tr>
              <td className={'label'} >Email:</td>
              <td><input
                type="email"
                name="email"
                onChange={(e) => handleInputChange(e)}
                value={formObject.email}
                placeholder="name@company.com" /></td>
            </tr>
            <tr>
              <td className={'label'} >Pass:</td>
              <td className="password-td"><input // RD - Bring text box left for password
                type="password"
                name="password"
                onChange={(e) => handleInputChange(e)}
                value={formObject.password}
                placeholder="password" /></td>
            </tr>
            <tr className="button-bar">
              <td colSpan="2">
                <input type="button" className="button" value="Delete" onClick={onDeleteClick} />
                <input type="button" className="button" value="Save" onClick={onSaveClick} />
                <input type="button" className="button" value="Cancel" onClick={onCancelClick} />
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
    );
  }

  export default CustomerAddUpdateForm; 