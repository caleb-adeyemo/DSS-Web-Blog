import React, {useState, useEffect} from 'react'
import axios from 'axios';
import './style.css'

import Feed from '../../components/Feed'
import Nav from '../../components/SideNav'
import Popular from '../../components/SidePopular'
import PostForm from '../../components/Form';

import post from '../../assests/Images/post.jpg'


function Home() {

  // Fetch content from Back end
  const[feedPosts,setFeedPosts]= useState([])

  const fetchFeedFromBackend = async () => {
    try {
      const response = await axios.get('http://localhost:3001/'); // Adjust the API endpoint accordingly
      setFeedPosts(response.data.data)
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
    console.log("ggg")
  };

  return (
    <div className='home'>
        <Nav clickFun={toggleForm}/> {/* Render the Navigation section 'Left side of the home webpage'*/}
        <Feed className='home-feed' posts={feedPosts}/> {/* Render the Feed section 'Middle side of the home webpage'*/}
        <Popular/> {/* Render the Popular section 'Right side of the home webpage'*/}
        {showForm && <div className='form-container'><PostForm dp={post} onClose={toggleForm} /></div> /* Render the post Form if the bool 'showForm' is true */}
    </div>
  )
}

export default Home
