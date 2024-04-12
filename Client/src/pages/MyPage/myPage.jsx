import React,  {useState, useEffect} from 'react'
import axios from 'axios'
import Header from '../../components/Header/header'
import Nav from '../../components/SideNav/sideNav'
import Popular from '../../components/SidePopular/popular'
import PostForm from '../../components/Form/TweetForm/tweet'

import post from '../../assests/Images/post.jpg'
import emoji from '../../assests/Images/emoji.jpg'

import './style.css'
import Feed from '../../components/Feed/feed'

function MyPage() {
    // Fetch content from Back end
    const[feedPosts,setFeedPosts]= useState([])
    const[name,setName]= useState('')
    const[username,setUsername]= useState('')

    const fetchFeedFromBackend = async () => {
        try {
        const response = await axios.get('http://localhost:3001/user/personal_page', {withCredentials:true});
        // Access cookies from the response headers
        setName(document.cookie.split('; ').find(row => row.startsWith('name=')).split('=')[1]);
        setUsername(document.cookie.split('; ').find(row => row.startsWith('username=')).split('=')[1])
        setFeedPosts(response.data.data)
        } catch (error) {
        console.error('Error fetching data from backend:', error);
        }
    };
    useEffect(() => {
        fetchFeedFromBackend()
    }, []);

    return (
        <div className='myPage'>
            <div className='appLeftNav'>
                <Nav name={name} img={emoji} username={username}/> {/* Render the Navigation section 'Left side of the home webpage'*/}
            </div>
            <div className='appMiddle'>
                <div className='myPageHeader'><Header name={name} noPosts='523' backImage={post} dp={emoji} username={username}/></div>
                <div><PostForm dp={post}/></div>
                <div className='myPageFeed'><Feed posts={feedPosts}/></div>
            </div>
            <div className='appRightPopular'>
                <Popular/> {/* Render the Popular section 'Right side of the home webpage'*/}
            </div>
        </div>
    )
}

export default MyPage
