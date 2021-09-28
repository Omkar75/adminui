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
      editUserId: null,
      checkedItems: new Map()
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
  handleAllCheckBoxClicked = (indexOfFirstPost, indexOfLastPost, event) => {
    debugger
    let isChecked = event.target.checked;
    if (isChecked) {
      for (let i = indexOfFirstPost + 1; i <= indexOfLastPost; i++) {
        i = i.toString()
        if (document.getElementById(`RowId${i}`) == null) { continue }
        document.getElementById(`RowId${i}`).checked = true;
        document.getElementById(`${i}`).setAttribute("class", "greybackground")
        let userID = document.getElementById(`RowId${i}`).value
        let isChecked = document.getElementById(`RowId${i}`).checked;
        if(isChecked){
          this.setState({ checkedItems: this.state.checkedItems.set(userID, isChecked) })
        }else{
          this.state.checkedItems.delete(userID)
        }       
      }
    } else {
      for (let i = indexOfFirstPost + 1; i <= indexOfLastPost; i++) {
        i = i.toString()
        if (document.getElementById(`RowId${i}`) == null) { continue }
        document.getElementById(`RowId${i}`).checked = false;
        document.getElementById(`${i}`).setAttribute("class", "whitebackground")
        let userID = document.getElementById(`RowId${i}`).value
        let isChecked = document.getElementById(`RowId${i}`).checked;
        if(isChecked){
          this.setState({ checkedItems: this.state.checkedItems.set(userID, isChecked) })
        }else{
          this.state.checkedItems.delete(userID)
        }
      }
    }
    if (this.state.checkedItems == Boolean) {
      this.setState({ checkedItems: new Map() })
    }
  }
  handleAddFormChange = (event) => {
    event.preventDefault();
    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;
    const newFormData = { ...this.state.addFormData };
    newFormData[fieldName] = fieldValue;
    this.setState({
      addFormData: { ...newFormData },
    });
  };
  handleAddFormSubmit = (event) => {
    event.preventDefault();
    const newContact = {
      id: (this.state.data.length + 1).toString(),
      name: this.state.addFormData.fullName,
      email: this.state.addFormData.email,
      role: this.state.addFormData.role,
    };
    console.log(this.state.data);
    this.setState({
      data: [...this.state.data, newContact],
    });
    console.log(this.state.data);
    alert("User Added");
  };
  handleEditFormSubmit = (event) => {
    event.preventDefault();
    const editedUser = {
      id: this.state.editUserId,
      name: this.state.addFormData.name,
      email: this.state.addFormData.email,
      role: this.state.addFormData.role,
    };
    const index = this.state.data.findIndex(
      (user) => user.id == this.state.editUserId
    );
    this.setState((prevState) => {
      const newStateValue = [...prevState.data];
      newStateValue[index] = editedUser;
      return {
        ...prevState,
        data: newStateValue,
      };
    });
    this.setState({ editUserId: null });
  };
  handleEditClick = (event, user) => {
    event.preventDefault();
    this.setState({ editUserId: user.id });
    const fromValues = {
      name: user.name,
      email: user.email,
      role: user.role,
    };
    this.setState({ addFormData: { ...fromValues } });
  };
  handleCancelClick = () => { this.setState({ editUserId: null }) };
  handleDeleteClick = (userId) => {
    debugger
    if (!userId) {
      let keys = [...this.state.checkedItems.keys()];
      let filteredArray = [...this.state.data]
      for (let i = 0; i <= keys.length; i++) {
        let k = this.state.data.findIndex((user) => user.id == keys[i]);
        filteredArray.splice(k, 1)
      }
      this.setState({ data: [...filteredArray] });
      this.setState({ checkedItems: new Map() })
      document.getElementById("selectAllCheckBox").checked = false;
    } else {
      const index = this.state.data.findIndex((user) => user.id == userId);
      let filteredArray = this.state.data.filter((_, i) => i !== index);
      this.setState({ data: filteredArray });
    }
  };
  onUserSearchFieldChange = (user) => { this.setState(() => ({ userSeachField: user }), this.updateFilteredUsers) };
  updateFilteredUsers = () => {
    this.setState((prevState) => {
      const { userSeachField, data } = prevState;
      let filteredUsers = data.filter((user) => {
        return user.name.toLowerCase().includes(userSeachField.toLowerCase());
      });
      return { filteredUsers };
    });
  };
  render() {
    const { userSeachField, filteredUsers, editUserId, addFormData } =
      this.state;
    return (
      <>
        <Searchbar
          userSeachField={userSeachField}
          onUserSearchFieldChange={this.onUserSearchFieldChange}
        />
        <Rowslist
          filteredUsers={filteredUsers ? filteredUsers : this.state.data}
          editUserId={editUserId}
          handleEditClick={this.handleEditClick}
          addFormData={addFormData}
          handleAddFormChange={this.handleAddFormChange}
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
