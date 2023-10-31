import React from "react";
import "./tabledata.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";

const TableData = ({
  userData,
  selectAll,
  selectedUsers,
  handleEditUserInfo,
  toggleSelectAllUsers,
  toggleSelectUser,
  handleSaveEditedUser,
  handleCancelEdit,
  handleDeleteUser,
  setUserToEdit,
  isEditFormVisible,
  userToEdit,
  handleRowClick,
}) => {
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
                onChange={(e) =>
                  setUserToEdit({ ...userToEdit, name: e.target.value })
                }
              />
            </label>
            <label>
              Email:
              <input
                type="text"
                value={userToEdit.email}
                onChange={(e) =>
                  setUserToEdit({ ...userToEdit, email: e.target.value })
                }
              />
            </label>
            <label>
              Role:
              <input
                type="text"
                value={userToEdit.role}
                onChange={(e) =>
                  setUserToEdit({ ...userToEdit, role: e.target.value })
                }
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
              <tr key={user.id} onClick={() => handleRowClick(user)}>
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
                      <FontAwesomeIcon
                        icon={faPenToSquare}
                        style={{ color: "#3065c0" }}
                      />
                    </button>
                    <button onClick={() => handleDeleteUser(user.id)}>
                      <FontAwesomeIcon
                        icon={faTrash}
                        style={{ color: "#3c73d3" }}
                      />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="no-data-message">No User Data available</p>
      )}
    </div>
  );
};

export default TableData;
