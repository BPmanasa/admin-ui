import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "./searchBar";
import TableData from "./tableData";
import Pagination from "./pagination";
import { useSnackbar } from "notistack";

const AdminUI = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [filterData, setFilterData] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const userDataPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [userToEdit, setUserToEdit] = useState(null);
  const [isEditFormVisible, setIsEditFormVisible] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  //fetching userdata
  const fetchUserData = async () => {
    try {
      const response = await axios.get(
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
      );
      setUserData(response.data);
      setFilterData(response.data);
      setLoading(false);
      return response.data;
    } catch (error) {
      enqueueSnackbar(
        "Error fetching user data. Please try again later... Check that the backend is running, reachable, and returns valid JSON.",
        { variant: "error" }
      );
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  //search functionality
  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchText(query);
    applySearchFilter(query);
    setCurrentPage(1);
  };

  //search filter functionality
  const applySearchFilter = (query) => {
    const filtered = filterData.filter(
      (user) =>
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.role.toLowerCase().includes(query)
    );
    setUserData(filtered);
  };

  //select individual user
  const toggleSelectUser = (userId) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  //select all users
  const toggleSelectAllUsers = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      setSelectedUsers(userData.map((user) => user.id));
    } else {
      setSelectedUsers([]);
    }
  };

  //selecting user on row onClick
  const handleRowClick = (clickedUser) => {
    if (selectedUsers.includes(clickedUser.id)) {
      setSelectedUsers(selectedUsers.filter((id) => id !== clickedUser.id));
    } else {
      setSelectedUsers([...selectedUsers, clickedUser.id]);
    }
  };

  //edituser information icon functionality
  const handleEditUserInfo = (user) => {
    setUserToEdit(user);
    setIsEditFormVisible(true);
  };

  //editform models, save functionality
  const handleSaveEditedUser = (e) => {
    e.preventDefault();

    const updatedUserData = userData.map((user) => {
      if (user.id === userToEdit.id) {
        return userToEdit;
      }
      return user;
    });

    const updatedFilterData = filterData.map((user) => {
      if (user.id === userToEdit.id) {
        return userToEdit;
      }
      return user;
    });

    setUserData(updatedUserData);
    setFilterData(updatedFilterData);

    setUserToEdit(null);
    setIsEditFormVisible(false);
  };

  //editform models, cancel functionality
  const handleCancelEdit = () => {
    setUserToEdit(null);
    setIsEditFormVisible(false);
  };

  //delete icon functionality to delete user
  const handleDeleteUser = (userId) => {
    setFilterData((prevData) => prevData.filter((user) => user.id !== userId));
    setUserData((prevData) => prevData.filter((user) => user.id !== userId));
  };

  const indexOfLastData = currentPage * userDataPerPage;
  const indexofFirstData = indexOfLastData - userDataPerPage;
  const currentUserData = userData.slice(indexofFirstData, indexOfLastData);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // delete all selected users
  const handleDeleteSelected = () => {
    setSelectAll(false);
    const selectedUserIds = currentUserData
      .filter((user) => selectedUsers.includes(user.id))
      .map((user) => user.id);

    setFilterData((prevData) =>
      prevData.filter((user) => !selectedUserIds.includes(user.id))
    );

    setUserData((prevData) =>
      prevData.filter((user) => !selectedUserIds.includes(user.id))
    );
    setSelectedUsers([]);
  };

  return (
    <div style={{ margin: "1rem", padding: "1rem" }}>
      <SearchBar searchText={searchText} handleSearch={handleSearch} />
      {loading ? (
        <div>
          <p>Loading Data...</p>
        </div>
      ) : (
        <>
          <TableData
            userData={currentUserData}
            selectAll={selectAll}
            selectedUsers={selectedUsers}
            handleEditUserInfo={handleEditUserInfo}
            toggleSelectAllUsers={toggleSelectAllUsers}
            toggleSelectUser={toggleSelectUser}
            handleSaveEditedUser={handleSaveEditedUser}
            handleCancelEdit={handleCancelEdit}
            handleDeleteUser={handleDeleteUser}
            setUserToEdit={setUserToEdit}
            isEditFormVisible={isEditFormVisible}
            userToEdit={userToEdit}
            handleRowClick={handleRowClick}
          />
        </>
      )}
      <Pagination
        userData={userData}
        handleDeleteSelected={handleDeleteSelected}
        userDataPerPage={userDataPerPage}
        totalUserData={userData.length}
        currentPage={currentPage}
        paginate={paginate}
      />
    </div>
  );
};

export default AdminUI;
