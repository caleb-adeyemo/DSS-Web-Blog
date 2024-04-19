// Event listeners
document.getElementById('navHome').addEventListener('click', () => handleNavItemClick('/home'));
document.getElementById('navExplore').addEventListener('click', () => handleNavItemClick('/search'));
document.getElementById('navTags').addEventListener('click', () => handleNavItemClick('/home'));

const postButton = document.querySelectorAll('.button');
postButton.forEach(button => {
  button.addEventListener('click', handlePostButtonClick);
});


// Function to navigate to a specific address
const navigate = (address) => {
    window.location.href = address;
  };
  
// Function to handle click on nav items
const handleNavItemClick = (address) => {
  navigate(address);
};
  
// Function to handle click on the Post button
const handlePostButtonClick = () => {
  const formContainer = document.getElementById('formContainer');
  formContainer.innerHTML = `
    <form class='postForm'>
      <div class='form_message_area'>
        <img class='userDp' src='post.jpg' alt='dp' />
        <textarea
          autoFocus={true}
          placeholder="What's Happening?!"
          value=''
        ></textarea>
      </div>
      <div class='form_submit_area'>
        <button id='form_submit_button'>Submit</button>
      </div>
    </form>
  `;
};

// Function to render feed posts
const renderFeedPosts = (posts) => {
  const feedContainer = document.getElementById('feed');
  feedContainer.innerHTML = ''; // Clear previous feed content
  posts.forEach((post, index) => {
    const postElement = document.createElement('div');
    postElement.className = 'post';
    postElement.innerHTML = `
      <div class='post_top'>
        <div class='post-header'>
          <img class='userDp' src='emoji.jpg' alt='User DP' />
          <p class='username'>${post.c_name} <span class='userTag'>${post.c_tag}</span></p>
        </div>
        <p class='post_message'>${post.post_msg}</p>
      </div>
      <div class='media'>
        <img src='post.jpg' alt='post content media' />
      </div>
    `;
    feedContainer.appendChild(postElement);
  });
};

// Function to fetch feed data from backend
const fetchFeedData = async () => {
  try {
    const response = await fetch('http://localhost:3001/home', { credentials: 'include' });
    if (response.ok) {
      const data = await response.json();
      renderFeedPosts(data.data);
    } else {
      throw new Error('Failed to fetch data');
    }
  } catch (error) {
    console.error('Error fetching data:', error.message);
  }
};

// Function to handle form submission
const handleSubmit = async (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const message = formData.get('message');

  try {
    const response = await fetch('http://localhost:3001/home', {
      method: 'POST',
      body: JSON.stringify({ message }),
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data.message);
    } else {
      throw new Error('Failed to submit form');
    }
  } catch (error) {
    console.error('Error submitting form:', error.message);
  }
};

  
// Fetch feed data on page load
window.onload = () => {
  fetchFeedData();
};
  