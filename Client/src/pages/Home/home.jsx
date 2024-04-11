import React, {useState, useEffect} from 'react'
import axios from 'axios';
import './style.css'

import Feed from '../../components/Feed/feed'
import Nav from '../../components/SideNav/sideNav'
import Popular from '../../components/SidePopular/popular'
import PostForm from '../../components/Form/TweetForm/tweet'

import post from '../../assests/Images/post.jpg'


function Home() {

  // Fetch content from Back end
  const[feedPosts,setFeedPosts]= useState([])
  const[name,setName]= useState('')
  const[username,setUsername]= useState('')
  


  const fetchFeedFromBackend = async () => {
    try {
      const response = await axios.get('http://localhost:3001/home', { withCredentials: true });
    
      // Access cookies from the response headers
      setName(document.cookie.split('; ').find(row => row.startsWith('name=')).split('=')[1]);
      setUsername(document.cookie.split('; ').find(row => row.startsWith('username=')).split('=')[1])

      // Set the feed posts from the response data
      setFeedPosts(response.data.data);
    } catch (error) {
      console.error('Error fetching data from backend:', error);
    }
  };
  useEffect(() => {
    fetchFeedFromBackend()
  }, []);

  // change the state of the home page
  const [showForm, setShowForm] = useState(false)

  const toggleForm = () =>{
    setShowForm(!showForm);
  };

  return (
    <div className='home'>
        {/* <Nav clickFun={toggleForm}/> 
        <Feed className='home-feed' posts={feedPosts}/> 
        <Popular/>  */}

        <div className='myPage'>
            <div className='appLeftNav'>
                <Nav name={name} img={post} username={username}/> {/* Render the Navigation section 'Left side of the home webpage'*/}
            </div>
            <div className='appMiddle'>
              <h1>Home</h1>
                <div><PostForm dp={post}/></div>
                <div className='myPageFeed'><Feed className='home-feed' posts={feedPosts}/></div>
            </div>
            <div className='appRightPopular'>
                <Popular/> {/* Render the Popular section 'Right side of the home webpage'*/}
            </div>
        </div>
        {showForm && <div className='form-container'><PostForm dp={post} onClose={toggleForm} /></div> /* Render the post Form if the bool 'showForm' is true */}
    </div>
  )
}

export default Home
