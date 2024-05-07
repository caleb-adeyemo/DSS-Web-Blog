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
    console.log("Post ID: "+ post.post_id + " Post Msg: " + post.post_msg)
    const postElement = document.createElement('div');
    postElement.className = 'post';
    postElement.innerHTML = `
      <div class='post_top'>
        <div class='post-header'>
          <img class='userDp' src='../../Assets/Images/emoji.jpg' alt='User DP' />
          <p class='username'><span class='userTag'></span></p>
          <img class='editButton' src='../../Assets/SVG/edit.svg' alt='Edit' />
          <img class='deleteButton' src='../../Assets/SVG/delete.svg' alt='Edit' />
        </div>
        <p class='post_message'>${post.post_msg}</p>
      </div>
      <div class='media'>
        <img src='../../Assets/Images/post.jpg' alt='post content media' />
      </div>
    `;
    feedContainer.appendChild(postElement);

    // Add event listener to each edit button
    const editButtons = postElement.querySelector('.editButton');
    editButtons.addEventListener('click', function () {
      handleEditClick(post.post_id, post.post_msg);
    });

    // Add event listener to each Delete button
    const deleteButtons = postElement.querySelector('.deleteButton');
    deleteButtons.addEventListener('click', function () {
      handleDeleteClick(post.post_id);
    });
  });
};

// Function to handle click on the Edit button
const handleEditClick = (post_id, message) => {
  pop_up_form.style.display = 'block'; // Ensure the pop up is displayed when pressing the edit button
  // Store post_id in a hidden input field
  document.getElementById('post_id').value = post_id;
  text_area.value = message; // Add the message from the post to the pop up
};

// Function to handle click on the Delete button
const handleDeleteClick = (post_id) => {
  // Store post_id in a hidden input field
  document.getElementById('post_id').value = post_id;
  console.log(post_id);
  // Delete the post 
  handleDelete(post_id);
};

// Function to fetch feed data from backend
const fetchFeedData = async () => {
  try {
    const response = await fetch('http://localhost:3001/user/personal_page', { credentials: 'include' });
    if (response.ok) {
      const data = await response.json();
      renderFeedPosts(data.data);
      
      // Extract name and username from cookies and append where needed
      const navName = document.getElementById('navName'); // ID
      const navTag = document.getElementById('navTag'); // ID
      const postNames = document.querySelectorAll('.username'); // Class
      const postTags = document.querySelectorAll('.userTag'); // Class

      // Nav name and tag
      navName.innerHTML = (document.cookie.split('; ').find(row => row.startsWith('name=')).split('=')[1]);
      navTag.innerHTML = (document.cookie.split('; ').find(row => row.startsWith('username=')).split('=')[1]);

      // Posts name and tags
      postNames.forEach(postName => {
        postName.innerHTML = document.cookie.split('; ').find(row => row.startsWith('name=')).split('=')[1];
      });
      postTags.forEach(postTag => {
        postTag.innerHTML = document.cookie.split('; ').find(row => row.startsWith('username=')).split('=')[1];
      });

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
const handleSearch = async (event) => {
  event.preventDefault(); // Prevent default form submission behavior
  const formData = new FormData(event.target);
  const message = formData.get('form_text_area'); // Get the 'form_text_area' message
  const post_id = formData.get('post_id'); // Get the post_id if exists (for editing)


  // Varaibles
  let response = null;

  // Try to send the data
  try {
    let url = ['http://localhost:3001/home', 'http://localhost:3001/user/edit'];
    if (post_id){
      response =await fetch(url[1], {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ post_id, message }),
        credentials: 'include',
      })
    }
    else{
      response =await fetch(url[0], {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
        credentials: 'include',
      })
    }
    // If the tweet sucessfully sent; debug success message
    if (response.ok) {
      const data = await response.json();
      console.log(data.message);
      toggleForm(); // Remove the form
      location.reload(); // Reload the page to see the updates

    } else { // error log failed message
      console.error(response.Error)
      throw new Error('Failed to submit form');
    }
  } catch (error) {
    console.error('Error submitting form:', error.message);
  }
};


// Add event listener for form submission
document.getElementById('postForm').addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent default form submission behavior
  handleSearch(event); // Call handleSubmit function with the event
});

// Function to handle deleting posts
const handleDelete = async (post_id) => {
  // Try to send the data
  try {
    let url = ['http://localhost:3001/user/deletePost'];
    response = await fetch(url[0], {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ post_id }),
      credentials: 'include',
    })
    // If the tweet sucessfully sent; debug success message
    if (response.ok) {
      const data = await response.json();
      console.log(data.message);
      // Reload the page to see the updates
      location.reload();

    } else { // error log failed message
      console.error(response.Error)
      throw new Error('Failed to submit form');
    }
  } catch (error) {
    console.error('Error submitting form:', error.message);
  }
};