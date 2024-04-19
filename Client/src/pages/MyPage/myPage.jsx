// MyPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
// Import Components
import Header from '../../components/Header/header'; // Import Header component
import Nav from '../../components/SideNav/sideNav'; // Import Nav component
import Popular from '../../components/SidePopular/popular'; // Import Popular component
import PostForm from '../../components/Form/PostForm/postForm'; // Import PostForm component
import Feed from '../../components/Feed/feed'; // Import Feed component
// Import Assests
import post from '../../assests/Images/post.jpg'; // Import post image
import emoji from '../../assests/Images/emoji.jpg'; // Import emoji image
import close from '../../assests/Svg/close.svg'; // Import close svg icon
// Style
import './style.css';


function MyPage() {
  // State variables to manage component data
  const [feedPosts, setFeedPosts] = useState([]); // State for feed posts; array of posts
  const [name, setName] = useState(''); // State for user name
  const [username, setUsername] = useState(''); // State for username
  const [showForm, setShowForm] = useState(false); // State for toggling the postForm
  const [isLoading, setIsLoading] = useState(true); // State for loading indicator
  const [initialMessage, setInitialMessage] = useState(''); // State for initial message when editing
  const [numberOfItems, setnumberOfItems] = useState(0); // State for username

  // Navigate function for redirection
  const navigate = useNavigate();

  // Function to fetch feed data from the backend
  useEffect(() => {
    const fetchFeedFromBackend = async () => {
      try {
        // Send the data
        const response = await axios.get('http://localhost:3001/user/personal_page', { withCredentials: true });

        // Get the number of items in the data array
        setnumberOfItems(response.data.data.length);

        if (response.status === 200) {
          // Extract name and username from cookies
          setName(document.cookie.split('; ').find(row => row.startsWith('name=')).split('=')[1]);
          setUsername(document.cookie.split('; ').find(row => row.startsWith('username=')).split('=')[1]);

          // Set feed posts from response data
          setFeedPosts(response.data.data);
          setIsLoading(false); // Set loading state to false once data is fetched
        }
      } catch (error) {
        // Redirect to login page if the token has expired
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
    if(!showForm){
        setInitialMessage('')
    }
  };

  // Function to handle click event when editing a post
  const handleEditClick = (message, postId) => {
    toggleForm(); // Toggle the form visibility
    setInitialMessage(message); // Set the initial message for editing
    console.log(postId)
  };

  // Render loading indicator while data is being fetched
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Render MyPage component content once data is fetched
  return (
    <div className='myPage'>
      <div className='appLeftNav'>

        {/* Render Navigation section on the left side of the page */}
        <Nav name={name} img={emoji} username={username} clickFun={toggleForm} />

      </div>
      <div className='appMiddle'>

        {/* Render Header section */}
        <div className='myPageHeader'><Header name={name} noPosts={numberOfItems} backImage={post} dp={emoji} username={username} /></div>

        {/* Render Feed component */}
        <div className='myPageFeed'><Feed posts={feedPosts} showEdit={true} handleEditClick={handleEditClick} /></div>

      </div>
      <div className='appRightPopular'>

        {/* Render Popular section on the right side of the page */}
        <Popular />

      </div>

      {/* Render PostForm component in a modal */}
      {showForm && <div className='form-container'><img className='form-container-close' src={close} alt='Close' onClick={toggleForm} /><PostForm dp={post} initialMessage={initialMessage}/></div>}
    
    </div>
  );
}

export default MyPage;
