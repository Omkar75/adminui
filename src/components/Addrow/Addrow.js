import React from 'react';
import "./Addrow.css";
const Addrow = ({handleAddFormChange, handleAddFormSubmit}) => {
    return (
        <>
        <h2>Add New User</h2>
        <form onSubmit={handleAddFormSubmit} className="formgrow">
          <input
            id="fullName"
            type="text"
            name="fullName"
            required="required"
            placeholder="Enter a name..."
            onChange={handleAddFormChange}
          />
          <input
            id="email"
            type="email"
            name="email"
            required="required"
            placeholder="Enter an email..."
            onChange={handleAddFormChange}
          />
          <input
            id="role"
            type="text"
            name="role"
            required="required"
            placeholder="Enter the role..."
            onChange={handleAddFormChange}
          />
          <button type="submit" className="Addbutton">Add</button>
        </form>
        </>
    )
}

export default Addrow
