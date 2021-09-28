import React, { useState, useEffect } from "react";
import Rows from "../Rows/Rows";
import Paginations from "../Paginations/Paginations";
import "./Rowslist.css";
import EditableRow from "../EditableRow/EditableRow";

const Rowslist = ({ filteredUsers, editUserId, handleAllCheckBoxClicked, handleEditClick, handleCheckBoxClicked, 
  addFormData, handleAddFormChange, handleEditFormSubmit, handleCancelClick, handleDeleteClick }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPrePage] = useState(10);
  const indexOfLastPost = currentPage * postsPrePage;
  const indexOfFirstPost = indexOfLastPost - postsPrePage;
  useEffect(() => {
    setCurrentPage(1);
  }, [filteredUsers]);
  const paginate = (pageNumber) => { setCurrentPage(pageNumber) };
  const UserItemCreator = ( filteredUsers, indexOfLastPost, indexOfFirstPost ) => {
    return filteredUsers.slice(indexOfFirstPost, indexOfLastPost).map((user) => (<>
          {editUserId == user.id ? (
            <EditableRow addFormData={addFormData} handleAddFormChange={handleAddFormChange} handleCancelClick={handleCancelClick}/>
          ) : (
            <Rows key={user.id} {...user} user={user} handleEditClick={handleEditClick} handleDeleteClick={handleDeleteClick} handleCheckBoxClicked={handleCheckBoxClicked}/>
          )}
        </>
      ));
  };
  return (
    <>
      <form onSubmit={handleEditFormSubmit}>
        <table id="customers">
          <thead>
            <tr>
              <th>
              <input type="checkbox" className="Checkboxchcolor" id="selectAllCheckBox" onChange={(e)=>handleAllCheckBoxClicked(indexOfFirstPost, indexOfLastPost, e)} />
              </th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length !== 0 ? (<>{UserItemCreator( filteredUsers, indexOfLastPost, indexOfFirstPost )}</>) : (<p > No User Found </p> )}
          </tbody>
        </table>
      </form>
      <div className="footer">
        <button type="button" className="AllDeleteButton" onClick={() => handleDeleteClick()}>Delete</button>
        <Paginations postsPerPage={postsPrePage} totalPosts={filteredUsers.length} paginate={paginate} />
      </div>
    </>
  );
};

export default Rowslist;
