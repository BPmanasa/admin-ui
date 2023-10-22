import React, { useState } from 'react';
import './tableData.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import NoData from './noData';

const TableData = ({ userData, selectAll, setSelectAll, selectedUsers, setSelectedUsers, setFilterData, setUserData,filterData }) => {
  const [userToEdit, setUserToEdit] = useState(null);
  const [isEditFormVisible, setIsEditFormVisible] = useState(false);
  const [isFound, setIsFound] = useState(true);

  const toggleSelectAllUsers = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      setSelectedUsers(userData.map((user) => user.id));
    } else {
      setSelectedUsers([]);
    }
  };

  const toggleSelectUser = (userId) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  const handleDeleteUser = (userId) => {
    setFilterData((prevData) => prevData.filter((user) => user.id !== userId));
    setUserData((prevData) => prevData.filter((user) => user.id !== userId));
  };

  const handleEditUserInfo = (user) => {
    setUserToEdit(user);
    setIsEditFormVisible(true);
  };

  const handleSaveEditedUser = (e) => {
    e.preventDefault();
    // Implement logic to save the edited user data (update user data in your state)
    const updatedUserData = userData.map((user) => {
      if (user.id === userToEdit.id) {
        // Update the user with the edited information
        return userToEdit;
      }
      return user;
    });
  
    const updatedFilterData = filterData.map((user) => {
      if (user.id === userToEdit.id) {
        // Update the user with the edited information
        return userToEdit;
      }
      return user;
    });
  
    // Update the user data in state
    setUserData(updatedUserData);
    setFilterData(updatedFilterData);
  
    // Clear the userToEdit state and hide the edit form
    setUserToEdit(null);
    setIsEditFormVisible(false);
  };
  

  const handleCancelEdit = () => {
    // Clear the userToEdit state and hide the edit form
    setUserToEdit(null);
    setIsEditFormVisible(false);
  };
return (
  <div>
    {isEditFormVisible && (
      <div className="edit-form">
        <h2>EDIT USER INFORMATION</h2>
        <form onSubmit={handleSaveEditedUser}>
          <label>
            Name:
            <input
              type="text"
              value={userToEdit.name}
              onChange={(e) => setUserToEdit({ ...userToEdit, name: e.target.value })}
            />
          </label>
          <label>
            Email:
            <input
              type="text"
              value={userToEdit.email}
              onChange={(e) => setUserToEdit({ ...userToEdit, email: e.target.value })}
            />
          </label>
          <label>
            Role:
            <input
              type="text"
              value={userToEdit.role}
              onChange={(e) => setUserToEdit({ ...userToEdit, role: e.target.value })}
            />
          </label>
          <button type="submit">SAVE</button>
          <button onClick={handleCancelEdit}>CANCEL</button>
        </form>
      </div>
    )}
     {userData.length ? (
      <table>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                onChange={toggleSelectAllUsers}
                checked={selectAll}
              />
            </th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((user) => (
            <tr key={user.id}>
              <td>
                <input
                  type="checkbox"
                  onChange={() => toggleSelectUser(user.id)}
                  checked={selectedUsers.includes(user.id)}
                />
              </td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <div>
                <button onClick={() => handleEditUserInfo(user)}>
                  <FontAwesomeIcon icon={faPenToSquare} style={{ color: '#3065c0' }} />
                </button>
                <button onClick={() => handleDeleteUser(user.id)}>
                  <FontAwesomeIcon icon={faTrash} style={{ color: '#3c73d3' }} />
                </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>) : (<NoData />) 
}
     
  </div>
);

};

export default TableData;
