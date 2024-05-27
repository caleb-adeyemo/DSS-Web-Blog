// Function to get CSRF tokens
async function getCsrfToken() {
  const response = await fetch('http://localhost:3001/home/csrf-token', {
      credentials: 'include'
  });
  const data = await response.json();
  return data.csrfToken;
}

// ============================ NAV BAR FUNCTIONS ===============================

const navName = document.getElementById('navName'); // Add User's name
const navTag = document.getElementById('navTag'); // Add users tag



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
document.getElementById('logOutButton').addEventListener('click', () => clearAllCookies());

// ============================ FEED FUNCTIONS ===============================

// <-------------- Vunurable to xss attacks --------> //
// // Function to render feed posts
// const renderFeedPosts = (posts) => {
//   const feedContainer = document.getElementById('homeFeed');
//   feedContainer.innerHTML = ''; // Clear previous feed content
//   posts.forEach((post, index) => {
//     const postElement = document.createElement('div');
//     postElement.className = 'post';
//     postElement.innerHTML = `
//       <div class='post_top'>
//         <div class='post-header'>
//           <img class='userDp' src='../../Assets/Images/emoji.jpg' alt='User DP' />
//           <p class='username'>${post.c_name} <span class='userTag'>${post.c_tag}</span></p>
//         </div>
//         <p class='post_message'>${post.post_msg}</p>
//       </div>
//       <div class='media'>
//         <img src='../../Assets/Images/post.jpg' alt='post content media' />
//       </div>
//     `;
//     feedContainer.appendChild(postElement);
//   });
// };

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
        <p class='post_message'></p> <!-- Create an empty paragraph element -->
      </div>
      <div class='media'>
        <img src='../../Assets/Images/post.jpg' alt='post content media' />
      </div>
    `;

    // Set the decoded message content as plain text
    const postMessageElement = postElement.querySelector('.post_message');
    postMessageElement.textContent = decodeURIComponent(post.post_msg);

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

      // Extract name and username from cookies
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

   // Prevent default form submission behavior
  event.preventDefault();

  // Get the information from the form
  const formData = new FormData(event.target);

  // Get the message form the post form
  const postMessage = formData.get('form_text_area');

  // Response from the server
  let response = null;

  // Try to send the data
  try {
    let url = ['http://localhost:3001/home'];
    const csrfToken = await getCsrfToken();
    response =await fetch(url[0], {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'CSRF-Token': csrfToken // Include CSRF token in the header

      },
      body: JSON.stringify({ postMessage }),
      credentials: 'include',
    })

    const {success, message} = await response.json();

    console.log("Success: " + success)
    // If the tweet sucessfully sent; debug success message
    if (success) {

      // Toggle the form off
      toggleForm();

      // Reload the page to see the updates
      location.reload();

    } else { // error log failed message
      console.log(message);
    }
  } catch (error) {
    console.error('Error submitting form:', error.message);
  }
};


// Add event listener for form submission
document.getElementById('postForm').addEventListener('submit', (event) => {
  // Prevent default form submission behavior
  event.preventDefault();
  // Call handleSubmit function with the event
  handleSubmit(event); 
});

// Log out
// Function to clear all cookies
function clearAllCookies() {
  // Get all cookies
  const cookies = document.cookie.split(';');

  // Iterate through each cookie and delete it
  cookies.forEach(cookie => {
      const cookieParts = cookie.split('=');
      const cookieName = cookieParts[0].trim();
      document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  });
  
  // Remove all cookies by setting document.cookie to an empty string
  document.cookie = '';
  // Route to log in page
  navigate('/')
}