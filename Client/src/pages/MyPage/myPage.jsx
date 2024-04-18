import React,  {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import toast from 'react-hot-toast'; // Import toast for notifications

import Header from '../../components/Header/header'
import Nav from '../../components/SideNav/sideNav'
import Popular from '../../components/SidePopular/popular'
import PostForm from '../../components/Form/TweetForm/tweet'

import post from '../../assests/Images/post.jpg'
import emoji from '../../assests/Images/emoji.jpg'

import close from '../../assests/Svg/close.svg'

import './style.css'
import Feed from '../../components/Feed/feed'

function MyPage() {
    // Fetch content from Back end
    const[feedPosts,setFeedPosts]= useState([])
    const[name,setName]= useState('')
    const[username,setUsername]= useState('')
    const [showForm, setShowForm] = useState(false); // State for toogleing the postForm

    const [isLoading, setIsLoading] = useState(true); // State for loading indicator


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
        console.log("Toggled form")
        setShowForm(!showForm);
    };

    // Render loading indicator while data is being fetched
    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className='myPage'>
            <div className='appLeftNav'>
                <Nav name={name} img={emoji} username={username} clickFun={toggleForm}/> {/* Render the Navigation section 'Left side of the home webpage'*/}
            </div>
            <div className='appMiddle'>
                <div className='myPageHeader'><Header name={name} noPosts='523' backImage={post} dp={emoji} username={username}/></div>
                <div><PostForm dp={post}/></div>
                <div className='myPageFeed'><Feed posts={feedPosts} feedToggleForm={toggleForm}/></div>
            </div>
            <div className='appRightPopular'>
                <Popular/> {/* Render the Popular section 'Right side of the home webpage'*/}
            </div>
            {showForm && <div className='form-container'><img className='form-container-close' src={close} alt='Close' on onClick={toggleForm}/><PostForm dp={post} onClose={toggleForm} /></div>}
        </div>
    )
}

export default MyPage
