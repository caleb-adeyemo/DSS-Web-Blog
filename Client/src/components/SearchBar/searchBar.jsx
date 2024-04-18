import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast'; // Import toast for notifications


import './style.css'
import searchIcon from '../../assests/Svg/explore.svg'; // Import search icon image

function SearchBar({func}) {
  // Navigate function for redirection
  const navigate = useNavigate();

  // Route to send the form data when submitted
  const apiUrl = 'http://localhost:3001/search';

  // Object to store search term
  const [searchTerm, setSearchTerm] = useState({
    value: ''
  });

  // Function to handle search input change
  const handleInputChange = (event) => {
    setSearchTerm({value: event.target.value}); // Update search term state
  };

  // Function to handle search icon click
  const handleSearchClick = async() => {
    console.log('Search term:', searchTerm.value); // Log search term when search icon is clicked

    // clear the search value
    setSearchTerm({value: ''});

    // Send the serach value to the server
    submitSearch();
  };

  // function to send the data to the back end server
  async function submitSearch() {
    // Make a POST request using Axios
    try {
        // Send data
        const response = await axios.post(apiUrl, searchTerm, {
          withCredentials: true, // Enable sending cookies
        });

        // pupulate the foundPost useState
        func(response.data.data)
    } catch (error) {
      // Route to login page If the token has expired
      if (error.response.status === 403) {
        navigate('/');
        toast.error('Session Timed Out'); // Display session timeout error message
      } else {
        console.error('Error fetching data from backend:', error); // Log error if data fetching fails
      }
    }
  }

  return (
    <div className="search-bar">
      <div></div>
      <input type="text" placeholder="Search..." value={searchTerm.value} onChange={handleInputChange}/>
      <img src={searchIcon} alt="Search" onClick={handleSearchClick}/>
    </div>
  );
}

export default SearchBar;
