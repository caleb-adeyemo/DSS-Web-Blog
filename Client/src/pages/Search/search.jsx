import React, { useState, useEffect } from 'react';
import './style.css';

import SearchBar from '../../components/SearchBar/searchBar'; // Import SearchBar component
import Nav from '../../components/SideNav/sideNav'; // Import Nav component
import Popular from '../../components/SidePopular/popular'; // Import Popular component
import PostForm from '../../components/Form/PostForm/postForm'; // Import PostForm component

import post from '../../assests/Images/post.jpg'; // Import post image
import Feed from '../../components/Feed/feed';

function Search() {
    // State variables for managing component data and loading state
    const [foundPosts, setFoundPosts] = useState([]); // List of found results
    const [name, setName] = useState(''); // State for user name
    const [username, setUsername] = useState(''); // State for username
    const [showForm, setShowForm] = useState(false); // State for toogleing the postForm


    // Function to toggle the display of the post form
    const toggleForm = () => {
        setShowForm(!showForm);
    };
    useEffect( ()=>{
        // Access cookies from the response headers
        setName(document.cookie.split('; ').find(row => row.startsWith('name=')).split('=')[1]);
        setUsername(document.cookie.split('; ').find(row => row.startsWith('username=')).split('=')[1]);
    }, [])
    
    
    // Render Home component content once data is fetched
    return (
        <div className='home'>
        <div className='myPage'>
            <div className='appLeftNav'>
            <Nav name={name} img={post} username={username} clickFun={toggleForm} />
            </div>
            <div className='appMiddle'>
            <div>
                <SearchBar text='hello' func={setFoundPosts}/>
                <Feed posts={foundPosts}/>
            </div>
            <div className='myPageFeed'>
            </div>
            </div>
            <div className='appRightPopular'>
            <Popular />
            </div>
        </div>
        {showForm && <div className='form-container'><PostForm dp={post}/></div>}
        </div>
    );
}

export default Search;
