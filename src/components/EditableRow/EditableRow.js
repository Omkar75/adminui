import React from "react";
import './Editable.css'
const EditableRow = ({addFormData, handleAddFormChange, handleCancelClick}) => {
  return (
    <tr className="Editable">
      <td>
      </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Enter a name..."
          name="fullName"
          value={addFormData.name}
          onChange={handleAddFormChange}
        ></input>
      </td>
      <td>
        <input
          type="email"
          required="required"
          placeholder="Enter an email..."
          name="email"
          value={addFormData.email}
        onChange={handleAddFormChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Enter the role..."
          name="role"
          value={addFormData.role}
          onChange={handleAddFormChange}
        ></input>
      </td>
      <td>
          <button type="submit" className="savebutton">Save</button>
          <button type="button" onClick={handleCancelClick} className="cancelbutton">Cancel</button>
      </td>
    </tr>
  );
};

export default EditableRow;
