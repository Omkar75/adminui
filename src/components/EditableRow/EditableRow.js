import React from "react";
import "./Editable.css";
const EditableRow = ({ EditFormData, handleEditFormChange, handleCancelClick,}) => {
  return (
    <tr className="Editable">
      <td></td>
      <td>
        <input
          className="editableInputs"
          type="text"
          required="required"
          placeholder="Enter a name..."
          name="editfullName"
          value={EditFormData.editfullName}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          className="editableInputs"
          type="email"
          required="required"
          placeholder="Enter an email..."
          name="editemail"
          value={EditFormData.editemail}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          className="editableInputs"
          type="text"
          required="required"
          placeholder="Enter the role..."
          name="editrole"
          value={EditFormData.editrole}
          onChange={handleEditFormChange}
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
