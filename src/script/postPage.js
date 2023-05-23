// Get the user ID and post ID from the URL parameters
const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get('id');

// Fetch and display the specific post
async function fetchPost() {
  try {
    //GET
    const postResponse = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
    const post = await postResponse.json();
    console.log(post);
    //GET Commments
    const commentsResponse = await fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}/comments`);
    const comments = await commentsResponse.json();
    console.log(comments);
    //GET Users
    const userResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${post.userId}`);
    const user = await userResponse.json();
    const userAddress = user.address
    const userCompany = user.company
    console.log(user);

    displaySinglePost(post, user, userAddress, userCompany);
    displayComments(comments);
    commentCount(comments);
  } catch (error) {
    console.error('Error:', error);
  }
}


// display post
function displaySinglePost(post, user, userAddress, userCompany) {
  const postContainer = document.getElementById('post');
  postContainer.innerHTML = `
    <header class="d-flex flex-column flex-column-reverse flex-lg-row justify-content-lg-around my-5 py-3">
        <div class="d-flex gap-5 flex-lg-column justify-content-around mx-5 mx-lg-2 p-3 p-lg-1">
            <button id="delete"><i class="fa-solid fa-trash"></i></button>
            <button id="edit"><i class="fa-solid fa-pen-to-square"></i></button>
        </div>
        <div class="d-flex userCard col-8 mx-auto p-3">
              <div>
                  <h5 class="card-title">User: </br>${user.name}</h5>
                  <p class="card-text">${user.username}</p>
                  <p class="card-text">Address: ${userAddress.city}, ${userAddress.street} ${userAddress.suite} </p>
                  <p class="card-text">Number: ${user.phone}</p>
              </div>
              <div>
                  <h5 class="card-title">Company: </br> ${userCompany.bs}</h5>
              </div>
        </div>
    </header>
    <div class="col-12 d-flex justify-content-center my-5">
      <div class="col-10">
        <h5 class="card-title">${post.title}</h5>
        <p class="card-text">${post.body}</p>
      </div>
    </div>
  `;

  // Editing post PUT/PATCH
  const editBtn = postContainer.querySelector('#edit');
  editBtn.addEventListener('click', async () => {
    postContainer.innerHTML = `
    <header class="d-flex flex-column flex-column-reverse flex-lg-row justify-content-lg-around my-5 py-3">
    <div class="d-flex gap-5 flex-lg-column justify-content-around mx-5 mx-lg-2 p-3 p-lg-1">
        <button id="delete"><i class="fa-solid fa-trash"></i></button>
        <button id="edit"><i class="fa-solid fa-pen-to-square"></i></button>
    </div>
    <div class="d-flex userCard col-8 mx-auto p-3">
          <div>
              <h5 class="card-title">User: </br>${user.name}</h5>
              <p class="card-text">${user.username}</p>
              <p class="card-text">Address: ${userAddress.city}, ${userAddress.street} ${userAddress.suite} </p>
              <p class="card-text">Number: ${user.phone}</p>
          </div>
          <div>
              <h5 class="card-title">Company: </br> ${userCompany.bs}</h5>
          </div>
    </div>
</header>
      <div class="d-flex flex-column align-items-center gap-5 col-10 mx-auto">
          <div class="d-flex flex-column justify-content-start col-10 gap-2">
              <label for="title">Name:</label>
              <input type="text" id="title" placeholder="Type Blog's Name" value="${post.title}">
              <span class="title-span show red">Required field</span>
          </div>
          <div class="d-flex flex-column justify-content-start col-10 gap-2">
              <label for="body">Blog:</label>
              <textarea placeholder="Type Something Here" id="body" rows="10">${post.body}</textarea>
              <span class="body-span show red">Required field</span>
          </div>
          <div>
              <button type="submit" id="submitBtn">Submit</button>
          </div>
      </div>
    `;

    const submitBtn = postContainer.querySelector('#submitBtn');
submitBtn.addEventListener('click', async () => {
  const title = document.getElementById('title');
  const body = document.getElementById('body');

  if (title.value.trim() === '') {
    document.querySelector('.title-span').classList.remove('show');
    return;
  }

  if (body.value.trim() === '') {
    document.querySelector('.body-span').classList.remove('show');
    return;
  }

  try {
    const editResponse = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: title.value,
        body: body.value
      })
    });

    const editResult = await editResponse.json();
    displaySinglePost(post, user, userAddress, userCompany);
    console.log(editResult);

    // Display success message with SweetAlert
    Swal.fire({
      title: 'Success',
      text: 'Post has been updated successfully!',
      icon: 'success'
    }).then(() => {
      window.location.href = 'index.html';
    });
  } catch (error) {
    console.error('Error:', error);

    // Display error message with SweetAlert
    Swal.fire({
      title: 'Error',
      text: 'An error occurred while updating the post. Please try again later.',
      icon: 'error'
    });
  }
});
  })
  

  // DELETE post
  const deleteBtn = postContainer.querySelector('#delete');
  deleteBtn.addEventListener('click', async () => {
    try {
      const result = await Swal.fire({
        title: 'Confirm Deletion',
        text: 'Are you sure you want to delete this post?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Delete',
        cancelButtonText: 'Cancel',
      });

      if (result.isConfirmed) {
        const deleteResponse = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
          method: 'DELETE',
        });
        const deleteResult = await deleteResponse.json();
        console.log(deleteResult);

        Swal.fire({
          title: 'Deleted',
          text: 'The post has been deleted successfully!',
          icon: 'success',
        }).then(() => {
          window.location.href = 'index.html';
        });
      }
    } catch (error) {
      console.error('Error:', error);
    }
  });
}


//display comments
function displayComments(comments) {
  const commentsContainer = document.getElementById('comments');
  commentsContainer.innerHTML = comments
    .map(
      (comment) => `
    <div class="comment p-3 col-8">
            <div class="card-body">
                <h5 class="card-title">${comment.name}</h5>
                <p class="card-text">${comment.body}</p>
            </div>
            <div class="d-flex justify-content-end">
                <i>${comment.email}</i>
            </div>
    </div>
    `
    )
    .join('');
}

function commentCount(comments) {
  const commentCount = document.getElementById('commentCount')
  commentCount.innerHTML = `
  <h1>${comments.length} Comments</h1>
  `
}

fetchPost();

const homeBtn = document.getElementById('home')
home.addEventListener('click', () =>{
window.location.href = 'index.html'
})
const create = document.getElementById('create');
create.addEventListener('click', () => {
  window.location.href = 'create.html';
});
