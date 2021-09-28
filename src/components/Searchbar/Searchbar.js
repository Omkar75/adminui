import React from 'react'
import "./Searchbar.css";
const Searchbar = ({
    userSeachField,
    onUserSearchFieldChange
}) => {
    return (
        <input
          type="text"
          placeholder="Search for a User..."
          onChange={e => onUserSearchFieldChange(e.target.value)}
          value={userSeachField}
          className="searchbar"
        />
    )
}

export default Searchbar
