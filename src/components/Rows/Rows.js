import React from "react";
import './Row.css';
const Rows = ({
  id,
  name,
  email,
  role,
  handleEditClick,
  user,
  handleDeleteClick,
  handleCheckBoxClicked,
}) => {
  
  return (
    <>
      <tr key={id} id={id}>
        <td className="strike">
          <input type="checkbox" className="Checkboxchcolor" value={id} onChange={handleCheckBoxClicked} id={`RowId${id}`}/>  
        </td>
        <td className="strike">{name}</td>
        <td className="strike">{email}</td>
        <td className="strike">{role}</td>
        <td className="strike">
          <button type="button" onClick={(event) => handleEditClick(event, user)} className="singleEditbutton">
            Edit
          </button>
          <button type="button" onClick={() => handleDeleteClick(id)} className="singleDeletebutton">
            Delete
          </button>
        </td>
      </tr>
    </>
  );
};

export default Rows;
