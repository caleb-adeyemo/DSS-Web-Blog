// ============================ NAV BAR FUNCTIONS ===============================

const navName = document.getElementById('navName'); // Add User's name
const navTag = document.getElementById('navTag'); // Add users tag
const search_input = document.getElementById('search_input'); // Search input
const search_img = document.getElementById('search_img'); // Search input




// Function to navigate to a specific address
const navigate = (address) => {
  window.location.href = address;
};

// Function to handle click on nav items
const handleNavItemClick = (address) => {
  navigate(address);
};

// Function to handle click on the Post button
const toggleForm = () => {
  const pop_up_form =  document.getElementById('formContainer');
  if (pop_up_form.style.display === 'none' || pop_up_form.style.display === '') {
      pop_up_form.style.display = 'block';
  } else {
      pop_up_form.style.display = 'none';
  }
};

// Event listeners
document.getElementById('navHome').addEventListener('click', () => handleNavItemClick('/home'));
document.getElementById('navExplore').addEventListener('click', () => handleNavItemClick('/search'));
document.getElementById('navTags').addEventListener('click', () => handleNavItemClick('/home'));
document.getElementById('navBottom').addEventListener('click', () => handleNavItemClick('/myPage'));
document.getElementById('popUpButton').addEventListener('click', () => toggleForm());
document.getElementById('form-container-close').addEventListener('click', () => toggleForm());

// ============================ FEED FUNCTIONS ===============================

// Function to render feed posts
const renderFeedPosts = (posts) => {
  const feedContainer = document.getElementById('homeFeed');
  feedContainer.innerHTML = ''; // Clear previous feed content
  posts.forEach((post, index) => {
    const postElement = document.createElement('div');
    postElement.className = 'post';
    postElement.innerHTML = `
      <div class='post_top'>
        <div class='post-header'>
          <img class='userDp' src='../../Assets/Images/emoji.jpg' alt='User DP' />
          <p class='username'>${post.c_name} <span class='userTag'>${post.c_tag}</span></p>
        </div>
        <p class='post_message'>${post.post_msg}</p>
      </div>
      <div class='media'>
        <img src='../../Assets/Images/post.jpg' alt='post content media' />
      </div>
    `;
    feedContainer.appendChild(postElement);
  });
};

// Function to fetch feed data from backend
const fetchFeedData = async () => {
  try {
    const response = await fetch('http://localhost:3001/search', { credentials: 'include' });
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

// Fetch feed data on page load
window.onload = () => {
  // Extract name and username from cookies
  navName.innerHTML = (document.cookie.split('; ').find(row => row.startsWith('name=')).split('=')[1]);
  navTag.innerHTML = (document.cookie.split('; ').find(row => row.startsWith('username=')).split('=')[1]);
};


// ============================ UNIVERSAL FUNCTIONS ===============================

// Function to handle form submission
const handleSubmit = async () => {

  const message = {value: search_input.value}
  console.log(JSON.stringify(message))

  try {
    const response = await fetch('http://localhost:3001/search', {
      method: 'Post',
      body: JSON.stringify(message),
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    if (response.ok) {
      const data = await response.json();
      renderFeedPosts(data.data)
    } else {
      throw new Error('Failed to submit form');
    }
  } catch (error) {
    console.error('Error submitting form:', error.message);
  }
};
// Add event listener
search_img.addEventListener('click', ()=> handleSubmit())