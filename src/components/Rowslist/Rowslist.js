import React, { useState, useEffect } from "react";
import Rows from "../Rows/Rows";
import Paginations from "../Paginations/Paginations";
import "./Rowslist.css";
import EditableRow from "../EditableRow/EditableRow";

const Rowslist = ({ filteredUsers, editUserId, handleAllCheckBoxClicked, handleEditClick, handleCheckBoxClicked, 
  EditFormData, handleEditFormChange, handleEditFormSubmit, handleCancelClick, handleDeleteClick, usersInTheRow, userSeachField }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPrePage] = useState(10);
  let previousPage 
  const indexOfLastPost = currentPage * postsPrePage;
  const indexOfFirstPost = indexOfLastPost - postsPrePage;
  useEffect(() => {
    setCurrentPage(1);
  }, [userSeachField]);
  const paginate = (pageNumber) => {
    previousPage = currentPage;
    setCurrentPage(pageNumber); 
  };
  const UserItemCreator = ( filteredUsers, indexOfLastPost, indexOfFirstPost, currentPage, usersInTheRow, previousPage ) => {
    if(previousPage !== currentPage) { usersInTheRow.length = 0 }
    return filteredUsers.slice(indexOfFirstPost, indexOfLastPost, usersInTheRow).map((user) => (<>
          {editUserId == user.id ? (
            <EditableRow EditFormData={EditFormData} handleEditFormChange={handleEditFormChange} handleCancelClick={handleCancelClick}/>
          ) : ( 
            usersInTheRow.push(user.id),
            <Rows key={user.id} {...user} user={user} handleEditClick={handleEditClick} handleDeleteClick={handleDeleteClick} handleCheckBoxClicked={handleCheckBoxClicked}/>
          )}
        </>
      ));
  };
    return (
    <>
    <div className="hscroll">
      <form onSubmit={handleEditFormSubmit}>
        <table id="customers">
          <thead>
            <tr>
              <th>
              <input type="checkbox" className="Checkboxchcolor" id="selectAllCheckBox" onChange={(event)=>handleAllCheckBoxClicked(event)} />
              </th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length !== 0 ? (<>{UserItemCreator( filteredUsers, indexOfLastPost, indexOfFirstPost, currentPage, usersInTheRow, previousPage )}</>) : (<p > No User Found </p> )}
          </tbody>
        </table>
      </form>
      </div>
      <div className="footer">
        <button type="button" className="AllDeleteButton" onClick={() => handleDeleteClick()}>Delete</button>
        <Paginations postsPerPage={postsPrePage} totalPosts={filteredUsers.length} paginate={paginate} />
      </div>
    </>
  );
};

export default Rowslist;
