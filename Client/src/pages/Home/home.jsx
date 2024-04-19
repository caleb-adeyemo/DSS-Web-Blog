import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './style.css';

import Feed from '../../components/Feed/feed'; // Import Feed component
import Nav from '../../components/SideNav/sideNav'; // Import Nav component
import Popular from '../../components/SidePopular/popular'; // Import Popular component
import PostForm from '../../components/Form/PostForm/postForm'; // Import PostForm component

import post from '../../assests/Images/post.jpg'; // Import post image
import toast from 'react-hot-toast'; // Import toast for notifications

function Home() {
  // State variables for managing component data and loading state
  const [feedPosts, setFeedPosts] = useState([]); // State for feed posts
  const [name, setName] = useState(''); // State for user name
  const [username, setUsername] = useState(''); // State for username
  const [isLoading, setIsLoading] = useState(true); // State for loading indicator
  const [showForm, setShowForm] = useState(false); // State for toogleing the postForm
  // Navigate function for redirection
  const navigate = useNavigate();

  // Function to fetch feed data from the backend
  useEffect(() => {
    const fetchFeedFromBackend = async () => {
      try {
        const response = await axios.get('http://localhost:3001/home', { withCredentials: true });

        if (response.status === 200) {
          // Access cookies from the response headers
          setName(document.cookie.split('; ').find(row => row.startsWith('name=')).split('=')[1]);
          setUsername(document.cookie.split('; ').find(row => row.startsWith('username=')).split('=')[1]);

          // Set the feed posts from the response data
          setFeedPosts(response.data.data);
          setIsLoading(false); // Set loading state to false once data is fetched
        }
      } catch (error) {
        // Route to login page If the token has expired
        if (error.response.status === 403) {
          navigate('/');
          toast.error('Session Timed Out'); // Display session timeout error message
        } else {
          console.error('Error fetching data from backend:', error); // Log error if data fetching fails
        }
      }
    };
    fetchFeedFromBackend(); // Call the fetchFeedFromBackend function on component mount
  }, [navigate]); // Dependency array includes navigate to track navigation changes

  // Function to toggle the display of the post form
  const toggleForm = () => {
    setShowForm(!showForm);
  };

  // Render loading indicator while data is being fetched
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Render Home component content once data is fetched
  return (
    <div className='home'>
      <div className='myPage'>
        <div className='appLeftNav'>
          <Nav name={name} img={post} username={username} clickFun={toggleForm} />
        </div>
        <div className='appMiddle'>
          <h1>Home</h1>
          <div className='myPageFeed'>
            <Feed posts={feedPosts} showEdit={false}/>
          </div>
        </div>
        <div className='appRightPopular'>
          <Popular />
        </div>
      </div>
      {showForm && <div className='form-container'><PostForm dp={post} /></div>}
    </div>
  );
}

export default Home;
