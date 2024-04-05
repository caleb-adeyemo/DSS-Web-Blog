import React, {useState, useEffect} from 'react'
import axios from 'axios';
import './style.css'

import Feed from '../../components/Feed'
import Nav from '../../components/SideNav'
import Popular from '../../components/SidePopular'

function Home() {

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

  return (
    <div className='home'>
        <Nav/>
        <Feed className='home-feed' posts={feedPosts}/>
        <Popular />
    </div>
  )
}

export default Home
