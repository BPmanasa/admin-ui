import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from './searchBar';
import TableData from './tableData';
import Pagination from './pagination';


const AdminUI = () => {
    const [userData, setUserData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState('');
    const [filterData, setFilterData] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [userDataPerPage, setUserDataPerPage] = useState([10]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isFound, setIsFound] = useState(false);
    
    const fetchUserData = async() => {
        try {
            const response = await axios.get(
              'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json'
            );
            setUserData(response.data);
            setFilterData(response.data);
            return response.data; 
          } 
          catch (error) {
            console.error('Error fetching user data:', error);
          } 
          finally {
            setLoading(false);
        }
    }


    useEffect(() => {
        fetchUserData();
      }, []);

      
      const applySearchFilter = (query) => {
        const filtered = filterData.filter(
            (user) =>
                user.name.toLowerCase().includes(query) ||
                user.email.toLowerCase().includes(query) ||
                user.role.toLowerCase().includes(query)
        );
        setUserData(filtered);
    };


      const handleSearch = (e) => {
        const query = e.target.value;
        setSearchText(query);
        applySearchFilter(query);
       
    };


    const handleDeleteSelected = () => {

    const updatedUserData = userData.filter((user) => !selectedUsers.includes(user.id));
    const updatedFilterData = filterData.filter((user) => !selectedUsers.includes(user.id));

    setSelectAll(false);
    setSelectedUsers([]);

  
    setUserData(updatedUserData);
    setFilterData(updatedFilterData);

    
  }
  // get cuttent post
  const indexOfLastData = currentPage * userDataPerPage;
  const indexofFirstData = indexOfLastData - userDataPerPage;
  const currentUserData = userData.slice(indexofFirstData, indexOfLastData);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  

    return(
        <div style={{margin:'20px', padding:'20px'}}>
            <SearchBar searchText={searchText} handleSearch={handleSearch}  />
            <TableData userData={currentUserData}  
            selectAll={selectAll} 
            setSelectAll={setSelectAll}
            setSelectedUsers={ setSelectedUsers} 
            selectedUsers={selectedUsers} 
            setFilterData={setFilterData} 
            setUserData={setUserData} 
            filterData={filterData}/>
            <Pagination  userData={userData} handleDeleteSelected={handleDeleteSelected} userDataPerPage={userDataPerPage} totalUserData={userData.length}
            currentPage={currentPage}
            paginate={paginate}
            isFound={isFound}/>

        </div>
    );
}

export default AdminUI;