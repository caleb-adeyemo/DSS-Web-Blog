// ============================ NAVIGATION FUNCTIONS ===============================

// Function to navigate to a specific address
const navigate = (address) => {
  window.location.href = address;
};

// Function to handle click on nav items
const handleNavItemClick = (address) => {
  navigate(address);
};


// Function to handle click on the Post button
const pop_up_form =  document.getElementById('formContainer');
const toggleForm = () => {
  if (pop_up_form.style.display === 'none' || pop_up_form.style.display === '') {
      pop_up_form.style.display = 'block';
  } else {
      pop_up_form.style.display = 'none';
      text_area.value='';
  }
};

// Event listeners for nav items
document.getElementById('navHome').addEventListener('click', () => handleNavItemClick('/home'));
document.getElementById('navExplore').addEventListener('click', () => handleNavItemClick('/search'));
document.getElementById('navTags').addEventListener('click', () => handleNavItemClick('/home'));
document.getElementById('navBottom').addEventListener('click', () => handleNavItemClick('/myPage'));
document.getElementById('popUpButton').addEventListener('click', () => toggleForm());
document.getElementById('form-container-close').addEventListener('click', () => toggleForm());



// ============================ FEED FUNCTIONS ===============================
var text_area = document.getElementById('form_text_area');

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
          <img class='editButton' src='../../Assets/SVG/edit.svg' alt='Edit' />
        </div>
        <p class='post_message'>${post.post_msg}</p>
      </div>
      <div class='media'>
        <img src='../../Assets/Images/post.jpg' alt='post content media' />
      </div>
    `;
    feedContainer.appendChild(postElement);

    // Add event listener to each edit button
    const editButton = postElement.querySelector('.editButton');
    editButton.addEventListener('click', function() {
      handleEditClick(post.post_msg);
    });
  });
};

// Function to handle click on the Edit button
const handleEditClick = (message) => {
  pop_up_form.style.display = 'block'; // Ensire teh pop up is displaed when pressingthe edit button
  text_area.value = message; // add the message from the post to the pop up

};

// Function to fetch feed data from backend
const fetchFeedData = async () => {
  try {
    const response = await fetch('http://localhost:3001/user/personal_page', { credentials: 'include' });
    if (response.ok) {
      const data = await response.json();
      renderFeedPosts(data.data);
      
      // Extract name and username from cookies and append where needed
      const navName = document.getElementById('navName');
      const navTag = document.getElementById('navTag');
      navName.innerHTML = (document.cookie.split('; ').find(row => row.startsWith('name=')).split('=')[1]);
      navTag.innerHTML = (document.cookie.split('; ').find(row => row.startsWith('username=')).split('=')[1]);
    } else {
      throw new Error('Failed to fetch data');
    }
  } catch (error) {
    console.error('Error fetching data:', error.message);
  }
};

// Fetch feed data on page load
window.onload = () => {
  fetchFeedData();
};


// ============================ UNIVERSAL FUNCTIONS ===============================

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
