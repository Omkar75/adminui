import React, { Component } from "react";
import Searchbar from "../Searchbar/Searchbar";
import Rowslist from "../Rowslist/Rowslist";
import Addrow from "../Addrow/Addrow";
import './AdminPanel.css'
export default class AdminPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
      filteredUsers: null,
      userSeachField: "",
      addFormData: { fullName: "", email: "", role: "" },
      EditFormData: { editfullName: "", editemail: "", editrole: "" },
      editUserId: null,
      usersInTheRow : [],
      checkedItems: new Map(),
    };
  }
  handleCheckBoxClicked = (event) => {
    let isChecked = event.target.checked;
    let user = event.target.value;
    if(isChecked){
      this.setState({ checkedItems: this.state.checkedItems.set(user, isChecked) })
      document.getElementById(`${user}`).setAttribute("class", "greybackground")
    }else{
      this.state.checkedItems.delete(user)
      document.getElementById(`${user}`).setAttribute("class", "whitbackground")
    }
  };
  handleAllCheckBoxClicked = (event) => {
    let isChecked = event.target.checked;
    let statevar = this.state.usersInTheRow
    if (isChecked) {
      for(let i=0; i<statevar.length; i++){
        document.getElementById(`RowId${statevar[i]}`).checked = true;
        document.getElementById(`${statevar[i]}`).setAttribute("class", "greybackground")
        this.setState({ checkedItems: this.state.checkedItems.set(statevar[i], isChecked) })
      }
    } else {
      for(let i=0; i<statevar.length; i++){
        document.getElementById(`RowId${statevar[i]}`).checked = false;
        document.getElementById(`${statevar[i]}`).setAttribute("class", "whitebackground")
        this.state.checkedItems.delete(statevar[i])
      }
    }
    if (this.state.checkedItems == Boolean) {  this.setState({ checkedItems: new Map() })  }
  }
  handleAddFormChange = (event) => {
    event.preventDefault();
    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;
    const newFormData = { ...this.state.addFormData };
    newFormData[fieldName] = fieldValue;
    this.setState({ addFormData: { ...newFormData }, });
  };
  handleEditFormChange = (event) => {
    event.preventDefault();
    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;
    const newFormData = { ...this.state.EditFormData };
    newFormData[fieldName] = fieldValue;
    this.setState({ EditFormData: { ...newFormData }, });
  };
  handleAddFormSubmit = (event) => {
    event.preventDefault();
    const newContact = {
      id: (parseInt(this.state.data.slice(-1)[0].id)+1).toString(),
      name: this.state.addFormData.fullName,
      email: this.state.addFormData.email,
      role: this.state.addFormData.role,
    };
    const DataAdded = [...this.state.data, newContact]
    this.setState({ data: [...DataAdded], });
    if(this.state.filteredUsers != null){this.setState({filteredUsers: [...DataAdded]})}
    alert("User Added to the End");
    document.getElementById("fullName").value = '';
    document.getElementById("email").value = '';
    document.getElementById("role").value = '';
  };
  handleEditFormSubmit = (event) => {
    event.preventDefault();
    const editedUser = {
      id: this.state.editUserId,
      name: this.state.EditFormData.editfullName,
      email: this.state.EditFormData.editemail,
      role: this.state.EditFormData.editrole,
    };
    const index = this.state.data.findIndex((user) => user.id == this.state.editUserId);
    const newStatevalue = [...this.state.data]
    newStatevalue[index] = editedUser;
    this.setState({data: [...newStatevalue]})
    this.setState({ editUserId: null });
    if(this.state.filteredUsers !== null){this.setState({filteredUsers: [...newStatevalue]})}
  };
  handleEditClick = (event, user) => {
    event.preventDefault();
    this.setState({ editUserId: user.id });
    const fromValues = {
      editfullName: user.name,
      editemail: user.email,
      editrole: user.role,
    };
    this.setState({ EditFormData: { ...fromValues } });
  };
  handleCancelClick = () => { this.setState({ editUserId: null }) };
  handleDeleteClick = (userId) => {
    debugger
    if (!userId) {
      let keys = [...this.state.checkedItems.keys()];
      if(keys.length == 0)  return; 
      let arrToDeleteUser = [...this.state.data]
      let DeletedUsers
      for(let i=0; i<keys.length; i++){
        DeletedUsers = arrToDeleteUser.filter((user)=>user.id != keys[i]);
        arrToDeleteUser = DeletedUsers
        this.state.checkedItems.delete(keys[i])
      }
      this.setState({data: [...DeletedUsers]})
      if(this.state.filteredUsers != null){this.setState({filteredUsers: [...DeletedUsers]})}
      document.getElementById("selectAllCheckBox").checked = false;
    } else {
      let arrToDeleteUser = [...this.state.data]
      let DeletedUser = arrToDeleteUser.filter((user)=>user.id != userId);
      this.setState({ data: [...DeletedUser] })
      if(this.state.filteredUsers != null){this.setState({filteredUsers: [...DeletedUser]})}
    }
  };
  onUserSearchFieldChange = (user) => { this.setState(() => ({ userSeachField: user }), this.updateFilteredUsers) };
  updateFilteredUsers = () => {
    this.setState((prevState) => {
      const { userSeachField, data, } = prevState;
      let filteredUsers = data.filter((user) => { return user.name.toLowerCase().includes(userSeachField.toLowerCase()); });
      return { filteredUsers };
    });
  };
  render() {
    const { userSeachField, editUserId, usersInTheRow, EditFormData, filteredUsers, } = this.state;
    return (
      <>
        <Searchbar
          userSeachField={userSeachField}
          onUserSearchFieldChange={this.onUserSearchFieldChange}
        />
        <Rowslist
          userSeachField={userSeachField}
          usersInTheRow={usersInTheRow}
          filteredUsers={filteredUsers ? filteredUsers : this.state.data}
          editUserId={editUserId}
          handleEditClick={this.handleEditClick}
          EditFormData={EditFormData}
          handleEditFormChange={this.handleEditFormChange}
          handleEditFormSubmit={this.handleEditFormSubmit}
          handleCancelClick={this.handleCancelClick}
          handleDeleteClick={this.handleDeleteClick}
          handleCheckBoxClicked={this.handleCheckBoxClicked}
          handleAllCheckBoxClicked={this.handleAllCheckBoxClicked}
        />
        <Addrow
          handleAddFormChange={this.handleAddFormChange}
          handleAddFormSubmit={this.handleAddFormSubmit}
        />
      </>
    );
  }
}
